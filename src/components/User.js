import React from "react";

function User({user}){
    return(
        <div>
            <img src={user.avatar_url} width="100" alt="avatar"/>
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
            <p>Followers:{user.followers}</p>
            <p>Following:{user.following}</p>
        </div>
    );
}
export default User;