const {Client} = require("discord.js");
const { prefix, token } = require('./config.json');
const client = new Client();



client.on("ready", () => {
    console.log("BOT LISTO");
    client.user.setActivity('Actividad', { type: 'PLAYING' /*Puede ser cualquiera*/ });
 });
 
 client.on("message", (message) => {
  
  if (message.content.startsWith(`${prefix}an`)) {
    
    message.channel.send('**:diamond_shape_with_a_dot_inside: Introduzca el mensaje ha anunciar**').then(() => {
      const filter = m => message.author.id === m.author.id;
    
      message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
        .then(messages => {
          message.channel.send(`**Tu mensaje enviado fue:** ${messages.first().content}`);
          const channel = client.channels.cache.get(''/*Colocar el ID del canal que quieres que se diriga*/);
          channel.send(`${messages.first().content} @everyone`).then(sentMessage => {
            sentMessage.react('✅'); /*Reacciones preterminadas*/
            sentMessage.react('👀'); /*Reacciones preterminadas, las puedes cambiar*/
            
          });
        })
        .catch(() => {
          message.channel.send('No escribiste ningun mensaje');
        });
    });

   }
 
 });

 client.login(token) /*El token se encuentra en el config.json,pon el de tu bot*/;