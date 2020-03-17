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




  heroBannerString = "http://www.opensensemap.org/SENPH#";
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
    this.retrieveUnits();

  }


  getPhenomenonDetails() {
    console.log(this._routerService.url)
    if (this._routerService.url.search('/historic/') !== -1) {
      this.historic.button1 = "Back to current version"
    }
    else {
      this.historic.button1 = "Edit"
      this.historic.button2 = "Log History"
    };
    console.log(this._routerService.url)
    if (this.historic.button2) {
      return this.route.params.subscribe(res => {
        this.api.getPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
          console.log(response);
          this.phenomenon = response;
          console.log("NEW");
          this.phenomenon.labels.forEach(element => {
            console.log(element["xml:lang"])
            if (element["xml:lang"] == "en") {
              this.prefLabel = element
              return
            }
            this.prefLabel = element;
          });
          this.uri = this.phenomenon.iri.value.slice(34);
          console.log(this.uri);
        });
      })
    }
    else {
      return this.route.params.subscribe(res => {
        this.api.getHistoricPhenomenon(res.iri).subscribe((response: IPhenomenon) => {
          console.log(response);
          this.phenomenon = response;
          console.log("historic");
          this.phenomenon.labels.forEach(element => {
            console.log(element["xml:lang"])
            if (element["xml:lang"] == "en") {
              this.prefLabel = element
              return
            }
            this.prefLabel = element;
          });
          this.uri = this.phenomenon.iri.value.slice(34);
          console.log(this.uri);
        });
      })
    }
  }

  redirectDomain(longURI) {
    console.log(longURI);
    this._routerService.navigate(['/domain/', longURI.slice(34)]);
  }

  button1(uri) {
    console.log(this.historic)
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
    this._routerService.navigate(['/phenomenon/detail/' + uri + '/historic', historicUri.slice(34)]);
  }

  getHistory(shortUri) {
    this.api.getPhenomenonHistory(shortUri).subscribe(res => {
      console.log(res);
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
        console.log(myArray[i][val2].value);
        return myArray[i][val2].value;
      }
    }
  }

  search(nameKey, myArray) {
    console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].val === nameKey["xml:lang"]) {
        console.log(myArray[i].show)
        return myArray[i].show;
      }
    }
  }
}


