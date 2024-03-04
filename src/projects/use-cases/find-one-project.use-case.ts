import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>, //Repository em memoria
  ) {}

  async execute(id: string) {
    try {
      const project = await this.projectRepo.findOneOrFail({ where: { id } });
      return project;
    } catch (error) {
      return error;
    }
  }
}
