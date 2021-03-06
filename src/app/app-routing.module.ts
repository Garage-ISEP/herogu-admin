import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { DashboardSettingsComponent } from './components/dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [LoggedGuard] },
  { path: "auth", component: AuthComponent},
  { path: "account", component: AccountComponent, canActivate: [LoggedGuard] },
  {
    path: "project/:id", component: DashboardComponent, canActivate: [LoggedGuard], children: [
      { path: "", component: DashboardMainComponent },
      { path: "settings", component: DashboardSettingsComponent },
    ]
  },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
