import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService1 } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService1],
})
export class AppModule {}
