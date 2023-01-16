
const express = require('express');
const app = express();
const Discord = require('discord.js');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

var mysql = require('mysql');

var con = mysql.createConnection({
host: "oceaniaesports.gg",
user: "oceaniaesports_andrevc",
password: "OkWFTqN#QsT3",
database: "oceaniaesports_wp_rzepq"
});

con.connect(function(err) {
    if (err) throw err;
});

var tournamentid = "10587";



function CheckTournamentChannel() {
    con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+tournamentid+"' AND meta_key='edgtf_tournament_channel_leader'", function (err, result, fields) {
        if (err) throw err;
        if(result4.length>0){
            if(result[0].meta_value != ""){

            }else{

            }
        }else{

        }
        console.log(result);
        console.log("check if have channelid")
    });
}
//CheckTournamentChannel()

function CheckTournamentDate() {
    con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+tournamentid+"' AND meta_key='edgtf_tournament_date_meta'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        var tournamentdate = result[0].meta_value
        var date = new Date();
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        var todaydate=  yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
        console.log(tournamentdate+ " " +todaydate)
        if(tournamentdate > todaydate){
            GetTournament()
        }else{
            console.log("Old Tournament")
        }
    });
}

function CheckTest() {
     onsole.log("Old Tournament");
}

function GetTournament() {
    //let role = message.guild.roles.find(r => r.name == 'Community')
    // Get role with ID
    //const roleToGive = message.guild.roles.cache.get("123456789123456789")

    // Find role with name
    //const roleToGive = message.guild.roles.cache.find(role => role.name === "Member")
    //Get tournament Size

    

    con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+tournamentid+"' AND meta_key='edgtf_tournament_team_size'", function (err, result, fields) {
        if (err) throw err;
        var tournamentsize = result[0].meta_value
        if (tournamentsize > 1){
            //console.log("TeamSize " + tournamentsize);
            con.query("SELECT * FROM `tournament_team` WHERE tournamentid='"+tournamentid+"'", function (err1, result1, fields) {
                if (err1) throw err1;
                result1.forEach(data => {
                    var teamid = data.teamid;
                    //console.log("teamid " + teamid);
                    con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+teamid+"' AND meta_key='edgtf_team_leader'", function (err2, result2, fields) {
                        if (err2) throw err2;
                        var teamleader = result2[0].meta_value
                        con.query("SELECT * FROM `tournament_player` WHERE tournamentid='"+tournamentid+"' AND teamid='"+teamid+"'", function (err3, result3, fields) {
                            if (err3) throw err3;
                            result3.forEach(data2 => {
                                var playerid = data2.playerid;
                                var playerpostid = data2.playerpostid;
                                //console.log("playerid " + playerid + " - " + "playerpostid " + playerpostid);
                                con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+playerpostid+"' AND meta_key='edgtf_player_discordid'", function (err4, result4, fields) {
                                    if (err4) throw err4;
                                    if(result4.length>0){
                                        var discordid = result4[0].meta_value
                                        //console.log(discordid);
                                        if(discordid != ""){
                                            if(playerid == teamleader){
                                                console.log("########################## " + discordid);
                                            }
                                        }
                                    }
                                });
                            });
                            
                        });
                    });
                });
            });
        }
    });
}

//CheckTournamentDate()

//{"config":{"id":"964983389801304096","channelid":"964982449685811340"},"streamers":[{"live":"no","channel":"radical_fps","url":"https://www.twitch.tv/radical_fps","desciption":"Public Scrims - pab6eab0 / AC Valhalla","game":"Apex Legends","platform":"Twitch"},{"live":"no","channel":"jesusofsyn","url":"https://www.twitch.tv/jesusofsyn","desciption":"test stream, im coming back to streaming","game":"Just Chatting","platform":"Twitch"},{"live":"no","channel":"acesukie","url":"https://www.twitch.tv/acesukie","desciption":"immortal b4 act ends? !social !sens","game":"VALORANT","platform":"Twitch"},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""},{"live":"","channel":"","url":"","desciption":"","game":"","platform":""}]}

const intents = ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_BANS", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGE_REACTIONS"];
const client = new Discord.Client({intents: intents, ws:{intents: intents}});
let embedid = 0;

client.on('ready', client => {

    // let guild = client.guilds.cache.get("821898888130461736")
    // const Role = guild.roles.cache.get("1005696351398527097"); // valorant-tournament
    // Role.members.forEach((member, i) => { 
    //         member.roles.remove(Role);
    // });
    // //var user = guild.users.find(user => user.id === '965519380752510989')
    // const user = client.guilds.cache.get("821898888130461736").members.cache.get("501280301767720970")
    // user.roles.add(Role);

    //  const thread = client.channels.cache.find(x => x.name === "tournament-leader-10587");
    //  const user = client.guilds.cache.get("821898888130461736").members.cache.get("965519380752510989")


    // thread.permissionOverwrites.set([
    //     { 
    //         id: "821898888130461736",
    //         allow: ['READ_MESSAGE_HISTORY'],
    //         deny: ["VIEW_CHANNEL"],
    //         },
    //         {
    //             id: "1005696351398527097",
    //             allow: ["VIEW_CHANNEL"],
    //         },
    // ]);

    
    //thread.permissionsFor("965519380752510989");

    // guild.roles.create({
    //     data: {
    //         name: 'Valorant Tournament',
    //         color: 'BLUE',
    //     },
    //     reason: 'Player in valorant tournament',
    // })

    

})

client.on('message', message => {

    //member.addRole(role)
    //member.roles.add(role);

    if(message.member.roles.cache.some(x => x.id == "828023642771947580")){
        const firstletter = message.content.slice(0, 1);
        var prefix = "!"; 
        if (firstletter == prefix){
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            console.log(args.length)
            var botname = 'Tournament-leader-'+ args[0];
            // if ((message.guild.channels.cache.find(c => c.name.toLowerCase() === botname))) {
            //     console.log("nao existe")
            // }
            if(command == "tournament"){
                if(args.length == 1){
                    console.log(command);
                    console.log(args[0]);

                    const thread = client.channels.cache.find(x => x.name === botname);
                    if(thread == undefined){ //Varifica se channal existe

                        //Vai verificar se tournament ja passou
                        con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+tournamentid+"' AND meta_key='edgtf_tournament_date_meta'", function (err, result, fields) {
                            if (err) throw err;
                            //console.log(result);
                            var tournamentdate = result[0].meta_value
                            var date = new Date();
                            var yyyy = date.getFullYear().toString();
                            var mm = (date.getMonth()+1).toString();
                            var dd  = date.getDate().toString();
                            var mmChars = mm.split('');
                            var ddChars = dd.split('');
                            var todaydate=  yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
                            console.log(tournamentdate+ " " +todaydate)
                            if(tournamentdate > todaydate){ 
                                //Vai criar o Channel
                                message.guild.channels.create(botname, { 
                                    type: 'text', 
                                    permissionOverwrites: [
                                        { 
                                            id: message.guild.id,
                                            allow: ['READ_MESSAGE_HISTORY'],
                                            deny: ["VIEW_CHANNEL"],
                                            },
                                            {
                                                id: "1005696351398527097",
                                                allow: ["VIEW_CHANNEL"],
                                            },
                                    ]
                                }).then(
                                    channell=> {
                                        channell.setParent("981851768621256714");

                                        channell.permissionOverwrites.set([
                                            { 
                                                id: "821898888130461736",
                                                allow: ['READ_MESSAGE_HISTORY'],
                                                deny: ["VIEW_CHANNEL"],
                                                },
                                                {
                                                    id: "1005696351398527097",
                                                    allow: ["VIEW_CHANNEL"],
                                                },
                                        ]);


                                        //let guildd = client.guilds.cache.find(c => c.id === "821898888130461736");

                                        const Role1 = message.guild.roles.cache.get("1005696351398527097"); // valorant-tournament
                                        const Role2 = message.guild.roles.cache.get("1005696676398379128"); // valorant-leader-tournament
                                        // Role1.members.forEach((member, i) => { 
                                        //         member.roles.remove(Role1);
                                        // });
                                        //var user = guild.users.find(user => user.id === '965519380752510989')
                                        
                                        con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+tournamentid+"' AND meta_key='edgtf_tournament_team_size'", function (err, result, fields) {
                                            if (err) throw err;
                                            var tournamentsize = result[0].meta_value
                                            if (tournamentsize > 1){
                                                //console.log("TeamSize " + tournamentsize);
                                                con.query("SELECT * FROM `tournament_team` WHERE tournamentid='"+tournamentid+"'", function (err1, result1, fields) {
                                                    if (err1) throw err1;
                                                    result1.forEach(data => {
                                                        var teamid = data.teamid;
                                                        //console.log("teamid " + teamid);
                                                        con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+teamid+"' AND meta_key='edgtf_team_leader'", function (err2, result2, fields) {
                                                            if (err2) throw err2;
                                                            var teamleader = result2[0].meta_value
                                                            con.query("SELECT * FROM `tournament_player` WHERE tournamentid='"+tournamentid+"' AND teamid='"+teamid+"'", function (err3, result3, fields) {
                                                                if (err3) throw err3;
                                                                result3.forEach(data2 => {
                                                                    var playerid = data2.playerid;
                                                                    var playerpostid = data2.playerpostid;
                                                                    //console.log("playerid " + playerid + " - " + "playerpostid " + playerpostid);
                                                                    con.query("SELECT * FROM `bsI1yvR_postmeta` WHERE post_id='"+playerpostid+"' AND meta_key='edgtf_player_discordid'", function (err4, result4, fields) {
                                                                        if (err4) throw err4;
                                                                        if(result4.length>0){
                                                                            var discordid = result4[0].meta_value
                                                                            //const user = message.guild.members.cache.get(discordid)
                                                                            const user = client.users.cache.get(discordid);
                                                                            //var user = message.guild.members.cache.find(user => user.id === discordid)
                                                                            if (user != undefined){
                                                                                user.roles.add(Role1);
                                                                                console.log(discordid);
                                                                                if(discordid != ""){
                                                                                    if(playerid == teamleader){
                                                                                        user.roles.add(Role2);
                                                                                        console.log("########################## " + discordid);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                });
                                                                
                                                            });
                                                        });
                                                    });
                                                });
                                            }
                                        });
                                    }
                                )
                                //const thread2 = client.channels.cache.find(x => x.name === botname);//get Channel ID
                                //console.log(thread2.id)
                            }else{ // Tournament ja passou
                                console.log("Old Tournament")
                            }
                        });
                    }
                    //let channelid = message.guild.channels.cache.find(r => r.name == botname)
                    //console.log(channelid);
                }else{
                    console.log("Required 1 property")
                }
            }
        }
    }
});

client.login('OTY1NTE0NDkxMzE4MTIwNDc4.GE2HjN.d2f21eMSpa-WvfKfI9-4QeekhRkn4MLcIQ28ZA');