import { BaseModel } from '../base.model';
import { User, Collaborator } from './user.model';

export class Project extends BaseModel {
  id: string;
  name: string;
  lastBuild: string;
  githubLink: string;
  repoId: number;
  type: ProjectType;
  mysqlInfo: MysqlInfo;
  phpInfo: PhpInfo;
  nginxInfo: NginxInfo;
  notificationsEnabled: boolean;
  env: { [key: string]: string };
  creator: User;
  creatorId: string;
  collaborators: Collaborator[];
  createdDate: Date;
  updatedDate: Date;
  storageOverageDate: Date;
  maxRwSize: number;
  rwSize: number;

  public get mysqlEnabled() {
    return !!this.mysqlInfo;
  }
}

export class MysqlInfo extends BaseModel {

  public id: number;

  public projectId: string;

  public user: string;
  public password: string;
  public database: string;
}

export class PhpInfo extends BaseModel {

  public id: number;

  public project: Project;

  public logLevel: PhpLogLevel;

  public logEnabled: boolean;

  public env: EnvVars;
}

export type EnvVars = { [key: string]: string };

export class NginxInfo extends BaseModel {

  public id: number;

  public project: Project;

  public rootDir: string;

  public rootDirSha: string;
}

export enum PhpLogLevel {
  All = 'E_ALL',
  Warning = 'E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT',
  Error = 'E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED & ~E_STRICT',
  None = '~E_ALL',
}


export type ProjectStatusResponse = {
  status: ProjectStatus | ContainerStatus;
  origin: Origin;
  exitCode?: number,
}
export enum ProjectType {
  NGINX = "NGINX",
  PHP = "PHP",
}

export enum ProjectStatus {
  ERROR = "ERROR",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
}
export enum ContainerStatus {
  Running = "Running",
  Error = "Error",
  Stopped = "Stopped",
  Restarting = "Restarting",
  NotFound = "NotFound"
}
export type Origin = "docker" | "container" | "mysql" | "github";