import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

function DatabaseWithConfigModule(): DynamicModule {
  const { envs } = new ConfigService();
  return MongooseModule.forRoot(envs.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
  });
}
@Global()
@Module({
  imports: [ConfigModule, DatabaseWithConfigModule()],
})
export class DatabaseModule {}
