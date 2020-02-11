import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service'

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


  ngOnInit() {
    this.retrieveDomains();
  }

  addDomainButtonClick(): void {
    (<FormArray>this.parentForm.get('domain')).push(this.addDomainFormGroup());
  }

  addDomainFormGroup(): FormGroup {
    return this.fb.group({
      domainUri: ['', [Validators.required]]
    });
  }

  getSelectedDomain(id) {
    return this.parentForm.value.domain[id].domainUri;
  }

  retrieveDomains() {
    this.api.getDomains().subscribe(res => {
      this.domainsArray = res;
      this.domainsArray = this.domainsArray.filter(function (el) {
        return el.domain.type != 'bnode'
      })
      // console.log(this.domainsArray);
      this.domainsArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      // console.dir(this.domainsArray);
    });
  }

  removeDomainButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.parentForm.get('domain')).removeAt(skillGroupIndex);
  }
}

