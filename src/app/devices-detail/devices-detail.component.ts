import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.scss', '../app.component.scss']
})
export class DevicesDetailComponent implements OnInit {
  
  uri = [];
  descriptions = [];
  sensors =[];
  website =[];
  image =[];
  contact =[];

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

 ngOnInit() {
    this.getDeviceDetails();
  }

  getDeviceDetails() {
    this.route.params.subscribe(res => {
      this.api.getDevice(res.iri).subscribe((res:Array<any>) => {
        console.log(res);
        res.forEach(element => {
          switch (Object.getOwnPropertyNames(element)[0]) {
  
            case "description" : {
                this.descriptions.push({value: element.description.value, lang: element.description["xml:lang"]});
                break;
            }

            case "iri" : {
              this.uri.push({ iri: element.iri.value, label: element.label.value, short: element.iri.value.slice(34)});
              break;
            }

            case "sensors" : {
              this.sensors.push({ iri: element.sensors.value, label: element.sensorsLabel.value, short: element.sensors.value.slice(34)});
              break;
            }
            
            case "website" : {
              this.website.push({iri: element.website.value});
              break;
            }
            
            case "image" : {
              this.image.push({ iri: element.image.value});
              break;
            }

            case "contact" : {
              this.contact.push({ iri: element.contact.value});
              break;
            }
            default: {
               console.log("Invalid attribute");
               break;
            }
         }
  
        });
      })
    })
  }

}
