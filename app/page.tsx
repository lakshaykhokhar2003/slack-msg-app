"use client"
import {useState} from 'react';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const sendMessage = async () => {
        setLoading(true);
        try {
            // Correct API route path
            await fetch('api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: 'Hello from Next.js!',
                }),
            });

            // const response = await axios.post('api/send-message', {
            //     text: 'Hello from Next.js!',
            // },
            // );

            // setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Error sending message to Slack.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send Slack Message'}
            </button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
