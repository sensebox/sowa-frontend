import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";
import { environment } from "src/environments/environment";

import { FileUploader } from "ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";

import { UploadResult } from "src/app/interfaces/uploadResult";
import { HttpClient } from "@angular/common/http";


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
    itemAlias: "image",
    authToken: window.localStorage.getItem("sb_accesstoken"),
    additionalParameter: {
      uri: null,
      name: null,
    },
  });

  heroBannerString = "http://sensors.wiki/SENPH#";
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
    translationId: {
      required: 'Translation ID is required.'
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
    private http: HttpClient
  ) {
    this.doUpload = this.doUpload.bind(this);
  }

  ngOnInit() {
    this.previewPath = "//:0";

    this.deviceForm = this.fb.group({
      id: [null],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: this.addDescriptionFormGroup(),
      markdown: this.addMarkdownFormGroup(),
      website: [{ value: "", disabled: false }, [Validators.required, CustomValidators.uriSyntax]],
      contact: [{ value: "", disabled: false }, [Validators.required]],
      image: [{ value: null, disabled: false }],
      sensor: this.fb.array([this.addSensorFormGroup()]),
      validation: [false, [Validators.required]],
    }, {validators: CustomValidators.englishLabel});

    this.deviceForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.deviceForm);
    });

    this.uploader.onAfterAddingFile = (file) => {

      var inputValue = (<HTMLInputElement>(
        document.getElementById("imageUpload")
      )).value;
      var extension = inputValue.slice(inputValue.lastIndexOf("."));
      var imageFileName = this.deviceForm.get("label").value[0].value + extension;
      this.deviceForm.get("image").setValue(imageFileName, { emitEvent: false });
      this.deviceForm.patchValue({
        image: imageFileName,
      });
      console.log(this.deviceForm.get("image").value)

      this.uploader.queue = [];
      this.uploader.queue.push(file);
      file.withCredentials = false;

      this.previewPath = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file._file)
      );
      console.log(this.uploader.queue)

      this.uploader.options.additionalParameter.uri = this.deviceForm.value.id;
      this.uploader.options.additionalParameter.name = imageFileName;

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
      translationId: [null],
      value: ["", [Validators.required]],
      lang: ["", [Validators.required]],
    });
  }

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null],
      text: [""]
    })
  }

  addMarkdownFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null],
      text: [""]
    })
  }

  addSensorFormGroup(): FormGroup {
    return this.fb.group({
      sensor: [null, [Validators.required]],
      exists: [false, [Validators.required]]
    });
  }

  onLoadButtonClick() {}

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    let result: Array<UploadResult> = [];
    var fd = new FormData();
    for (let file of files) {
      var random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "_";
      fd.set('random', random);
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
            url: this.APIURL + '/images/markdown/' + random + file.name,
            isImg: file.type.indexOf("image") !== -1,
          });
        }
        resolve(result);
      }, 3000);
    });
  }

  deleteImage() {
    this.deviceForm.get("image").setValue(null);
    this.uploader.queue.pop()
    bulmaToast.toast({
      message: "Delete successful!",
      type: "is-success",
      dismissible: true,
      closeOnClick: true,
      animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
      position: "top-center",
      duration: 5000,
    });
    // document.getElementById("image").style.visibility = "hidden";
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.deviceForm)

    if (this.deviceForm.invalid) {
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
      this.api.createDevice(this.deviceForm.getRawValue()).subscribe(
        (res) => {
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
          if (this.uploader.queue.length == 1) {
            this.uploader.uploadAll();
          } else {
            this._routerService.navigate(["/devices"]).then(() => {
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
  }
}
