import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacientsService } from '../pacients.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pacient } from '../pacient.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export  class CreateComponent implements OnInit {
  pacient: Pacient;
  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  private id: string;
  private mode = 'create';
  title = 'Nuevo Fármaco';
  constructor(public pacientsService: PacientsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      drugName: new FormControl(null, {
        validators: [Validators.required]
      }),
      drugType: new FormControl(null, {
        validators: [Validators.required]
      }),
      mechanismOfAction: new FormControl(null, {
        validators: [Validators.required]
      }),
      indicationsOrSpectrum: new FormControl(null, {
        validators: [Validators.required]
      }),
      adults: new FormControl(null, {
        validators: [Validators.required]
      }),
      children: new FormControl(null, {
        validators: [Validators.required]
      }),
      elderly: new FormControl(null, {
        validators: [Validators.required]
      }),
      kidneyFailure: new FormControl(null, {
        validators: [Validators.required]
      }),
      liverFailure: new FormControl(null, {
        validators: [Validators.required]
      }),
      pregnancyAndLactation: new FormControl(null, {
        validators: [Validators.required]
      }),
      bioavailability: new FormControl(null, {
        validators: [Validators.required]
      }),
      maximumConcentration: new FormControl(null, {
        validators: [Validators.required]
      }),
      areaDownCurve: new FormControl(null, {
        validators: [Validators.required]
      }),
      halfLife: new FormControl(null, {
        validators: [Validators.required]
      }),
      proteinBinding: new FormControl(null, {
        validators: [Validators.required]
      }),
      volumeOfDistribution: new FormControl(null, {
        validators: [Validators.required]
      }),
      metabolism: new FormControl(null, {
        validators: [Validators.required]
      }),
      excretion: new FormControl(null, {
        validators: [Validators.required]
      }),
      disseminationCNS: new FormControl(null, {
        validators: [Validators.required]
      }),
      intracellularConcetracion: new FormControl(null, {
        validators: [Validators.required]
      }),
      fcRatio: new FormControl(null, {
        validators: [Validators.required]
      }),
      iterectaionDrugs: new FormControl(null, {
        validators: [Validators.required]
      }),
      sideEffects: new FormControl(null, {
        validators: [Validators.required]
      }),
      contraindications: new FormControl(null, {
        validators: [Validators.required]
      }),
      tradenames: new FormControl(null, {
        validators: [Validators.required]
      }),
      comments: new FormControl(null, {
        validators: [Validators.required]
      })  
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.title = 'Editar Fármaco';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.pacientsService.getPacient(this.id).subscribe(data => {
          this.isLoading = false;
          this.pacient = {
            id: data._id,
            drugName: data.drugName,
            drugType: data.drugType,
            mechanismOfAction: data.mechanismOfAction,
            indicationsOrSpectrum: data.indicationsOrSpectrum,
            adults: data.adults,
            children: data.children,
            elderly: data.elderly,
            kidneyFailure: data.kidneyFailure,
            liverFailure: data.liverFailure,
            pregnancyAndLactation: data.pregnancyAndLactation,
            bioavailability: data.bioavailability,
            maximumConcentration: data.maximumConcentration,
            areaDownCurve: data.areaDownCurve,
            halfLife: data.halfLife,
            proteinBinding: data.proteinBinding,
            volumeOfDistribution: data.volumeOfDistribution,
            metabolism: data.metabolism,
            excretion: data.excretion,
            disseminationCNS: data.disseminationCNS,
            intracellularConcetracion: data.intracellularConcetracion,
            fcRatio: data.fcRatio,
            iterectaionDrugs: data.iterectaionDrugs,
            sideEffects: data.sideEffects,
            contraindications: data.contraindications,
            tradenames: data.tradenames,
            comments: data.comments
          };
          console.log('hola', this.pacient);
          this.form.setValue({
            drugName: this.getValue(this.pacient.drugName),
            drugType: this.getValue(this.pacient.drugType),
            mechanismOfAction: this.getValue(this.pacient.mechanismOfAction),
            indicationsOrSpectrum: this.getValue(this.pacient.indicationsOrSpectrum),
            adults: this.getValue(this.pacient.adults),
            children: this.getValue(this.pacient.children),
            elderly: this.getValue(this.pacient.elderly),
            kidneyFailure: this.getValue(this.pacient.kidneyFailure),
            liverFailure: this.getValue(this.pacient.liverFailure),
            pregnancyAndLactation: this.getValue(this.pacient.pregnancyAndLactation),
            bioavailability: this.getValue(this.pacient.bioavailability),
            maximumConcentration: this.getValue(this.pacient.maximumConcentration),
            areaDownCurve: this.getValue(this.pacient.areaDownCurve),
            halfLife: this.getValue(this.pacient.halfLife),
            proteinBinding: this.getValue(this.pacient.proteinBinding),
            volumeOfDistribution: this.getValue(this.pacient.volumeOfDistribution),
            metabolism: this.getValue(this.pacient.metabolism),
            excretion: this.getValue(this.pacient.excretion),
            disseminationCNS: this.getValue(this.pacient.disseminationCNS),
            intracellularConcetracion: this.getValue(this.pacient.intracellularConcetracion),
            fcRatio: this.getValue(this.pacient.fcRatio),
            iterectaionDrugs: this.getValue(this.pacient.iterectaionDrugs),
            sideEffects: this.getValue(this.pacient.sideEffects),
            contraindications: this.getValue(this.pacient.contraindications),
            tradenames: this.getValue(this.pacient.tradenames),
            comments: this.getValue(this.pacient.comments),
          });
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  getValue(name) {
    return name === 'null' ? '' : name;
  }

  onImagePicked(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(this.form);
    if (event.target.files && file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
       this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onSavePacient() {
    console.log('se guardo');
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if ( this.mode === 'create' ) {
      this.pacientsService.addPacient(
        this.form.value.drugName,
        this.form.value.drugType,
        this.form.value.mechanismOfAction,
        this.form.value.indicationsOrSpectrum,
        this.form.value.adults,
        this.form.value.children,
        this.form.value.elderly,
        this.form.value.kidneyFailure,
        this.form.value.liverFailure,
        this.form.value.pregnancyAndLactation,
        this.form.value.bioavailability,
        this.form.value.maximumConcentration,
        this.form.value.areaDownCurve,
        this.form.value.halfLife,
        this.form.value.proteinBinding,
        this.form.value.volumeOfDistribution,
        this.form.value.metabolism,
        this.form.value.excretion,
        this.form.value.disseminationCNS,
        this.form.value.intracellularConcetracion,
        this.form.value.fcRatio,
        this.form.value.iterectaionDrugs,
        this.form.value.sideEffects,
        this.form.value.contraindications,
        this.form.value.tradenames,
        this.form.value.comments
        );
    } else {
      console.log('entro aqui');
      this.pacientsService.updatePacient(
        this.id,
        this.form.value.drugName,
        this.form.value.drugType,
        this.form.value.mechanismOfAction,
        this.form.value.indicationsOrSpectrum,
        this.form.value.adults,
        this.form.value.children,
        this.form.value.elderly,
        this.form.value.kidneyFailure,
        this.form.value.liverFailure,
        this.form.value.pregnancyAndLactation,
        this.form.value.bioavailability,
        this.form.value.maximumConcentration,
        this.form.value.areaDownCurve,
        this.form.value.halfLife,
        this.form.value.proteinBinding,
        this.form.value.volumeOfDistribution,
        this.form.value.metabolism,
        this.form.value.excretion,
        this.form.value.disseminationCNS,
        this.form.value.intracellularConcetracion,
        this.form.value.fcRatio,
        this.form.value.iterectaionDrugs,
        this.form.value.sideEffects,
        this.form.value.contraindications,
        this.form.value.tradenames,
        this.form.value.comments
      );
    }
    this.form.reset();
  }
}
