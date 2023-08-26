import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Pokemon')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name?: string;

  @Column()
  attack?: number;

  @Column()
  defense?: number;

  @Column()
  health?: number;
}
