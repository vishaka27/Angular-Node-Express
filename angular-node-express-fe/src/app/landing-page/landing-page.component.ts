import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public showInputName: boolean;
  userName: FormGroup;
  submitted = false;

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userName = this.formBuilder.group({
      first_name: ['', Validators.required]
    });
  }

  invalidName() {
    return (this.submitted && (this.userName.controls.first_name.errors !== null));
  }

  navigate = (path) => {
    this.showInputName = false;
    this.router.navigate([path]);
  }

  enterCustomerName = () => {
    this.showInputName = true;
  }

  onSubmit() {
    this.submitted = true;
    console.log('1', this.userName.value);
    this.http.get('http://localhost:5001/api/v1/customer/name/' + this.userName.value['first_name']).subscribe((data: any) => {
      console.log('customer response', data);
      let path = '/user/name/' + data.customer.first_name;
      console.log('poath--------dfd', path);
      this.router.navigate([path]);
    });
  }
}
