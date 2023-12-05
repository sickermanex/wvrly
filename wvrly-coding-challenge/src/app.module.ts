import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataEntity } from './db/entities/user_data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 15432,
      username: 'root',
      password: 'root',
      database: 'waverley',
      entities: [
        UserDataEntity
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserDataEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
