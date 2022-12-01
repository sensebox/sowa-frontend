import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";

@Component({
  selector: "senph-domain-new",
  templateUrl: "./domain-new.component.html",
  styleUrls: ["./domain-new.component.scss"],
})
export class DomainNewComponent implements OnInit {
  heroBannerString = "http://sensors.wiki/SENPH#";
  domainForm: FormGroup;
  validationMessages = {
    id: {
      required: "URI is required.",
      uriSyntax: "No white spaces allowed in URI.",
    },
    label: {
      required: "Label is required.",
    },
    description: {
      required: "Description is required.",
    },
    translationId: {
      required: 'Translation ID is required.'
    },
    translationIds: {
      required: 'Translation IDs are required.'
    },
  };
  formErrors: FormErrors = {};
  shortUri: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService
  ) {}

  ngOnInit() {
    this.domainForm = this.fb.group({
      id: [null],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: this.addDescriptionFormGroup(),
      phenomenon: this.fb.array([this.addPhenomenonFormGroup()]),
      validation: [false, [Validators.required]],
    }, {validators: CustomValidators.englishLabel});

    this.domainForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.domainForm);
    });
  }

  logValidationErrors(group: FormGroup = this.domainForm): void {
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

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null],
      value: [null, [Validators.required]],
      lang: ["", [Validators.required]],
    });
  }

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null],
      text: [""]
    })
  }

  addPhenomenonFormGroup(): FormGroup {
    return this.fb.group({
      phenomenon: [null, [Validators.required]],
      exists: [true, [Validators.required]]
    });
  }

  onLoadButtonClick() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.domainForm.invalid) {
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
      this.api.createDomain(this.domainForm.getRawValue()).subscribe(
        (res) => {
          this.domainForm.reset();
          bulmaToast.toast({
            message: "New domain added successfully!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
          this._routerService.navigate(["/domains"]).then(() => {
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
