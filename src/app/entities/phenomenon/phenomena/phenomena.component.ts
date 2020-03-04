import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'senph-phenomena',
  templateUrl: './phenomena.component.html',
  styleUrls: ['./phenomena.component.scss', '../../../app.component.scss']
})
export class PhenomenaComponent implements OnInit {

  faSearch = faSearch;
  phenomenaArray;
  selectedPhenomenon;
  searchTerm;

  constructor(
      private api:ApiService,
      private _routerService:Router
    ) { }

  ngOnInit() {
    this.api.getPhenomena().subscribe(res => {
        console.log(res);
      var tempArray: any = res;
    
      tempArray =  tempArray.filter(function (el){
        return el.phenomenon.type != 'bnode'
      })
      // console.log(tempArray);
      tempArray.sort((a,b) => a.phenomenonLabel[0].value.localeCompare(b.phenomenonLabel[0].value));
      this.phenomenaArray = Array.from(tempArray, x => new IPhenomena(x));
      console.log(this.phenomenaArray);
    });
  }

  onSelect(phenomenon){
    this.selectedPhenomenon = phenomenon;
    this._routerService.navigate(['/phenomenon/detail/', phenomenon.phenomenon.value.slice(34)]);
  }
}
