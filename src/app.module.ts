import { Module } from '@nestjs/common';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [RoomsModule],
})
export class AppModule {}
