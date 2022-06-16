import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDomain } from 'src/app/interfaces/IDomain';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { ILabel } from 'src/app/interfaces/ILabel';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';
import { redirectDomain } from 'src/app/shared/helpers/helper-functions';


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
  senphurl = 'http://sensors.wiki/SENPH#';

  redirectDomain = redirectDomain;



  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router
  ) { }

  ngOnInit() {
    this.getDomainDetails();
    // this.retrievePhenomena();
  }

  getDomainDetails() {
    if (this._routerService.url.search('/historic/') !== -1) {
      this.historic.button1 = "Back to current version"
    }
    else {
      this.historic.button1 = "Edit"
      this.historic.button2 = "Log History"
    };
    if (this.historic.button2) {
      this.route.params.subscribe(res => {
        this.api.getDomain(res.iri).subscribe((response: IDomain) => {
          this.domain = response;
          console.log(this.domain)
          // this.domain.labels.forEach(element => {
          //   if (element["languageCode"] == "en") {
          //     this.prefLabel = element
          //     return
          //   }
          //   this.prefLabel = element;
          // });
          this.uri = this.domain.slug;
        });
      })
    }
    else {
      return this.route.params.subscribe(res => {
        this.api.getHistoricDomain(res.iri).subscribe((response: IDomain) => {
          this.domain = response;
          this.domain.labels.forEach(element => {
            if (element["languageCode"] == "en") {
              this.prefLabel = element
              return
            }
            this.prefLabel = element;
          });
          this.uri = this.domain.slug;
          //this.uri = this.domain.iri.value.slice(this.senphurl.length);
          // this.pushLabelNames(response);
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
        this._routerService.navigate(['/domain/detail/', res.uri]);
      })
    }
  }
  
  editButtonClick(shortUri) {
    this._routerService.navigate(['/domain/edit', this.domain.slug]);
  }

  redirectHistoricDetails(uri, historicUri) {
    this._routerService.navigate(['/domain/detail/' + uri + '/historic', historicUri.slice(this.senphurl.length)]);
  }

  getHistory(shortUri) {
    this.api.getDomainHistory(shortUri).subscribe(res => {
      this.domainHistory = res;
    });
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


  searchPheno(nameKey, val1, myArray, val2) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val1])
      if (myArray[i][val1].value === nameKey) {
        return myArray[i][val2].value;
      }
    }
  }


  retrievePhenomena() {
    this.api.getPhenomenaAllLabels().subscribe(res => {
      var tempArray: any = res;

      tempArray = tempArray.filter(function (el) {
        return el.phenomenon.type != 'bnode'
      })
      tempArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      this.phenomenaArray = Array.from(tempArray, x => new IPhenomena(x));
    });
  }
  // this.max = this.getMaxArrayLength();
  // console.log(this.uri);

}
