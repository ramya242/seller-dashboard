import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import {  AdminRoutingModule} from './admin-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
