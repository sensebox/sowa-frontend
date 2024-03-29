import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CustomValidators } from '../../../shared/custom.validators';
import { FormErrors } from 'src/app/interfaces/form-errors';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import * as bulmaToast from "bulma-toast";

import { IUnit } from 'src/app/interfaces/IUnit';
import { IRoV } from 'src/app/interfaces/IRoV';
import { LabelLanguagePipePipe } from 'src/app/pipes/label-language-pipe.pipe'

@Component({
  selector: 'senph-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss']
})
export class UnitEditComponent implements OnInit {

  heroBannerString = "http://sensors.wiki/SENPH#";
  unitForm: FormGroup;
  deleteUnitForm: FormGroup;

  validationMessages = {
    id: {
      required: 'URI is required.',
      uriSyntax: 'No white spaces allowed in URI.'
    },
    name: {
      required: "Name is required.",
    },
    notation: {
      required: "Notation is required.",
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
    validation: {
      required: 'Validation is required.'
    }
  };

  formErrors: FormErrors = {};
  shortUri: string;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService,
    private labelLanguagePipe: LabelLanguagePipePipe
  ) { }

  ngOnInit() {
    this.unitForm = this.fb.group({
      id: ['', [Validators.required, CustomValidators.uriSyntax]],
      name: ['', [Validators.required]],
      notation: ['', [Validators.required]],
      description: this.addDescriptionFormGroup(),
      sensorElement: this.fb.array([this.addSensorElementFormGroup()]),
      rov: this.fb.array([this.addRovFormGroup()]),
      translationIds: [[], [Validators.required]]
    })

    this.unitForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.unitForm);
      }
    );

    this.route.paramMap.subscribe(params => {
      this.shortUri = params.get('id');
      if (this.shortUri) {
        this.getUnit(this.shortUri);
      }
    });

  }

  logValidationErrors(group: FormGroup = this.unitForm): void {
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

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      text: [""]
    })
  }

  addSensorElementFormGroup(): FormGroup {
    return this.fb.group({
      sensorElementId: [null, [Validators.required]],
    });
  }

  addRovFormGroup(): FormGroup {
    return this.fb.group({
      rovId: [null, [Validators.required]],
    });
  }

  getUnit(shortUri) {
    this.api.getUnit(shortUri).subscribe(
      (domain) => this.editUnit(domain),
      (err: any) => (err)
    );
  }
  

  editUnit(unit) {
    // console.log(unit)
    this.unitForm.patchValue({
      id: unit.id,
      name: unit.name,
      notation: unit.notation
    });

    this.unitForm.controls['name'].disable();
    this.unitForm.controls['notation'].disable();

    this.unitForm.controls['description'].patchValue({
      translationId: unit.description.item[0].translationId,
      text: unit.description ? this.labelLanguagePipe.transform(unit.description.item) : '',
    });

    this.unitForm.setControl(
      "sensorElement",
      this.setExistingSensorElements(unit.sensorElements)
    );

    this.unitForm.setControl(
      "rov",
      this.setExistingRovs(unit.rovs)
    );

    this.unitForm.patchValue({
      translationIds: this.setTranslationIds(unit),
    })

    this.deleteUnitForm = this.unitForm;
  }

  setExistingSensorElements(sensorElementSet): FormArray {
    const formArray = new FormArray([]);
    sensorElementSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          sensorElementId: [s.id, [Validators.required]],
        })
      );
    });
    return formArray;
  }

  setExistingRovs(rovSet: IRoV[]): FormArray {
    const formArray = new FormArray([]);
    rovSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          rovId: [s.rovId, [Validators.required]]
        })
      );
    });

    return formArray;
  }

  setTranslationIds(unit: IUnit) {
    // console.log(unit)
    const array = [];
    array.push(unit.description["item"][0].translationId);
    return array;
  } 

  redirectDetails(uri) {
    this._routerService.navigate(['/unit/detail', uri]);
  }

  onLoadButtonClick() {
    (this.unitForm.getRawValue());
  }

  onSubmit() {
    console.log(this.unitForm.getRawValue())
    // (this.domainForm.value);
    this.submitted = true;
    if (this.unitForm.invalid) {
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
      this.api.editUnit(this.unitForm.getRawValue()).subscribe(res => {
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
    this.api.deleteUnit(this.deleteUnitForm.getRawValue()).subscribe(
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
        this._routerService.navigate(['/units']);
      },
      (error: any) => {
        (error)
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }

}
