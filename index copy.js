
const express = require('express');
const app = express();
const Discord = require('discord.js');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

//{"config":{"id":"964983389801304096","channelid":"964982449685811340"},"streamers":[{"live":"no","channel":"radical_fps","url":"https://www.twitch.tv/radical_fps","desciption":"Public Scrims - pab6eab0 / AC Valhalla","game":"Apex Legends","platform":"Twitch"},{"live":"no","channel":"jesusofsyn","url":"https://www.twitch.tv/jesusofsyn","desciption":"test stream, im coming back to streaming","game":"Just Chatting","platform":"Twitch"},{"live":"no","channel":"acesukie","url":"https://www.twitch.tv/acesukie","desciption":"immortal b4 act ends? !social !sens","game":"VALORANT","platform":"Twitch"},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""}]}

const intents = ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_BANS", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGE_REACTIONS"];
const client = new Discord.Client({intents: intents, ws:{intents: intents}});
let embedid = 0;

client.on('ready', client => {

    guild.roles.create({
        data: {
            name: 'Valorant Tournament',
            color: 'BLUE',
        },
        reason: 'Player in valorant tournament',
    })

    let warns = JSON.parse(fs.readFileSync("./embed.json", "utf8"))
    var embedid = warns.config.id;

    // Coloca todos como offline
    for (let i = 0; i < warns.streamers.length; i++) {
        warns.streamers[i].live = "no";//save json new data
        fs.writeFileSync("./embed.json", JSON.stringify(warns), (err) => {
            if (err) console.error(err)
        })     
    }

    if(!embedid){ //check if any id registered or first time

        //Initial Embed
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('https://oceaniaesports.gg/streamers/')
        .setURL('https://oceaniaesports.gg/streamers/')
        .setAuthor('Oceania Streamers', 'https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png','https://oceaniaesports.gg/streamers/')
        .setDescription('List with last ten streamers online. (new streamers will be added to our website automatically).')
        .setThumbnail('https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png')
        .addFields(
        )
        //.addField('Inline field title', 'Some value here', true)
        .setImage('https://cdn.discordapp.com/attachments/877087863488016384/964623475274829884/streamers.png')
        .setTimestamp()
        .setFooter('Last Update','https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png');  
        for (let i = 0; i < warns.streamers.length; i++) {
            if(warns.streamers[i].channel){
                var desc = warns.streamers[i].desciption + "\n" + warns.streamers[i].url + "\n 🎮" + warns.streamers[i].game;
                if (warns.streamers[i].live == "yes"){
                    var dtitle =  "▶️ " + warns.streamers[i].channel + " is live! 🚩";
                }else{
                    var dtitle =  "▶️ " + warns.streamers[i].channel;
                }
                exampleEmbed.addField(dtitle, desc, false)
            }
        }
        //Send embed and save id
        client.channels.cache.get(warns.config.channelid).send({ embeds: [exampleEmbed] })
        .then(async msg => {
            warns.config.id = msg.id;//save json new data
            fs.writeFileSync("./embed.json", JSON.stringify(warns), (err) => {
                if (err) console.error(err)
            });
        })
    }
    else{
        const exampleEmbed2 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('https://oceaniaesports.gg/streamers/')
        .setURL('https://oceaniaesports.gg/streamers/')
        .setAuthor('Oceania Streamers', 'https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png','https://oceaniaesports.gg/streamers/')
        .setDescription('All stream channels will be added to our website.')
        .setThumbnail('https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png')
        .setImage('https://oceaniaesports.gg/wp-content/uploads/2022/04/streamers.png')
        .setTimestamp()
        .setFooter('Last Update','https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png');  
        for (let i = 0; i < warns.streamers.length; i++) {
            if(warns.streamers[i].channel){
                var desc = warns.streamers[i].desciption + "\n" + warns.streamers[i].url + "\n 🎮" + warns.streamers[i].game;
                if (warns.streamers[i].live == "yes"){
                    var dtitle =  "▶️ " + warns.streamers[i].channel + " is live! 🚩";
                }else{
                    var dtitle =  "▶️ " + warns.streamers[i].channel;
                }
                exampleEmbed2.addField(dtitle, desc, false)
            }
        }
        const embedMessage = client.channels.cache.get(warns.config.channelid).messages.fetch({ around: warns.config.id, limit: 1 })
        .then(async msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit({ embeds: [exampleEmbed2] });
        })
    }
})


client.on("presenceUpdate", (oldPresence, newPresence) => {

    var streaming = "no";
    var was_streaming = "no";
    var channel = "";
    var channelurl = "";
    var sdesciption = "";
    var sgame = "";
    var splatform = "";
    var live = "";

    var was_playing = "no";
    var old_game = "";
    var playing = "no";
    var game = "";

    var mytype = "";

    
    if (newPresence.activities.length > 0) {
        newPresence.activities.forEach(activity => {
            if (activity.type == "STREAMING") {
                mytype = "streaming";
                streaming = "yes";
                sgame = activity.state;
                sdesciption = activity.details;
                splatform = activity.name;
                channelurl=activity.url;
                if(splatform == "Twitch"){
                    channel=activity.url.slice(22);
                }
                if(splatform == "YouTube"){
                    channel=activity.url.slice(32);
                }
                if(splatform != "YouTube" && splatform != "Twitch"){
                    channel=newPresence.user.tag;
                    console.log(activity);
                }
            };
            if (activity.type == "PLAYING") {
                if(newPresence.activities[0].name == "VALORANT"){
                    playing = "yes";
                    game = "VALORANT";
                }
                if(newPresence.activities[0].name == "Apex Legends"){
                    playing = "yes";
                    game = "Apex Legends";
                }
                if(newPresence.activities[0].name == "League of Legends"){
                    playing = "yes";
                    game = "League of Legends";
                }
                if(newPresence.activities[0].name == "Fortnite"){
                    playing = "yes";
                    game = "Fortnite";
                }
                if(newPresence.activities[0].name == "Counter-Strike: Global Offensive"){
                    playing = "yes";
                    game = "Counter-Strike: Global Offensive";
                }
                if(newPresence.activities[0].name == "Dota 2"){
                    playing = "yes";
                    game = "Dota 2";
                }
                if(newPresence.activities[0].name == "ROBLOX"){
                    playing = "yes";
                    game = "ROBLOX";
                }
                if(newPresence.activities[0].name == "Minecraft"){
                    playing = "yes";
                    game = "Minecraft";
                }
            };
        });
    }

    if (oldPresence) {
        if (oldPresence.activities.length > 0) {
            oldPresence.activities.forEach(activity => {
                //console.log(activity.type);
                if (activity.type == "STREAMING") {
                    //console.log("old");
                    //console.log(activity);
                    was_streaming = "yes";
                    splatform = activity.name;
                    if(splatform == "Twitch"){
                        channel=activity.url.slice(22);
                    }
                    if(splatform == "YouTube"){
                        channel=activity.url.slice(32);
                    }
                    if(splatform != "YouTube" && splatform != "Twitch"){
                        channel=newPresence.user.tag;
                        console.log(activity);
                    }
                    //channel=activity.url.slice(22);
                };
                if (activity.type == "PLAYING") {
                    if(oldPresence.activities[0].name == "VALORANT"){
                        was_playing = "yes";
                        old_game = "VALORANT";
                    }
                    if(oldPresence.activities[0].name == "Apex Legends"){
                        was_playing = "yes";
                        old_game = "Apex Legends";
                    }
                    if(oldPresence.activities[0].name == "League of Legends"){
                        was_playing = "yes";
                        old_game = "League of Legends";
                    }
                    if(oldPresence.activities[0].name == "Fortnite"){
                        was_playing = "yes";
                        old_game = "Fortnite";
                    }
                    if(oldPresence.activities[0].name == "Counter-Strike: Global Offensive"){
                        was_playing = "yes";
                        old_game = "Counter-Strike: Global Offensive";
                    }
                    if(oldPresence.activities[0].name == "Dota 2"){
                        was_playing = "yes";
                        old_game = "Dota 2";
                    }
                    if(oldPresence.activities[0].name == "ROBLOX"){
                        was_playing = "yes";
                        old_game = "ROBLOX";
                    }
                    if(oldPresence.activities[0].name == "Minecraft"){
                        was_playing = "yes";
                        old_game = "Minecraft";
                    }
                };
            });
        }
    }
   
    if (was_playing == "yes"){
        if ((playing == "yes" && old_game != game) || playing == "no" ){
            let guild = oldPresence.guild;
            if (oldPresence.activities[0].name == "VALORANT"){
                let playRole = guild.roles.cache.get("930006237754564648");
                oldPresence.member.roles.remove(playRole);
            }
            if (oldPresence.activities[0].name == "Apex Legends"){
                let playRole = guild.roles.cache.get("930016708578660392");
                oldPresence.member.roles.remove(playRole);   
            }
            if (oldPresence.activities[0].name == "League of Legends"){
                let playRole = guild.roles.cache.get("930016437534326805");
                oldPresence.member.roles.remove(playRole);   
            }
            if (oldPresence.activities[0].name == "Fortnite"){
                let playRole = guild.roles.cache.get("962279370666409994");
                oldPresence.member.roles.remove(playRole);   
            }
            if (oldPresence.activities[0].name == "Counter-Strike: Global Offensive"){
                let playRole = guild.roles.cache.get("930016871338631168");
                oldPresence.member.roles.remove(playRole);   
            }
            if (oldPresence.activities[0].name == "Dota 2"){
                let playRole = guild.roles.cache.get("930017110959226891");
                oldPresence.member.roles.remove(playRole);   
            }
            if (oldPresence.activities[0].name == "ROBLOX"){
                let playRole = guild.roles.cache.get("962463684309970954");
                oldPresence.member.roles.remove(playRole);   
            }
            if (oldPresence.activities[0].name == "Minecraft"){
                let playRole = guild.roles.cache.get("962462859139362898");
                oldPresence.member.roles.remove(playRole);   
            }
            console.log(`${oldPresence.user.tag} Stop playing ${oldPresence.activities[0].name}.`);
        }
    }
    
    if (playing == "yes"){
        if ((was_playing == "yes" && old_game != game) || was_playing == "no" ){
            let guild = newPresence.guild;
            if (newPresence.activities[0].name == "VALORANT"){
                let playRole = guild.roles.cache.get("877113059943018537");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("930006237754564648");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "Apex Legends"){
                let playRole = guild.roles.cache.get("877101270882738176");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("930016708578660392");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "League of Legends"){
                let playRole = guild.roles.cache.get("877112791138459672");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("930016437534326805");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "Fortnite"){//Counter-Strike: Global Offensive ROBLOX Minecraft Overwatch Dota 2 Rocket League Call of Duty World of warcraft text.includes("worldd") true/false
                let playRole = guild.roles.cache.get("962280019340709938");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("962279370666409994");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "Counter-Strike: Global Offensive"){
                let playRole = guild.roles.cache.get("924815110835437568");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("930016871338631168");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "Dota 2"){
                let playRole = guild.roles.cache.get("924816586261536798");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("930017110959226891");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "ROBLOX"){
                let playRole = guild.roles.cache.get("962463871942144040");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("962463684309970954");
                newPresence.member.roles.add(playRole2);
            }
            if (newPresence.activities[0].name == "Minecraft"){
                let playRole = guild.roles.cache.get("962463144746319963");
                newPresence.member.roles.add(playRole);
                let playRole2 = guild.roles.cache.get("962462859139362898");
                newPresence.member.roles.add(playRole2);
            }
            console.log(`${newPresence.user.tag} is playing ${newPresence.activities[0].name}.`);
        }
    }
    

    if (was_streaming == "yes" && streaming == "no"){

        console.log("");
        console.log(" ########## ----------- Stop Stream");
        // Set live to no on json
        let warns = JSON.parse(fs.readFileSync("./embed.json", "utf8"))
        for (let i = 0; i < warns.streamers.length; i++) {
            if (warns.streamers[i].channel == channel){
                warns.streamers[i].live = "no";//save json new data
                fs.writeFileSync("./embed.json", JSON.stringify(warns), (err) => {
                    if (err) console.error(err)
                });     
            }
        }
        // Update Embed
        const exampleEmbed2 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('https://oceaniaesports.gg/streamers/')
        .setURL('https://oceaniaesports.gg/streamers/')
        .setAuthor('Oceania Streamers', 'https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png','https://oceaniaesports.gg/streamers/')
        .setDescription('List with last ten streamers online. (new streamers will be added to our website automatically).')
        .setThumbnail('https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png')
        .setImage('https://oceaniaesports.gg/wp-content/uploads/2022/04/streamers.png')
        .setTimestamp()
        .setFooter('Last Update','https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png');  
        for (let i = 0; i < warns.streamers.length; i++) {
            if(warns.streamers[i].channel){
                var desc = warns.streamers[i].desciption + "\n" + warns.streamers[i].url + "\n 🎮" + warns.streamers[i].game;
                if (warns.streamers[i].live == "yes"){
                    var dtitle =  "▶️ " + warns.streamers[i].channel + " is live! 🚩";
                }else{
                    var dtitle =  "▶️ " + warns.streamers[i].channel;
                }
                exampleEmbed2.addField(dtitle, desc, false)
            }
        }
        console.log("display embed");

        const embedMessage = client.channels.cache.get(warns.config.channelid).messages.fetch({ around: warns.config.id, limit: 1 })
        .then(async msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit({ embeds: [exampleEmbed2] });
        })
        console.log(`${oldPresence.user.tag} stop streaming.`);
    }

    if(streaming == "yes" && was_streaming == "no"){
        console.log("");
        console.log(" ########## ----------- New Stream");
        let warns = JSON.parse(fs.readFileSync("./embed.json", "utf8"))

        let checklist = 0;
        //Caso esteja na list
        for (let i = 0; i < warns.streamers.length; i++) 
        {
            if (warns.streamers[i].channel == channel)
            {
                let position = i;
                if(position == "1"){ //se tiver no primeiro so atualiza
                    warns.streamers[0].live = "yes";
                    warns.streamers[0].channel = channel;
                    warns.streamers[0].url = channelurl;
                    warns.streamers[0].desciption = sdesciption;
                    warns.streamers[0].game = sgame;
                    warns.streamers[0].platform = splatform;
                    fs.writeFileSync("./embed.json", JSON.stringify(warns), (err) => {
                        if (err) console.error(err)
                    });  
                }
                else //Update a partir de onde o canal estava
                {
                    for (let z = position; z > 0; z--) {
                        let xy = z - 1;//2
                        warns.streamers[z].live = warns.streamers[xy].live;
                        warns.streamers[z].channel = warns.streamers[xy].channel;
                        warns.streamers[z].url = warns.streamers[xy].url;
                        warns.streamers[z].desciption = warns.streamers[xy].desciption;
                        warns.streamers[z].game = warns.streamers[xy].game;
                        warns.streamers[z].platform = warns.streamers[xy].platform;
                    }
                    warns.streamers[0].live = "yes";
                    warns.streamers[0].channel = channel;
                    warns.streamers[0].url = channelurl;
                    warns.streamers[0].desciption = sdesciption;
                    warns.streamers[0].game = sgame;
                    warns.streamers[0].platform = splatform;
                    fs.writeFileSync("./embed.json", JSON.stringify(warns), (err) => {
                        if (err) console.error(err)
                    });  
                }
                const exampleEmbed2 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('https://oceaniaesports.gg/streamers/')
                .setURL('https://oceaniaesports.gg/streamers/')
                .setAuthor('Oceania Streamers', 'https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png','https://oceaniaesports.gg/streamers/')
                .setDescription('List with last ten streamers online. (new streamers will be added to our website automatically).')
                .setThumbnail('https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png')
                .setImage('https://oceaniaesports.gg/wp-content/uploads/2022/04/streamers.png')
                .setTimestamp()
                .setFooter('Last Update','https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png');  
                for (let i = 0; i < warns.streamers.length; i++) {
                    if(warns.streamers[i].channel){
                        var desc = warns.streamers[i].desciption + "\n" + warns.streamers[i].url + "\n 🎮" + warns.streamers[i].game;
                        if (warns.streamers[i].live == "yes"){
                            var dtitle =  "▶️ " + warns.streamers[i].channel + " is live! 🚩";
                        }else{
                            var dtitle =  "▶️ " + warns.streamers[i].channel;
                        }
                        exampleEmbed2.addField(dtitle, desc, false)
                    }
                }
                const embedMessage = client.channels.cache.get(warns.config.channelid).messages.fetch({ around: warns.config.id, limit: 1 })
                .then(async msg => {
                    const fetchedMsg = msg.first();
                    fetchedMsg.edit({ embeds: [exampleEmbed2] });
                })
                checklist++;
            }
        }
        if (checklist == 0)
        { //Caso seja a primeira vez
            for (let z = 9; z > 0; z--) {
                let xy = z - 1;//2
                warns.streamers[z].live = warns.streamers[xy].live;
                warns.streamers[z].channel = warns.streamers[xy].channel;
                warns.streamers[z].url = warns.streamers[xy].url;
                warns.streamers[z].desciption = warns.streamers[xy].desciption;
                warns.streamers[z].game = warns.streamers[xy].game;
                warns.streamers[z].platform = warns.streamers[xy].platform;
            }
            warns.streamers[0].live = "yes";
            warns.streamers[0].channel = channel;
            warns.streamers[0].url = channelurl;
            warns.streamers[0].desciption = sdesciption;
            warns.streamers[0].game = sgame;
            warns.streamers[0].platform = splatform;
            fs.writeFileSync("./embed.json", JSON.stringify(warns), (err) => {
                if (err) console.error(err)
            });  
            const exampleEmbed2 = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('https://oceaniaesports.gg/streamers/')
            .setURL('https://oceaniaesports.gg/streamers/')
            .setAuthor('Oceania Streamers', 'https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png','https://oceaniaesports.gg/streamers/')
            .setDescription('List with last ten streamers online. (new streamers will be added to our website automatically).')
            .setThumbnail('https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png')
            .setImage('https://oceaniaesports.gg/wp-content/uploads/2022/04/streamers.png')
            .setTimestamp()
            .setFooter('Last Update','https://oceaniaesports.gg/wp-content/uploads/2021/07/logowebsite.png');  
            for (let i = 0; i < warns.streamers.length; i++) {
                if(warns.streamers[i].channel){
                    var desc = warns.streamers[i].desciption + "\n" + warns.streamers[i].url + "\n 🎮" + warns.streamers[i].game;
                    if (warns.streamers[i].live == "yes"){
                        var dtitle =  "▶️ " + warns.streamers[i].channel + " is live! 🚩";
                    }else{
                        var dtitle =  "▶️ " + warns.streamers[i].channel;
                    }
                    exampleEmbed2.addField(dtitle, desc, false)
                }
            }
            const embedMessage = client.channels.cache.get(warns.config.channelid).messages.fetch({ around: warns.config.id, limit: 1 })
            .then(async msg => {
                const fetchedMsg = msg.first();
                fetchedMsg.edit({ embeds: [exampleEmbed2] });
            })
        }

        //client.channels.cache.get("877087863488016384").send(`${newPresence.user.tag} is streaming at ${channelurl}.`);
        console.log(`${newPresence.user.tag} is streaming at ${channelurl}.`);
        
        //Seva or Update channel on our website
        var XMLHttpRequest = require('xhr2');
        var xhr = new XMLHttpRequest();

        var url = "https://oceaniaesports.gg/twitch_add2.php?c=" + channel;
        console.log(url);
        xhr=new XMLHttpRequest();
        xhr.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                if(this.responseText == 1){
                    console.log('channel added!');  
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
});


client.login('OTI4NTYzNDcxNjc3Nzk2Mzkz.YdamHw.-qAWM64ZoLdtk_hKPAAGuAxhUbs');