import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-crud-1';

  // dep injection, service variable
  constructor(private _dialog: MatDialog) {
    //
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }
}
