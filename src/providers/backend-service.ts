import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BackendService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BackendService {

  headers: Headers;

  constructor(public http: Http) {
    console.log('Hello BackendService Provider');
    this.headers = new Headers()
    this.headers.append('Authentication', '0oXxWXkLknkhDa2JWZWF');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  // public openData: any;

  ////////////////////////////////////////////////////////////////////////
  // USER
  ////////////////////////////////////////////////////////////////////////

  // Hämta specifik användare
  public getUser(id: number) {
    return this.http.get('/backend/user/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getUserFriends(id: number) {
    return this.http.get('/backend/user/' + id + '/friends', { headers: this.headers })
      .map(res => res.json());
  }

  public getUserGroups(id: number) {
    return this.http.get('/backend/user/' + id + '/groups', { headers: this.headers })
      .map(res => res.json());
  }

  // För inloggning
  public validateUser(usernameOrEmail: string, password: string) {
    return this.http.get('/backend/auth/' + usernameOrEmail + '/' + password, { headers: this.headers })
      .map(res => res.json());
  }

  // För registrering
  public postUser(username: string, email: string, age: number/*, password: string*/) {
    let body = JSON.stringify({
      "id": 0,
      "username": username,
      "email": email,
      "age": age
    });
    return this.http.post('/backend/user', body, { headers: this.headers })
      .map(res => res.json());
  }

  public putUser(id: number, username: string, email: string, age: number/*, password: string*/) {
    let body = JSON.stringify({
      "id": id,
      "username": username,
      "email": email,
      "age": age
    });
    return this.http.put('/backend/user', body, { headers: this.headers })
      .map(res => res.json());
  }

  public deleteUser(id: number) {
    return this.http.delete('/backend/user/' + id, { headers: this.headers })
      .map(res => res.json());
  }



  ////////////////////////////////////////////////////////////////////////
  // GYM
  ////////////////////////////////////////////////////////////////////////

  public getGym(id: number) {
    return this.http.get('/backend/gym/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getGymSports(id: number) {
    return this.http.get('/backend/gym/' + id + '/sports', { headers: this.headers })
      .map(res => res.json());
  }

  public getGymResults(id: string) {
    return this.http.get('/backend/gym/' + id + '/results', { headers: this.headers })
      .map(res => res.json());
  }



  ////////////////////////////////////////////////////////////////////////
  // RESULT
  ////////////////////////////////////////////////////////////////////////

  public getResult(id: number) {
    return this.http.get('/backend/result/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public postResult(user: number, gym: number, sport: number, value: number) {
    let body = JSON.stringify({
      "id": 0,
      "user": user,
      "gym": gym,
      "sport": sport,
      "value": value
    });
    return this.http.post('/backend/result', body, { headers: this.headers })
      .map(res => res.json());
  }

  public putResult(id: number, user: number, gym: number, sport: number, value: number) {
    let body = JSON.stringify({
      "id": id,
      "user": user,
      "gym": gym,
      "sport": sport,
      "value": value
    });
    return this.http.put('/backend/result/' + id, body, { headers: this.headers })
      .map(res => res.json());
  }

  public deleteResult(id: number) {
    return this.http.delete('/backend/result/' + id, { headers: this.headers })
      .map(res => res.json());
  }



  ////////////////////////////////////////////////////////////////////////
  // SPORT
  ////////////////////////////////////////////////////////////////////////

  public getSport(id: number) {
    return this.http.get('/backend/sport/' + id, { headers: this.headers })
      .map(res => res.json());
  }


  ////////////////////////////////////////////////////////////////////////
  // MISCELLANEOUS
  ////////////////////////////////////////////////////////////////////////

  public getMessages(user_one_id: number, user_two_id: number) {
    return this.http.get('/backend/messages/' + user_one_id + '/' + user_two_id, { headers: this.headers })
      .map(res => res.json());
  }

}
