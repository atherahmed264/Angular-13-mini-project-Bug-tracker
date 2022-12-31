import { User } from "./usermodel";

export interface issue {
    description:String,
    severity:String,
    status:String,
    date:Date,
    id?:number,
    count?:number,
}

export interface Records {
    _id:String,
    Title:String,
    Descryption:String,
    Attachments:String[],
    Type:String,
    CreatedAt:Date,
    RecordNumber:String,
    Status:String,
    CreatedBy:User,
    AssignedTo:User
}