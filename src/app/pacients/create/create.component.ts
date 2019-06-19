import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PacientsService } from '../pacients.service';

@Component({
  selector:'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export  class CreateComponent {
  firstName = '';
  lastName = '';
  heightPacient:string;
  weightPacient:string;
  bloodType = '';
  sexType = '';
  dni:string;
  date = '';

  constructor(public pacientsService:PacientsService){}

  onAddPacient(form:NgForm ) {
    console.log('se guardo');
    if(form.invalid){
      return;
    }
    this.pacientsService.addPacient(form.value.firstName,
      form.value.lastName, form.value.heightPacient, form.value.weightPacient,form.value.bloodType,
      form.value.sexType,form.value.dni,form.value.date);
    form.resetForm();
  }
}
