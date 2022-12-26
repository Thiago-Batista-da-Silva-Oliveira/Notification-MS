export const rabbitMq = {
  url: 'amqp://localhost',
  exchangeName: [
    {
      name: 'notification',
      queue: 'notification',
    },
  ],
};
