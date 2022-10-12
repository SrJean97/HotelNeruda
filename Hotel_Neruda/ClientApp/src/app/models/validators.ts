import { FormControl } from "@angular/forms";

export class Validators {

    space(control: FormControl): { [s:string]: boolean } {
        const l = control.value.toString().trim().length;
        if(l>0)
            return null;
        return { invalidSpace:true };
    }

    positive(control: FormControl): { [s:string]: boolean } {
        const l = control.value.toString().trim();
        if(parseInt(l)>0){
            return null;
        }
        return { invalidNumber:true };
    }

    number(control: FormControl): { [s:string]: boolean } {
        const l = control.value.toString().trim();
        if(parseInt(l)>=0){
            return null;
        }
        return {invalidNumber:true};
    }

}
