import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ThreatDetails = () => {
  const { id } = useParams();
  const [threat, setThreat] = useState(null);

  useEffect(() => {
    // Fetch threat details based on the ID from the URL
    axios.get(`/api/threats/${id}/`) // Replace with your actual API endpoint
      .then((response) => setThreat(response.data))
      .catch((error) => console.error('Error fetching threat details:', error));
  }, [id]);

  if (!threat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{threat.name}</h1>
      <p><strong>Description:</strong> {threat.description}</p>
      <p><strong>Impact:</strong> {threat.impact}</p>
      <p><strong>Mitigation Strategy:</strong> {threat.mitigation}</p>
    </div>
  );
};

export default ThreatDetails;
