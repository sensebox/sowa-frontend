import { IPhenomenon } from '../../../interfaces/IPhenomenon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { redirectElement} from 'src/app/shared/helpers/helper-functions';

@Component({
  selector: 'senph-phenomena-detail',
  templateUrl: './phenomena-detail.component.html',
  styleUrls: ['./phenomena-detail.component.scss', '../../../app.component.scss']
})

export class PhenomenaDetailComponent implements OnInit {

  phenomenon: IPhenomenon;
  uri;
  languageArray = LANGUAGES;
  buttons = {
    button1: undefined
  };

  redirectElement = redirectElement;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.getPhenomenonDetails();
  }

  getPhenomenonDetails() {
    this.buttons.button1 = "Edit";
    return this.route.params.subscribe(res => {
      this.api.getPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
        this.phenomenon = response;
        this.uri = this.phenomenon.slug;
      });
    })
  }

  button1(uri) {
    this.editButtonClick(uri)
  }

  editButtonClick(uri) {
    this._routerService.navigate(['/phenomenon/edit', this.phenomenon.slug]);
  }

  // searchPheno(nameKey, val1, myArray, val2) {
  //   // console.log(nameKey)
  //   for (var i = 0; i < myArray.length; i++) {
  //     // console.log(myArray[i][val1])
  //     if (myArray[i][val1].value === nameKey) {
  //       return myArray[i][val2].value;
  //     }
  //   }
  // }

  search(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1] === nameKey) {
        return myArray[i][val2];
      }
    }
  }

  markdownOptions = {
    enablePreviewContentClick: true
  }
}