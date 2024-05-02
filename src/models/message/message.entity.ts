import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
