import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_data')
export class UserDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  lat: number;
  
  @Column({ type: 'float' })
  lon: number;
  
  @Column({ type: 'geometry', name: 'geom_point', srid: 4236, nullable: true })
  geomPoint?: number;

  @Column()
  name: string;

  @Column()
  lastname: string;
  
  @Column({ nullable: true })
  phone?: string;
  
  @Column({ nullable: true })
  email?: string;
}