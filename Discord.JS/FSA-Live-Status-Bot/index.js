const Discord = require("discord.js");
const scraper = require('table-scraper');
const bot = new Discord.Client();
const settings = require('./settings.json');

// Call Info from Settings
const noticeChannel = settings.NOTICE_CHANNEL_ID;
const updateRateOnlineFlight = settings.UPDATE_RATE_ONLINE_FLIGHT_STATUS;
const updateRateTotalStatus = settings.UPDATE_RATE_TOTAL_STATUS;
const color = settings.COLOR;
const errorColor = settings.ERROR_CORLOR;
const vaId = settings.VA_ID;
const vaName = settings.VA_NAME;

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

let onlineFlight = [];
let MonthlyPilotStats = [];

bot.on("ready", () => {
    const automsgFSA = bot.channels.cache.get(`${noticeChannel}`);
    automsgFSA.bulkDelete(100)
    //FSAirlines Status
    setInterval(() => {
        scraper.get(`http://remote.fsairlines.net/v1/mpilotstats.php?rvi=${vaId}&title=off`)
        .then(function(monthStats) {
            MonthlyPilotStats = [];
            for(var i=0; i<monthStats.length;i++){
                var getstats = monthStats[i];
                MonthlyPilotStats.push(getstats);
            }
        })
        
    }, (updateRateTotalStatus * 1000 * 60) / 2)

    //Get Monthly Pilot Stats (Flights)
    const roadMonthlyFlights = new Discord.MessageEmbed() 
    .setColor(settings.greenColor)
    .setTitle(`🔎 FSA MONTHLY FLIGHTS INFO`)
    .setTimestamp()
    .setDescription('Roading Flight Status...')
    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
    automsgFSA.send(roadMonthlyFlights).then(msg => setInterval(()=>{
            const mStats = MonthlyPilotStats[1]
            if(!mStats) {
                const noMonthF = new Discord.MessageEmbed() 
                .setColor(errorColor)
                .setTitle(`🔎 FSA MONTHLY FLIGHTS INFO`)
                .setTimestamp()
                .setDescription('No Flight in This Month')
                .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                msg.edit(noMonthF);
            }
            else {
                const inMonthF = new Discord.MessageEmbed() 
                    .setColor(color)
                    .setTitle(`🔎 FSA MONTHLY FLIGHTS INFO TOP3`)
                    .setTimestamp()
                    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                    for(var i=0; i<mStats.length;i++){
                        inMonthF.addField(mStats[i].Pilot,`**🛬 Total Flights in Month :** ${mStats[i].Flights}`)
                    }
                    msg.edit(inMonthF);
            }
    }, updateRateTotalStatus * 1000 * 60))
    
    //Get Monthly Pilot Stats (Profit)
    const roadMonthlyProfit = new Discord.MessageEmbed() 
    .setColor(settings.greenColor)
    .setTitle(`🔎 FSA MONTHLY PROFIT INFO`)
    .setTimestamp()
    .setDescription('Roading Flight Status...')
    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
    automsgFSA.send(roadMonthlyProfit).then(msg => setInterval(()=>{
        const mStats = MonthlyPilotStats[2]
        if(!mStats) {
            const noMonthP = new Discord.MessageEmbed() 
            .setColor(errorColor)
            .setTitle(`🔎 FSA MONTHLY PROFIT INFO`)
            .setTimestamp()
            .setDescription('No Flight in This Month')
            .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
            msg.edit(noMonthP);
        }
        else {
            const inMonthP = new Discord.MessageEmbed() 
                .setColor(color)
                .setTitle(`🔎 FSA MONTHLY PROFIT INFO TOP3`)
                .setTimestamp()
                .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                for(var i=0; i<mStats.length;i++){
                    inMonthP.addField(mStats[i].Pilot,`**📊 Total Profit in Month :** ${mStats[i].Profit}`)
                }
                msg.edit(inMonthP);
        }
    }, updateRateTotalStatus * 1000 * 60))

    //Get Monthly Pilot Stats (Mile)
    const roadMonthlyMile = new Discord.MessageEmbed() 
    .setColor(settings.greenColor)
    .setTitle(`🔎 FSA MONTHLY MILE INFO`)
    .setTimestamp()
    .setDescription('Roading Flight Status...')
    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
    automsgFSA.send(roadMonthlyMile).then(msg => setInterval(()=>{
            const mStats = MonthlyPilotStats[3]
            if(!mStats) {
                const noMonthM = new Discord.MessageEmbed() 
                .setColor(errorColor)
                .setTitle(`🔎 FSA MONTHLY MILE INFO`)
                .setTimestamp()
                .setDescription('No Flight in This Month')
                .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                msg.edit(noMonthM);
            }
            else {
                const inMonthM = new Discord.MessageEmbed() 
                    .setColor(color)
                    .setTitle(`🔎 FSA MONTHLY MILE INFO TOP3`)
                    .setTimestamp()
                    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                    for(var i=0; i<mStats.length;i++){
                        inMonthM.addField(mStats[i].Pilot,`**📈 Total Mile in Month :** ${mStats[i].Distance}`)
                    }
                    msg.edit(inMonthM);
            }
    }, updateRateTotalStatus * 1000 * 60))
    //Get Monthly Pilot Stats (Hours)
    const roadMonthlyHours = new Discord.MessageEmbed() 
    .setColor(settings.greenColor)
    .setTitle(`🔎 FSA MONTHLY PROFIT INFO`)
    .setTimestamp()
    .setDescription('Roading Flight Status...')
    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
    automsgFSA.send(roadMonthlyHours).then(msg => setInterval(()=>{
            const mStats = MonthlyPilotStats[4]
            if(!mStats) {
                const noMonthH = new Discord.MessageEmbed() 
                .setColor(errorColor)
                .setTitle(`🔎 FSA MONTHLY HOURS INFO`)
                .setTimestamp()
                .setDescription('No Flight in This Month')
                .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                msg.edit(noMonthH);
            }
            else {
                const inMonthH = new Discord.MessageEmbed() 
                    .setColor(color)
                    .setTitle(`🔎 FSA MONTHLY HOURS INFO TOP3`)
                    .setTimestamp()
                    .setFooter(`* This message is updated every ${updateRateTotalStatus} minute. • Via FSAirlines`)
                    for(var i=0; i<mStats.length;i++){
                        inMonthH.addField(mStats[i].Pilot,`**⏲️ Total Hour in Month :** ${mStats[i].Hours}`)
                    }
                    msg.edit(inMonthH);
            }
    }, updateRateTotalStatus * 1000 * 60))

    //Get online Flights
    setInterval(() => {
        scraper.get(`https://remote.fsairlines.net/v1/flights_active.php?rvi=${vaId}&title=off`)
        .then(function(onlinePilot) {
            onlineFlight = [];
            for(var i=0; i<onlinePilot.length;i++){
                var getstats = onlinePilot[i];
                onlineFlight.push(getstats);
            }
        })
    }, (updateRateOnlineFlight/2) * 1000)
    const roadPilot = new Discord.MessageEmbed()
    .setColor(settings.greenColor)
    .setTitle(`🔎 ${vaName} FLIGHT INFO`)
    .setTimestamp()
    .setDescription('Roading Flight Status...')
    .setFooter(`* This message is updated every ${updateRateOnlineFlight} second. • Via FSAirlines`)
    automsgFSA.send(roadPilot).then(msg => setInterval(()=>{
        const onPilot = onlineFlight[0]
        if(!onPilot) {
            const noPilot = new Discord.MessageEmbed() 
            .setColor(errorColor)
            .setTitle(`🔎 ${vaName} FLIGHT INFO`)
            .setTimestamp()
            .setDescription('No Flight in FSAirlines')
            .setFooter(`* This message is updated every ${updateRateOnlineFlight} second. • Via FSAirlines`)
            msg.edit(noPilot);
        }
        else {
            const inPilot = new Discord.MessageEmbed() 
                .setColor(color)
                .setTitle(`🔎 ${vaName} FLIGHT INFO`)
                .setTimestamp()
                .setFooter(`* This message is updated every ${updateRateOnlineFlight} second. • Via FSAirlines`)
                for(var i=0; i<onPilot.length;i++){
                    inPilot.addField(onPilot[i].Pilot,`**✈️ Aircraft :** ${onPilot[i].Aircraft},   **🗺️ Route :** ${onPilot[i].Route}\n**💺 Pax :** ${onPilot[i].Pax},   **🚨 Cargo :** ${onPilot[i].Cargo},   **🛰️ Status :** ${onPilot[i].Status}`)
                }
                msg.edit(inPilot);
        }
    }, updateRateOnlineFlight * 1000))
});

bot.login(settings.BOT_TOKEN);
