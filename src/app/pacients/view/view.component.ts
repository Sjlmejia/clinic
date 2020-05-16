import { Component, OnInit } from '@angular/core';
import { PacientsService } from '../pacients.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AttendsService } from 'src/app/attend/attends.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  public id: string;
  pacient: any;
  attends: any;
  attendsSub: Subscription;
  isLoading = true;
  isLoadingPacient = true;
  constructor(public pacientsService: PacientsService, public route: ActivatedRoute, public attendsService: AttendsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.pacientsService.getPacient(this.id).subscribe(data => {
        this.pacient = data;
        this.isLoadingPacient = false;
      });
    });
  }

}
