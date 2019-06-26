import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PacientsService } from '../pacients.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pacient } from '../pacient.model';

@Component({
  selector:'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export  class CreateComponent implements OnInit {
  pacient: Pacient;
  form: FormGroup;
  isLoading = false;

  private id:string;
  private mode = 'create';
  constructor(public pacientsService:PacientsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.form = new FormGroup({
      'firstName': new FormControl(null,{
        validators: [Validators.required]
      }),
      'lastName': new FormControl(null,{
        validators: [Validators.required]
      }),
      'heightPacient': new FormControl(null,{}),
      'weightPacient': new FormControl(null,{}),
      'bloodType':new FormControl(null,{}),
      'sexType': new FormControl(null,{
      }),
      'dni': new FormControl(null,{
      }),
      'date': new FormControl(null,{})
    });
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
          this.form.setValue({
            firstName: this.pacient.firstName,
            lastName: this.pacient.lastName,
            heightPacient: this.pacient.heightPacient,
            weightPacient: this.pacient.weightPacient,
            bloodType: this.pacient.bloodType,
            sexType: this.pacient.sexType,
            dni: this.pacient.dni,
            date: this.pacient.date
          })
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }
  onSavePacient() {
    console.log('se guardo');
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if( this.mode ==='create' ) {
      this.pacientsService.addPacient(this.form.value.firstName,
        this.form.value.lastName, this.form.value.heightPacient, this.form.value.weightPacient,this.form.value.bloodType,
        this.form.value.sexType,this.form.value.dni,this.form.value.date);
    } else {
      console.log('entro aqui');
      this.pacientsService.updatePacient(
        this.id,
        this.form.value.firstName,
        this.form.value.lastName, this.form.value.heightPacient, this.form.value.weightPacient,this.form.value.bloodType,
        this.form.value.sexType,this.form.value.dni,this.form.value.date
      );
    }
    this.form.reset();
  }
}
