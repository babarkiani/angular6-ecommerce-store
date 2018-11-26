import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BackendService} from '../../services/backend/backend.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: ''
  };
  err;
  constructor(private router: Router, private bs: BackendService) { }

  ngOnInit() {
  }

  signup() {
    this.bs.signup(this.user.email, this.user.password).then(res => {
      // now get the data from db
      this.bs.createAdmin(res.user.uid, this.user).then(resp => {
        if (res) { // response available
          localStorage.setItem('uid', res.user.uid);
          localStorage.setItem('email', res.user.email);
          // localStorage.setItem('name', res.user.name);
          this.router.navigate(['/login']);
        }
      });
    });
  }

}
