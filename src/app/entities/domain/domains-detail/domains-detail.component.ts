import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'senph-domains-detail',
  templateUrl: './domains-detail.component.html',
  styleUrls: ['./domains-detail.component.scss', '../../../app.component.scss']
})
export class DomainsDetailComponent implements OnInit {

  uri = [];
  phenomena =[];
  descriptions = [];



  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit() {
    this.getDomainDetails();
  }

  getDomainDetails() {
    this.route.params.subscribe(res => {
      this.api.getDomain(res.iri).subscribe((res:Array<any>) => {
        res.forEach(element => {
          switch (Object.getOwnPropertyNames(element)[0]) {
  
            case "description" : {
                this.descriptions.push({value: element.description.value, lang: element.description["xml:lang"]});
                break;
            }
  
            case "phenomena" : {
              this.phenomena.push({iri: element.phenomena.value, label: element.phenomenaLabel.value, short: element.phenomena.value.slice(34)});
              break;
            }
  
            case "iri" : {
              this.uri.push({ iri: element.iri.value, label: element.label.value, short: element.iri.value.slice(34)});
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
        // this.max = this.getMaxArrayLength();
        // console.log(this.uri);

}
