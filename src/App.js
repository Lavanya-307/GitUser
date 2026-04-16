import React, { useState } from "react";
import Search from "./components/Search";
import User from "./components/User";
import Repo from "./components/Repositories";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUser = async (name) => {
    if (!name) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${name}`);

      if (res.status === 404) {
        setError("User not found");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUser(data);

      const repoRes = await fetch(data.repos_url);
      const repoData = await repoRes.json();

      setRepos(repoData);

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("https://storage.ghost.io/c/42/5d/425d266f-cf99-406e-9436-597a19bed011/content/images/size/w2000/2021/08/21W32-Blog-Banner-Shifting-CI-GitHub-Final.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          maxWidth: "250px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgba(2, 25, 100, 0.4)",
          padding: "3.5rem",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}
      >
        <h2 style={{ 
          color: "#c4510eb6",
          fontSize: "32px",
          marginBottom: "1rem",
          fontFamily: "'Segoe UI', 'Roboto', sans-serif"
        }}>
          GitHub User
        </h2>
        <Search onSearch={getUser} />
        {loading && (<p style={{ textAlign: "center", color: "#666" }}>Loading...</p> )}
        {error && (<p style={{ color: "#d73a49", textAlign: "center" }}>{error}</p>)}

<br/>        {user && (<User user={user} />)}
        {repos.length > 0 && (<Repo repos={repos} /> )}
      </div>
    </div>
    
  );
}

export default App;