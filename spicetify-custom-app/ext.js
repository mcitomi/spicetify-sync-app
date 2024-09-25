// spicetify config custom_apps mcitomi-webserver
// spicetify apply

(function helloWorld() {
    if (Spicetify === undefined) {
        setTimeout(helloWorld, 1000);  // Várakozás a Spicetify betöltésére
    } else {
        main();
    }
})();

var uri = "";

async function main() {
    console.log("mcitomi-server loaded");

    setInterval(async() => {
        const data = await getSongData();

        if(!data) return;        

        if(!JSON.parse(data.is_playing) && await Spicetify.Player.data.is_playing) {
            await Spicetify.Player.pause();
            console.log(`[mcitomi-server] song paused`);
            
        } else if (await Spicetify.Player.data.is_paused) {
            await Spicetify.Player.play();
            console.log(`[mcitomi-server] song is playing`);
        }

        timestamp = Number(data?.progress_ms);

        if(uri != data?.item?.uri) {
            console.log(`[mcitomi-server] playing from API ${data?.item?.uri} timestamp: ${data?.progress_ms}`);

            uri = data?.item?.uri;
    
            await Spicetify.Player.playUri(data.item.uri);
        } else {
            if((await Spicetify.Player.getProgress() > 3000) && (await Spicetify.Player.getProgress() > Number(data?.progress_ms) + 500 || await Spicetify.Player.getProgress() < Number(data?.progress_ms) - 500)) {
                await Spicetify.Player.seek(Number(data?.progress_ms));
                console.log(`[mcitomi-server] song synced to timestamp: ${data?.progress_ms}`);   
            }
        }
    }, 2500);
}

async function getSongData() {
    try {
        const response = await fetch("http://localhost:25500/api/song");

        if (response.ok) {
            return await response.json();
        } else {
            // console.error("HTTP Error: ", response.status, response.statusText);
            return false;
        }
    } catch (error) {
        return false;
    }
}
