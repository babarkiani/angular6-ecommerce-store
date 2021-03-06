import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { AngularFireModule } from '@angular/fire';
// import { FirebaseService } from '../services/firebase.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { BackendService } from '../../services/backend/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit, OnDestroy {
  members: any[];
  dataSource: MatTableDataSource<any>;
  myDocData;
  data;
  currentDate;
  currentDate7;
  toggleField: string;
  state: string = '';
  savedChanges = false;
  error: boolean = false;
  errorMessage: String = '';
  dataLoading: boolean = false;
  private querySubscription;

  profileUrl: Observable<string | null>;
  takeHostSelfie = false;
  showHostSelfie = false;
  myDocId;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['category', 'scategory', 'name', 'price', '_id'];

  constructor(private bs: BackendService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.toggleField = 'searchMode';
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggle(filter?) {
    if (!filter) {
      filter = 'searchMode';
    } else {
      filter = filter;
    }
    this.toggleField = filter;
  }


  // Function for data table --result view

  setData(formData) {
    this.dataLoading = true;
    this.querySubscription = this.bs.setProducts('product', formData)
      .then( (res) => {
        this.savedChanges = true;
        this.dataLoading = false;
      }).catch(error => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      });
  }
  getData() {
    this.dataLoading = true;
    this.querySubscription = this.bs.getProducts('product')
      .subscribe(members => {
        this.members = members;
        this.dataSource = new MatTableDataSource(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;

      },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () => {
          this.error = false;
          this.dataLoading = false;
        });
  }

updateData(formData) {
  this.dataLoading = true;
  this.querySubscription = this.bs.updateProducts('product', formData)
    .then( (res) => {
      this.savedChanges = true;
      this.dataLoading = false;
    }).catch(error => {
      this.error = true;
      this.errorMessage = error.message;
      this.dataLoading = false;
    });
}



getFilterData(filters) {
  this.dataLoading = true;
  this.querySubscription = this.bs.getFilterProducts('product', filters)
    .subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataLoading = false;

    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      });
}

getDoc(docId) {
  this.dataLoading = true;
  this.querySubscription = this.bs.getOneProductDoc('product', docId)
    .subscribe(res => {
      if (res) {
        this.myDocData = res;
        this.toggle('editMode');
        this.dataLoading = false;
      }
    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      });
}

deleteDoc(docId) {
 if (confirm('Are you sure?')) {
  this.dataLoading = true;
  this.querySubscription = this.bs.getOneProductDoc('product', docId)
    .subscribe(res => {
      if (res) {
          this.toggle('searchMode');
          this.dataLoading = false;

      }
    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      });
    }
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

ngOnDestroy() {
  if (this.querySubscription) {
    this.querySubscription.unsubscribe();
  }
}

// Pic Functions
getPic(picId) {
  const ref = this.storage.ref(picId);
this.profileUrl = ref.getDownloadURL();
}

deleteProductPic(docId) {
if (confirm('Are you sure?')) {
this.bs.deleteProductPic('product', docId);
}
}

  //   getData() {
  //     this.dataLoading = true;
  //     this.querySubscription = this._backendService.getProducts('product')
  //         .subscribe(members => {
  //             this.members = members;
  //             this.dataSource = new MatTableDataSource(members);
  //             this.dataSource.paginator = this.paginator;
  //             this.dataSource.sort = this.sort;
  //         });
  // }
  // getFilterData(filters){
  //     this.dataLoading = true;
  //     this.querySubscription = this._backendService.getFilterProducts('product',filters)
  //         .subscribe(members => {
  //             this.members = members;
  //             this.dataSource = new MatTableDataSource(members);
  //             this.dataSource.paginator = this.paginator;
  //             this.dataSource.sort = this.sort;
  //         });
  // }

  // setData(formData) {
  //     formData.tags = formData.tags.split(',');
  //     this.dataLoading = true;
  //     this._backendService.setProduct('product', formData).then((res) => {
  //         this.savedChanges = true;
  //         this.dataLoading = false;
  //     }).catch(error => {
  //         this.error = true;
  //         this.errorMessage = error.message;
  //         this.dataLoading = false;
  //     });
  // }

  // updateData(formData) {
  //     formData.tags = formData.tags.split(',');
  //     if (confirm("Are you sure want to update this record ?")) {
  //         this.dataLoading = true;
  //         this._backendService.updateProduct('product', formData).then((res) => {
  //             this.error = false;
  //             this.errorMessage = "";
  //             this.dataLoading = false;
  //             this.savedChanges = true;
  //         }).catch(error => {
  //             this.error = true;
  //             this.errorMessage = error.message;
  //             this.dataLoading = false;
  //         });
  //     }
  // }

  // getPic(picId) {
  //     const ref = this._storage.ref(picId);
  //     this.profileUrl = ref.getDownloadURL();
  // }
  // deleteProductPic(docId){
  //     if (confirm("Are you sure want to delete this picture ?")) {
  //     this._backendService.deleteProductPic('product',docId);
  //     }
  // }

  // getDoc(docId) {
  //     this.dataLoading = true;
  //     this.querySubscription = this._backendService.getProduct('product', docId)
  //         .subscribe(res => {
  //             this.myDocData = res;
  //             this.toggle('editMode');
  //             this.dataLoading = false;
  //         },
  //             (error) => {
  //                 this.error = true;
  //                 this.errorMessage = error.message;
  //                 this.dataLoading = false;
  //             },
  //             () => { this.error = false; this.dataLoading = false; });
  // }

  // deleteDoc(docId) {
  //     if (confirm("Are you sure want to delete this record ?")) {
  //         this.dataLoading = true;
  //         this._backendService.deleteProduct('product', docId).then((res) => {
  //             this.error = false;
  //             this.errorMessage = "";
  //             this.dataLoading = false;
  //             this.toggle('searchMode');
  //         }).catch(error => {
  //             this.error = true;
  //             this.errorMessage = error.message;
  //             this.dataLoading = false;
  //         });
  //     }
  // }

  // //mat table paginator and filter functions
  // ngAfterViewInit() {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  // }

  // applyFilter(filterValue: string) {
  //     filterValue = filterValue.trim(); // Remove whitespace
  //     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //     this.dataSource.filter = filterValue;
  // }
  // ngOnDestroy() {

  //     if (this.querySubscription) {
  //         this.querySubscription.unsubscribe();
  //     }
  // }
  // }

}

