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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #fda085 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box"
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .material-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
            padding: 24px;
            margin: 16px;
            backdrop-filter: blur(10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .material-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
          }
          
          .material-typography {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 300,
            lineHeight: 1.6
          }
          
          .material-button {
            background: linear-gradient(45deg, #2196F3, #1976D2);
            color: white;
            border: none;
            borderRadius: 8px;
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }
        `}
      </style>

      <div className="material-card" style={{ width: "100%", maxWidth: "600px" }}>
        <h2
          style={{
            color: "#1976D2",
            fontSize: "2.5rem",
            fontWeight: 300,
            margin: "0 0 24px 0",
            textAlign: "center",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}
        >
          GitHub User
        </h2>

        <div style={{ marginBottom: "24px" }}>
          <Search onSearch={getUser} />
        </div>

        {loading && (
          <div className="material-card" style={{ textAlign: "center" }}>
            <p style={{ color: "#666", margin: 0 }}>Loading...</p>
          </div>
        )}

        {error && (
          <div
            className="material-card"
            style={{
              backgroundColor: "#ffebee",
              borderLeft: "4px solid #f44336",
              textAlign: "center"
            }}
          >
            <p style={{ color: "#c62828", margin: 0, fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {user && (
          <div className="material-card">
            <User user={user} />
          </div>
        )}

        {repos.length > 0 && (
          <div className="material-card">
            <Repo repos={repos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;