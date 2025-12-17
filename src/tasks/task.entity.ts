import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  OPEN = 'aberto',
  DOING = 'fazendo',
  DONE = 'finalizado',
}

@Entity()
export class Task {
  @ApiProperty({
    description: 'Identificador único da tarefa',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Estudar documentação com Swagger',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Status da tarefa',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
    example: TaskStatus.OPEN,
  })
  @Column({
    type: 'text',
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;


  @ApiProperty({
    description: 'Data de criação da tarefa',
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização da tarefa',
    type: Date,
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
