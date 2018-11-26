import { Component, OnInit } from '@angular/core';
import {moveIn, fallIn} from '../../router.animation';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@moveIn': ''}
})
export class AboutusComponent implements OnInit {
  state = '';
  constructor() { }

  ngOnInit() {
  }

}
