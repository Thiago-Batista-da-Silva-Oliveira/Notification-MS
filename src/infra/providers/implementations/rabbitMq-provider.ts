import amqp from 'amqplib';
import { rabbitMq } from 'src/config/rabbitMq';
import { IRabbitMqProvider } from '../models/rabbitMq-repository';

class RabbitMqProvider implements IRabbitMqProvider {
  channel;
  async createChannel() {
    const connection = await amqp.connect(rabbitMq.url);
    this.channel = await connection.createChannel();
  }

  async consume(exchangeName: string) {
    if (!this.channel) {
      await this.createChannel();
    }

    console.log(exchangeName);

    const exchange = rabbitMq.exchangeName.find(
      (data) => data.name === exchangeName,
    );

    if (!exchange) {
      throw new Error('Exchange not found');
    }

    await this.channel.assertExchange(exchange, 'direct');

    const q = await this.channel.assertQueue(exchange.queue);

    await this.channel.bindQueue(q.queue, exchange.name, 'info');

    this.channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content);

      console.log(data);
      this.channel.ack(msg);
    });
  }
}

export { RabbitMqProvider };
