import { SnackbarService } from './../../services/snackbar.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/api/user.model';
import { Project } from 'src/app/models/api/project.model';
import { MatDialog } from '@angular/material/dialog';
import { TextDialogComponent } from '../utils/text-dialog/text-dialog.component';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public searchInput: FormControl;
  private _searchFilter: ("user" | "project")[] = ["project", "user"];
  public searchResults: (User | Project)[] = [];
  public searching = false;
  constructor(
    private readonly _api: ApiService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackbar: SnackbarService,
    private readonly _dialog: MatDialog,
  ) { }

  public async ngOnInit() {
    this.searchInput = this._formBuilder.control('');
    this.searchInput.valueChanges.subscribe(() => this.getSearchResults());
    await this.getSearchResults();
  }

  public async getSearchResults() {
    try {
      this.searching = true;
      this.searchResults = await this._api.search(this.searchInput.value, this._searchFilter);
    } catch (e) {
      this._snackbar.snack("Impossible de récupérer les résultats de la recherche");
    } finally {
      this.searching = false;
    }
  }

  public async toggleAdmin(user: User) {
    this._dialog.open(TextDialogComponent, { data: !user.admin ? `Promouvoir ${user.firstName} ${user.lastName} ? Il pourra accéder à cette plateforme et administrer tous les projets` : `Destituer ${user.firstName} ${user.lastName} ? Il ne pourra plus accéder à cette plateforme.` }).afterClosed().subscribe(async (e: string) => {
      if (e) {
        try {
          await this._api.toggleAdmin(user);
          user.admin = !user.admin;
          this._snackbar.snack(`${user.firstName} ${user.lastName} ${user.admin ? "est maintenant administrateur" : "n'est plus administrateur"}`);
        } catch (e) {
          this._snackbar.snack("Une erreur est apparue lors de la modification de l'administrateur");
        }
      }
    });
  }

  public isProject(result: Project | User) {
    return result instanceof Project;
  }

}
