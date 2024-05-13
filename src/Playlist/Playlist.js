import React, { useState, useEffect } from "react";
import styles from './Playlist.module.css';
export default function PlayList() {
    return (
        <>
            <div className={styles.container}>
            <div className={styles.childcontainer}>
                <div className={styles.newdiv}>
                    <div className={styles.playlist}>
                    <button className={styles.saveto} ><span>Save to Spotify</span></button>
                    <input className={styles.input} type='text' name="playlist" aria-label="enter your playlist name" placeholder='Enter playlist name'></input>
                    </div>
                        
                </div>
                    
            </div>
            </div>
            
        </>
    )
};