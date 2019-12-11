import { Attend } from './attend.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AttendsService {
  private attends: Attend[] = [];
  private attendsUpdated = new Subject<Attend[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addAttend(description: string, date: string, idPacient: string, items: any) {
    // const attendData = new FormData();
    // attendData.append('description', description);
    // attendData.append('idPacient', idPacient);
    // attendData.append('date', date);
    // attendData.append('items', items);
    // console.log('entro aquisave', attendData);
    const attendData = {
      description,
      idPacient,
      date,
      items
    };
    console.log('entro aquisave', attendData);
    this.http.post<{message: string, attend: Attend}>(
      'http://localhost:3000/api/attends',
      attendData
      )
      .subscribe( res => {
        const attend: Attend = {
          id: res.attend.id,
          description,
          idPacient,
          date,
          items};
        console.log('eee', attend)
        console.log('dssdds', this.attends);
        this.attends.push(attend);
        this.attendsUpdated.next([...this.attends]);
        this.router.navigate(['/view', idPacient]);
      });
  }

  // getAttends(id: string) {
  //   return this.http.get<{_id: string;
  //   firstName: string;
  //   lastName: string;
  //   heightPacient: string;
  //   weightPacient: string;
  //   bloodType: string;
  //   sexType: string;
  //   dni: string;
  //   date: string, imagePath: string}>( 'http://localhost:3000/api/pacients/' + id );
  // }
  getAttendUpdateListener() {
    return this.attendsUpdated.asObservable();
  }
  getAttends(id: string) {
    this.http.get<{message: string, attends: any}>(
      'http://localhost:3000/api/attends/' + id )
      .pipe(map((attendsData) => {
        return attendsData.attends.map(attend => {
          return {
            id: attend._id,
            description: attend.description,
            date: attend.date,
            idPacient: attend.idPacient,
            items: attend.items
          };
        });
      }))
      .subscribe(transformedAttends => {
        this.attends = transformedAttends;
        this.attendsUpdated.next([...this.attends]);
      });
  }
}
