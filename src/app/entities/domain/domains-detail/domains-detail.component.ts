import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDomain } from 'src/app/interfaces/IDomain';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { redirectElement } from 'src/app/shared/helpers/helper-functions';

@Component({
  selector: 'senph-domains-detail',
  templateUrl: './domains-detail.component.html',
  styleUrls: ['./domains-detail.component.scss', '../../../app.component.scss']
})
export class DomainsDetailComponent implements OnInit {

  domain: IDomain;
  uri;
  languageArray = LANGUAGES;
  buttons = {
    button1: undefined,
  };

  redirectElement = redirectElement;


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
    this.buttons.button1 = "Edit";
    return this.route.params.subscribe(res => {
      this.api.getDomain(res.iri).subscribe((response: IDomain) => {
        this.domain = response;
        this.uri = this.domain.slug;
      });
    });
  }

  button1(uri) {
    this.editButtonClick(uri);
  }
  
  editButtonClick(shortUri) {
    this._routerService.navigate(['/domain/edit', this.domain.slug]);
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
}
