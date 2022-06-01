import { Pipe,PipeTransform } from '@angular/core'
@Pipe({
    name:'capital',
    pure:true
})
export class firstletterCapital implements PipeTransform {
    transform(value: String):String {
        if(value[0] == value[0].toUpperCase()) return value;
        else {
            return value.replace(value[0],value[0].toUpperCase());
        }
        
    }
}