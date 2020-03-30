import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDomain } from 'src/app/interfaces/IDomain';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { ILabel } from 'src/app/interfaces/ILabel';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';

@Component({
  selector: 'senph-domains-detail',
  templateUrl: './domains-detail.component.html',
  styleUrls: ['./domains-detail.component.scss', '../../../app.component.scss']
})
export class DomainsDetailComponent implements OnInit {

  domain: IDomain;
  uri;
  languageArray = LANGUAGES;
  domainHistory: Object;
  historic = {
    button1: undefined,
    button2: undefined
  };
  prefLabel: ILabel;
  phenomenaArray: any[];



  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.getDomainDetails();
    this.retrievePhenomena();
  }

  getDomainDetails() {
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
      this.route.params.subscribe(res => {
        console.log(res);
        this.api.getDomain(res.iri).subscribe((response: IDomain) => {
          console.log(response);
          console.log("NEW");
          this.domain = response;
          this.domain.labels.forEach(element => {
            console.log(element["xml:lang"])
            if (element["xml:lang"] == "en") {
              this.prefLabel = element
              return
            }
            this.prefLabel = element;
          });
          this.uri = this.domain.iri.value.slice(34);
          // this.pushLabelNames(response);
          console.log(this.uri);
        });
      })
    }
    else {
      return this.route.params.subscribe(res => {
        console.log(res);
        this.api.getHistoricDomain(res.iri).subscribe((response: IDomain) => {
          console.log(response);
          console.log("historic");
          this.domain = response;
          this.domain.labels.forEach(element => {
            console.log(element["xml:lang"])
            if (element["xml:lang"] == "en") {
              this.prefLabel = element
              return
            }
            this.prefLabel = element;
          });
          this.uri = this.domain.iri.value.slice(34);
          // this.pushLabelNames(response);
          console.log(this.uri);
        });
      })
    }
  }

  redirectDomain(longURI, link) {
    this._routerService.navigate([link, longURI.slice(34)]);
  }

  button1(uri) {
    console.log(this.historic)
    if (this.historic.button2) {
      this.editButtonClick(uri)
    }
    else {
      this.route.params.subscribe(res => {
        this._routerService.navigate(['/domain/detail/', res.uri]);
      })
    }
  }
  
  editButtonClick(shortUri) {
    this._routerService.navigate(['/domain/edit', shortUri]);
  }

  redirectHistoricDetails(uri, historicUri) {
    this._routerService.navigate(['/domain/detail/' + uri + '/historic', historicUri.slice(34)]);
  }

  getHistory(shortUri) {
    this.api.getDomainHistory(shortUri).subscribe(res => {
      console.log(res);
      this.domainHistory = res;
    });
  }

  search(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1] === nameKey) {
        console.log(myArray[i][val2]);
        return myArray[i][val2];
      }
    }
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


  retrievePhenomena() {
    this.api.getPhenomenaAllLabels().subscribe(res => {
      console.log(res);
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        return el.phenomenon.type != 'bnode'
      })
      console.log(tempArray);
      tempArray.sort((a, b) => a.phenomenonLabel.value.localeCompare(b.phenomenonLabel.value));
      this.phenomenaArray = Array.from(tempArray, x => new IPhenomena(x));
      console.log(this.phenomenaArray);
    });
  }
  // this.max = this.getMaxArrayLength();
  // console.log(this.uri);

}
