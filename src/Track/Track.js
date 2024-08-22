import React, { useState, useEffect, useCallback } from "react";
import styles from './Track.module.css';


export default function Track(props) {
    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.track);
        },[props.onAdd, props.track]
        
    );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);
        }, [props.onRemove, props.track]
    );

    const renderAddorRemove = () => {
        if (props.isRemove) {
            return (
                <button className={styles.trackActionButton} onClick={removeTrack}>-</button>
            );
        }
        return (
            <button className={styles.trackActionButton} onClick={addTrack}>+</button>
        )
    };

    return (
        <div className={styles.SongWrapper}>
            <div className={styles.info}>
                <h3 className={styles.trackName}>{props.track.name}</h3>
                <p className={styles.trackInfo}>{props.track.artists.map((artist) => ` - ${artist.name}`)} | {props.track.album.name}</p>
                
            </div>
            <div className={styles.buttonWrapper}>
                {renderAddorRemove()}
            </div>
        </div>
    )

};