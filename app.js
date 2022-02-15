const Discord = require('discord.js');
const config = require('./config.json');
const { parse_message } = require('./parser');
const colors = require('./colors.json');

/**
 * TODO: Ver do embeded para criar cada linha um jogador
 * TODO: Ver de como tornar data persistent entre servidores
 * TODO: Criar uma mensagem no inicio de cada dia (à 00:00)
 * TODO: Atribuir roles a quem estiver a vencer no dia
 * TODO: Criar persistent data/comportamento persistente entre dias
 */

const historyEmbed = new Discord.MessageEmbed()
    .setColor(colors.green)
    .setTitle("Current Status:");

const client = new Discord.Client({intents:[Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
    console.log("Ready to track!");
});

client.on("messageCreate", message => {
    if (message.author.bot) return;
    response = parse_message(message.content);
    // console.log(message.member.user);
    if (response) {
        message.guild.fetch(`${message.guild.id}`).then( guild => {
            console.log(guild);
            guild.members.fetch(message.member.user).then((user) => {
                message.channel.send({content:`${user.nickname} scored ${response}`, embeds: [historyEmbed]}).then(msg => console.log(`Received message: ${message.content}`)).catch(console.error);
            });
        });
    }
    return;
});

client.login(config.token);