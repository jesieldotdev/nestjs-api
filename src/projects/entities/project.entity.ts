import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'bson';

export enum ProjectStatus {
  Pendind = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;
  @Column({ nullable: true, type: 'datetime' })
  cancelled_at: Date | null;
  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null;
  @Column({ nullable: true, type: 'datetime' })
  forecasted_at: Date | null;
  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pendind;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at: Date | null;
      forecasted_at: Date | null;
      finished_at: Date | null;
    },
    // id?: string,
  ) {
    Object.assign(this, props);
    // this._id = id ?? crypto.randomUUID();
  }

  //regras de negocio
  start(started_at: Date) {
    if (started_at) {
      if (this.status === ProjectStatus.Active) {
        throw new Error('Cannot start actived project');
      }
      if (this.status === ProjectStatus.Completed) {
        throw new Error('Cannot start completed project');
      }
      if (this.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot start cancelled project');
      }

      this.started_at = started_at;
      this.status = ProjectStatus.Active;
    }
  }

  cancelled(cancelled_at: Date) {
    if (cancelled_at) {
      if (this.status === ProjectStatus.Active) {
        throw new Error('Cannot start actived project');
      }
      if (this.status === ProjectStatus.Completed) {
        throw new Error('Cannot start completed project');
      }
      if (this.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot start cancelled project');
      }

      this.cancelled_at = cancelled_at;
      this.status = ProjectStatus.Cancelled;
    }
  }

  finished(finished_at: Date) {
    if (finished_at) {
      if (this.status === ProjectStatus.Completed) {
        throw new Error('Cannot finish completed project');
      }
      if (this.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot finish cancelled project');
      }
      if (finished_at < this.started_at) {
        throw new Error('Cannot complete project before it started');
      }

      this.finished_at = finished_at;
      this.status = ProjectStatus.Completed;
    }
  }
}
