import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { SecondpageComponent } from './components/secondpage/secondpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateUserComponent } from './components/firstpage/create-user/create-user.component';
import { UpdateUserComponent } from './components/firstpage/update-user/update-user.component';
import { CreateCustomerComponent } from './components/secondpage/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/secondpage/update-customer/update-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FirstpageComponent,
    SecondpageComponent,
    NavbarComponent,
    CreateUserComponent,
    UpdateUserComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
