import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgChartsModule } from "ng2-charts";
import { LandingPageComponent } from "./landing-page/landing-page.component";

@NgModule({
    declarations : [
        LandingPageComponent,
    ],
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'', component:LandingPageComponent}
        ]),
        HttpClientModule,
        NgChartsModule,
    ],
    exports : [
        LandingPageComponent,
    ]
    
})
export class LazyLoad {}