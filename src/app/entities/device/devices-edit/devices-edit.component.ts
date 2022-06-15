import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { ILabel } from "src/app/interfaces/ILabel";
import { IDevice } from "src/app/interfaces/IDevice";
import { ISensors } from "src/app/interfaces/ISensors";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";

import { LabelLanguagePipePipe } from 'src/app/pipes/label-language-pipe.pipe'

import { FileUploader } from "ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

import { HttpClient } from "@angular/common/http";
import { UploadResult } from "src/app/interfaces/uploadResult";


@Component({
  selector: "senph-devices-edit",
  templateUrl: "./devices-edit.component.html",
  styleUrls: ["./devices-edit.component.scss"],
})
export class DevicesEditComponent implements OnInit {
  APIURL = environment.api_url;

  public uploader: FileUploader = new FileUploader({
    url: this.APIURL + "/image/upload",
    itemAlias: "image",
    authToken: window.localStorage.getItem("sb_accesstoken"),
    additionalParameter: {
      uri: null,
      name: null
    },
  });

  previewPath: any;

  heroBannerString = "http://sensors.wiki/SENPH#";
  deviceForm: FormGroup;
  deleteDeviceForm: FormGroup;

  validationMessages = {
    // id: {
    //   required: "URI is required.",
    //   uriSyntax: "No white spaces allowed in URI.",
    // },
    label: {
      required: "Label is required.",
    },
    description: {
      required: "Description is required.",
    },
    image: {
      required:
        "Provide an image link or use the checkbox to set its value to undefined.",
      uriSyntax: "No white spaces allowed in Image-URL.",
    },
    sensor: {
      required: "Sensors are required."
    },
    translationIds: {
      required: "TranslationIds are required."
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
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private labelLanguagePipe: LabelLanguagePipePipe
  ) {
    this.doUpload = this.doUpload.bind(this);
  }

  ngOnInit() {
    this.previewPath = "//:0";

    this.deviceForm = this.fb.group({
      id: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: this.addDescriptionFormGroup(),
      markdown: this.addMarkdownFormGroup(),
      website: [{ value: null, disabled: false }, [Validators.required, CustomValidators.uriSyntax]],
      contact: [{ value: null, disabled: false }, [Validators.required]],
      image: [{ value: null, disabled: false }],
      sensor: this.fb.array([this.addSensorFormGroup()]),
      validation: [false, [Validators.required]],
      deletedLabels: this.fb.array([]),
      deletedSensors: this.fb.array([]),
      translationIds: [[], [Validators.required]]
    }, {validators: CustomValidators.englishLabel});

    this.deviceForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.deviceForm);
    });

    this.uploader.onAfterAddingFile = (file) => {

      var inputValue = (<HTMLInputElement>(
        document.getElementById("imageUpload")
      )).value;
      var extension = inputValue.slice(inputValue.lastIndexOf("."));
      // this.deviceForm.value.image = extension;
      var imageFileName = this.deviceForm.get("slug").value + extension;
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
      this.redirectDetails(this.shortUri);
    };

    this.route.paramMap.subscribe((params) => {
      this.shortUri = params.get("id");
      if (this.shortUri) {
        this.getDevice(this.shortUri);
      }
    });
  }

  logValidationErrors(group: FormGroup = this.deviceForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = "";
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== null || this.submitted)) {
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
      translationId: [null, [Validators.required]],
      value: ["", [Validators.required]],
      lang: ["", [Validators.required]],
    });
  }

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      text: [""]
    })
  }

  addMarkdownFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      text: [""]
    })
  }

  addSensorFormGroup(): FormGroup {
    return this.fb.group({
      sensor: [null, [Validators.required]],
      exists: [true, [Validators.required]]
    });
  }

  getDevice(shortUri) {
    this.api.getDevice(shortUri).subscribe(
      (device) => this.editDevice(device),
      (err: any) => console.log(err)
    );
  }

  editDevice(device) {
    console.log(device)
    this.deviceForm.patchValue({
      id: device.id,
      slug: device.slug,
      image: device.image,
      website: device.website,
      contact: device.contact,      
    });

    this.deviceForm.setControl(
      "label", 
      this.setExistingLabels(device.labels));

    this.deviceForm.controls['description'].patchValue({
      translationId: device.description.item[0].translationId,
      text: device.description ? this.labelLanguagePipe.transform(device.description.item) : '',
    });

    this.deviceForm.controls['markdown'].patchValue({
      translationId: device.markdown.item[0].translationId,
      text: device.markdown ? this.labelLanguagePipe.transform(device.markdown.item) : '',
    });

    this.deviceForm.setControl(
      "sensor",
      this.setExistingSensors(device.sensors)
    );

    if (device.image !== null) {
      this.previewPath = this.APIURL + "/images/upload/" + device.image;
    }

    this.deviceForm.patchValue({
      translationIds: this.setTranslationIds(device),
    })
    
    this.deleteDeviceForm = this.deviceForm
  }

  setExistingSensors(sensorSet: ISensors[]): FormArray {
    const formArray = new FormArray([]);
    // console.log(sensorSet);
    sensorSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          sensor: [{value: s.sensor, disabled: true}, [Validators.required]],
          exists: [true, [Validators.required]],
        })
      );
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
      // if (s.languageCode == 'en') {
      //   formArray.controls[formArray.length-1].disable()//[formArray.length-1]) //.controls['value'].disable();
      // };
    });
    return formArray;
  }

  setTranslationIds(device: IDevice) {
    const array = [];
    array.push(device.labels[0].translationId);
    array.push(device.description["item"][0].translationId);
    array.push(device.markdown["item"][0].translationId);
    return array;
  } 

  redirectDetails(uri) {
    this._routerService.navigate(["/device/detail", uri]).then(() => {
      window.location.reload();
    });
  }

  onLoadButtonClick() {}

  deleteImage() {
    this.http
      .delete(this.APIURL + "/image/delete/" + this.deviceForm.value.image)
      .subscribe(
        (response) => {
          this.deviceForm.get("image").patchValue(null);
          bulmaToast.toast({
            message: "Delete successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    document.getElementById("image").style.visibility = "hidden";
  }

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

  onSubmit() {
    console.log(this.deviceForm.value)
    this.submitted = true;

    // this.uploader.setOptions({
    //   additionalParameter: {
    //     uri: this.deviceForm.value.id,
    //     name: this.deviceForm.value.image,
    //   },
    // });

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
      this.api.editDevice(this.deviceForm.getRawValue()).subscribe(
        (res) => {
          bulmaToast.toast({
            message: "Edit successful!",
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
            this.redirectDetails(this.shortUri);
          }
        },
        (error: any) => {
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
  }

  onDelete() {
    this.api.deleteDevice(this.deleteDeviceForm.getRawValue()).subscribe(
      (data) => {
        bulmaToast.toast({
          message: "Delete successful!",
          type: "is-success",
          dismissible: true,
          closeOnClick: true,
          animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
          position: "top-center",
          duration: 5000,
        });
        this._routerService.navigate(["/devices"]);
      },
      (error: any) => {
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }
}
