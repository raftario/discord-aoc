import { get } from "superagent";

export interface Leaderboard {
    owner_id: string;
    event: string;
    members: { [id: string]: Member };
}

export interface Member {
    id: string;
    name: string;
    stars: number;
    local_score: number;
    global_score: number;
    last_star_ts: string;
    completion_day_level: CompletionDayLevel;
}

export interface CompletionDayLevel {
    "1"?: CompletionDay;
    "2"?: CompletionDay;
    "3"?: CompletionDay;
    "4"?: CompletionDay;
    "5"?: CompletionDay;
    "6"?: CompletionDay;
    "7"?: CompletionDay;
    "8"?: CompletionDay;
    "9"?: CompletionDay;
    "10"?: CompletionDay;
    "11"?: CompletionDay;
    "12"?: CompletionDay;
    "13"?: CompletionDay;
    "14"?: CompletionDay;
    "15"?: CompletionDay;
    "16"?: CompletionDay;
    "17"?: CompletionDay;
    "18"?: CompletionDay;
    "19"?: CompletionDay;
    "20"?: CompletionDay;
    "21"?: CompletionDay;
    "22"?: CompletionDay;
    "23"?: CompletionDay;
    "24"?: CompletionDay;
    "25"?: CompletionDay;
}

export interface CompletionDay {
    "1"?: CompletionLevel;
    "2"?: CompletionLevel;
}

export interface CompletionLevel {
    get_star_ts: string;
}

export interface ApiConfig {
    leaderboard: string;
    userAgent: string;
    sessionCookie: string;
}

export async function leaderboard(config: ApiConfig): Promise<Leaderboard> {
    const res = await get(
        `https://adventofcode.com/2020/leaderboard/private/view/${config.leaderboard}.json`
    )
        .set("User-Agent", config.userAgent)
        .set("Cookie", [`session=${config.sessionCookie}`]);
    return JSON.parse(res.text);
}
