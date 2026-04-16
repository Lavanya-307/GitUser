import React from "react";

function Repo({repos}){
    return(
        <div>
            <h3>Repos</h3>

            {repos.slice(0,5).map((r)=>(
                <div key={r.id}>
                    <p>{r.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Repo;