import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository, //Repository em memoria
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input);

    if (input.started_at) {
      project.status = ProjectStatus.Active;
    }
    // return this.projectRepo.save(project);
    await this.projectRepo.create(project);
    return project;
  }
}
