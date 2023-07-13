const express = require("express");
const cors = require("cors");
const discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

// Use express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const bot = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMembers,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.DirectMessages,
  ],
});

const login = async () => {
  try {
    await bot.login(BOT_TOKEN);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
login().then(() => {
  console.log("Logged in as " + bot.user.tag);
  console.log(bot.guilds);

  // async function main(res, req) {
  //   const guild = bot.guilds.cache.get(GUILD_ID);
  //   console.log("Guild Members -> ");
  //   guild.members.fetch().then((members) => {
  //     members.forEach((member) =>
  //       console.log("Member name: ", member.user.username)
  //     );
  //   });
  // }

  app.get("/", (req, res) => {
    res.status(200).send({ data: bot.guilds });
  });

  app.get("/guilds/:id", (req, res) => {
    const guild = bot.guilds.cache.get(req.params.id);
    if (!guild) res.status(404).json({ data: "Guild not found" });
    res.status(200).send(guild);
  });

  app.get("/guilds/:id/members", (req, res) => {
    const guild = bot.guilds.cache.get(req.params.id);
    guild.members.fetch().then((members) => {
      res.status(200).json({ data: members });
    });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening PORT: ${port}`);
  });
});
