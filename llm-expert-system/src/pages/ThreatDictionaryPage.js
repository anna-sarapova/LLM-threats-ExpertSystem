import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ThreatDictionaryPage = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      console.log("ThreatDictionaryPage loaded");
      fetchThreats();
  }, []);

  const fetchThreats = () => {
      console.log("Fetching threats...");
      setLoading(true);
       axios
         .get("http://127.0.0.1:8000/api/threats/")
         .then((response) => {
           console.log("Response data:", response.data);
           const sortedThreats = response.data.sort((a, b) =>
             a.name.localeCompare(b.name)
           );
           setThreats(sortedThreats);
           setError(null);
         })
         .catch(() => {
           setError("Error fetching threats.");
         })
         .finally(() => setLoading(false));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
        <h1>Threat Dictionary</h1>
          <ul style={{ listStyleType: "disc", padding: "0px 40px" }}>
            {threats.map((threat) => (
              <li key={threat.id} style={{ margin: "10px 0" }}>
                <Link
                  to={`/threat/${threat.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {threat.name}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ThreatDictionaryPage;
