import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { ILabel } from "src/app/interfaces/ILabel";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";

import { FileUploader } from "ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

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
      uri: "",
    },
  });

  heroBannerString = "http://www.opensensemap.org/SENPH#";
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
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.previewPath = "//:0";

    this.sensorForm = this.fb.group({
      uri: ["", [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: ["", [Validators.required]],
      sensorElement: this.fb.array([this.addSensorElementFormGroup()]),
      device: this.fb.array([this.addDeviceFormGroup()]),
      manufacturer: [{ value: "", disabled: false }, [Validators.required]],
      price: [{ value: "", disabled: false }, [Validators.required]],
      datasheet: [
        { value: "", disabled: false },
        [Validators.required, CustomValidators.uriSyntax],
      ],
      lifeperiod: [{ value: "", disabled: false }, [Validators.required]],
      image: [{ value: "", disabled: false }, [CustomValidators.uriSyntax]],
      validation: [false, [Validators.required]],
    });

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
      console.log("Uploaded File Details:", item);
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

    this.route.paramMap.subscribe((params) => {
      this.shortUri = params.get("id");
      if (this.shortUri) {
        this.uploader.options.additionalParameter.uri = this.shortUri;
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
      phenomenonUri: ["", [Validators.required]],
      unitOfAccuracy: [{ value: "", disabled: false }, [Validators.required]],
      unitUndefined: [false],
      accuracyValue: [{ value: "", disabled: false }, [Validators.required]],
      accValUndefined: [false],
    });
  }

  addDeviceFormGroup(): FormGroup {
    return this.fb.group({
      deviceUri: ["", [Validators.required]],
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      value: ["", [Validators.required]],
      lang: ["", [Validators.required]],
    });
  }

  getSensor(shortUri) {
    this.api.getSensor(shortUri).subscribe(
      (sensor) => this.editSensor(sensor),
      (err: any) => console.log(err)
    );
  }

  editSensor(sensor) {
    console.log(sensor);
    this.sensorForm.patchValue({
      uri: sensor.iri.value.slice(34),
      description: sensor.description.value,
      manufacturer: sensor.manufacturer.value,
      price: sensor.price.value,
      datasheet: sensor.datasheet.value,
      lifeperiod: sensor.lifeperiod ? sensor.lifeperiod.value : "",
      image: sensor.image ? sensor.image.value : "",
    });
    this.sensorForm.setControl("label", this.setExistingLabels(sensor.labels));

    this.sensorForm.setControl(
      "sensorElement",
      this.setExistingSensorElements(sensor.sensorElements)
    );

    this.sensorForm.setControl(
      "device",
      this.setExistingDevices(sensor.devices)
    );
  }

  setExistingSensorElements(sensorElementSet): FormArray {
    const formArray = new FormArray([]);
    // console.log(sensorElementSet);
    sensorElementSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          phenomenonUri: [s.phenomenon.value, [Validators.required]],
          unitOfAccuracy: [
            {
              value: s.unit.value,
              disabled: s.unit.value === "http://server/unset-base/undefined",
            },
            [Validators.required],
          ],
          unitUndefined: [
            s.unit.value === "http://server/unset-base/undefined",
          ],
          accuracyValue: [
            { value: s.accVal.value, disabled: s.accVal.value == "undefined" },
            [Validators.required],
          ],
          accValUndefined: [s.accVal.value === "undefined"],
        })
      );
    });

    return formArray;
  }

  setExistingDevices(deviceSet): FormArray {
    const formArray = new FormArray([]);
    // console.log(deviceSet);
    deviceSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          deviceUri: [s.device.value, [Validators.required]],
        })
      );
    });

    return formArray;
  }

  setExistingLabels(labelSet: ILabel[]): FormArray {
    const formArray = new FormArray([]);
    console.log(labelSet);
    labelSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          type: [s.type, [Validators.required]],
          value: [s.value, [Validators.required]],
          lang: [s["xml:lang"], [Validators.required]],
        })
      );
    });

    return formArray;
  }

  get image(): FormArray {
    return this.sensorForm.get("image") as FormArray;
  }

  redirectDetails(uri) {
    console.log("check");
    this._routerService.navigate(["/sensor/detail", uri]);
  }

  onLoadButtonClick() {
    console.log(this.sensorForm.value);
    console.log(this.sensorForm.getRawValue());
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
    var extension = inputValue.slice(inputValue.lastIndexOf('.'));
    this.sensorForm.value.image = extension;
    var imageFileName = this.sensorForm.get("uri").value + extension;
    this.sensorForm.get("image").setValue(imageFileName, { emitEvent: false });

    if (this.sensorForm.invalid) {
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
      this.api.editSensor(this.sensorForm.getRawValue()).subscribe(
        (data) => {
          console.log(data);
          bulmaToast.toast({
            message: "Edit successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
          this.uploader.uploadAll();
          this.redirectDetails(this.shortUri);
        },
        (error: any) => {
          console.log(error);
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
        console.log(data);
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
        console.log(error);
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }
  // this.diagnostic(this.sensorForm);
}
