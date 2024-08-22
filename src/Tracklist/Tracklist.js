import React from "react";
import styles from './Tracklist.module.css';
import Track from "../Track/Track";

export default function TrackList(props) {
    

    return (
        <div>
            {props.tracks.map((track) =>  {
                return (
                <Track 
                key={track.id}
                track={track}
                onAdd={props.onAdd}
                isRemove={props.isRemoval}
                onRemove={props.onRemove}
                />)
            })}
        </div>
    );
}
