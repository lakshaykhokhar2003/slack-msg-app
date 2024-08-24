import { NextResponse } from "next/server";
import axios,{AxiosResponse} from "axios";

export async function POST(req: Request) {
    try {
        const { text,blocks } = await req.json();
        const SLACK_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;

        if (!SLACK_WEBHOOK_URL) return NextResponse.json({ success: false, message: 'Slack webhook URL is not defined.' }, { status: 500 });

        const response :AxiosResponse<string> = await axios.post(SLACK_WEBHOOK_URL, {
            text,blocks,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) return NextResponse.json({ success: true, message: 'Message sent successfully!' });

        return NextResponse.json({ success: false, message: 'Failed to send message to Slack.' }, { status: response.status });

    } catch (error) {
        console.error('Error sending message to Slack:', error);
        return NextResponse.json({ success: false, error: 'Error sending message to Slack.' }, { status: 500 });
    }
}
