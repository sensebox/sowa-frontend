import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { ILabel } from "src/app/interfaces/ILabel";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";

import { FileItem, FileUploader } from "ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UploadResult } from "src/app/interfaces/uploadResult";

@Component({
  selector: "senph-sensor-edit",
  templateUrl: "./sensor-edit.component.html",
  styleUrls: ["./sensor-edit.component.scss"],
})
export class SensorEditComponent implements OnInit {
  APIURL = environment.api_url;

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
  sensorForm: FormGroup;
  submitted = false;
  shortUri: string;

  previewPath: any;

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
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.doUpload = this.doUpload.bind(this);
  }

  ngOnInit() {
    this.previewPath = "//:0";

    this.sensorForm = this.fb.group({
      id: [null, [Validators.required]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: this.addDescriptionFormGroup(),
      // markdown: this.addMarkdownFormGroup(),
      sensorElement: this.fb.array([this.addSensorElementFormGroup()]),
      device: this.fb.array([this.addDeviceFormGroup()]),
      manufacturer: [{ value: null, disabled: false }, [Validators.required]],
      price: [{ value: null, disabled: false }, [Validators.required]],
      datasheet: [{ value: null, disabled: false }, [Validators.required, CustomValidators.uriSyntax]],
      lifeperiod: [{ value: null, disabled: false }, [Validators.required]],
      image: [{ value: null, disabled: false }, [CustomValidators.uriSyntax]],
      validation: [false, [Validators.required]],
      deletedLabels: this.fb.array([]),
      deletedDevices: this.fb.array([]),
      deletedSensorElements: this.fb.array([]),
    });

    this.sensorForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.sensorForm);
    });

    this.uploader.onAfterAddingFile = (file) => {

      var inputValue = (<HTMLInputElement>(
        document.getElementById("imageUpload")
      )).value;
      var extension = inputValue.slice(inputValue.lastIndexOf("."));
      var imageFileName = this.sensorForm.get("label").value[0].value + extension;
      this.sensorForm.get("image").setValue(imageFileName, { emitEvent: false });
      this.sensorForm.patchValue({
        image: imageFileName,
      });
      console.log(this.sensorForm.get("image").value)

      this.uploader.queue = [];
      this.uploader.queue.push(file);
      file.withCredentials = false;
      this.previewPath = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file._file)
      );
      
      this.uploader.options.additionalParameter.uri = this.sensorForm.value.id;
      this.uploader.options.additionalParameter.name = imageFileName;
      
      // console.log(this.sensorForm.value.image)
      // console.log(this.uploader)
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
        this.getSensor(this.shortUri);
      }
    });
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

  addSensorElementFormGroup(): FormGroup {
    return this.fb.group({
      sensorElementId: [null, [Validators.required]],
      phenomenonId: [null, [Validators.required]],
      unitId: [null, [Validators.required]],
      // unitOfAccuracy: [{ value: null, disabled: false }, [Validators.required]],
      unitUndefined: [false],
      accuracyValue: [{ value: null, disabled: false }, [Validators.required]],
      accValUndefined: [false],
      exists: [true, [Validators.required]]
    });
  }

  addDeviceFormGroup(): FormGroup {
    return this.fb.group({
      device: ["", [Validators.required]],
      exists: [true, [Validators.required]]
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

  // addMarkdownFormGroup(): FormGroup {
  //   return this.fb.group({
  //     translationId: [null, [Validators.required]],
  //     text: [""]
  //   })
  // }

  getSensor(shortUri) {
    this.api.getSensor(shortUri).subscribe(
      (sensor) => this.editSensor(sensor)
    );
  }

  editSensor(sensor) {
    console.log(sensor);
    this.sensorForm.patchValue({
      id: sensor.id,
      manufacturer: sensor.manufacturer,
      price: sensor.price,
      datasheet: sensor.datasheet,
      lifeperiod: sensor.lifePeriod,
      image: sensor.image,
      validation: sensor.validation
    })

    this.sensorForm.setControl(
      "label", 
      this.setExistingLabels(sensor.labels)
    );

    this.sensorForm.controls['description'].patchValue({
      translationId: sensor.description.item[1].translationId,
      text: sensor.description ? sensor.description.item[1].text : '',
    });

    // this.sensorForm.controls['markdown'].patchValue({
    //   translationId: sensor.markdown.item[1].translationId,
    //   text: sensor.markdown ? sensor.markdown.item[1].text : '',
    // });

    this.sensorForm.setControl(
      "sensorElement",
      this.setExistingSensorElements(sensor.sensorElements)
    );

    this.sensorForm.setControl(
      "device",
      this.setExistingDevices(sensor.devices)
    );
    
    if (sensor.image !== null) {
      this.previewPath = this.APIURL + "/images/upload/" + sensor.image;
    }
    
    console.log(this.sensorForm.value)

  }

  setExistingSensorElements(sensorElementSet): FormArray {
    const formArray = new FormArray([]);
    sensorElementSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          sensorElementId: [s.id, [Validators.required]],
          phenomenonId: [s.phenomenonId, [Validators.required]],
          unitId: [s.unitId, [Validators.required]],
          // unitOfAccuracy: [
          //   {
          //     value: s.unit,
          //     disabled: s.unit === null,
          //   },
          //   [Validators.required],
          // ],
          unitUndefined: [
            s.unit === null,
          ],
          accuracyValue: [
            { value: s.accuracy, disabled: s.accuracy === null },
            [Validators.required],
          ],
          accValUndefined: [s.accuracy === null],
          exists: [true, [Validators.required]],
        })
      );
    });
    return formArray;
  }

  setExistingDevices(deviceSet): FormArray {
    const formArray = new FormArray([]);
    deviceSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          device: [{value: s.device, disabled: true}, [Validators.required]],
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
    });
    return formArray;
  }

  get image(): FormArray {
    return this.sensorForm.get("image") as FormArray;
  }

  redirectDetails(uri) {
    this._routerService.navigate(["/sensor/detail", uri]).then(() => {
      window.location.reload();
    });
  }

  onLoadButtonClick() {}

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

  deleteImage() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        uri: this.sensorForm.value.id,
        name: this.sensorForm.value.image
      }
    }

    this.http
    .delete(this.APIURL + "/image/delete/" + this.sensorForm.value.image, options)
    .subscribe(
      (response) => {
        this.sensorForm.get("image").setValue(null);
        this.uploader.queue.pop()
        console.log(this.sensorForm.value)
        console.log(this.uploader.queue)
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

  onSubmit() {
    this.submitted = true;
    // this.uploader.setOptions({
    //   additionalParameter: {
    //     uri: this.sensorForm.value.id,
    //     name: this.sensorForm.value.image,
    //   },
    // });
    // console.dir(this.uploader.options)

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
      this.api.editSensor(this.sensorForm.getRawValue()).subscribe(
        (data) => {
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
    // this.diagnostic(this.sensorForm);
  }

  onDelete() {
    this.api.deleteSensor(this.sensorForm.getRawValue()).subscribe(
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
        this._routerService.navigate(["/sensors"]);
      },
      (error: any) => {
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }
  // this.diagnostic(this.sensorForm);
}
