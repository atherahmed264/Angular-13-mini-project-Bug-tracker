import { Pipe, PipeTransform } from "@angular/core";
import { issue } from "../Models/issues.model";

@Pipe({
    name:'search',
    pure:true,
})
export class SearchInput implements PipeTransform {
    transform(value: issue[],srch:string):any[] {
        if(srch){
            let str = srch.toLowerCase();
            let filter = value.filter( obj => obj.description.toLowerCase().includes(str));
            if(filter) return filter;
            else return []
        }
        else{
            return value;
        }
    }
}