import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {   AuthGuard } from '../authentication/helpers/auth.guard'

import { DashboardComponent} from './components/dashboard/dashboard.component'
import { AdminComponent} from './admin.component'
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailsComponent} from './components/products/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component'; // <-- import the module
import { OffersComponent } from './components/offers/offers.component'; // <-- import the module
import { CreateOfferComponent } from './components/offers/create-offer/create-offer.component'; // <-- import the module
const routes: Routes = [
  {
      path: '', 
      component: AdminComponent, 
      children: [
        { path: '', component: DashboardComponent,canActivate: [AuthGuard] },
        { path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard] },
        { path: 'add-product/:id/:commonId', component: AddProductComponent,canActivate: [AuthGuard] },
        { path: 'add-product/:id', component: AddProductComponent,canActivate: [AuthGuard] },
        { path: 'product-list', component: ProductListComponent,canActivate: [AuthGuard] },
        { path: 'product-details/:id',component: ProductDetailsComponent,canActivate:[AuthGuard]},
        { path: 'profile',component: ProfileComponent,canActivate:[AuthGuard]},
        { path: 'offers',component: OffersComponent,canActivate:[AuthGuard]},
        { path: 'create-offer',component: CreateOfferComponent,canActivate:[AuthGuard]},
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class AdminRoutingModule { }
