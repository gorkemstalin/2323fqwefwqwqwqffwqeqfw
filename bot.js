const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.allah);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('810497712268509261'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\     STG

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:zeze0:810558849081671711>`,
            '1': `<a:zeze1:810558861168869396>`,
            '2': `<a:zeze2:810558872711987230>`,
            '3': `<a:zeze3:810558884342268014>`,
            '4': `<a:zeze4:810558895474999417>`,
            '5': `<a:zeze5:810558907780300870>`,
            '6': `<a:zeze6:810558920191115266>`,
            '7': `<a:zeze7:810558931289767977>`,
            '8': `<a:zeze8:810558944896090124>`,
            '9': `<a:zeze9:810558957441384458>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "810497713392975872");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil. <a:dikkat:810571451672690729>'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor. <a:emoji_164:810571450099695626> '
    moment.locale("tr");
    kanal.send(`
 \`•\` 🎉 West's Grove'ye hoş geldin <@`+ member + `>, hesabın \``+gecen+`\` tarihinde oluşturulmuş ve `+kontrol+`

     \`•\` Kayıt olmak için \`West's Grove\` odalarına geçip <@&810497712381493271> yetkilisine ses teyit vererek kayıt olabilirsin.

          \`•\` Sunucumuzun \`✭\` tagını kullanıcı adına ekleyerek ailemizin bir parçası olabilirsin.

     \`•\` Seninle beraber toplam `+üyesayısı+ ` kişi sayısına ulaştık ! Cansın Yavruum <3

\`•\` Sunucu kurallarımız <#810497713392975880> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.`)});
   

//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\     STG

//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "810497712268509261") 
     var rol = member.guild.roles.cache.get("810497712326705182") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG


//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('810497712180035614'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = "✭"; // Buraya Ekip Tag
  var ekipRolü = "810497712344137738"; // Buraya Ekip Rolünün ID
  var logKanali = "810497714638028825"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     STG    

client.on("guildMemberAdd", member => {
  let sunucuid = "810497712180035614"; //Buraya sunucunuzun IDsini yazın
  let tag = "✭"; //Buraya tagınızı yazın
  let rol = "810497712344137738"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'west-grove-chat'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza tagımızı almış bir şekilde katıldı, aramıza hoş geldin.`)
      .setTimestamp()
     client.channels.cache.get('810497714638028825').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     STG    

client.on("guildMemberAdd", async member => {
  member.setNickname('• İsim | Yaş')
  });


client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'tag') {//TAG
    lrowstagmesaj.channel.send('`✭`');
  }
});

client.on('ready', ()=>{
client.channels.cache.get('810497714365661184').join()
})