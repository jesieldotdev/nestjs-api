import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
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

      if (updateProjectDto.started_at) {
        if (project.status === ProjectStatus.Active) {
          throw new Error('Cannot start actived project');
        }
        if (project.status === ProjectStatus.Completed) {
          throw new Error('Cannot start completed project');
        }
        if (project.status === ProjectStatus.Cancelled) {
          throw new Error('Cannot start cancelled project');
        }

        project.started_at = updateProjectDto.started_at;
        project.status = ProjectStatus.Active;
      }

      if (updateProjectDto.cancelled_at) {
        if (project.status === ProjectStatus.Active) {
          throw new Error('Cannot start actived project');
        }
        if (project.status === ProjectStatus.Completed) {
          throw new Error('Cannot start completed project');
        }
        if (project.status === ProjectStatus.Cancelled) {
          throw new Error('Cannot start cancelled project');
        }

        project.cancelled_at = updateProjectDto.cancelled_at;
        project.status = ProjectStatus.Cancelled;
      }

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Cannot cancel project before it started');
      }

      if (updateProjectDto.finished_at) {
        if (project.status === ProjectStatus.Completed) {
          throw new Error('Cannot finish completed project');
        }
        if (project.status === ProjectStatus.Cancelled) {
          throw new Error('Cannot finish cancelled project');
        }
        if (updateProjectDto.finished_at < project.started_at) {
          throw new Error('Cannot complete project before it started');
        }

        project.finished_at = updateProjectDto.finished_at;
        project.status = ProjectStatus.Completed;
      }

      return this.projectRepo.save(project);
    } catch (error) {
      throw new Error(error);
    }
  }
}
