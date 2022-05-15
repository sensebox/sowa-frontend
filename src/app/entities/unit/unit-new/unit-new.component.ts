import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "./../../../services/error-modal.service";
import * as bulmaToast from "bulma-toast";
import { environment } from "src/environments/environment";

@Component({
  selector: 'senph-unit-new',
  templateUrl: './unit-new.component.html',
  styleUrls: ['./unit-new.component.scss']
})
export class UnitNewComponent implements OnInit {
  heroBannerString = "http://sensors.wiki/SENPH#";
  unitForm: FormGroup;
  submitted = false;
  shortUri: string;
  validationMessages = {
    id: {
      required: "URI is required.",
      uriSyntax: "No white spaces allowed in URI.",
    },
    name: {
      required: "Name is required.",
    },
    description: {
      required: "Description is required.",
    },
  };
  formErrors: FormErrors = {};
  APIURL = environment.api_url;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService
  ) {}

  ngOnInit() {
    this.unitForm = this.fb.group({
      id: [null],
      name: ["", [Validators.required]],
      description: this.addDescriptionFormGroup(),
    });

    this.unitForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.unitForm);
    });
  }

  logValidationErrors(group: FormGroup = this.unitForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = "";
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched ||
            abstractControl.dirty ||
            abstractControl.value !== "" ||
            this.submitted)
        ) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + " ";
            }
          }
        }
      }
    });
  }

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null],
      text: [""]
    })
  }

  onSubmit() {

    console.log(this.unitForm)

    this.submitted = true;
    if (this.unitForm.invalid) {
      bulmaToast.toast({
        message:
          "Some necessary information is missing! Please check your form.",
        type: "is-danger",
        dismissible: true,
        closeOnClick: true,
        animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
        position: "center",
        pauseOnHover: true,
        duration: 5000,
      });
    } else {
      this.api.createUnit(this.unitForm.value).subscribe(
        (res) => {
          this.unitForm.reset();
          bulmaToast.toast({
            message: "New unit added successfully!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
          this._routerService.navigate(["/units"]).then(() => {
            window.location.reload();
          });
        },
        (error: any) => {
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
  }

}
