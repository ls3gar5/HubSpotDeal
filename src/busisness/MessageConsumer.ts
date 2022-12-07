import amqp from 'amqplib';

(async () => { 
    const rabbitSetting ={
        hostname: 'localhost',
        username:'guest',
        password:'guest'
      }
      const queue = 'employees';
      const msg = {"firstName": "Pepe 2"};
    
      try {
    
        // CREATE A CONNECTION
        const connect = await amqp.connect(rabbitSetting);
        console.log("Connection Created...");
    
        //CREATE A CHANNEL
        const channel = await connect.createChannel();
        console.log("Channel Created...");
    
        // CREATE QUEUE IF NOT EXIST
        await channel.assertQueue(queue);
    
        console.log("Waiting for messages... ");
        let message = '';
        channel.consume(queue, (currentMsj) => {
          message = JSON.parse(currentMsj.content.toString());
          console.log(message);
          channel.ack(currentMsj);
        });
    
        return message;
         
      } catch (error) {
        console.error(error);
      }
})();