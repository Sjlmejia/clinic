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
      .pipe(map((pacientsData) => {
        return pacientsData.pacients.map(pacient => {
          return {
            id: pacient._id,
            firstName: pacient.firstName,
            lastName: pacient.lastName,
            heightPacient: pacient.heightPacient,
            weightPacient: pacient.weightPacient,
            bloodType: pacient.bloodType,
            sexType: pacient.sexType,
            dni: pacient.dni,
            date: pacient.date,
            imagePath: pacient.imagePath
          };
        });
      }))
      .subscribe(transformedPacients => {
        this.pacients = transformedPacients;
        this.pacientsUpdated.next([...this.pacients]);
      });
  }

  getPacientUpdateListener() {
    return this.pacientsUpdated.asObservable();
  }

  addPacient(firstName: string, lastName: string, heightPacient: string,
             weightPacient: string,
             bloodType: string,
             sexType: string,
             dni: string,
             date: string,
             image: File) {
    console.log('entro aquisave');
    const pacientData = new FormData();
    pacientData.append('firstName', firstName);
    pacientData.append('lastName', lastName);
    pacientData.append('heightPacient', heightPacient);
    pacientData.append('weightPacient', weightPacient);
    pacientData.append('bloodType', bloodType);
    pacientData.append('sexType', sexType);
    pacientData.append('dni', dni);
    pacientData.append('date', date);
    pacientData.append('image', image, firstName);

    this.http.post<{message: string, pacient: Pacient}>(
      'http://localhost:3000/api/pacients',
      pacientData
      )
      .subscribe( res => {
        const pacient: Pacient = {
          firstName,
          id: res.pacient.id,
          imagePath: res.pacient.imagePath,
          lastName,
          heightPacient,
          weightPacient,
          bloodType,
          sexType,
          dni,
          date};
        this.pacients.push(pacient);
        this.pacientsUpdated.next([...this.pacients]);
        this.router.navigate(['/']);
      });
  }

  getPacient(id: string) {
    return this.http.get<{_id: string;
    firstName: string;
    lastName: string;
    heightPacient: string;
    weightPacient: string;
    bloodType: string;
    sexType: string;
    dni: string;
    date: string, imagePath: string}>( 'http://localhost:3000/api/pacients/' + id );
  }

  updatePacient( id: string, firstName: string,
                 lastName: string, heightPacient: string,
                 weightPacient: string, bloodType: string,
                 sexType: string, dni: string, date: string,
                 image: File | string) {
      let pacientData: Pacient | FormData;
      if ( typeof image === 'object' ) {
        pacientData = new FormData();
        pacientData.append('id', id);
        pacientData.append('firstName', firstName);
        pacientData.append('lastName', lastName);
        pacientData.append('heightPacient', heightPacient);
        pacientData.append('weightPacient', weightPacient);
        pacientData.append('bloodType', bloodType);
        pacientData.append('sexType', sexType);
        pacientData.append('dni', dni);
        pacientData.append('date', date);
        pacientData.append('image', image, firstName);
      } else {
        pacientData = {
          id,
          firstName,
          lastName,
          heightPacient,
          weightPacient,
          bloodType,
          sexType,
          dni,
          date,
          imagePath: image
        };
      }
      this.http
      .put('http://localhost:3000/api/pacients/' + id, pacientData)
        .subscribe(res => {
          const updatePacients = [...this.pacients];
          const oldPacientIndex = updatePacients.findIndex(obj => obj.id === id);
          const pacient: Pacient = {
            id,
            firstName,
            lastName,
            heightPacient,
            weightPacient,
            bloodType,
            sexType,
            dni,
            date,
            imagePath: ''
          };
          updatePacients[oldPacientIndex] = pacient;
          this.pacients = updatePacients;
          this.pacientsUpdated.next([...this.pacients]);
          this.router.navigate(['/']);
        });
    }
  deletePacient(id: string) {
    this.http.delete('http://localhost:3000/api/pacients/' + id)
      .subscribe(() => {
        const filterPacients = this.pacients.filter(pacient => pacient.id !== id);
        this.pacients = filterPacients;
        this.pacientsUpdated.next([...this.pacients]);
      });
  }
}
