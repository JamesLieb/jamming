import React, { useCallback } from "react";
import styles from './Playlist.module.css';
import TrackList from "../Tracklist/Tracklist";

export default function PlayList(props) {

    const {onNameChange} = props;

    const handleNameChange = useCallback((event) => {
        onNameChange(event.target.value);
    }, [onNameChange]);

    return (
        <>
            
                <div className={styles.newdiv}>
                    <div className={styles.playlist}>
                    <button className={styles.saveto} onClick={props.onSave}><span>Save to Spotify</span></button>
                    <input defaultValue={"Playlist" } onChange={handleNameChange} className={styles.input} type='text' name="playlist" aria-label="enter your playlist name" placeholder='Enter playlist name'></input>
                    </div>
                    <TrackList isRemoval={true} tracks={props.playlistTracks} onRemove={props.onRemove}/>
                        
                </div>
                    
            
            
        </>
    )
};