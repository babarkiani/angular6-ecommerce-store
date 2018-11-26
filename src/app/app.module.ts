import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CustommaterialModule } from './custommaterial.module';

// FireBase
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

// FireStorage
import {FileUploadComponent} from './shared/dropzone/fileupload.component';
import {DropZoneDirective} from './shared/dropzone/dropzone.directive';
import {FileSizePipe} from './shared/dropzone/filesize.pipe';

import {environment} from '../environments/environment';
// import {AuthGuard} from './services/auth-guard/auth-guard.service';
// import {AuthGuardAdmin} from './services/auth-guard-admin/auth-guard-admin.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import {SettingsComponent} from './settings/settings.component';


// Admin Components
import {SetproductComponent} from './admin/setproduct/setproduct.component';
import { AdmincartsComponent } from './admin/admincarts/admincarts.component';
import { AdminordersComponent } from './admin/adminorders/adminorders.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';

// User Components
import { UserComponent } from './user/user/user.component';
import { CartsComponent } from './user/carts/carts.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProductComponent } from './user/product/product.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    SettingsComponent,
    SetproductComponent,
    AdmincartsComponent,
    AdminordersComponent,
    AdmintabComponent,
    AdminusersComponent,
    UserComponent,
    CartsComponent,
    LoginComponent,
    OrdersComponent,
    ProductComponent,
    SignupComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CustommaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
