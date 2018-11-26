import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend/backend.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  toggle: boolean = true;
  savedChanges = true;
error: boolean = false;
errorMessage: string = '';
dataLoading: boolean = false;
private querySubscription;
members: Observable<any>;

// profileUrl: Observable<string | null>;
profileUrl: string = '';
counter = 0;
myDocData;
  constructor(private bs: BackendService) { }

  ngOnInit() {
    // this.getData();
  }

  getFilterData(filters) {
    this.dataLoading = true;
    this.querySubscription = this.bs.getFilterProducts('product', filters)
      .subscribe(members => {
        this.members = members;
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

  // getData() {
  //   this.dataLoading = true;
  //   this.querySubscription = this.bs.getProducts('product')
  //     .subscribe(members => {
  //       this.members = members;
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

  getPic(picId) {
this.profileUrl = '';
  }

  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
this.getPic(item.path);

// Capture user interest event, user has looked into product details
this.dataLoading = true;
let data = item;

this.querySubscription = this.bs.updateShoppingInterest('interests', data)
    .subscribe(members => {
      this.dataLoading = false;
      this.counter = 0;
      this.savedChanges = true;

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

  countProd(filter) {
    if (filter === 'add') {
      this.counter = this.counter + 1;
    } else {
      if (this.counter > 0) {
        this.counter = this.counter - 1;
      }
    }
  }

  addToCart(item , counter) {
    this.dataLoading = true;
    let data = item;
    data.qty = counter;

    this.querySubscription = this.bs.updateShoppingCart('cart', data)
    .subscribe(members => {
      this.dataLoading = false;
      this.counter = 0;
      this.savedChanges = true;

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
