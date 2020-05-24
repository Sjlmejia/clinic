import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pacient } from '../pacient.model';
import { PacientsService } from '../pacients.service';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {
  pacients: Pacient[] = [];
  isLoading = false;
  totalPacients;
  itemsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1,10];
  private pacientsSub: Subscription;

  constructor(public pacientsService: PacientsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.pacientsService.getPacients(this.itemsPerPage, this.currentPage);
    this.pacientsService.getCount().subscribe(res => {
      console.log(res);
      this.totalPacients = res['count'];
    })
    this.pacientsSub = this.pacientsService.getPacientUpdateListener()
      .subscribe((pacients: Pacient[]) => {
        this.isLoading = false;
        this.pacients = pacients;
      });
  }

  ngOnDestroy() {
    this.pacientsSub.unsubscribe();
  }

  onPageChanged(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    console.log(this.currentPage);
    this.pacientsService.getPacients(this.itemsPerPage, this.currentPage);
  }

  onDelete(pacientId: string) {
    this.pacientsService.deletePacient(pacientId);
  }
}
