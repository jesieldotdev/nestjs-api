import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { RemoveProjectUseCase } from './use-cases/remove-project.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    FindOneProjectUseCase,
    RemoveProjectUseCase,
  ],
})
export class ProjectsModule {}
