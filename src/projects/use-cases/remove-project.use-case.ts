import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RemoveProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>, //Repository em memoria
  ) {}

  async execute(id: string) {
    try {
      const project = await this.projectRepo.findOneOrFail({ where: { id } });
      await this.projectRepo.remove(project);
      return `This action removes a #${id} project`;
    } catch (error) {
      return error;
    }
  }
}
