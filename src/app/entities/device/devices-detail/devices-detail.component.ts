import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IDevice } from '../../../interfaces/IDevice';
import { LANGUAGES } from 'src/app/shared/mock-languages';
import { redirectElement } from 'src/app/shared/helpers/helper-functions';

@Component({
  selector: 'senph-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.scss', '../../../app.component.scss']
})

export class DevicesDetailComponent implements OnInit {
  
  device: IDevice;
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
    this.getDeviceDetails();
  }

  getDeviceDetails() {
    this.buttons.button1 = "Edit";
    return this.route.params.subscribe(res => {
      this.api.getDevice(res.iri).subscribe((response: IDevice) => {
        this.device = response;
        this.uri = this.device.slug;
      });
    })
  }

  button1(uri) {
    this.editButtonClick(uri)
  }

  editButtonClick(uri) {
    this._routerService.navigate(['/device/edit', this.device.slug]);
  }

  // searchPheno(nameKey, val1, myArray, val2) {
  //   // console.log(nameKey)
  //   for (var i = 0; i < myArray.length; i++) {
  //     // console.log(myArray[i][val1])
  //     if (myArray[i][val1].value === nameKey) {
  //       return myArray[i][val2][0].value;
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