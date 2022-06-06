import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CustomValidators } from "../../../shared/custom.validators";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { IDomains } from "../../../interfaces/IDomains";
import { IRoV } from "../../../interfaces/IRoV";
import { ILabel } from "src/app/interfaces/ILabel";
import { FormErrors } from "src/app/interfaces/form-errors";
import { ErrorModalService } from "src/app/services/error-modal.service";
import * as bulmaToast from "bulma-toast";

import { UploadResult } from "src/app/interfaces/uploadResult";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IPhenomenon } from "src/app/interfaces/IPhenomenon";

import { LabelLanguagePipePipe } from "src/app/pipes/label-language-pipe.pipe";

@Component({
  selector: "senph-phenomena-edit",
  templateUrl: "./phenomena-edit.component.html",
  styleUrls: ["./phenomena-edit.component.scss"],
})
export class PhenomenaEditComponent implements OnInit {
  // heroBannerString = "http://sensors.wiki/SENPH#";
  APIURL = environment.api_url;

  phenomenonForm: FormGroup;
  deletePhenomenonForm: FormGroup;
  validationMessages = {
    // uri: {
    //   required: "URI is required.",
    //   uriSyntax: "No white spaces allowed in URI.",
    // },
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
    private errorService: ErrorModalService,
    private http: HttpClient,
    private labelLanguagePipe: LabelLanguagePipePipe
  ) {
    this.doUpload = this.doUpload.bind(this);
  }

  ngOnInit() {
    this.phenomenonForm = this.fb.group({
      id: [null, [Validators.required]],
      label: this.fb.array([this.addLabelFormGroup()]),
      description: this.addDescriptionFormGroup(),
      markdown: this.addMarkdownFormGroup(),
      domain: this.fb.array([this.addDomainFormGroup()]),
      unit: this.fb.array([this.addUnitFormGroup()]),
      validation: [false, [Validators.required]],
      deletedLabels: this.fb.array([]),
      deletedDomains: this.fb.array([]),
      deletedUnits: this.fb.array([]),
      translationIds: [[], [Validators.required]]
    });

    this.phenomenonForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.phenomenonForm);
    });

    this.route.paramMap.subscribe((params) => {
      this.shortUri = params.get("id");
      if (this.shortUri) {
        this.getPhenomenon(this.shortUri);
      }
    });
  }

  logValidationErrors(group: FormGroup = this.phenomenonForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = "";
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== "" || this.submitted)) {
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
      domain: [null, [Validators.required]],
      exists: [true, [Validators.required]]
    });
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: [null, [Validators.required]],
      min: [null, [Validators.required]],
      max: [null, [Validators.required]],
      rovId: [null, [Validators.required]]
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      value: [null, [Validators.required]],
      lang: [null, [Validators.required]],
    });
  }

  addDescriptionFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      text: [null]
    })
  }

  addMarkdownFormGroup(): FormGroup {
    return this.fb.group({
      translationId: [null, [Validators.required]],
      text: [null]
    })
  }

  getPhenomenon(shortUri) {
    this.api.getPhenomenon(shortUri).subscribe(
      (phenomenon) => this.editPhenomenon(phenomenon),
      (err: any) => console.log(err)
    );
  }

  editPhenomenon(phenomenon) {
    // console.log(phenomenon);
    this.phenomenonForm.patchValue({
      id: phenomenon.id,
    });

    this.phenomenonForm.setControl(
      "label",
      this.setExistingLabels(phenomenon.labels)
    );
    
    this.phenomenonForm.controls['description'].patchValue({
      translationId: phenomenon.description.item[0].translationId,
      text: phenomenon.description ? this.labelLanguagePipe.transform(phenomenon.description.item) : '',
    });

    this.phenomenonForm.controls['markdown'].patchValue({
      translationId: phenomenon.markdown.item[0].translationId,
      text: phenomenon.markdown ? this.labelLanguagePipe.transform(phenomenon.markdown.item) : '',
    });

    this.phenomenonForm.setControl(
      "domain",
      this.setExistingDomains(phenomenon.domains)
    );

    this.phenomenonForm.setControl(
      "unit",
      this.setExistingUnits(phenomenon.units)
    );

    this.phenomenonForm.patchValue({
      translationIds: this.setTranslationIds(phenomenon),
    })

    this.deletePhenomenonForm = this.phenomenonForm;
  }

  setExistingDomains(domainSet: IDomains[]): FormArray {
    const formArray = new FormArray([]);
    domainSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          domain: [{value: s.domain, disabled: true}, [Validators.required]],
          exists: [true, [Validators.required]]
        })
      );
    });
    return formArray;
  }

  setExistingUnits(unitSet: IRoV[]): FormArray {
    const formArray = new FormArray([]);
    unitSet.forEach((s) => {
      formArray.push(
        this.fb.group({
          unitUri: [s.unitId, [Validators.required]],
          min: [s.min, []],
          max: [s.max, []],
          rovId: [s.rovId, [Validators.required]]
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

  setTranslationIds(phenomenon: IPhenomenon) {
    const array = [];
    array.push(phenomenon.labels[0].translationId);
    array.push(phenomenon.description["item"][0].translationId);
    array.push(phenomenon.markdown["item"][0].translationId);
    return array;
  } 

  redirectDetails(uri) {
    this._routerService.navigate(["/phenomenon/detail", uri]);
  }

  onLoadButtonClick() {}

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
      //console.dir(this.phenomenonForm.value)
      this.api.editPhenomenon(this.phenomenonForm.value).subscribe(
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
          this.redirectDetails(this.shortUri);
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

  onDelete() {
    this.api.deletePhenomenon(this.deletePhenomenonForm.getRawValue()).subscribe(
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
        this._routerService.navigate(["/phenomena"]);
      },
      (error: any) => {
        this.errorService.setErrorModalOpen(true);
        this.errorService.setErrorMessage(error);
      }
    );
  }
}
