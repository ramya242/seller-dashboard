import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { MoveToSellerComponent } from './authentication/move-to-seller/move-to-seller.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin'
    },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'forgot-password',
      component:ForgotPasswordComponent
    },
    {
      path:'seller-signup',
      component:MoveToSellerComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent
    },
    
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
