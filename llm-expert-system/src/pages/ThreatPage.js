import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ThreatPage = () => {
  const { id } = useParams(); // Get the threat ID from the URL
  const [threat, setThreat] = useState(null); // Store threat details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchThreatDetails();
  }, [id]); // Fetch threat details when the component loads or the ID changes

  const fetchThreatDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/threats/${id}/`);
      setThreat(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching threat details:", err);
      setError("Unable to fetch threat details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ margin: "20px" }}>
      <h1>Threat Details</h1>
      {threat ? (
        <div>
          <p><strong>Name:</strong> {threat.name}</p>
          <p><strong>Description:</strong> {threat.description}</p>
          <p><strong>Impact:</strong> {threat.impact}</p>
          <p><strong>Mitigation:</strong> {threat.mitigation}</p>
        </div>
      ) : (
        <p>No threat details available.</p>
      )}
    </div>
  );
};

export default ThreatPage;
