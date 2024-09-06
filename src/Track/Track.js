import React, { useCallback } from "react";
import styles from './Track.module.css';


export default function Track(props) {

    const {onAdd , track, onRemove, isRemove} = props;
    const addTrack = useCallback(
        (event) => {
            onAdd(track);
        },[onAdd, track]
        
    );

    const removeTrack = useCallback(
        (event) => {
            onRemove(track);
        }, [onRemove, track]
    );

    const renderAddorRemove = () => {
        if (isRemove) {
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
                <audio controls className={styles.preview} src={props.track.preview_url}></audio>
                
            </div>
            <div className={styles.buttonWrapper}>
                {renderAddorRemove()}
            </div>
        </div>
    )

};