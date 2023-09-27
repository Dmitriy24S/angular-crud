import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { EmployeeService } from '../services/employee.service';
// import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  formattedDate: string;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  // service variable
  constructor(
    private _fb: FormBuilder,
    private _dateAdapter: DateAdapter<Date>,
    private _empService: EmployeeService,
    // private _dialogRef: DialogRef<EmpAddEditComponent>
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    // @Inject(MAT_DIALOG_DATA) private data: any
    // public to use inside template
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '1',
      lastName: '2',
      email: '3',
      dob: '05/05/1993',
      gender: 'male',
      education: 'Graduate',
      company: '7',
      experience: '8',
      package: '9',
    });

    const date = new Date('05/05/1993');
    this.empForm.get('dob')?.setValue(date);
    this.formattedDate = this._dateAdapter.format(date, 'MM-dd-yyyy');
    // TODO fix:
    // if create/add new then console error:
    // core.mjs:10592 ERROR TypeError: Cannot read properties of null (reading 'dob')
    // at EmpAddEditComponent.ngOnInit
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    // TODO date format string into Date
    const date = new Date(this.data.dob) || new Date('05/05/1993');
    this.empForm.get('dob')?.setValue(date);
    // this.formattedDate = this._dateAdapter.format(date, 'MM-dd-yyyy');
    // console.log('this.empForm', this.empForm);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        const dateObj = new Date(this.empForm.value.dob);
        const formattedDate = `${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
        const data = {
          ...this.empForm.value,
          dob: formattedDate,
          id: this.data.id,
          // id not passed, because not in form(?)
        };
        console.log('data', data);

        this._empService.updateEmployee(data).subscribe({
          next: (value: any) => {
            // on success
            // todo snackbar
            alert('Employee updated');
            this._dialogRef.close(true); // pass true for reference
          },
          error: (err: any) => {
            console.log('updateEmployee error', err);
          },
        });
      } else {
        console.log('1', this.empForm.value);
        const dateObj = new Date(this.empForm.value.dob);
        // const dateObj = new Date(this.empForm.get('dob'));
        const formattedDate = `${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
        // this.empForm.get('dob')?.setValue(formattedDate); // breaks input, because need date instead of string
        console.log('2', { ...this.empForm.value, dob: formattedDate });
        const data = { ...this.empForm.value, dob: formattedDate };
        this._empService.addEmployee(data).subscribe({
          next: (value: any) => {
            // on success
            // todo snackbar
            alert('Employee added');
            // this._dialogRef.close();
            this._dialogRef.close(true); // pass true for reference
          },
          error: (err: any) => {
            console.log('error', err);
          },
        });
      }
    }
  }
}
