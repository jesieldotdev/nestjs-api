import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class RemoveProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository, //Repository em memoria
  ) {}

  async execute(id: string) {
    try {
      const project = await this.projectRepo.findById(id);
      await this.projectRepo.remove(project._id.toString());
      return `This action removes a #${id} project`;
    } catch (error) {
      return error;
    }
  }
}
