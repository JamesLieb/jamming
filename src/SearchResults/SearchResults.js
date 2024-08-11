import React, { useState, useEffect } from "react";
import styles from './SearchResults.module.css';
import Track from "../Track/Track";
import TrackList from "../Tracklist/Tracklist";
export default function SearchResults(props) {

    return (
        <>
        <div className={styles.container}>
            <div className={styles.childcontainer} id='songs'>
                <div className={styles.newdiv}>
                    <h3 className={styles.h3}>Results</h3>
                </div>

            </div>
        </div>
        </>
    )
};