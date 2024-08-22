
import React, { useState, useCallback, useEffect } from "react";
import Playlist from '../Playlist/Playlist';
import TrackList from "../Tracklist/Tracklist";
import axios from 'axios';
import styles from './App.module.css';



const CLIENT_ID = 'f04c9ec0fb904dd2a1f53ca2a1d30ea6'
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, []);

  const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
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
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
    prevTracks.filter((currentTrack) => currentTrack.id !== track.id))
},[]);

const updatePlaylistName = useCallback((name) =>
setPlaylistName(name), []);

const savePlaylistRequest = async (name, trackUris) => {
    const header= {
        Authorization: `Bearer ${token}`
    };
    if (!name || trackUris.length) {
        return;
    }

    const user_Id = await axios.get('https://api.spotify.com/v1/me',
        {headers: header}
    );

    const id = user_Id.id;



    const playlist = await axios.post(`https://api.spotify.com/v1/users/${id}/playlists`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            

            data: {
                name: playlistName,
            }
        },
        
    );

    const playlist_Id = playlist.id;

    const updatePlaylist = await axios.post(`https://api.spotify.com/v1/playlists/${playlist_Id}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                uris: trackUris,
            }
        }
    );

    
    return updatePlaylist

};



const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    savePlaylistRequest(playlistName, trackUris).then(() => {
        setPlaylistName("New playlist");
        setPlaylistTracks([]);
    })
}, [playlistName, playlistTracks]);


    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
            <h1>Jammming</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
                <form className={styles.form} onSubmit={searchTracks}>
                  <input className={styles.search} type="text" onChange={e => setSearchKey(e.target.value)}/>
                  <button type={"submit"}>Search</button>
                </form>
            </header>
        <div className={styles.tracklistWrapper}>
        <TrackList tracks={tracks} onAdd={addTrack} />
        </div>
        <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={updatePlaylistName}
        onRemove={removeTrack}
        onSave={savePlaylist} 
        />
        </div>
    );
}

export default App;
