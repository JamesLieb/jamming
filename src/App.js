
import React, { useState, useEffect } from "react";
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import Track from './Track/Track';
import Tracklist from './Tracklist/Tracklist';
import Spotify from "./Spotify/Spotify";


export default function App() {
    const [tracklist, setTracklist] = useState({});
    const [playlist, setPlaylist] = useState({});
    const [searchresults,setSearchresults] = useState({});

    const data = {
        song: 'Hello Friend',
        artist: 'James',
        album: 'Not my kid'
    };

    return (
        <>
            <SearchBar />
            <SearchResults />
            <Playlist /> 
            
            
                
        </>
    )
};

