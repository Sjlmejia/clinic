import { Pacient } from './pacient.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PacientsService {
  private pacients: Pacient[] = [];
  private pacientsUpdated = new Subject<Pacient[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPacients(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, pacients: any}>(
      'http://localhost:3000/api/pacients' + queryParams )
      .pipe(map((pacientsData) =>{
        return pacientsData.pacients.map(pacient =>{
          return {
            id:pacient._id,
            firstName:pacient.firstName,
            lastName:pacient.lastName,
            heightPacient:pacient.heightPacient,
            weightPacient:pacient.weightPacient,
            bloodType:pacient.bloodType,
            sexType:pacient.sexType,
            dni:pacient.dni,
            date:pacient.date
          }
        })
      }))
      .subscribe(transformedPacients =>{
        this.pacients = transformedPacients;
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
    this.http.post<{message:string, id:string}>('http://localhost:3000/api/pacients',pacient)
      .subscribe( res =>{
        const id = res.id;
        pacient.id = id;
        this.pacients.push(pacient);
        this.pacientsUpdated.next([...this.pacients]);
        this.router.navigate(['/']);
      });
  }

  getPacient(id:string) {
    return this.http.get<{_id:string;
    firstName: string;
    lastName: string;
    heightPacient: string;
    weightPacient: string;
    bloodType: string;
    sexType:string;
    dni:string;
    date:string}>( 'http://localhost:3000/api/pacients/'+id );
  }

  updatePacient( id:string, firstName:string,
    lastName:string, heightPacient:string,
    weightPacient:string, bloodType:string,
    sexType:string, dni:string, date:string){
      const pacient: Pacient ={
        id:id,
        firstName:firstName,
        lastName:lastName,
        heightPacient:heightPacient,
        weightPacient:weightPacient,
        bloodType:bloodType,
        sexType:sexType,
        dni:dni,
        date:date
      }

      this.http.put('http://localhost:3000/api/pacients/'+id, pacient)
        .subscribe(res => {
          const updatePacients = [...this.pacients];
          const oldPacientIndex = updatePacients.findIndex(obj => obj.id ===pacient.id);
          updatePacients[oldPacientIndex] = pacient;
          this.pacients = updatePacients;
          this.pacientsUpdated.next([...this.pacients]);
          this.router.navigate(['/']);
        });
    }
  deletePacient(id:string){
    this.http.delete('http://localhost:3000/api/pacients/' + id)
      .subscribe(()=>{
        const filterPacients = this.pacients.filter(pacient => pacient.id !== id);
        this.pacients = filterPacients;
        this.pacientsUpdated.next([...this.pacients]);
      });
  }
}
