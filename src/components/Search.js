import React,{useState} from "react";

function Search({onSearch}){
    const [text,setText]=useState("");

    const handleClick=()=>{
        onSearch(text);
    };

    return(
        <div>
            <input 
                type="text"
                placeholder="Enter Username"
                value={text}
                onChange={(e)=>setText(e.target.value)}/><br/><br/>
            <button  onClick={handleClick}>
                Search
            </button>
        </div>
    );
}

export default Search;