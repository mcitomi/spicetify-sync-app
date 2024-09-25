import { client_id, client_secret, callback } from "../../../config.json";
import { saveUserData } from "../../modules/saveUserData";
export const handleRequest = async (req : Request) => {
    const { searchParams } = new URL(req.url);
    console.log(req.url);

    const code: string | null = searchParams.get("code");

    if(!code) {
        return new Response("Unable to get code", {status: 400});
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST", 
        headers: {
            "Authorization": "Basic " + btoa(`${client_id}:${client_secret}`),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: callback
        }).toString()
    });

    // console.log(response);
    const body = await response.json();
    
    if(!response.ok) {
        return new Response(`Spotify error: ${body?.error ? body?.error : " "} ${body?.error_description ? body?.error_description : " "} `, {status: 400});
    }

    saveUserData(body);

    return new Response("Auth ok");
};
