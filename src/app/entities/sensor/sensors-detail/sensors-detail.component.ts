import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ISensor } from '../../../interfaces/ISensor';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { redirectElement } from 'src/app/shared/helpers/helper-functions';

@Component({
  selector: 'senph-sensors-detail',
  templateUrl: './sensors-detail.component.html',
  styleUrls: ['./sensors-detail.component.scss', '../../../app.component.scss']
})

export class SensorsDetailComponent implements OnInit {
  
  sensor: ISensor;
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
    this.getSensorDetails()
  }

  getSensorDetails() {
    this.buttons.button1 = "Edit";
    return this.route.params.subscribe(res => {
      this.api.getSensor(res.iri).subscribe((response: ISensor) => {
        this.sensor = response;
        this.uri = this.sensor.slug;
      });
    })
  }

  button1(uri) {
    this.editButtonClick(uri)
  }

  editButtonClick(shortUri) {
    this._routerService.navigate(['/sensor/edit', this.sensor.slug]);
  }

  // searchUnit(nameKey, myArray) {
  //   for (var i = 0; i < myArray.length; i++) {
  //     // console.log(myArray[i].y.value)
  //     if (myArray[i].y.value === nameKey) {
  //       return myArray[i].label.value;
  //     }
  //   }
  // }

  search(nameKey, val, myArray) {
    // console.log(nameKey)
    for (var i = 0; i < myArray.length; i++) {
      // console.log(myArray[i][val])
      if (myArray[i][val] === nameKey) {
        return myArray[i].show;
      }
    }
  }

  markdownOptions = {
    enablePreviewContentClick: true
  }
}
