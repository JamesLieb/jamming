
import React, { useState, useCallback, useEffect } from "react";
import Playlist from '../Playlist/Playlist';
import TrackList from "../Tracklist/Tracklist";
import axios from 'axios';
import styles from './App.module.css';



const CLIENT_ID = 'f04c9ec0fb904dd2a1f53ca2a1d30ea6'
const REDIRECT_URI = "http://localhost:3000"


function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [listIndices, setListIndices] = useState({});
 


    const params = new URLSearchParams(window.location.search);
    let code = params.get("code");



useEffect(() => {
  if (!code) {
    redirectToAuthCodeFlow(CLIENT_ID);
} 
else {
  if (token!=='') {
    return
  }
  else {
    getAccessToken(CLIENT_ID, code);
  }
  
}
}, [code, redirectToAuthCodeFlow, getAccessToken, token])

 

 


function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", `${REDIRECT_URI}`);
  params.append("scope", "user-read-private user-read-email playlist-modify-public playlist-modify-private");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}


 async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${REDIRECT_URI}`);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    setToken(access_token)
    window.localStorage.setItem("token", token);
    console.log(token);
    return
}
  

  const logout = () => {
  setToken("")
  window.localStorage.removeItem("token");
  code = null;
}




const searchTracks = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "track"
      }
  })

  setTracks(data.tracks.items)
}

const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        {
          return
        };
      let index = tracks.indexOf(track);
      console.log(index);
      setListIndices( {...listIndices, track: index});
      console.log(listIndices);
      let newTracks = tracks.toSpliced(index, 1);
      setTracks(newTracks);
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks, tracks, listIndices]
  );

const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
    prevTracks.filter((currentTrack) => currentTrack.id !== track.id)); 
    let newTracks = tracks.toSpliced(listIndices.track,0,track);
    let newObj  = delete listIndices.track;
    setListIndices(newObj);
    setTracks(newTracks);
},[tracks, listIndices]);

const updatePlaylistName = useCallback((name) =>
setPlaylistName(name), []);



const savePlaylistRequest = async (name, trackUris) => {

    if (!name || !trackUris.length) {
        return;
    }
    
    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });

};



const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    savePlaylistRequest(playlistName, trackUris).then(() => {
        setPlaylistName("New playlist");
        setPlaylistTracks([]);
    })
}, [playlistName, playlistTracks, savePlaylistRequest]);


    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
            <h1>Jammming</h1>
                {!token ?
                    <a className={styles.log} href={"."} >Login
                        to Spotify</a>
                    : <button className={styles.log} onClick={logout}>Logout</button>}
                <form className={styles.form} onSubmit={searchTracks}>
                  <input className={styles.search} type="text" onChange={e => setSearchKey(e.target.value)}/>
                  <button className={styles.log} type={"submit"}>Search</button>
                </form>
            </header>
        <div className={styles.tracklistWrapper}>
        <TrackList tracks={tracks} onAdd={addTrack} />
        <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={updatePlaylistName}
        onRemove={removeTrack}
        onSave={savePlaylist} 
        />
        </div>
       
        </div>
    );
}

export default App;
