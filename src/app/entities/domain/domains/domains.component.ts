import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { IDomains } from 'src/app/interfaces/IDomains';

@Component({
  selector: 'senph-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  domainsArray;
  domainsArrayFiltered;
  selectedDomain;
  searchTerm;
  pageLoadActive = "0";
  senphurl = 'http://sensors.wiki/SENPH#';


  constructor( 
    private api:ApiService,
    private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getDomains().subscribe(res => {
      var tempArray: any = res;
      // tempArray =  tempArray.filter(function (el){
      //   return el.domain.type != 'bnode'
      // })
      // console.log(tempArray);
      tempArray.sort((a,b) => a.label.item[0].text.localeCompare(b.label.item[0].text));
      this.domainsArray = Array.from(tempArray, x => new IDomains(x));
      console.dir(this.domainsArray);
    });
  }

  onSelect(domain){
    this.acitivatePageLoad();
    this.selectedDomain = domain; 
    this._routerService.navigate(['/domain/detail/', domain.domain]);

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
    return(['/domain', this.domainsArray[i].domain.value.slice(this.senphurl.length)]);
  }

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }
}
