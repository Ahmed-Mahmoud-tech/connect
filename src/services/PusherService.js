import Pusher from "pusher-js";

export class PusherInitializer {
    static index = 0;
    static pusher;

    constructor(setTeamsData, setBusinessUnitsData) {
        if (PusherInitializer.index > 1) return null;
        PusherInitializer.index++;
        Pusher.logToConsole = true;
        PusherInitializer.pusher = new Pusher("27545c04badeaba3b938", {cluster: "eu"});
        let liveScoreChannel = PusherInitializer.pusher.subscribe("liveScoreChannel");
        liveScoreChannel.bind('liveScoreEvent', async (data) => {
            if (data.liveScore) {
                setTeamsData(data.liveScore.data.teams);
                setBusinessUnitsData(data.liveScore.data.business_units);
            }
        });
    }
}