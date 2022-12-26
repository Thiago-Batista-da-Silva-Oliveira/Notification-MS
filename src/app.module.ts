import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { ProviderModule } from '@infra/providers/provider.module';

@Module({
  imports: [HttpModule, DatabaseModule, ProviderModule],
})
export class AppModule {}
