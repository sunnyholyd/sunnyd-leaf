import { NextResponse } from 'next/server'
import crypto from 'crypto';

export async function GET(request: Request) {
    const TOKEN = process.env.WEIXIN_TOKEN
    const { searchParams } = new URL(request.url)
    const echostr = searchParams.get("echostr");

    function checkSignature(): boolean {
        const signature = searchParams.get("signature");
        const timestamp = searchParams.get("timestamp");
        const nonce = searchParams.get("nonce");
    
        const token = TOKEN;
        const tmpArr = [token, timestamp, nonce];
        tmpArr.sort();
    
        const tmpStr = crypto
        .createHash('sha1')
        .update(tmpArr.join(''))
        .digest('hex');

        console.log(tmpStr)
    
        if (tmpStr === signature) {
            return true;
        } else {
            return false;
        }
    }

    if (checkSignature()) {
        return new Response(echostr)
    } else {
        return new Response(echostr)
    }
}
