import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { text } = req.body; // Extract the message from the request body
        const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL; // Use environment variable for Slack webhook URL
            console.log(text, SLACK_WEBHOOK_URL); // Debugging log to ensure variables are correct

        try {
            // Make the request to Slack's webhook URL
            const response = await fetch(SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text
                }),
            })

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
