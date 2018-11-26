import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
// import { FirebaseService } from '../services/firebase.service';

import { BackendService } from '../../services/backend/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit, OnDestroy {
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

  constructor(private bs: BackendService) { }

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

  // getData() {
  //   this.dataLoading = true;
  //   this.querySubscription = this.bs.getProducts('orders')
  //     .subscribe(members => {
  //       this.members = members;
  //       this.dataSource = new MatTableDataSource(members);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.dataLoading = false;

  //     },
  //       (error) => {
  //         this.error = true;
  //         this.errorMessage = error.message;
  //         this.dataLoading = false;
  //       },
  //       () => {
  //         this.error = false;
  //         this.dataLoading = false;
  //       });
  // }


setData(formData) {
  this.dataLoading = true;
  this.querySubscription = this.bs.setProducts('orders', formData)
    .then( (res) => {
      this.savedChanges = true;
      this.dataLoading = false;
    }).catch(error => {
      this.error = true;
      this.errorMessage = error.message;
      this.dataLoading = false;
    });
}

// updateData(formData) {
//   this.dataLoading = true;
//   this.querySubscription = this.bs.updateProducts('orders', formData)
//     .subscribe(members => {
//       if (members) {
//         this.savedChanges = true;
//         this.dataLoading = false;

//       }
//     },
//       (error) => {
//         this.error = true;
//         this.errorMessage = error.message;
//         this.dataLoading = false;
//       },
//       () => {
//         this.error = false;
//         this.dataLoading = false;
//       });
// }



getFilterData(filters) {
  this.dataLoading = true;
  this.querySubscription = this.bs.getFilterProducts('orders', filters)
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
  this.querySubscription = this.bs.getOneProductDoc('orders', docId)
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
  this.querySubscription = this.bs.getOneProductDoc('orders', docId)
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


}

