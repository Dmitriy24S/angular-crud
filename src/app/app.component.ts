import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

// OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
export class AppComponent implements OnInit {
  title = 'angular-crud-1';

  // dep injection, service variable
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {
    //
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  // openDialog(): void {
  // let dialogRef = this._dialog.open(DialogOverviewExampleDialog, {
  // width: '450px',
  // data: { name: this.name, animal: this.animal },
  // autoFocus: false,
  // });
  // }

  // methods:
  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent, {
      // autoFocus: false,
    });
  }

  getEmployeeList() {
    // returns observable, so subscribe and handle it
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log(res);
      },
      // error(err) {
      // error: (err) => {
      //   console.log('getEmployeeList err', err);
      // },
      error: console.log,
    });
  }
}
