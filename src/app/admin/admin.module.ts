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
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminLoadingComponent } from './components/admin-loading/admin-loading.component'; // <-- import the module

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    AddProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProfileComponent,
    AdminLoadingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxGalleryModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
