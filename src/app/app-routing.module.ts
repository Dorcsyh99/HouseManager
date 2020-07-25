import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageWrapperComponent } from './main-page-wrapper/main-page-wrapper.component';
import { PropertyUploadComponent } from './property/property-upload/property-upload.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent, SuccessfulRegistrationComponent } from './auth/signup/signup.component';
import { UserhomeComponent } from './auth/userhome/userhome.component';
import { PropertyViewComponent } from './property/property-view/property-view.component';


const routes: Routes = [
  {path: '', component: MainPageWrapperComponent},
  {path: 'upload', component: PropertyUploadComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'properties', component: PropertyListComponent},
  {path: 'homepage', component: UserhomeComponent},
  {path: 'success', component: SuccessfulRegistrationComponent},
  {path: 'property/:id', component: PropertyViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
