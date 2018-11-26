import { Component, OnInit, Input } from '@angular/core';
import {BackendService} from '../../services/backend/backend.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

@Input() pageTitle: string;
@Input() iconTitle: string;
@Input() helpTitle: string;
ConfigData;
counter = 0;
userStatusColor = 'warn';

  constructor(private bs: BackendService) { }

  ngOnInit() {
    this.ConfigData = this.bs.getConfig();
    this.counter = this.bs.getCartTotal();

    this.bs.getUserStatus().subscribe((res) => {
        this.userStatusColor = res  ? 'primary' : 'warn';
      });
  }

}
