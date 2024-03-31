import { useState, useEffect } from "react";

export default function Search() {
    return (
        <>
            <div className='title'>
                <h1>Jammming</h1>
                <h2>Welcome please search below!</h2>
            </div>
            <div className="search">
                <form id='form' role='search'>
                <input type='search' id='query' name='q' placeholder="Search..." aria-label="Search throught songs"></input>
                <button id="search-button"><svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg></button>
                </form>
            </div>
            <div className="container">
                <div className="child-container" id='songs'>
                    <div className="new-div">
                        <h3>Results</h3>
                    </div>

                </div>
                <div className="child-container" id="playlist">
                    <div className="new-div">
                        <div className="playlist-name">
                        <input type='text' name="playlist" aria-label="enter your playlist naem"></input>
                        <button id="save-spotify"><span>Save to Spotify</span></button>
                        </div>
                        
                    </div>
                    
                </div>

            </div>
        </>
    )
}

