import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'bson';
export interface IProjectRepository {
  create(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  remove(id: string): Promise<void>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project>;
  findByName(name: string): Promise<Project>;
}

@Injectable()
export class ProjectTypeOrmRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private typeOrmRepo: Repository<Project>,
  ) {}
  findByName(name: string): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  async create(project: Project): Promise<void> {
    await this.typeOrmRepo.save(project);
  }

  async update(project: Project): Promise<void> {
    await this.typeOrmRepo.update(project._id.toString(), project);
  }
  async remove(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }

  findAll(): Promise<Project[]> {
    return this.typeOrmRepo.find();
  }
  async findById(id: string): Promise<Project> {
    const objectId = new ObjectId(id);
    return await this.typeOrmRepo.findOneOrFail({ where: { _id: objectId } });
  }
}
