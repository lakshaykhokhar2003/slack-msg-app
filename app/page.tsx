"use client";

import {useState} from 'react';
import axios from 'axios';
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast} from "sonner";

export default function Home() {
    const [loading, setLoading] =  useState<boolean>(false);
    const [responseMessage, setResponseMessage] =  useState<string>('');
    const [message, setMessage] = useState<string>('');

    const sendMessage = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api', {
                text: message,
            });

            toast.success(response.data.message);
            setMessage('')
            setResponseMessage(response.data.message);
        } catch (error) {
            toast.error('Error sending message to Slack.')
            setResponseMessage('Error sending message to Slack.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Input
                type="text"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-1/2 mb-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMessage();
                }}
            />
            <Button
                onClick={sendMessage}
                disabled={loading}

            >
                {loading ? 'Sending...' : 'Send Slack Message'}
            </Button>
            {responseMessage && <p className="mt-4 text-gray-800">{responseMessage}</p>}
        </div>
    );
}
