import { Pacient } from './pacient.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PacientsService {
  private pacients: Pacient[] = [];
  private pacientsUpdated = new Subject<Pacient[]>();

  constructor(private http: HttpClient){}

  getPacients () {
    this.http.get<{message: string, pacients: Pacient[]}>('http://localhost:3000/api/pacients')
      .subscribe(pacientsData =>{
        this.pacients = pacientsData.pacients;
        this.pacientsUpdated.next([...this.pacients]);
      });
  }

  getPacientUpdateListener() {
    return this.pacientsUpdated.asObservable();
  }
  addPacient(firstName: string, lastName:string, heightPacient:string,
    weightPacient:string,
    bloodType:string,
    sexType:string,
    dni:string,
    date:string){
    const pacient: Pacient={firstName: firstName,
      id:null,
      lastName: lastName,
      heightPacient: heightPacient,
      weightPacient: weightPacient,
      bloodType: bloodType,
      sexType:sexType,
      dni:dni,
      date:date};
    this.http.post<{message:string}>('http://localhost:3000/api/pacients',pacient)
      .subscribe( res =>{
        console.log('res', res.message);
        this.pacients.push(pacient);
        this.pacientsUpdated.next([...this.pacients]);
      });
  }
}
