import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class FindOneProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository, //Repository em memoria
  ) {}

  async execute(id: string) {
    try {
      const project = await this.projectRepo.findById(id);
      return project;
    } catch (error) {
      return error.message;
    }
  }
}
