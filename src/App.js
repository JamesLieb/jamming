
import React, { useState, useEffect } from "react";
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import Track from './Track/Track';
import Tracklist from './Tracklist/Tracklist';


export default function App() {
    return (
        <>
            <SearchBar />
            <SearchResults />
            <Playlist /> 
            
                
        </>
    )
};

