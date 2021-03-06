import { RepoTree } from 'src/app/models/api/project.model';
import { PhpInfo, Project, EnvVars } from './../models/api/project.model';
import { Router } from '@angular/router';
import { ProgressService } from './progress.service';
import { User } from '../models/api/user.model';
import { LoginResponseModel } from '../models/api/auth.model';
import { LoginRequestModel } from '../models/api/auth.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BaseApi } from '../utils/base-api.util';
import { SnackbarService } from './snackbar.service';
import { ProjectStatusResponse } from '../models/api/project.model';
import { SseService } from './sse.service';
import { Subject } from 'rxjs';
import { finalize } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApi {

  private loadingUser: Promise<any>;
  public user?: User;
  public project?: Project;

  private _subject: Subject<ProjectStatusResponse>;

  constructor(
    http: HttpClient,
    progress: ProgressService,
    router: Router,
    private readonly _snackbar: SnackbarService,
    private readonly _sse: SseService,
  ) {
    super(http, progress, router);
  }

  public async login(body: LoginRequestModel) {
    try {
      this.progress.toggle();
      const res = await this.http.post<LoginResponseModel>(environment.api + "/auth/login", body).toPromise();
      this.token = res.token;
      return this.user = new User(res.user);
    } finally {
      this.progress.toggle();
    }
  }

  public async loadUser(force = false): Promise<User | undefined> {
    // If there is already a request we wait for the request resolution and we return it
    if (this.loadingUser) {
      await this.loadingUser;
      return this.loadUser(force);
    } else {
      if (!this.logged) return undefined;
      if (this.user && !force) return this.user;
      try {
        // We return the user saved and we keep the request handle so we can wait for it
        return this.user = new User(await (this.loadingUser = this.get<User>(`/auth/me`)));
      } catch (e) {
        console.error(e);
        this.logout();
        this._snackbar.snack("Connexion impossible !");
      } finally {
        this.loadingUser = undefined;
      }
    }
  }

  public async loadProject(id: string, force = false): Promise<Project> {
    if (!this.logged) return undefined;
    if (this.project && !force) return this.project;
    try {
      return this.project = new Project(await this.get<Project>(`/project/${id}`));
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible de charger le projet");
    }
  }
  
  public async getRepoTree(url: string, sha?: string) {
    return await this.get<RepoTree>(`/project/repo-tree?link=${encodeURIComponent(url)}` + (sha ? `&sha=${sha}` : ''));
  }


  public watchStatus(projectId: string = this.project?.id): Subject<ProjectStatusResponse> {
    try {
      if (!this._subject) {
        this._subject = new Subject<ProjectStatusResponse>();
        this._sse.getSse(`/project/${projectId}/status`, { authorization: this.token })
          .pipe(finalize(() => { this._subject = null }))
          .subscribe(this._subject);
      }
      return this._subject;
    } catch (e) {
      console.error(e);
    }
  }
  
  public exitProject() {
    if (this._subject) {
      this._subject.complete();
      this._subject = null;
    }
    this.project = undefined;
  }

  public async linkProjectToGithub(projectId: string = this.project?.id): Promise<void> {
    await this.post(`/project/${projectId}/github-link`);
  }

  public async linkProjectToDocker(projectId: string = this.project?.id): Promise<Project> {
    return new Project(await this.post(`/project/${projectId}/docker-link`));
  }

  public async linkProjectToMysql(projectId: string = this.project?.id): Promise<Project> {
    return new Project(await this.post(`/project/${projectId}/mysql-link`));
  }

  public async toggleContainer(projectId: string = this.project?.id) {
    await this.post(`/project/${projectId}/toggle`);
  }

  public async patchPhpError(phpInfos: PhpInfo, projectId: string = this.project?.id) {
    await this.patch(`/project/${projectId}/php-log-level`, phpInfos);
  }

  public async patchHttpRoot(projectId: string = this.project?.id, httpRootUrl: string, httpRootUrlSha: string) {
    await this.patch(`/project/${projectId}/http-root-url`, { httpRootUrl, httpRootUrlSha });
  }

  public async patchEnv(projectId: string = this.project?.id, env: EnvVars) {
    await this.patch(`/project/${projectId}/env`, { env });
  }
  public async patchUsers(projectId: string = this.project?.id, users: string[]) {
    return this.project = await this.patch<unknown, Project>(`/project/${projectId}/user-access`, { users });
  }

  public async toggleNotifications(projectId: string = this.project?.id) {
    return this.patch(`/project/${projectId}/toggle-notifications`);
  }

  public async deleteProject(projectId: string = this.project?.id) {
    await this.delete(`/project/${projectId}`);
    this.user.removeProject(projectId);
    if (this.project?.id == projectId)
      this.project = undefined;
  }

  public async search(needle: string, filter: ("project" | "user")[] = ["project", "user"]): Promise<(User | Project)[]> {
    return (await this.get<(User | Project)[]>(`/admin/search?q=${needle}&filter=${filter}`)).map(e => {
      if ((e as User).graduatingYear) return new User(e);
      else return new Project(e);
    });
  }
  public async toggleAdmin(user: User) {
    await this.patch(`/admin/user/${user.id}/admin`);
  }
  public async removeUser(user: User) {
    await this.delete(`/admin/user/${user.id}`);
  }
}
