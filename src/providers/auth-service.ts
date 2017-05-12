import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { HashService } from 'hashService';
import 'rxjs/add/operator/map';

export class User {
  userid: number;
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public setUserId(userid: number) {
    this.userid = userid;
  }
}

@Injectable()
export class AuthService {

  public currentUser: User;
  private http: Http;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {
          email: credentials.email,
          password: credentials.password
        };

        this.http.get('http://gymholder.herokuapp.com/user')
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
          });

        // Chris kommentar: do http get to /user/<email>/<hashed_password> to
        // see if we can get a success response.

        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User(credentials.username, credentials.password);
        observer.next(access);
        observer.complete();
      });
    }

  }

  public register(credentials) {

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let body = {
        id: 0,
        username: credentials.username,
        email: credentials.email,
        age: credentials.age
      };

      this.http.post('http://gymholder.herokuapp.com/user', JSON.stringify(body), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
        });

      // Chris kommentar: do http post to /user with parameters

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
