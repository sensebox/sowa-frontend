import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'senph-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss', '../../app.component.scss']
})
export class DomainsComponent implements OnInit {
  
  domainsArray;
  domainsArrayFiltered;
  selectedDomain;


  constructor( 
    private api:ApiService,
    private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getDomains().subscribe(res => {
      this.domainsArray=res;
      this.domainsArray =  this.domainsArray.filter(function (el){
        return el.domain.type != 'bnode'
      })
      // console.log(this.domainsArray);
      this.domainsArray.sort((a,b) => a.label[0].value.localeCompare(b.label[0].value));

      console.dir(res);
      this.assignCopy();
    });
  }

  onSelect(domain){
    this.selectedDomain = domain; 
    this._routerService.navigate(['/domain/detail/', domain.domain.value.slice(34)]);

  }

  assignCopy(){
    this.domainsArrayFiltered = Object.assign([], this.domainsArray);
 }
  filterItem(value){
      if(!value){
          this.assignCopy();
      } // when nothing has typed
      this.domainsArrayFiltered = Object.assign([], this.domainsArray).filter(
        sensors => JSON.stringify(sensors).toLowerCase().indexOf(value.toLowerCase()) > -1
      )
  }
  createRoute(i){
    return(['/domain', this.domainsArray[i].domain.value.slice(34) ]);
  }
}
