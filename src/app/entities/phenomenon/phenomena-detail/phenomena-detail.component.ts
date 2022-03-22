import { IPhenomenon } from '../../../interfaces/IPhenomenon';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { IDomains } from '../../../interfaces/IDomains';
import { IUnit } from '../../../interfaces/IUnit';
import { ILabel } from 'src/app/interfaces/ILabel';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { redirectDomain } from 'src/app/shared/helpers/helper-functions';

@Component({
  selector: 'senph-phenomena-detail',
  templateUrl: './phenomena-detail.component.html',
  styleUrls: ['./phenomena-detail.component.scss', '../../../app.component.scss']
})
export class PhenomenaDetailComponent implements OnInit {
  phenomenon: IPhenomenon;
  uri;
  languageArray = LANGUAGES;
  prefLabel: ILabel;
  phenomenonHistory: Object;
  historic = {
    button1: undefined,
    button2: undefined
  };
  unitsArray;

  redirectDomain = redirectDomain;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     const shortUri = params.get('id');
  //     if (shortUri) {
  //       this.getPhenomenonDetails(shortUri);
  //     }
  //   });
  // }




  heroBannerString = "http://sensors.wiki/SENPH#";
  phenomenonForm: FormGroup;
  validationMessages = {
    'uri': {
      'required': 'URI is required.',
      'uriSyntax': 'No white spaces allowed in URI.'
    },
    'label': {
      'required': 'Label is required.'
    },
    'description': {
      'required': 'Description is required.'
    }
  };

  formErrors = {
  };

  ngOnInit() {
    this.getPhenomenonDetails();
    //this.retrieveUnits();

  }


  getPhenomenonDetails() {
    if (this._routerService.url.search('/historic/') !== -1) {
      this.historic.button1 = "Back to current version"
    }
    else {
      this.historic.button1 = "Edit"
      this.historic.button2 = "Log History"
    };
    if (this.historic.button2) {
      return this.route.params.subscribe(res => {
        this.api.getPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
          this.phenomenon = response;
          console.log(this.phenomenon)
          // this.phenomenon.labels.forEach(element => {
          //   if (element["languageCode"] == "de") {
          //     this.prefLabel = element
          //     return
          //   }
          //   if (element["languageCode"] == "en") {
          //     this.prefLabel = element
          //     return
          //   }
          // });
          this.uri = this.phenomenon.labels[0].text;
          //this.uri = this.phenomenon.iri.value.slice(this.heroBannerString.length);
        });
      })
    }
    else {
      return this.route.params.subscribe(res => {
        this.api.getHistoricPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
          this.phenomenon = response;
          this.phenomenon.labels.forEach(element => {
            if (element["xml:lang"] == "en") {
              this.prefLabel = element
              return
            }
            this.prefLabel = element;
          });
          //this.uri = this.phenomenon.iri.value.slice(this.heroBannerString.length);
        });
      })
    }
  }

  button1(uri) {
    if (this.historic.button2) {
      this.editButtonClick(uri)
    }
    else {
      this.route.params.subscribe(res => {
        this._routerService.navigate(['/phenomenon/detail/', res.uri]);
      })
    }
  }

  editButtonClick(uri) {
    this._routerService.navigate(['/phenomenon/edit', uri]);
  }


  redirectHistoricDetails(uri, historicUri) {
    this._routerService.navigate(['/phenomenon/detail/' + uri + '/historic', historicUri.slice(this.heroBannerString.length)]);
  }

  getHistory(shortUri) {
    this.api.getPhenomenonHistory(shortUri).subscribe(res => {
      this.phenomenonHistory = res;
    });
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      this.unitsArray = res;
      // console.log(this.unitsArray);
      this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      // console.log(this.unitsArray);
    });
  }

  searchPheno(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1].value === nameKey) {
        return myArray[i][val2].value;
      }
    }
  }

  search(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1] === nameKey) {
        return myArray[i][val2];
      }
    }
  }

  // search(nameKey, myArray) {
  //   for (var i = 0; i < myArray.length; i++) {
  //     if (myArray[i].val === nameKey["xml:lang"]) {
  //       return myArray[i].show;
  //     }
  //   }
  // }

  markdownOptions = {
    enablePreviewContentClick: true
  }
}


