import { getSongInfo } from "../../modules/getSongInfo";
export const handleRequest = async (req : Request) => {
    const body = await getSongInfo();

    const headers = {
        // Engedélyezzük a cross-origin kéréseket
        "Access-Control-Allow-Origin": "*", // Ezt lecserélheted egy adott domainre is
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };
    
    if(body) {
        return new Response(JSON.stringify(body), {headers: headers});
    } else {
        return new Response(`{"error":"no item found"}`, {status: 400, headers: headers});
    }
};
