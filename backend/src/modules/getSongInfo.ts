import { getUser, type User } from "./getUser";
import { renewToken } from "./renewToken";

export async function getSongInfo() {
    const userValues = await JSON.parse(getUser()) as User;
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            "Authorization" : "Bearer " + userValues.access_token 
        }
    });

    if(!response.ok) {
        if(response.status == 401) {
            if(await renewToken()) {
                return await getSongInfo();
            } else {
                return false;
            }
        } 
        console.log("api.spotify.com/v1/me/player/currently-playing ERROR");
        console.log(await response.text());
        return false;
    } 

    const body = await response.json();

    if(body) {
        return body;
    } else {
        return false;
    }
}