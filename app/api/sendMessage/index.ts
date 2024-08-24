import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message } = req.body; // Extract the message from the request body
        const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL; // Use environment variable for Slack webhook URL

        try {
            const response = await axios.post(SLACK_WEBHOOK_URL, {
                text: message,
            });

            if (response.status === 200) {
                res.status(200).json({ success: true, message: 'Message sent successfully!' });
            } else {
                res.status(response.status).json({ success: false, message: 'Failed to send message to Slack.' });
            }
        } catch (error) {
            console.error('Error sending message to Slack:', error);
            res.status(500).json({ success: false, error: 'Error sending message to Slack.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed.' });
    }
}
