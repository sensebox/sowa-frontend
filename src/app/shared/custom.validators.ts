import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

// AbstractControl

export class CustomValidators {
    
    static uriSyntax(control: AbstractControl): { [key: string]: any } | null {
        const uri: string = control.value;
        const hasWhiteSpace = /\s/g.test(uri);
        if(hasWhiteSpace){
          return { 'uriSyntax': true};
        } else {
          return null;
        }
    }

    static englishLabel(control: FormArray): { [key: string]: any} | null {
      // console.log(control.controls)
      const labelArray = control.controls;
      // labelArray.forEach((element: FormGroup) => {
      //   // console.log(element)
      //   if (element.getRawValue().lang === '') {
      //      return null;
      //    }
      // })
      return { 'englishLabel': false};
    }
      
}