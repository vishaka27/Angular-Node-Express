import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-customer-info',
  templateUrl: './view-customer-info.component.html',
  styleUrls: ['./view-customer-info.component.css']
})
export class ViewCustomerInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public userName: string;

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.userName = param.first_name;
    });
  }
}
