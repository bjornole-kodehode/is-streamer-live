import fetch from "node-fetch";
import open from "open";
import dotenv from "dotenv"
dotenv.config();

const clientId = process.env.TWITCH_CLIENT_ID;
const accessToken = process.env.TWITCH_ACCESS_TOKEN;
const streamerName = "streamer-name"; //ADD streamer name
async function checkIfLive() {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${streamerName}`, {
        headers: {
            "Client-ID": clientId,
            'Authorization': `Bearer ${accessToken}`
        }
});

if (response.ok) {


    const json = await response.json()
  
    if (json.data?.length > 0) {
        const streamUrl = `https://no.twitch.tv/${streamerName}`
        open(streamUrl) 
       
    } else {
        console.log(`${streamerName} is not currently live.`)
    }
    } else {
        console.log(`Error: ${response.status} ${response.statusText}`)
    }

}

checkIfLive()