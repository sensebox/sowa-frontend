import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

// AbstractControl

export class CustomValidators {
    
    static uriSyntax(control: AbstractControl): { [key: string]: any } | null {
        // console.log(control)
        const uri: string = control.value;
        const hasWhiteSpace = /\s/g.test(uri);
        if(hasWhiteSpace){
          return { 'uriSyntax': true};
        } else {
          return null;
        }
    }

    static englishLabel(control: FormGroup): { [key: string]: any} | null {
      console.log(control)
      const labelArray = control.getRawValue().label;
      let isEnglishLabel = arr => arr.some(x => {
        // console.log(`Testing ${x.lang}`);
        return (x.lang === 'en');
      });
      // console.log(isEnglishLabel(labelArray))
      if (isEnglishLabel(labelArray)) {
        return null;
      } else {
        return { 'englishLabel': true };
      }
    }
}