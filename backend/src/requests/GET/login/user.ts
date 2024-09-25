import { callback, client_id } from "../../../../config.json";
export const handleRequest = (req : Request) => {
    const scope = " user-read-playback-state";

    return Response.redirect("https://accounts.spotify.com/authorize?" +
    `response_type=code&client_id=${encodeURIComponent(client_id)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(callback)}` 
)};
