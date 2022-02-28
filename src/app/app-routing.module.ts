import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [LoggedGuard] },
  { path: "auth", component: AuthComponent},
  // { path: "account", component: AccountComponent, canActivate: [LoggedGuard] },
  // { path: "project/create", component: CreateProjectComponent, canActivate: [LoggedGuard] },
  // {
  //   path: "project/:id", component: DashboardComponent, canActivate: [LoggedGuard, ProjectGuard], children: [
  //     { path: "", component: DashboardMainComponent },
  //     { path: "settings", component: DashboardSettingsComponent },
  //   ]
  // },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
