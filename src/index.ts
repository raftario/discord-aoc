import { Client, Message } from "discord.js";
import { Config, readConfig } from "./config";
import { Api } from "./api";

main().catch(console.error);

async function main() {
    const config = await readConfig();
    const discord = new Client();
    const api = new Api(config);

    discord.on("message", (message) =>
        listener(message, api, config).catch(console.error)
    );
    await discord.login(config.discordToken);
}

async function listener(message: Message, api: Api, config: Config) {
    if (message.author.bot || message.content !== config.command) {
        return;
    }

    const leaderboard = await api.leaderboard();
    const members = Object.values(leaderboard.members).sort(
        (a, b) => b.local_score - a.local_score
    );

    const nameLength = members.reduce(
        (length, { name }) => Math.max(length, name.length),
        0
    );
    const scoreLength = members[0].local_score.toString().length;

    const contents = members
        .map(({ name, local_score }) => {
            const score = local_score.toString().padStart(scoreLength, "0");
            const separator = "-".repeat(1 + nameLength - name.length);
            return `${name} ${separator} ${score}`;
        })
        .join("\n");
    await message.channel.send("```\n" + contents + "\n```");
}
