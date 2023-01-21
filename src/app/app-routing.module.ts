import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEditIssueComponent } from './add-edit-issue/add-edit-issue.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Services/auth-guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewComponentComponent } from './view-component/view-component.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'addissue', component: AddEditIssueComponent, canActivate: [AuthGuard] },
  { path: 'view', component: ViewComponentComponent },
  { path: 'landing', loadChildren: () => import('./lazyloaded/lazyload.module').then(m => m.LazyLoad), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
