import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pacient } from '../pacient.model';
import { PacientsService } from '../pacients.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls:['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
  pacients:Pacient[] = [];
  isLoading = false;
  private pacientsSub : Subscription;

  constructor(public pacientsService:PacientsService){}

  ngOnInit(){
    this.isLoading = true;
    this.pacientsService.getPacients();
    this.pacientsSub = this.pacientsService.getPacientUpdateListener()
      	.subscribe((pacients:Pacient[]) =>{
          this.isLoading = false;
          this.pacients = pacients;
        });
  }

  ngOnDestroy(){
    this.pacientsSub.unsubscribe();
  }

  onDelete(pacientId:string){
    this.pacientsService.deletePacient(pacientId);
  }
}
