import { User } from './user.model';

export interface ProjectAssignment {
  id: number;
  project: Project;
  projectId: number;
  user: User;
  userId: number;
}

export interface Project {
  id: number;
  name: string;
  department: string;
  startedOn: string | Date;
  endedOn: string | Date;
  description: string | null;
}
