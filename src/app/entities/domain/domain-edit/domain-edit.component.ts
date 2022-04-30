import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { ILabel } from 'src/app/interfaces/ILabel';
import { IDomain } from 'src/app/interfaces/IDomain';
import { IPhenomena } from 'src/app/interfaces/IPhenomena';
import { FormErrors } from 'src/app/interfaces/form-errors';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import * as bulmaToast from "bulma-toast";


@Component({
  selector: 'senph-domain-edit',
  templateUrl: './domain-edit.component.html',
  styleUrls: ['./domain-edit.component.scss']
})
export class DomainEditComponent implements OnInit {

  //   constructor(
  //     private route:ActivatedRoute,
  //     private api:ApiService
  //   ) { }
  //     // iri;
  //   languageTags = [{name: 'english', short: 'en'}, {name: 'german', short: 'de'},
  //   {name: 'spanish', short: 'es'}, {name: 'italian', short: 'it'}];

  //   domainModel = new Domain(
  //     "",
  //     { 
  //       label: "",
  //       lang: this.languageTags[0].short
  //     },
  //     { 
  //       comment: "",
  //       lang: this.languageTags[0].short
  //     }
  //   );

  //   submitted = false;
  //   ngOnInit(){
  //     // this.route.params.subscribe(res => {
  //     //   this.iri = res.iri;
  //     // });
  //   }
  //   onSubmit() { 
  //     this.api.updateDomain(this.domainModel).subscribe(res => {(res)});
  //     this.diagnostic(this.domainModel);
  //   }

  //   // TODO: Remove this when we're done
  //   diagnostic(model) { (model); }
  // }

  heroBannerString = "http://sensors.wiki/SENPH#";
  domainForm: FormGroup;
  deleteDomainForm: FormGroup;

  validationMessages = {
    id: {
      required: 'URI is required.',
      uriSyntax: 'No white spaces allowed in URI.'
    },
    label: {
      required: 'Label is required.'
    },
    description: {
      required: 'Description is required.'
    },
    translationId: {
      required: 'Translation ID is required.'
    },
    translationIds: {
      required: 'Translation IDs are required.'
    },
  };

  formErrors: FormErrors = {
  };
  shortUri: string;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService
  ) { }

  ngOnInit() {
    this.domainForm = this.fb.group({
      id: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: this.addDescriptionFormGroup(),
      phenomenon: this.fb.array([this.addPhenomenonFormGroup()]),
      validation: [false, [Validators.required]],
      deletedLabels: this.fb.array([]),
      deletedPhenomena: this.fb.array([]),
      translationIds: [[], [Validators.required]]
    })

    this.domainForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.domainForm);
      }
    );

    this.route.paramMap.subscribe(params => {
      this.shortUri = params.get('id');
      if (this.shortUri) {
        this.getDomain(this.shortUri);
      }
    });
  }


  logValidationErrors(group: FormGroup = this.domainForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '' || this.submitted)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      value: [null, [Validators.required]],
      lang: [null, [Validators.required]],
    });
  }

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      text: [""]
    })
  }

  addPhenomenonFormGroup(): FormGroup {
    return this.fb.group({
      phenomenon: [null, [Validators.required]],
      exists: [true, [Validators.required]]
    });
  }

  getDomain(shortUri) {
    this.api.getDomain(shortUri).subscribe(
      (domain) => this.editDomain(domain),
      (err: any) => (err)
    );
  }

  editDomain(domain) {
    console.log(domain)
    this.domainForm.patchValue({
      id: domain.id,
      validation: domain.validation
    });

    this.domainForm.setControl(
      'label', 
      this.setExistingLabels(domain.labels)
    );

    this.domainForm.controls['description'].patchValue({
      translationId: domain.description.item[1].translationId,
      text: domain.description ? domain.description.item[1].text : '',
    });

    this.domainForm.setControl(
      'phenomenon', 
      this.setExistingPhenomena(domain.phenomena)
    );

    this.domainForm.patchValue({
      translationIds: this.setTranslationIds(domain),
    })

    this.deleteDomainForm = this.domainForm;
  }

  setExistingPhenomena(phenomenaSet: IPhenomena[]): FormArray {
    const formArray = new FormArray([]);
    (phenomenaSet);
    phenomenaSet.forEach(s => {
      formArray.push(this.fb.group({
        phenomenon: [{value: s.phenomenon, disabled: true}, [Validators.required]],
        exists: [true, [Validators.required]]
      }));
    });
    return formArray;
  }

  setExistingLabels(labelSet: ILabel[]): FormArray {
    const formArray = new FormArray([]);
    labelSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          translationId: [s.translationId, [Validators.required]],
          value: [s.text, [Validators.required]],
          lang: [{value: s["languageCode"], disabled: true}, [Validators.required]],
        })
      );
    });
    return formArray;
  }

  setTranslationIds(sensor: IDomain) {
    console.log(sensor)
    const array = [];
    array.push(sensor.labels[0].translationId);
    array.push(sensor.description["item"][0].translationId);
    return array;
  } 

  redirectDetails(uri) {
    this._routerService.navigate(['/domain/detail', uri]);
  }

  onLoadButtonClick() {
    (this.domainForm.getRawValue());
  }


  onSubmit() {
    console.log(this.domainForm.getRawValue())
    // (this.domainForm.value);
    this.submitted = true;
    if (this.domainForm.invalid) {
      ("invalid");
      bulmaToast.toast({
        message: "Some necessary information is missing! Please check your form.",
        type: "is-danger",
        dismissible: true,
        closeOnClick: true,
        animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
        position: "center",
        pauseOnHover: true,
        duration: 5000
      });
    }
    else {
      ("valid");
      this.api.editDomain(this.deleteDomainForm.getRawValue()).subscribe(res => {
        (res);
        bulmaToast.toast({
          message: "Edit successful!",
          type: "is-success",
          dismissible: true,
          closeOnClick: true,
          animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
          position: "top-center",
          duration: 5000
        });
        this.redirectDetails(this.shortUri);

      },
        (error: any) => {
          (error)
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
  }

  onDelete() {
    this.api.deleteDomain(this.domainForm.getRawValue()).subscribe(
      (data) => {
        (data);
        bulmaToast.toast({
          message: "Delete successful!",
          type: "is-success",
          dismissible: true,
          closeOnClick: true,
          animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
          position: "top-center",
          duration: 5000
        });
        this._routerService.navigate(['/domains']);
      },
      (error: any) => {
        (error)
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }

}


