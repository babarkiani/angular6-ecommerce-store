import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { AboutusComponent } from './shared/aboutus/aboutus.component';
import {SettingsComponent} from './settings/settings.component';
import {ProductComponent} from './user/product/product.component';
// import { Admin } from './admin/setproduct/setproduct.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import {LoginComponent} from './user/login/login.component';
import {SignupComponent} from './user/signup/signup.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {AuthGuardAdminService} from './services/auth-guard-admin/auth-guard-admin.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdmintabComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
