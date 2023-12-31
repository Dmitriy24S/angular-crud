import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CoreService } from './core/core.service';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

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
    private _empService: EmployeeService,
    private _coreService: CoreService
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditEmpForm() {
    // store reference, so can update list on close(?). i.e after submit add employee
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      // autoFocus: false,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log('dialogRef afterClosed val', val);
        // if true return list
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        // if true return list
        if (val) {
          this.getEmployeeList();
        }
      },
    });
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
        // alert('Employee deleted');
        this._coreService.openSnackBar('Employee deleted', 'OK');
        this.getEmployeeList(); // refresh the list
      },
      error: console.log,
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion, implement your delete logic here
        console.log('hello');
        this.deleteEmployee(id);
      }
    });
  }
}
