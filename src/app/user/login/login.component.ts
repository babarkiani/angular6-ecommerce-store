import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { tick } from '@angular/core/testing';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userloggedin: Boolean = true;
  error:  Boolean = false;
  errorMessage: String = '';
dataLoading: Boolean = true;

  constructor(private bs: BackendService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    // this.userloggedin = false;
    this.getAuthStatus();
  }
// localstorage.setItem('uid', resp.user.uid);
  login(loginType , formData) {
    this.dataLoading = true;
    return this.bs.login(loginType , formData).catch( (err) => {
      this.error = true;
      this.errorMessage = err.message;
      console.log(err);
      this.userloggedin = true;
      this.dataLoading = false;
    });
  }

  logout() {
    this.dataLoading = true;
    return this.bs.logout().then( (success) => {
      this.userloggedin = false;
      this.dataLoading = false;
    });

  }

  getAuthStatus() {
    this.dataLoading = true;
    this.bs.redirectLogin().then(function(result) {
      if (result.credential) {
        console.log(result.credential);
        if (result.credential['accessToken'] !== '') {
           this.userloggedin = true;
        }
        this.dataLoading = false;
      }
    }).catch( (err) => {
      this.error = true;
      this.errorMessage = err.message;
      console.log(err);
      this.userloggedin = true;
      this.dataLoading = false;
    });
    this.dataLoading = false;
  }
}
