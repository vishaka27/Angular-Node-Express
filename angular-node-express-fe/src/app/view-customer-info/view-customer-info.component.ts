import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'view-customer-info',
  templateUrl: './view-customer-info.component.html',
  styleUrls: ['./view-customer-info.component.css']
})
export class ViewCustomerInfoComponent implements OnInit {

  public userName: string;
  public customerInfo: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(param => {
      this.userName = param.first_name;
    });
  }

  ngOnInit() {
    this.http.get('http://localhost:5001/api/v1/customer/name/' + this.userName).subscribe((data: any) => {
        console.log('customer response', data);
        this.customerInfo = data;
        console.log('this.customerInfo', this.customerInfo.customer);
    });
  }
}
