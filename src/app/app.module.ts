import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { LazyLoad } from './lazyloaded/lazyload.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewComponentComponent } from './view-component/view-component.component';
import { firstletterCapital } from './Pipes/capitalLetter.pipe';
import { SearchInput } from './Pipes/search.pipe';
import { AddEditIssueComponent } from './add-edit-issue/add-edit-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent, 
    HomepageComponent,
    AddEditIssueComponent,
    LoginComponent,
    SignUpComponent,
    ViewComponentComponent,
    firstletterCapital,
    SearchInput
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LazyLoad
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
