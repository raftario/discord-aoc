import { differenceInMinutes } from "date-fns";
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

export class Api {
    private config: ApiConfig;
    private cached?: Leaderboard;
    private lastCached?: Date;

    constructor(config: ApiConfig) {
        this.config = config;
    }

    private async refresh() {
        const res = await get(
            `https://adventofcode.com/2020/leaderboard/private/view/${this.config.leaderboard}.json`
        )
            .set("User-Agent", this.config.userAgent)
            .set("Cookie", [`session=${this.config.sessionCookie}`]);
        const json = JSON.parse(res.text);

        this.cached = json;
        this.lastCached = new Date();
    }

    async leaderboard(): Promise<Leaderboard> {
        if (
            !this.cached ||
            !this.lastCached ||
            differenceInMinutes(new Date(), this.lastCached) >= 15
        ) {
            await this.refresh();
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.cached!;
    }
}

export interface ApiConfig {
    leaderboard: string;
    userAgent: string;
    sessionCookie: string;
}
