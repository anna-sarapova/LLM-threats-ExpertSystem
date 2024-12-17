import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ThreatPage = () => {
    const { threatId } = useParams();
    const [threat, setThreat] = useState(null);

    useEffect(() => {
        axios.get(`/api/threats/${threatId}/`)
            .then(response => setThreat(response.data))
            .catch(err => console.error(err));
    }, [threatId]);

    if (!threat) return <div>Loading...</div>;

    return (
        <div>
            <h1>{threat.name}</h1>
            <p>{threat.description}</p>
            <p><strong>Impact:</strong> {threat.impact}</p>
            <p><strong>Mitigation Strategy:</strong> {threat.mitigation}</p>
        </div>
    );
};

export default ThreatPage;
