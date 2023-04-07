import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {httpInterceptorProviders} from "./http-interceptors";
import {AuthService} from "./auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./user.service";
import {RequestService} from "./request.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing-module/app-routing-module.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders,AuthService,UserService,RequestService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
