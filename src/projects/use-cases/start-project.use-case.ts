import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository, //Repository em memoria
  ) {}

  async execute(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepo.findById(id);
      updateProjectDto.name && (project.name = updateProjectDto.name);
      updateProjectDto.description &&
        (project.description = updateProjectDto.description);

      project.start(updateProjectDto.started_at);

      project.cancelled(updateProjectDto.cancelled_at);

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Cannot cancel project before it started');
      }

      project.finished(updateProjectDto.finished_at);

      this.projectRepo.update(project);
      return project;
    } catch (error) {
      return error.message;
    }
  }
}
