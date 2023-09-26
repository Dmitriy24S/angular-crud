import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone: true,
  // imports: [
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatTableModule,
  //   MatSortModule,
  //   MatPaginatorModule,
  // ],
})

// OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
export class AppComponent implements OnInit {
  title = 'angular-crud-1';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'experience',
    'education',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployeeList() {
    // returns observable, so subscribe and handle it
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort; // assign
        this.dataSource.paginator = this.paginator;
      },
      // error(err) {
      // error: (err) => {
      //   console.log('getEmployeeList err', err);
      // },
      error: console.log,
    });
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res);
        alert('Employee deleted');
        this.getEmployeeList(); // refresh the list
      },
      error: console.log,
    });
  }
}
