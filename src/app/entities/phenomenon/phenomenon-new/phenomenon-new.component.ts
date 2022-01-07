import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CustomValidators } from "../../../shared/custom.validators";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { IDomains } from "../../../interfaces/IDomains";
import { IUnit } from "../../../interfaces/IUnit";
import { ILabel } from "src/app/interfaces/ILabel";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";

import { UploadResult } from "src/app/interfaces/uploadResult";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "senph-phenomenon-new",
  templateUrl: "./phenomenon-new.component.html",
  styleUrls: ["./phenomenon-new.component.scss"],
})
export class PhenomenonNewComponent implements OnInit {

  heroBannerString = "http://sensors.wiki/SENPH#";
  APIURL = environment.api_url;
  phenomenonForm: FormGroup;
  submitted = false;
  shortUri: string;

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
  };

  formErrors: FormErrors = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _routerService: Router,
    private errorService: ErrorModalService,
    private http: HttpClient
  ) {
    this.doUpload = this.doUpload.bind(this);
  }

  ngOnInit() {
    this.phenomenonForm = this.fb.group({
      uri: ["", [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: ["", [Validators.required]],
      markdown: [""],
      domain: this.fb.array([this.addDomainFormGroup()]),
      unit: this.fb.array([this.addUnitFormGroup()]),
      validation: [false, [Validators.required]],
    });

    this.phenomenonForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.phenomenonForm);
    });

    // this.route.paramMap.subscribe(params => {
    //   this.shortUri = params.get('id');
    //   if (this.shortUri) {
    //     this.getPhenomenon(shortUri);
    //   }
    // });
  }

  logValidationErrors(group: FormGroup = this.phenomenonForm): void {
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
            abstractControl.value !== "")
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

  addDomainFormGroup(): FormGroup {
    return this.fb.group({
      domainUri: ["", [Validators.required]],
    });
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: ["", [Validators.required]],
      min: ["", []],
      max: ["", []],
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      type: "literal",
      value: ["", [Validators.required]],
      lang: ["", [Validators.required]],
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

  onSubmit() {
    this.submitted = true;

    if (this.phenomenonForm.invalid) {
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
      this.api.createPhenomenon(this.phenomenonForm.getRawValue()).subscribe(
        (res) => {
          this.phenomenonForm.reset();
          bulmaToast.toast({
            message: "Edit successful!",
            type: "is-success",
            dismissible: true,
            closeOnClick: true,
            animate: { in: "fadeInLeftBig", out: "fadeOutRightBig" },
            position: "top-center",
            duration: 5000,
          });
          this._routerService.navigate(["/phenomena"]).then(() => {
            window.location.reload();
          });
        },
        (error: any) => {
          this.errorService.setErrorModalOpen(true);
          this.errorService.setErrorMessage(error);
        }
      );
    }
    // this.api.editPhenomenon(this.phenomenonForm.value).subscribe(res => {console.log(res)});
    // this.diagnostic(this.phenomenonForm);
  }
}
