import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PacientsService } from '../pacients.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pacient } from '../pacient.model';

@Component({
  selector:'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export  class CreateComponent implements OnInit {
  firstName = '';
  lastName = '';
  heightPacient:string;
  weightPacient:string;
  bloodType = '';
  sexType = '';
  dni:string;
  date = '';
  pacient: Pacient;
  isLoading = false;

  private id:string;
  private mode = 'create';
  constructor(public pacientsService:PacientsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.pacientsService.getPacient(this.id).subscribe(data =>{
          this.isLoading = false;
          this.pacient = {
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            heightPacient: data.heightPacient,
            weightPacient: data.weightPacient,
            bloodType: data.bloodType,
            sexType: data.sexType,
            dni: data.dni,
            date: data.date
          }
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }
  onSavePacient(form:NgForm ) {
    console.log('se guardo');
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if( this.mode ==='create' ) {
      this.pacientsService.addPacient(form.value.firstName,
        form.value.lastName, form.value.heightPacient, form.value.weightPacient,form.value.bloodType,
        form.value.sexType,form.value.dni,form.value.date);
    } else {
      console.log('entro aqui');
      this.pacientsService.updatePacient(
        this.id,
        form.value.firstName,
        form.value.lastName, form.value.heightPacient, form.value.weightPacient,form.value.bloodType,
        form.value.sexType,form.value.dni,form.value.date
      );
    }
    form.resetForm();
  }
}
