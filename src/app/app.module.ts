import { HeaderComponent } from './components/utils/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './components/projects/projects.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccountComponent } from './components/account/account.component';
import { TextDialogComponent } from "./components/utils/text-dialog/text-dialog.component";
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { ProjectStatusComponent } from './components/dashboard/dashboard-header/project-status/project-status.component';
import { BuildProjectComponent } from './components/dashboard/dashboard-main/build-project/build-project.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { EnvConfigComponent } from './components/dashboard/dashboard-main/env-config/env-config.component';
import { EnvPairComponent } from './components/dashboard/dashboard-main/env-config/env-pair/env-pair.component';
import { MysqlCredsComponent } from './components/dashboard/dashboard-main/mysql-creds/mysql-creds.component';
import { NginxConfigComponent } from './components/dashboard/dashboard-main/nginx-config/nginx-config.component';
import { PhpConfigComponent } from './components/dashboard/dashboard-main/php-config/php-config.component';
import { StorageQuotaComponent } from './components/dashboard/dashboard-main/storage-quota/storage-quota.component';
import { DashboardSettingsComponent } from './components/dashboard/dashboard-settings/dashboard-settings.component';
import { AddStudentComponent } from './components/utils/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { appearance } from './style/default';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ProjectsComponent,
    AccountComponent,
    TextDialogComponent,
    DashboardComponent,
    AddStudentComponent,
    DashboardHeaderComponent,
    ProjectStatusComponent,
    DashboardSettingsComponent,
    DashboardMainComponent,
    BuildProjectComponent,
    MysqlCredsComponent,
    PhpConfigComponent,
    NginxConfigComponent,
    EnvConfigComponent,
    EnvPairComponent,
    StorageQuotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
