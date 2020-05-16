import { Pacient } from './pacient.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PacientsService {
  private pacients: Pacient[] = [];
  private pacientsUpdated = new Subject<Pacient[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPacients(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, pacients: any}>(
      environment.baseUrl+'/api/pacients' + queryParams )
      .pipe(map((pacientsData) => {
        return pacientsData.pacients.map(pacient => {
          return {
            id: pacient._id,
            drugName: pacient.drugName,
            drugType: pacient.drugType,
            mechanismOfAction: pacient.mechanismOfAction,
            indicationsOrSpectrum: pacient.indicationsOrSpectrum,
            adults: pacient.adults,
            children: pacient.children,
            elderly: pacient.elderly,
            kidneyFailure: pacient.kidneyFailure,
            liverFailure: pacient.liverFailure,
            pregnancyAndLactation: pacient.pregnancyAndLactation,
            bioavailability: pacient.bioavailability,
            maximumConcentration: pacient.maximumConcentration,
            areaDownCurve: pacient.areaDownCurve,
            halfLife: pacient.halfLife,
            proteinBinding: pacient.proteinBinding,
            volumeOfDistribution: pacient.volumeOfDistribution,
            metabolism: pacient.metabolism,
            excretion: pacient.excretion,
            disseminationCNS: pacient.disseminationCNS,
            intracellularConcetracion: pacient.intracellularConcetracion,
            fcRatio: pacient.fcRatio,
            iterectaionDrugs: pacient.iterectaionDrugs,
            sideEffects: pacient.sideEffects,
            contraindications: pacient.contraindications,
            tradenames: pacient.tradenames,
            comments: pacient.comments,
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

  addPacient(
    drugName: string,
    drugType: string,
    mechanismOfAction: string,
    indicationsOrSpectrum: string,
    adults: string,
    children: string,
    elderly: string,
    kidneyFailure: string,
    liverFailure: string,
    pregnancyAndLactation: string,
    bioavailability: string,
    maximumConcentration: string,
    areaDownCurve: string,
    halfLife: string,
    proteinBinding: string,
    volumeOfDistribution: string,
    metabolism: string,
    excretion: string,
    disseminationCNS: string,
    intracellularConcetracion: string,
    fcRatio: string,
    iterectaionDrugs: string,
    sideEffects: string,
    contraindications: string,
    tradenames: string,
    comments: string,
    formsPharmaceuticals: string,
    management: string,
    
    ) {
    console.log('entro aquisave');
    const pacientData = new FormData();
    pacientData.append('drugName', drugName);
    pacientData.append('drugType', drugType);
    pacientData.append('mechanismOfAction', mechanismOfAction);
    pacientData.append('indicationsOrSpectrum', indicationsOrSpectrum);
    pacientData.append('adults', adults);
    pacientData.append('children', children);
    pacientData.append('elderly', elderly);
    pacientData.append('kidneyFailure', kidneyFailure);
    pacientData.append('liverFailure', liverFailure);
    pacientData.append('pregnancyAndLactation', pregnancyAndLactation);
    pacientData.append('bioavailability', bioavailability);
    pacientData.append('maximumConcentration', maximumConcentration);
    pacientData.append('areaDownCurve', areaDownCurve);
    pacientData.append('halfLife', halfLife);
    pacientData.append('proteinBinding', proteinBinding);
    pacientData.append('volumeOfDistribution', volumeOfDistribution);
    pacientData.append('metabolism', metabolism);
    pacientData.append('excretion', excretion);
    pacientData.append('disseminationCNS', disseminationCNS);
    pacientData.append('intracellularConcetracion', intracellularConcetracion);
    pacientData.append('fcRatio', fcRatio);
    pacientData.append('iterectaionDrugs', iterectaionDrugs);
    pacientData.append('sideEffects', sideEffects);
    pacientData.append('contraindications', contraindications);
    pacientData.append('tradenames', tradenames);
    pacientData.append('comments', comments);
    pacientData.append('formsPharmaceuticals', formsPharmaceuticals);
    pacientData.append('management', management);

    this.http.post<{message: string, pacient: Pacient}>(
      environment.baseUrl+'/api/pacients',
      pacientData
      )
      .subscribe( res => {
        const pacient: Pacient = {
          id: res.pacient.id,
          drugName,
          drugType,
          mechanismOfAction,
          indicationsOrSpectrum,
          adults,
          children,
          elderly,
          kidneyFailure,
          liverFailure,
          pregnancyAndLactation,
          bioavailability,
          maximumConcentration,
          areaDownCurve,
          halfLife,
          proteinBinding,
          volumeOfDistribution,
          metabolism,
          excretion,
          disseminationCNS,
          intracellularConcetracion,
          fcRatio,
          iterectaionDrugs,
          sideEffects,
          contraindications,
          tradenames,
          comments,
          formsPharmaceuticals,
          management
        };
        this.pacients.push(pacient);
        this.pacientsUpdated.next([...this.pacients]);
        this.router.navigate(['/']);
      });
  }

  getPacient(id: string) {
    return this.http.get<{_id: string;
    drugName: string;
    drugType: string;
    mechanismOfAction: string;
    indicationsOrSpectrum: string;
    adults: string;
    children: string;
    elderly: string;
    kidneyFailure: string;
    liverFailure: string;
    pregnancyAndLactation: string;
    bioavailability: string;
    maximumConcentration: string;
    areaDownCurve: string;
    halfLife: string;
    proteinBinding: string;
    volumeOfDistribution: string;
    metabolism: string;
    excretion: string;
    disseminationCNS: string;
    intracellularConcetracion: string;
    fcRatio: string;
    iterectaionDrugs: string;
    sideEffects: string;
    contraindications: string;
    tradenames: string;
    comments: string;
    formsPharmaceuticals: string,
    management: string,
  }>( environment.baseUrl+ '/api/pacients/' + id );
  }

  updatePacient( id: string,
    drugName: string,
    drugType: string,
    mechanismOfAction: string,
    indicationsOrSpectrum: string,
    adults: string,
    children: string,
    elderly: string,
    kidneyFailure: string,
    liverFailure: string,
    pregnancyAndLactation: string,
    bioavailability: string,
    maximumConcentration: string,
    areaDownCurve: string,
    halfLife: string,
    proteinBinding: string,
    volumeOfDistribution: string,
    metabolism: string,
    excretion: string,
    disseminationCNS: string,
    intracellularConcetracion: string,
    fcRatio: string,
    iterectaionDrugs: string,
    sideEffects: string,
    contraindications: string,
    tradenames: string,
    comments: string,
    formsPharmaceuticals: string,
    management: string
                 ) {
    let pacientData: Pacient | FormData;
    pacientData = {
        id,
        drugName,
        drugType,
        mechanismOfAction,
        indicationsOrSpectrum,
        adults,
        children,
        elderly,
        kidneyFailure,
        liverFailure,
        pregnancyAndLactation,
        bioavailability,
        maximumConcentration,
        areaDownCurve,
        halfLife,
        proteinBinding,
        volumeOfDistribution,
        metabolism,
        excretion,
        disseminationCNS,
        intracellularConcetracion,
        fcRatio,
        iterectaionDrugs,
        sideEffects,
        contraindications,
        tradenames,
        comments,
        formsPharmaceuticals,
        management
    };
      this.http
      .put(environment.baseUrl+'/api/pacients/' + id, pacientData)
        .subscribe(res => {
          const updatePacients = [...this.pacients];
          const oldPacientIndex = updatePacients.findIndex(obj => obj.id === id);
          const pacient: Pacient = {
            id,
            drugName,
            drugType,
            mechanismOfAction,
            indicationsOrSpectrum,
            adults,
            children,
            elderly,
            kidneyFailure,
            liverFailure,
            pregnancyAndLactation,
            bioavailability,
            maximumConcentration,
            areaDownCurve,
            halfLife,
            proteinBinding,
            volumeOfDistribution,
            metabolism,
            excretion,
            disseminationCNS,
            intracellularConcetracion,
            fcRatio,
            iterectaionDrugs,
            sideEffects,
            contraindications,
            tradenames,
            comments,
            formsPharmaceuticals,
            management
          };
          updatePacients[oldPacientIndex] = pacient;
          this.pacients = updatePacients;
          this.pacientsUpdated.next([...this.pacients]);
          this.router.navigate(['/']);
        });
    }
  deletePacient(id: string) {
    this.http.delete(environment.baseUrl+'/api/pacients/' + id)
      .subscribe(() => {
        const filterPacients = this.pacients.filter(pacient => pacient.id !== id);
        this.pacients = filterPacients;
        this.pacientsUpdated.next([...this.pacients]);
      });
  }
}
