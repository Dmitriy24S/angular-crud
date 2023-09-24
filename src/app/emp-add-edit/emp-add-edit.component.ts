import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent {
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
    private _dateAdapter: DateAdapter<Date>
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
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log('1', this.empForm.value);
      const dateObj = new Date(this.empForm.value.dob);
      // const dateObj = new Date(this.empForm.get('dob'));
      const formattedDate = `${
        dateObj.getMonth() + 1
      }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
      // this.empForm.get('dob')?.setValue(formattedDate);
      console.log('2', { ...this.empForm.value, dob: formattedDate });
    }
  }
}
