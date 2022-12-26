export const rabbitMq = {
  url: 'amqp://localhost:5673',
  exchangeName: [
    {
      name: 'notification',
      queue: 'notification',
    },
  ],
};
