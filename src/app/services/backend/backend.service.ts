import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  item: Observable<any>;
private itemsCollection: AngularFirestoreCollection<any>;
private itemDoc: AngularFirestoreDocument<any>;

  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { }

  getConfig() {
    return environment.social;
  }

  login(loginType, formData) {
    if (formData) {
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);
    } else {
      let loginMethod;
      // if (loginType == 'FB')
      if (loginType === 'GOOGLE') {
        loginMethod = new firebase.auth.GoogleAuthProvider();
      }
      return this.afAuth.auth.signInWithRedirect(loginMethod);
    }
  }
// method to retrieve firebase auth after login redirect
redirectLogin() {
  return this.afAuth.auth.getRedirectResult();
}
  logout() {
    return this.afAuth.auth.signOut();
  }

  isUserLoggedin():  Observable<any> {
    return Observable.from(this.afAuth.authState).take(1).
    map( state => !!state )
    .do(authenticated => {
      return authenticated;
    });
  }

  signup(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  createAdmin(uid, data) {
    return this.afs.doc('admin/' + uid).set(data);
    }

get timestamp() {
  let d = new Date();
  return d;

}

getCollectionURL(filter) {
 return 'onlinestore/ecomm/' + filter;
}

setProducts(coll: string, data: any,  docId?: any) {
  const id = this.afs.createId();
  const item = {id, name};
  const timestamp = this.timestamp;
  let docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
  return docRef.set({
    ...data,
     _id: id,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: 'N',
      authid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
  });
}

getProducts(coll: string, filter?: any) {
this.itemsCollection = this.afs.collection<any>(this.getCollectionURL(coll));
return this.itemsCollection.valueChanges();
}

getOneProductDoc(collType, docId) {
  let docUrl = this.getCollectionURL(collType) + '/' + docId;
 this.itemDoc = this.afs.doc<any>(docUrl);
 return this.itemDoc.valueChanges();
}

updateProducts(coll: string, data: any,  docId?: any) {
  const id = this.afs.createId();
  const item = {id, name};
  const timestamp = this.timestamp;
  let docRef = this.afs.collection(this.getCollectionURL(coll)).doc(data._id);
  return docRef.update({
    ...data,
     _id: id,
      updatedAt: timestamp,
      authid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
  });
}

deleteOneProductDoc(coll, docId) {
  const id = this.afs.createId();
  const item = {id, name};
  const timestamp = this.timestamp;
  let docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
  return docRef.update({
    delete_flag: 'Y',
     _id: id,
      updatedAt: timestamp,
      authid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
  });
}

setProductPic(filePath, coll, docId?) {
  console.log(filePath);
  console.log(this.getCollectionURL(coll));
  console.log(docId);

  let docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
  return docRef.set( {
    path: null
  }, {merge: true});

}

deleteProductPic(coll, docId?) {
  let docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
return docRef.set( {
  path: null
}, {merge: true});

}
  // All Fuctions below are fake
  getCartTotal() {
    return 0;
  }

  getUserStatus() {
    let fakeresponse = true;
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  getProductsa(collType) {
    let fakeresponse = [{
      'category': 'test', 'scategory': 'Test', 'name': 'Pname', 'price': '300', '_id': '123'
    }];
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  getFilterProducts(collType, filters) {
    let fakeresponse = [{
      'category': 'test', 'scategory': 'Test', 'name': 'Pname', 'price': '300', '_id': '123'
    }];
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  setProductsa(collType, formData) {
    let fakeresponse = true;
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  updateProductsa(collType, formData) {
    let fakeresponse = true;
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  getOneProductDoca(collType, docId) {
    const fakeresponse = {
      'category': 'test', 'scategory': 'Test', 'name': 'Pname', 'price': '300', '_id': '123'
    };
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  deleteOneProductDoca(collType, docId) {
    let fakeresponse = true;
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  updateShoppingInterest(collType, data) {
    let fakeresponse = true;
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }

  updateShoppingCart(collType, data) {
    let fakeresponse = true;
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(fakeresponse);
      }, 2000);
    });
  }
}
