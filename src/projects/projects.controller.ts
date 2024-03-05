import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { RemoveProjectUseCase } from './use-cases/remove-project.use-case';
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findAllProjectsUseCase: FindAllProjectsUseCase,
    private readonly startProjectUseCase: StartProjectUseCase,
    private readonly findOneProjectUseCase: FindOneProjectUseCase,
    private readonly removeProjectUseCase: RemoveProjectUseCase,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }
  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneProjectUseCase.execute(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.startProjectUseCase.execute(id, updateProjectDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeProjectUseCase.execute(id);
  }

}
