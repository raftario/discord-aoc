import { Client, Message } from "discord.js";
import { Config, readConfig } from "./config";
import { getBorderCharacters, table } from "table";
import { leaderboard } from "./api";

main().catch(console.error);

async function main() {
    const config = readConfig();
    const discord = new Client();

    discord.on("message", (message) =>
        listener(message, config).catch(console.error)
    );
    discord.on("ready", () => console.log(`Connected as ${discord.user?.tag}`));
    await discord.login(config.discordToken);
}

async function listener(message: Message, config: Config) {
    if (message.author.bot || message.content !== config.command) {
        return;
    }

    const lb = await leaderboard(config);
    const members = Object.values(lb.members).sort((a, b) => b.stars - a.stars);

    const tableData = [];
    let lastRank = -1;
    let lastStars = -1;
    for (const [i, { name, stars }] of members.entries()) {
        const rank = stars === lastStars ? lastRank : i + 1;
        tableData.push([rank, name, stars]);

        lastRank = rank;
        lastStars = stars;
    }
    const tableContents = table([["Rank", "Name", "Stars"], ...tableData], {
        columns: {
            0: { alignment: "right" },
            1: { alignment: "left" },
            2: { alignment: "right" },
        },
        drawHorizontalLine: (i, length) => i === 0 || i === 1 || i === length,
        border: getBorderCharacters("norc"),
    });

    await message.channel.send("```\n" + tableContents + "\n```");
}
