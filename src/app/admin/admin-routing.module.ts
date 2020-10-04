import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {   AuthGuard } from '../authentication/helpers/auth.guard'

import { DashboardComponent} from './components/dashboard/dashboard.component'
import { AdminComponent} from './admin.component'
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import {ProductDetailsComponent} from './components/products/product-details/product-details.component';


const routes: Routes = [
  {
      path: '', 
      component: AdminComponent, 
      children: [
        { path: '', component: DashboardComponent,canActivate: [AuthGuard] },
        { path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard] },
        { path: 'product-list', component: ProductListComponent,canActivate: [AuthGuard] },
        { path: 'product-details/:id',component: ProductDetailsComponent,canActivate:[AuthGuard]},
        
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class AdminRoutingModule { }
