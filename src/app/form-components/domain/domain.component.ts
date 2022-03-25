import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'senph-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }
  domainsArray;
  validationMessages = {
    'domain': {
      'required': 'Please select a domain.'
    } 
  };
  deletedDomains = new FormArray([]);

  ngOnInit() {
    this.retrieveDomains();
  }

  get domain(): FormArray {
    return this.parentForm.get('domain') as FormArray;
  } 

  addDomainButtonClick(): void {
    (<FormArray>this.parentForm.get('domain')).push(this.addDomainFormGroup());
  }

  addDomainFormGroup(): FormGroup {
    return this.fb.group({
      domain: ['', [Validators.required]],
      exists: [false, [Validators.required]]
    });
  }

  getSelectedDomain(id) {
    return this.parentForm.value.domain[id].domain;
  }

  retrieveDomains() {
    this.api.getDomains().subscribe(res => {
      this.domainsArray = res;
      // console.log("DOMAINS",res)
      // this.domainsArray = this.domainsArray.filter(function (el) {
      //   return el.domain.type != 'bnode'
      // })
      // console.log(this.domainsArray);
      // this.domainsArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      // console.dir(this.domainsArray);
    });
  }

  removeDomainButtonClick(skillGroupIndex: number): void {

    let deletedDomain = (<FormArray>this.parentForm.get('domain')).at(skillGroupIndex);
    console.log(deletedDomain.value)
    if (deletedDomain.value.exists === true) {
      this.deletedDomains.push(deletedDomain);
      console.log(this.deletedDomains)
      this.parentForm.setControl(
        "deletedDomains",
        this.deletedDomains
      )
    }

    (<FormArray>this.parentForm.get('domain')).removeAt(skillGroupIndex);
  }
}

