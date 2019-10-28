import { Component, OnInit } from '@angular/core';
import { PacientsService } from '../pacients.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  private id: string;
  pacient: any;
  constructor(public pacientsService: PacientsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.pacientsService.getPacient(this.id).subscribe(data => {
        this.pacient = data;
      });
    });
  }

}
