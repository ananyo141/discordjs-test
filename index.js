const discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

const bot = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMembers,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.DirectMessages,
  ],
});

async function main() {
  await bot.login(BOT_TOKEN);

  console.log("Logged in as " + bot.user.tag);

  console.log(bot.guilds);
  const guild = bot.guilds.cache.get(GUILD_ID);
  console.log('Guild Details -> ', guild);
  console.log('Guild Members -> ');
  guild.members.fetch().then((members) => {
    members.forEach((member) => console.log("Member name: ", member.user.username));
  });

  bot.on("messageCreate", async (message) => {
    console.log(message.content);
    message.reply("Hello");
  });
}

main();
