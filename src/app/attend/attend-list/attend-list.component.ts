import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-attend-list',
  templateUrl: './attend-list.component.html',
  styleUrls: ['./attend-list.component.sass']
})
export class AttendListComponent implements OnInit {
  @Input() options: any;
  date: string;

  constructor() { }

  ngOnInit() {
    console.log('this.options', this.options);
    this.date = moment(this.options.date).format('YYYY MM DD');
  }

}
