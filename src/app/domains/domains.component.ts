import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  
  domainArray;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getDomains().subscribe(res => {
      this.domainArray=res;
      console.dir(res);
    });
  }
}
