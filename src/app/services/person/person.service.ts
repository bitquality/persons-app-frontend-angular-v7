import { Injectable } from '@angular/core';
import { IPerson } from 'src/app/models/person.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // private serviceBaseUrl = 'http://localhost:8090/'; // local url
  private serviceBaseUrl = 'https://persons-app-middleware.herokuapp.com/'; // heroku url
  simpleHttpOptions: any;
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.simpleHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // https://bmo-persons-app-mw.herokuapp.com/api/persons/v1/all
  // https://bmo-persons-app-mw.herokuapp.com/api/persons/v1/add

  getPersons(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(
      `${this.serviceBaseUrl}/api/persons/v1/all`
    );
  }

  addNewPerson(personRequest) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('content-type', 'application/json');
    return this.http.post(
      `${this.serviceBaseUrl}/api/persons/v1/add`,
      personRequest,
      { headers: httpHeaders }
    );
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json();
    return body['data'] || {};
  }

  private handleError(error: any) {
    const errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
