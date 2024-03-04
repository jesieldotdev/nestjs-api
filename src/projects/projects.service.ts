import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private ProjectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);
    if (project.started_at) {
      project.status === ProjectStatus.Active;
    }
    return this.ProjectRepo.save(project);
  }

  findAll() {
    return this.ProjectRepo.find();
  }

  async findOne(id: string) {
    try {
      const project = await this.ProjectRepo.findOneOrFail({ where: { id } });
      return project;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.ProjectRepo.findOneOrFail({ where: { id } });
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

    this.ProjectRepo.save(project);
  }

  async remove(id: string) {
    const project = await this.ProjectRepo.findOneOrFail({ where: { id } });
    await this.ProjectRepo.remove(project);
    return `This action removes a #${id} project`;
  }
}
