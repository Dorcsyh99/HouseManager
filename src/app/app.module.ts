import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlideshowModule } from 'ng-simple-slideshow';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { PropertyUploadComponent } from './property/property-upload/property-upload.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { MainPageWrapperComponent } from './main-page-wrapper/main-page-wrapper.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatButtonModule, MatProgressSpinnerModule, MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatDialogModule, MatStepperModule, MatDividerModule, MatSelectModule, MatStepperIntl} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FeaturedPropertiesComponent } from './property/featured-properties/featured-properties.component';
import { PropertySearchComponent, PropertySearchResultsComponent } from './property/property-search/property-search.component';
import { AuthIntercepter } from './auth/auth-interceter';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent, SuccessfulRegistrationComponent } from './auth/signup/signup.component';
import { UserhomeComponent } from './auth/userhome/userhome.component';
import { PropertyViewComponent } from './property/property-view/property-view.component';
import { ForumHomeComponent } from './forum/forum-home/forum-home.component';
import { ExpertHomeComponent } from './expert/expert-home/expert-home.component';
import { ExpertViewComponent } from './expert/expert-view/expert-view.component';
import { ExpertSearchComponent } from './expert/expert-search/expert-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyUploadComponent,
    PropertyListComponent,
    MainPageWrapperComponent,
    NavBarComponent,
    FeaturedPropertiesComponent,
    PropertySearchComponent,
    LoginComponent,
    SignupComponent,
    UserhomeComponent,
    SuccessfulRegistrationComponent,
    PropertyViewComponent,
    ForumHomeComponent,
    ExpertHomeComponent,
    ExpertViewComponent,
    ExpertSearchComponent,
    PropertySearchResultsComponent
  ],
  imports: [
    BrowserModule,
    SlideshowModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule,
    MatSelectModule
  ],
  entryComponents : [],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true},
    {provide: MatStepperIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
