import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, Form } from '@angular/forms';
import { CustomValidators } from '../../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { Phenomenon } from '../../phenomenon';
import { ApiService } from '../../services/api.service'
import { ISensors } from '../../interfaces/ISensors';
import { IDomain } from '../../interfaces/IDomain';
import { IUnit } from '../../interfaces/IUnit';
import { IIri } from '../../interfaces/IIri';

@Component({
  selector: 'senph-phenomenon-new',
  templateUrl: './phenomenon-new.component.html',
  styleUrls: ['./phenomenon-new.component.scss']
})

export class PhenomenonNewComponent implements OnInit {

  domainsArray;
  domainsArrayFiltered;
  unitsArray;
  unitsArrayFiltered;
  heroBannerString = "http://www.opensensemap.org/SENPH#";
  phenomenonForm: FormGroup;
  validationMessages = {
    'uri': {
      'required': 'URI is required.',
      'uriSyntax': 'No white spaces allowed in URI.'
    },
    'label': {
      'required': 'URI is required.'
    },
    'description': {
      'required': 'Description is required.'
    }
  };

  formErrors = {
  };

  languageArray = [
    { val: "ab", show: "Abkhazian" },
    { val: "aa", show: "Afar" },
    { val: "af", show: "Afrikanns" },
    { val: "sq", show: "Albanian" },
    { val: "am", show: "Amharic" },
    { val: "ar", show: "Arabic" },
    { val: "hy", show: "Armenian" },
    { val: "as", show: "Assamese" },
    { val: "ay", show: "Aymara" },
    { val: "az", show: "Azerbaijani" },
    { val: "ba", show: "Bashkir" },
    { val: "eu", show: "Basque" },
    { val: "bn", show: "Bengali, Bangla" },
    { val: "dz", show: "Bhutani" },
    { val: "bh", show: "Bihari" },
    { val: "bi", show: "Bislama" },
    { val: "br", show: "Breton" },
    { val: "bg", show: "Bulgarian" },
    { val: "my", show: "Burmese" },
    { val: "be", show: "Byelorussian" },
    { val: "km", show: "Cambodian" },
    { val: "ca", show: "Catalan" },
    { val: "zh", show: "Chinese (Mandarin)" },
    { val: "co", show: "Corsican" },
    { val: "hr", show: "Croation" },
    { val: "cs", show: "Czech" },
    { val: "da", show: "Danish" },
    { val: "nl", show: "Dutch" },
    { val: "en", show: "English, American" },
    { val: "eo", show: "Esperanto" },
    { val: "et", show: "Estonian" },
    { val: "fo", show: "Faeroese" },
    { val: "fj", show: "Fiji" },
    { val: "fi", show: "Finnish" },
    { val: "fr", show: "French" },
    { val: "fy", show: "Frisian" },
    { val: "gd", show: "Gaelic (Scots Gaelic)" },
    { val: "gl", show: "Galician" },
    { val: "ka", show: "Georgian" },
    { val: "de", show: "German" },
    { val: "el", show: "Greek" },
    { val: "kl", show: "Greenlandic" },
    { val: "gn", show: "Guarani" },
    { val: "gu", show: "Gujarati" },
    { val: "ha", show: "Hausa" },
    { val: "iw", show: "Hebrew" },
    { val: "hi", show: "Hindi" },
    { val: "hu", show: "Hungarian" },
    { val: "is", show: "Icelandic" },
    { val: "in", show: "Indonesian" },
    { val: "ia", show: "Interlingua" },
    { val: "ie", show: "Interlingue" },
    { val: "ik", show: "Inupiak" },
    { val: "ga", show: "Irish" },
    { val: "it", show: "Italian" },
    { val: "ja", show: "Japanese" },
    { val: "jw", show: "Javanese" },
    { val: "kn", show: "Kannada" },
    { val: "ks", show: "Kashmiri" },
    { val: "kk", show: "Kazakh" },
    { val: "rw", show: "Kinyarwanda" },
    { val: "ky", show: "Kirghiz" },
    { val: "rn", show: "Kirundi" },
    { val: "ko", show: "Korean" },
    { val: "ku", show: "Kurdish" },
    { val: "lo", show: "Laothian" },
    { val: "la", show: "Latin" },
    { val: "lv", show: "Latvian, Lettish" },
    { val: "ln", show: "Lingala" },
    { val: "lt", show: "Lithuanian" },
    { val: "mk", show: "Macedonian" },
    { val: "mg", show: "Malagasy" },
    { val: "ms", show: "Malay" },
    { val: "ml", show: "Malayalam" },
    { val: "mt", show: "Maltese" },
    { val: "mi", show: "Maori" },
    { val: "mr", show: "Marathi" },
    { val: "mo", show: "Moldavian" },
    { val: "mn", show: "Mongolian" },
    { val: "na", show: "Nauru" },
    { val: "ne", show: "Nepali" },
    { val: "no", show: "Norwegian" },
    { val: "oc", show: "Occitan" },
    { val: "or", show: "Oriya" },
    { val: "om", show: "Oromo, Afan" },
    { val: "ps", show: "Pashto, Pushto" },
    { val: "fa", show: "Persian" },
    { val: "pl", show: "Polish" },
    { val: "pt", show: "Portuguese" },
    { val: "pa", show: "Punjabi" },
    { val: "qu", show: "Quechua" },
    { val: "rm", show: "Rhaeto-Romance" },
    { val: "ro", show: "Romanian" },
    { val: "ru", show: "Russian" },
    { val: "sm", show: "Samoan" },
    { val: "sg", show: "Sangro" },
    { val: "sa", show: "Sanskrit" },
    { val: "sr", show: "Serbian" },
    { val: "sh", show: "Serbo-Croatian" },
    { val: "st", show: "Sesotho" },
    { val: "tn", show: "Setswana" },
    { val: "sn", show: "Shona" },
    { val: "sd", show: "Sindhi" },
    { val: "si", show: "Singhalese" },
    { val: "ss", show: "Siswati" },
    { val: "sk", show: "Slovak" },
    { val: "sl", show: "Slovenian" },
    { val: "so", show: "Somali" },
    { val: "es", show: "Spanish" },
    { val: "su", show: "Sudanese" },
    { val: "sw", show: "Swahili" },
    { val: "sv", show: "Swedish" },
    { val: "tl", show: "Tagalog" },
    { val: "tg", show: "Tajik" },
    { val: "ta", show: "Tamil" },
    { val: "tt", show: "Tatar" },
    { val: "te", show: "Telugu" },
    { val: "th", show: "Thai" },
    { val: "bo", show: "Tibetan" },
    { val: "ti", show: "Tigrinya" },
    { val: "to", show: "Tonga" },
    { val: "ts", show: "Tsonga" },
    { val: "tr", show: "Turkish" },
    { val: "tk", show: "Turkmen" },
    { val: "tw", show: "Twi" },
    { val: "uk", show: "Ukranian" },
    { val: "ur", show: "Urdu" },
    { val: "uz", show: "Uzbek" },
    { val: "vi", show: "Vietnamese" },
    { val: "vo", show: "Volapuk" },
    { val: "cy", show: "Welsh" },
    { val: "wo", show: "Wolof" },
    { val: "xh", show: "Xhosa" },
    { val: "ji", show: "Yiddish" },
    { val: "yo", show: "Yoruba" },
    { val: "zu", show: "Zulu" }]

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.phenomenonForm = this.fb.group({
      uri: ['', [Validators.required, CustomValidators.uriSyntax]],
      label: this.fb.array([
        this.addLabelFormGroup()
      ]),
      //['', [Validators.required]],
      description: ['', [Validators.required]],
      domain: this.fb.array([
        this.addDomainFormGroup()
      ]),
      unit: this.fb.array([
        this.addUnitFormGroup()
      ])
    })

    this.phenomenonForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.phenomenonForm);
      }
    );

    this.retrieveDomains();
    this.retrieveUnits();
  }

  addDomainButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('domain')).push(this.addDomainFormGroup());
  }

  addUnitButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('unit')).push(this.addUnitFormGroup());
  }

  addLabelButtonClick(): void {
    (<FormArray>this.phenomenonForm.get('label')).push(this.addLabelFormGroup());
  }

  logValidationErrors(group: FormGroup = this.phenomenonForm): void {
    // console.log(Object.keys(group.controls));
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      // console.log(abstractControl);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  // onLoadButtonClick() {
  //   const formGroupDomain = this.fb.group([
  //     new FormControl('domainUri', Validators.required),
  //     new FormControl('domainLabel', Validators.required),
  //   ]);

  //   const formArrayDomain = this.fb.array([
  //     new FormControl('domainUri', Validators.required),
  //     new FormControl('domainLabel', Validators.required),
  //   ]);
  //   const formGroupUnit = this.fb.group([
  //     new FormControl('unitUri', Validators.required),
  //     new FormControl('unitLabel', Validators.required),
  //   ]);

  //   const formArrayUnit = this.fb.array([
  //     new FormControl('unitUri', Validators.required),
  //     new FormControl('unitLabel', Validators.required),
  //   ]);
  //   const formGroupLabel = this.fb.group([
  //     new FormControl('value', Validators.required),
  //     new FormControl('lang', Validators.required),
  //   ]);

  //   const formArrayLabel = this.fb.array([
  //     new FormControl('value', Validators.required),
  //     new FormControl('lang', Validators.required),
  //   ]);

  //   console.log(formArrayDomain);
  //   console.log(formGroupDomain);
  //   console.log(formArrayUnit);
  //   console.log(formGroupUnit);
  // }

  onSubmit() {
    console.log(this.phenomenonForm.value);
    // this.api.addPhenomenon(this.phenomenonForm.value).subscribe(res => { console.log(res) });
    // this.diagnostic(this.phenomenonForm);
  }

  addDomainFormGroup(): FormGroup {
    return this.fb.group({
      domainUri: [''],
      domainLabel: ['']
    });
  }

  addUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitUri: ['', [Validators.required]],
      unitLabel: ['', [Validators.required]]
    });
  }

  addLabelFormGroup(): FormGroup {
    return this.fb.group({
      value: ['', [Validators.required]],
      lang: ['' , [Validators.required]]
    });
  }


  removeDomainButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('domain')).removeAt(skillGroupIndex);
  }

  removeUnitButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('unit')).removeAt(skillGroupIndex);
  }

  removeLabelButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.phenomenonForm.get('label')).removeAt(skillGroupIndex);
  }

  setExistingDomains(domainSet: IDomain[]): FormArray {
    const formArray = new FormArray([]);
    domainSet.forEach(s => {
      formArray.push(this.fb.group({
        domainUri: s.domain.value,
        domainLabel: s.domainLabel.value
      }));
    });

    return formArray;
  }

  setExistingUnits(unitSet: IUnit[]): FormArray {
    const formArray = new FormArray([]);
    console.log(unitSet);

    unitSet.forEach(s => {
      formArray.push(this.fb.group({
        unitUri: s.unit.value,
        unitLabel: s.unitLabel.value
      }));
    });

    return formArray;
  }

  setExistingLabels(labelSet: IIri[]): FormArray {
    const formArray = new FormArray([]);
    console.log(labelSet);
    labelSet.forEach(s => {
      formArray.push(this.fb.group({
        type: s.label.type,
        value: s.label.value,
        lang: s.label["xml:lang"]
      }));
    });

    return formArray;
  }


  retrieveDomains() {
    this.api.getDomains().subscribe(res => {
      this.domainsArray = res;
      this.domainsArray = this.domainsArray.filter(function (el) {
        return el.domain.type != 'bnode'
      })
      // console.log(this.domainsArray);
      this.domainsArray.sort((a, b) => a.label[0].value.localeCompare(b.label[0].value));

      console.dir(res);
    });
  }

  retrieveUnits() {
    this.api.getUnits().subscribe(res => {
      this.unitsArray = res;
      // console.log(this.unitsArray);
      this.unitsArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
      console.log(this.unitsArray);
    });
  }

  // assignCopy() {
  //   this.domainsArrayFiltered = Object.assign([], this.domainsArray);
  // }
}


