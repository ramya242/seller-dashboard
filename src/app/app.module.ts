import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MoveToSellerComponent } from './authentication/move-to-seller/move-to-seller.component';
import { CommonComponent } from './common/common.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { LoadingComponent } from './common/loading/loading.component';
import { TokenInterceptor } from './authentication/helpers/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MoveToSellerComponent,
    CommonComponent,
    PageNotFoundComponent,
    LoadingComponent,
    
    // DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
