import React,{useState} from "react";

function Search({onSearch}){
    const [text,setText]=useState("");

    const handleClick=()=>{
        onSearch(text);
    };

    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <input 
                type="text"
                placeholder="Enter Username"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                style={{
                    padding: "12px 16px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    width: "100%",
                    maxWidth: "300px",
                    outline: "none",
                    transition: "border-color 0.3s ease"
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = "#1976D2";
                    // Target the main app container with gradient animation
                    const appContainer = document.querySelector('div[style*="gradientShift"]');
                    if (appContainer) {
                        appContainer.style.animationPlayState = "paused";
                    }
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    // Target the main app container with gradient animation
                    const appContainer = document.querySelector('div[style*="gradientShift"]');
                    if (appContainer) {
                        appContainer.style.animationPlayState = "running";
                    }
                }}
            />
            <button 
                onClick={handleClick}
                style={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: 500,
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#1976D2",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#1565C0";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#1976D2";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                }}
            >
                Search
            </button>
        </div>
    );
}

export default Search;