import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as tarefas',
    description: 'Retorna uma lista com todas as tarefas cadastradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    type: [Task],
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar tarefa por ID',
    description: 'Retorna uma tarefa específica pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar nova tarefa',
    description: 'Cria uma nova tarefa no sistema',
  })
  @ApiBody({
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar tarefa',
    description: 'Atualiza os dados de uma tarefa existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: Number,
  })
  @ApiBody({
    type: UpdateTaskDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover tarefa',
    description: 'Remove uma tarefa pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa removida com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
