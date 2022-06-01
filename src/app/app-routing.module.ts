import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEditIssueComponent } from './add-edit-issue/add-edit-issue.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Services/auth-guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewComponentComponent } from './view-component/view-component.component';

const routes: Routes = [
  { path:'' ,           component : LoginComponent },
  { path:'signup' ,     component : SignUpComponent},
  { path:'home' ,       component : HomepageComponent},
  { path:'addissue',    component : AddEditIssueComponent },
  { path: 'view/:id',   component : ViewComponentComponent},
  { path: 'landing',    component : LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
