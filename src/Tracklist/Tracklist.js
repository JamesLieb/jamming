import React from "react";
import styles from './Tracklist.module.css';
import Track from "../Track/Track";

export default function TrackList(props) {
    

    return (
        <div className={styles.trackList}>
            <div className={styles.container}>
                <ul className={styles.listContainer}>
                    {props.tracks.map((track) =>  {
                return (
                <li className={styles.listItems}>
                <Track 
                key={track.id}
                track={track}
                onAdd={props.onAdd}
                isRemove={props.isRemoval}
                onRemove={props.onRemove}
                />
                </li>
                )
                
            })}
                    
                </ul>
            </div>
        </div>
    );
}
