import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddEditIssueComponent } from './add-edit-issue/add-edit-issue.component';
import { ViewComponentComponent } from './view-component/view-component.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { firstletterCapital } from './Pipes/capitalLetter.pipe';
import { SearchInput } from './Pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    SignUpComponent,
    AddEditIssueComponent,
    ViewComponentComponent,
    LandingPageComponent,
    firstletterCapital,
    SearchInput
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
