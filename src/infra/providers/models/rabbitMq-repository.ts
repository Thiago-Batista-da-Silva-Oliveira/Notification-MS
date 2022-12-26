export abstract class IRabbitMqProvider {
  abstract createChannel();
  abstract consume(exchangeName: string);
}
