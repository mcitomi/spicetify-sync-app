import { client_id, client_secret } from "../../config.json";
import { getUser, type User } from "./getUser";
import { saveUserData } from "./saveUserData";
export async function renewToken() {
    const userValues = await JSON.parse(getUser()) as User;
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': userValues.refresh_token
        })
    });

    if(response.ok) {
        let body = await response.json();

        if(!body?.refresh_token) {
            body.refresh_token = userValues.refresh_token;
        }
        
        saveUserData(body);
        return true;
    } else {
        return false;
    }
    
}