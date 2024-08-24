import React, { useState, useCallback } from "react";
import styles from './SearchBar.module.css';

export default function SearchBar(props) {
    const [searchvalue, SetSearchValue] = useState('')

    const handleChange = useCallback((event) => {
        SetSearchValue(event.target.value);
    });

    const search = useCallback(() => {props.onSearch(searchvalue)}
    , [props.onSearch, searchvalue]
    );

    
    return (
        <>
        <div className={styles.title} >
            <h1>Jammming</h1>
            <h2>Welcome please search below!</h2>
        </div>
        <div className={styles.search} >
            <form id='form' role='search' className={styles.form}>
            <input type='search' placeholder="Search..." aria-label="Search throught songs" className={styles.input} onChange={handleChange}></input>
            <button onClick={search} className={styles.button}><svg className={styles.svg} viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg></button>
            </form>
        </div>
        </>
        
    )
};