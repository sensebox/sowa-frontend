import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IDomain } from 'src/app/interfaces/IDomain';
import { IDomains } from 'src/app/interfaces/IDomains';

@Component({
  selector: 'senph-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss', '../../../app.component.scss']
})
export class DomainsComponent implements OnInit {
  faSearch = faSearch;
  domainsArray;
  domainsArrayFiltered;
  selectedDomain;
  searchTerm;
  pageLoadActive = "0";


  constructor( 
    private api:ApiService,
    private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getDomains().subscribe(res => {
      var tempArray: any = res;
      tempArray =  tempArray.filter(function (el){
        return el.domain.type != 'bnode'
      })
      // console.log(tempArray);
      tempArray.sort((a,b) => a.label[0].value.localeCompare(b.label[0].value));
      console.log(tempArray)
      this.domainsArray = Array.from(tempArray, x => new IDomains(x));
    });
  }

  onSelect(domain){
    this.acitivatePageLoad();
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

  acitivatePageLoad() {
    this.pageLoadActive = "1";
  }
}
