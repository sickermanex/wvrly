import { Injectable } from '@nestjs/common';
import { UserDataEntity } from './db/entities/user_data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(UserDataEntity)
    private usersRepository: Repository<UserDataEntity>,
  ) {}

  async getAll(): Promise<UserDataEntity[]> {
    return await this.usersRepository.find();
  }

  async postUserData(userData: Partial<UserDataEntity>): Promise<UserDataEntity> {
    const {
      name,
      lastname,
      lat,
      lon,
      email,
      phone
    } = userData;
    
    const sql = `
      INSERT INTO user_data (name, lastname, lat, lon, geom_point, email, phone)
      VALUES (
        '${name}',
        '${lastname}',
        ${lat},
        ${lon},
        ST_SetSRID(
          ST_MakePoint(
               ${lon}::double precision,
               ${lat}::double precision
          ), 4326),
        '${email}',
        '${phone}'
      )
      RETURNING id
    `;
    
    // const user = await this.usersRepository.create(userData)
    const user = await this.usersRepository.query(sql);

    console.log(user);
    

    return await this.usersRepository.findOneBy(user);
  }

  async getData(lat, lon, radio) : Promise<UserDataEntity[]> {
    const users = await this.usersRepository.query(`
      SELECT name, lastname, phone, email, lat, lon
      FROM user_data
      WHERE ST_DWithin(
        geom_point,
        ST_SetSRID(
          ST_MakePoint(
            ${lon}::double precision,
            ${lat}::double precision
          ),
          4326
        ),
        ${radio}
      );
    `)

    return users;
  }
}
