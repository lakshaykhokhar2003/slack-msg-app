"use client"

import {useState} from 'react';
import axios from 'axios';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const sendMessage = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/send-message', {
                message: 'Hello from Next.js!',
            });
            console.log(response)
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Error sending message to Slack.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send Slack Message'}
            </button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
