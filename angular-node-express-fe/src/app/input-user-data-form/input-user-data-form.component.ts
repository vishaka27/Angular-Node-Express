import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  public serviceErrors: any;
  guid: any;

  constructor(private formBuilder: FormBuilder, private http: Http,  private router: Router) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required ,Validators.email]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    });
  }

  invalidFirstName() {
    return (this.submitted && (this.userForm.controls.first_name.errors !== null));
  }
  invalidLastName() {
    return (this.submitted && (this.userForm.controls.last_name.errors !== null));
  }
  invalidEmail() {
    return (this.submitted && (this.userForm.controls.email.errors !== null));
  }
  invalidZipCode() {
    return (this.submitted && (this.userForm.controls.zipcode.errors !== null));
  }
  invalidPassword() {
    return (this.submitted && (this.userForm.controls.password.errors !== null));
  }

  onSubmit() {
    this.submitted = true;
    console.log('1');
    this.http.get('http://localhost:5001/api/v1/generate_uid').subscribe((data: any) => {
      this.guid = JSON.parse(data._body).guid;
      if (this.userForm.invalid === true) {
        return;
      } else {
        let data: any = Object.assign({guid: this.guid}, this.userForm.value);
        this.http.post('http://localhost:5001/api/v1/customer', data).subscribe((data: any) => {
          let path = '/user/' + JSON.parse(data._body).customer.guid;
          this.router.navigate([path]);
        }, error => {
          this.serviceErrors = error.error.error;
        });
        this.registered = true;
      }
    }, error => {
      this.serviceErrors = error.error.error;
    });
  }

}
