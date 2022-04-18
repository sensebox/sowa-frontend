import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { ILabel } from "src/app/interfaces/ILabel";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "./../../../services/error-modal.service";
import * as bulmaToast from "bulma-toast";
import { environment } from "src/environments/environment";

import { FileUploader } from "ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";
import { isQuote } from "@angular/compiler";
import { ValidatorFn } from "@angular/forms";
import { ValidationServiceService } from "src/app/services/validation-service.service";
import { HttpClient } from "@angular/common/http";

import { UploadResult } from "src/app/interfaces/uploadResult";

@Component({
  selector: "senph-sensor-new",
  templateUrl: "./sensor-new.component.html",
  styleUrls: ["./sensor-new.component.scss"],
})
export class SensorNewComponent implements OnInit {
  heroBannerString = "http://sensors.wiki/SENPH#";
  sensorForm: FormGroup;
  submitted = false;
  shortUri: string;

  APIURL = environment.api_url;

  previewPath: any;

  public uploader: FileUploader = new FileUploader({
    url: this.APIURL + "/image/upload",
    itemAlias: "image",
    authToken: window.localStorage.getItem("sb_accesstoken"),
    additionalParameter: {
      uri: "",
    },
  });

  validationMessages = {
    uri: {
      required: "URI is required.",
      uriSyntax: "No white spaces allowed in URI.",
      urlValidator: "URI exists already.",
    },
    label: {
      required: "Label is required.",
    },
    description: {
      required: "Description is required.",
    },
    manufacturer: {
      required:
        "Type a manufacturer or use the checkbox to set its value to undefined.",
    },
    price: {
      required:
        "Provide a price or use the checkbox to set its value to undefined.",
    },
    datasheet: {
      required:
        "Provide a datasheet link or use the checkbox to set its value to undefined.",
      uriSyntax: "No white spaces allowed in Datasheet-URL.",
    },
    lifeperiod: {
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService,
    private validationService: ValidationServiceService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.doUpload = this.doUpload.bind(this);
  }

  ngOnInit() {
    this.previewPath = "//:0";

    this.sensorForm = this.fb.group(
      {
        id: [null, [Validators.required]],
        label: this.fb.array([this.addLabelFormGroup()]),
        description: ["", [Validators.required]],
        markdown: [""],
        sensorElement: this.fb.array([this.addSensorElementFormGroup()]),
        device: this.fb.array([this.addDeviceFormGroup()]),
        manufacturer: [{ value: "", disabled: false }, [Validators.required]],
        price: [{ value: "", disabled: false }, [Validators.required]],
        datasheet: [{ value: "", disabled: false },[Validators.required, CustomValidators.uriSyntax],],
        lifeperiod: [{ value: "", disabled: false }, [Validators.required]],
        image: [{ value: "", disabled: false }, [CustomValidators.uriSyntax]],
        validation: [false, [Validators.required]],
      },
      { updateOn: "blur" }
    );

    this.sensorForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.sensorForm);
    });

    this.uploader.onAfterAddingFile = (file) => {
      this.uploader.queue = [];
      this.uploader.queue.push(file);
      file.withCredentials = false;

      this.previewPath = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file._file)
      );
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      bulmaToast.toast({
        message: "Image successfully uploaded!",
        type: "is-success",
        dismissible: true,
        closeOnClick: true,
        animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
        position: "top-center",
        duration: 5000,
      });
      this._routerService.navigate(["/devices"]).then(() => {
        window.location.reload();
      });
    };
  }

  logValidationErrors(group: FormGroup = this.sensorForm): void {
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

  onUriChange(event: any) {
    var currentUri = event.target.value;
    this.api.getSensor(currentUri).subscribe({
      next(res) {
        if (res.labels.length >= 1) {
          bulmaToast.toast({
            message: "Uri already exists!",
            type: "is-danger",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
        }
      },
    });
  }

  addSensorElementFormGroup(): FormGroup {
    return this.fb.group({
      phenomenonId: ["", [Validators.required]],
      unitId: [null, [Validators.required]],
      unitOfAccuracy: [{ value: "", disabled: false }, [Validators.required]],
      unitUndefined: [false],
      accuracyValue: [{ value: "", disabled: false }, [Validators.required]],
      accValUndefined: [false],
    });
  }

  addDeviceFormGroup(): FormGroup {
    return this.fb.group({
      device: ["", [Validators.required]],
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      value: ["", [Validators.required]],
      lang: ["", [Validators.required]],
    });
  }

  get image(): FormArray {
    return this.sensorForm.get("image") as FormArray;
  }

  redirectDetails(id) {
    this._routerService.navigate(["/sensor/detail", id]);
  }

  onLoadButtonClick() {}

  clickButton() {
    console.log(this.sensorForm.getRawValue());
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    let result: Array<UploadResult> = [];
    var fd = new FormData();
    for (let file of files) {
      var random =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        "_";
      fd.set("random", random);
      fd.append("files", file);
    }
    this.http
      .post<File>(this.APIURL + "/image/upload/markdown", fd, {
        headers: {
          Authorization: window.localStorage.getItem("sb_accesstoken"),
        },
      })
      .subscribe((res) => {
        console.log(res);
      });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let file of files) {
          result.push({
            name: file.name,
            url: this.APIURL + "/images/markdown/" + random + file.name,
            isImg: file.type.indexOf("image") !== -1,
          });
        }
        resolve(result);
      }, 3000);
    });
  }

  onSubmit() {
    this.submitted = true;

    this.uploader.setOptions({
      additionalParameter: {
        uri: this.sensorForm.get("uri").value,
      },
    });
    // console.log(this.devicesArray);
    // this.sensorForm.controls.sensorElement.forEach(element => {
    //   element.accuracyValue.toFixed(10);
    // });
    var inputValue = (<HTMLInputElement>document.getElementById("imageUpload"))
      .value;
    var extension = inputValue.slice(inputValue.lastIndexOf("."));
    this.sensorForm.value.image = extension;
    var imageFileName = this.sensorForm.get("uri").value + extension;
    this.sensorForm.get("image").setValue(imageFileName, { emitEvent: false });

    if (this.sensorForm.invalid) {
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
      this.api.createSensor(this.sensorForm.getRawValue()).subscribe(
        (data) => {
          this.sensorForm.reset();
          bulmaToast.toast({
            message: "New sensor added successfully!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
          if (this.uploader.queue.length == 1) {
            this.uploader.uploadAll();
          } else {
            this._routerService.navigate(["/sensors"]).then(() => {
              window.location.reload();
            });
          }
        },
        (error: any) => {
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
    // this.diagnostic(this.sensorForm);
  }
}
