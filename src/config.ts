import { readFile } from "fs/promises";

export interface Config {
    command: string;
    leaderboard: string;
    discordToken: string;
    sessionCookie: string;
    userAgent: string;
}

export async function readConfig(): Promise<Config> {
    const contents = await readFile("config.json", "utf-8");
    const json = JSON.parse(contents);

    const command = json["command"];
    if (!command) {
        throw new Error("Missing 'command' in configuration");
    } else if (typeof command !== "string") {
        throw new TypeError("Invalid value for 'command' in configuration");
    }

    const leaderboard = json["leaderboard"];
    if (!leaderboard) {
        throw new Error("Missing 'leaderboard' in configuration");
    } else if (typeof leaderboard !== "string") {
        throw new TypeError("Invalid value for 'leaderboard' in configuration");
    }

    const discordToken = json["discord-token"];
    if (!discordToken) {
        throw new Error("Missing 'discord-token' in configuration");
    } else if (typeof discordToken !== "string") {
        throw new TypeError(
            "Invalid value for 'discord-token' in configuration"
        );
    }

    const sessionCookie = json["session-cookie"];
    if (!sessionCookie) {
        throw new Error("Missing 'session-cookie' in configuration");
    } else if (typeof sessionCookie !== "string") {
        throw new TypeError(
            "Invalid value for 'session-cookie' in configuration"
        );
    }

    const userAgent = json["user-agent"];
    if (userAgent && typeof userAgent !== "string") {
        throw new TypeError("Invalid value for 'user-agent' in configuration");
    }

    return {
        command,
        leaderboard,
        discordToken,
        sessionCookie,
        userAgent: userAgent || "discord-aoc",
    };
}
