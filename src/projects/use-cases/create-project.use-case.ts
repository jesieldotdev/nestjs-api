import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    // @Inject('IProjectRepository')
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>, //Repository em memoria
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input);

    if (input.started_at) {
      project.status = ProjectStatus.Active;
    }
    return this.projectRepo.save(project);
  }
}
