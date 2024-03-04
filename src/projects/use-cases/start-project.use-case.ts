import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>, //Repository em memoria
  ) {}

  async execute(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepo.findOneOrFail({ where: { id } });
      updateProjectDto.name && (project.name = updateProjectDto.name);
      updateProjectDto.description &&
        (project.description = updateProjectDto.description);

      project.start(updateProjectDto.started_at);

      project.cancelled(updateProjectDto.cancelled_at);

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Cannot cancel project before it started');
      }

      project.finished(updateProjectDto.finished_at);

      return this.projectRepo.save(project);
    } catch (error) {
      return error.message;
    }
  }
}
