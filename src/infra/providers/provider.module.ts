import { Module } from '@nestjs/common';
import { RabbitMqProvider } from './implementations/rabbitMq-provider';
import { IRabbitMqProvider } from './models/rabbitMq-repository';

@Module({
  providers: [
    {
      provide: IRabbitMqProvider,
      useClass: RabbitMqProvider,
    },
  ],
})
export class ProviderModule {}
