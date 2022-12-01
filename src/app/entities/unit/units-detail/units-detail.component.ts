import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { redirectElement } from 'src/app/shared/helpers/helper-functions';
import { IUnit } from 'src/app/interfaces/IUnit';

@Component({
  selector: 'senph-units-detail',
  templateUrl: './units-detail.component.html',
  styleUrls: ['./units-detail.component.scss']
})

export class UnitsDetailComponent implements OnInit {

  unit: IUnit;
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
    this.getUnitDetails();
  }

  getUnitDetails() {
    this.buttons.button1 = "Edit";
    return this.route.params.subscribe(res => {
      this.api.getUnit(res.iri).subscribe((response: IUnit) => {
        this.unit = response;
        this.uri = this.unit.slug;
      });
    })
  }

  button1(uri) {
    this.editButtonClick(uri)
  }
  
  editButtonClick(shortUri) {
    this._routerService.navigate(['/unit/edit', this.unit.slug]);
  }

}
