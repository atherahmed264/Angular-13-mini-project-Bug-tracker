import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgChartsModule } from "ng2-charts";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";

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
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule
    ],
    exports : [
        LandingPageComponent,
    ]
    
})
export class LazyLoad {}