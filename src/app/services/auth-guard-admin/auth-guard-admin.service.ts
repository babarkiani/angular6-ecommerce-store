import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {

  constructor() { }
}


// canActivate(): boolean {
//   if (localStorage.getItem('uid') == null) {
//     return false;
//   } else {
//     return true;
//   }
// }
// }
