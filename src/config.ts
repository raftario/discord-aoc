import * as dotenv from "dotenv";

export interface Config {
    command: string;
    leaderboard: string;
    discordToken: string;
    sessionCookie: string;
    userAgent: string;
}

export function readConfig(): Config {
    dotenv.config();

    const command = process.env.COMMAND;
    if (!command) {
        throw new Error("Missing 'command' in configuration");
    }

    const leaderboard = process.env.LEADERBOARD;
    if (!leaderboard) {
        throw new Error("Missing 'leaderboard' in configuration");
    }

    const discordToken = process.env.DISCORD_TOKEN;
    if (!discordToken) {
        throw new Error("Missing 'discord-token' in configuration");
    }

    const sessionCookie = process.env.SESSION_COOKIE;
    if (!sessionCookie) {
        throw new Error("Missing 'session-cookie' in configuration");
    }

    return {
        command,
        leaderboard,
        discordToken,
        sessionCookie,
        userAgent: process.env.USER_AGENT || "discord-aoc",
    };
}
