import { AbstractControl } from "@angular/forms";

AbstractControl

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
      
}