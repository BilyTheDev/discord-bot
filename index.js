const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("The bot is ready!"); // Log "Ready!"
});

function TagUser(id) {
  return "<@" + id + ">";
}

let hash_map = new Map();

let hash_map2 = new Map();

bot.on("message", async msg => {
  // When a message is created
  
  if (msg.member.id == "733772882966216865") return;

  if (
    msg.content.toLowerCase() == "?about" ||
    (msg.content.toLowerCase().includes("what") &&
      msg.content.toLowerCase().includes("this") &&
      msg.content.toLowerCase().includes("server"))
  ) {
    await msg.member
      .send(`Dedicated to all things Batman Arkham and the DC Universe in games, the server was created with the purpose of engaging the Arkham community and the ones who follow The Arkham Channel during the wait and anticipation for the new game titles from both WB Games Montreal and Rocksteady Studios. If you're fan of the Arkham games and Batman, you're in the right place!

**Note:** be sure to read the server guidelines, and each channel's pinned message before exploring and interacting with other fans! It's very important to keep in mind that there are a few rules here.
`).catch(err => console.error(err));;
    await msg.channel.send(
      `${TagUser(
        msg.member.id
      )} Check your Direct Messages, If you didn't get a message make sure you have Direct Messages from members of this server enabled`
    ).catch(err => console.error(err));;
  }

  hash_map2.set(msg.member.id, false);

  setTimeout(function() {
    hash_map2.set(msg.member.id, true);
    hash_map.set(msg.member.id, 0);
  }, 5000);

  hash_map.set(
    msg.member.id,
    (function() {
      if (hash_map.has(msg.member.id)) {
        return hash_map.get(msg.member.id) + 1;
      } else {
        return 1;
      }
    })()
  );

  if (hash_map.get(msg.member.id) >= 6 && !hash_map2.get(msg.member.id)) {
    msg.member.roles.remove("706590856668381285");
    msg.member.roles.add("733850071468343297");
    await msg.channel.send(
      `${TagUser(msg.member.id)} Has been muted for 15 minutes for spamming.`
    ).catch(err => console.error(err));;
    setTimeout(function() {
      msg.member.roles.remove("733850071468343297");
      msg.member.roles.add("706590856668381285");
    }, 900000);
    hash_map.delete(msg.member.id);
    hash_map2.delete(msg.member.id);
  }
  const msg_lowercase = msg.content.toLowerCase();
  if (
    msg.content.toLowerCase().includes("fuck") ||
    msg.content.toLowerCase().includes("nigg") ||
    msg.content.toLowerCase().includes(" ass ") ||
    msg_lowercase === "ass" || 
    msg_lowercase.includes ("asshole") ||
    msg_lowercase.includes ("pussy") 
  ) {
    await msg.channel.send(
      `We do not tolerate these kinds of words ${TagUser(
        msg.member.id
      )}. please don't use them again.`
    ).catch(err => console.error(err));;
    msg.delete();
  }
  if (msg.content == '?hello') {
    await msg.channel.send(`Hello, ${TagUser(msg.member.user.id)}!`).catch(err => console.error(err));;
  }
  if (msg.content == "?botstat") {
    await msg.channel.send(":white_check_mark: Bot is up and running.").catch(err => console.error(err));;
  }
});

bot.on("messageReactionAdd", (reaction, user) => {
  let limit = 5;
  if (
    reaction.emoji.name == "batmanarkhamlogo" &&
    reaction.count >= limit &&
    reaction.message.channel.id == "712397815506272287"
  )
    reaction.message.pin();
});

bot.on("guildMemberAdd", member => {
    member.roles.add("706590856668381285");
});

bot.on("messageDelete", msg => {
const channel = bot.channels.cache.get("734173675137531906");
channel.send("**DETAILS FOR THE MESSAGE SENT BY THE USER WITH ID " + msg.member.id + ":**");
channel.send("`Message Sent by: " + TagUser(msg.member.id) + "`");
channel.send("`Date sent: " + msg.createdAt.toString() + "`");
channel.send("`MESSAGE CONTENT: `" + " ```" + msg.content + "```");
});

bot.login('NzMzNzcyODgyOTY2MjE2ODY1.XxMGVg._WVoEHw9H9jz4x0z9LgYqwBcTqY'); // Get the bot to connect to Discord
