import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { ILabel } from "src/app/interfaces/ILabel";
import { ISensors } from "src/app/interfaces/ISensors";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";
import { environment } from 'src/environments/environment';

import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: "senph-device-new",
  templateUrl: "./device-new.component.html",
  styleUrls: ["./device-new.component.scss"],
})
export class DeviceNewComponent implements OnInit {

  APIURL = environment.api_url;

  previewPath: any;

  public uploader: FileUploader = new FileUploader({
    url: this.APIURL + "/image/upload",
    itemAlias: 'image',
    authToken : window.localStorage.getItem('sb_accesstoken'),
    additionalParameter: {
      uri: ""
    }
  })

  heroBannerString = "http://www.opensensemap.org/SENPH#";
  deviceForm: FormGroup;

  validationMessages = {
    uri: {
      required: "URI is required.",
      uriSyntax: "No white spaces allowed in URI.",
    },
    label: {
      required: "Label is required.",
    },
    description: {
      required: "Description is required.",
    },
    website: {
      required:
        "Provide a datasheet link or use the checkbox to set its value to undefined.",
      uriSyntax: "No white spaces allowed in Datasheet-URL.",
    },
    contact: {
      required:
        "Provide a lifeperiod or use the checkbox to set its value to undefined.",
    },
    image: {
      required:
        "Provide an image link or use the checkbox to set its value to undefined.",
      uriSyntax: "No white spaces allowed in Image-URL.",
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
    private errorService: ErrorModalService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.previewPath ='//:0';

    this.deviceForm = this.fb.group({
      uri: ["", [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: ["", [Validators.required]],
      website: [
        { value: "", disabled: false },
        [Validators.required, CustomValidators.uriSyntax],
      ],
      image: [
        { value: "", disabled: false },
        [Validators.required, CustomValidators.uriSyntax],
      ],
      contact: [{ value: "", disabled: false }, [Validators.required]],
      sensor: this.fb.array([this.addSensorFormGroup()]),
      validation: [false, [Validators.required]],
    });

    this.deviceForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.deviceForm);
    });

    this.uploader.onAfterAddingFile = (file) => {
      this.uploader.queue = [];
      this.uploader.queue.push(file);
      file.withCredentials = false;
      this.previewPath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      bulmaToast.toast({
        message: "Image successfully uploaded!",
        type: "is-success",
        dismissible: true,
        closeOnClick: true,
        animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
        position: "top-center",
        duration: 5000,
      });
    };
  }

  logValidationErrors(group: FormGroup = this.deviceForm): void {
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
      type: "literal",
      value: ["", [Validators.required]],
      lang: ["", [Validators.required]],
    });
  }

  addSensorFormGroup(): FormGroup {
    return this.fb.group({
      sensorUri: ["", [Validators.required]],
    });
  }

  onLoadButtonClick() {
    console.log(this.deviceForm.getRawValue());
  }

  onSubmit() {
    this.submitted = true;

    this.uploader.setOptions({
      additionalParameter: {
        uri: this.deviceForm.get('uri').value
      }
    })

    var inputValue = (<HTMLInputElement>document.getElementById('imageUpload')).value;
    var extension = inputValue.slice(inputValue.lastIndexOf('.'));
    this.deviceForm.value.image = extension;
    var imageFileName = this.deviceForm.get('uri').value + extension;
    this.deviceForm.get("image").setValue(imageFileName, { emitEvent: false });

    console.log(this.deviceForm.getRawValue());

    if (this.deviceForm.invalid) {
      console.log("invalid");
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
      console.log("valid");
      this.api.createDevice(this.deviceForm.getRawValue()).subscribe(
        (res) => {
          console.log(res);
          this.deviceForm.reset();
          bulmaToast.toast({
            message: "New device added successfully!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
          this.uploader.uploadAll();
          this._routerService.navigate(["/devices"]).then(() => {
            window.location.reload();
          });
        },
        (error: any) => {
          console.log(error);
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
  }
}
