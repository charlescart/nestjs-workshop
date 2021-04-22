import { Module } from '@nestjs/common';
import { ConfigModule } from './apis/config/config.module';
import { ConfigService } from './apis/config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './apis/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  static prefix: string;

  constructor(private readonly _ConfigService: ConfigService) {
    AppModule.port = this._ConfigService.get('PORT');
    AppModule.prefix = this._ConfigService.get('PREFIX');
  }
}
