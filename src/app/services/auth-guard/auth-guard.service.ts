import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';


// import {Observable} from 'rxjs/Observable';
 import { Observable} from 'rxjs/RX';
import { map } from 'rxjs/operators';
// import { from } from 'rxjs/observable/from';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }
  canActivate(): Observable<boolean> {
    return Observable.from(this.afAuth.authState).take(1).
    map( state => !!state ).do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
}
