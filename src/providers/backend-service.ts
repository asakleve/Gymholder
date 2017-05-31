import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OpenGymDataService } from './open-gym-data-service';
import { CoordService } from './coord-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the BackendService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  public userid: number;
  public username: string;
  public email: string;
  public age: number;

  public friendsList = [];
  public resultList=[]

  constructor(userid: number, username: string, email: string, age: number) {
    this.userid = userid;
    this.username = username;
    this.email = email;
    this.age = age;
  }

  public isFriend(friend: number) {
    for(let f of this.friendsList) {
      if(f.id == friend) {
        return true;
      }
    }
    return false;
  }
}

export class Result {
  public id: number;
  public user: User;
  public sport: Sport;
  public gym: Gym;
  public value: number;

  constructor(user: User, sport: Sport, gym: Gym, value: number) {
    this.user = user;
    this.sport = sport;
    this.gym = gym;
    this.value = value;
  }
}

export class Gym {
  public id: number;
  public openid: string;
  public name: string;
  public shortname: string;
  public position: { lat: number, lon: number };
  public image: any;
  public description: string;
  public results: Result[] = [];
  public sports: Sport[] = [];

  constructor(id: number, openid: string, name: string, shortname: string,
    position: any, image: any, description: string) {
    this.id = id;
    this.openid = openid;
    this.name = name;
    this.shortname = shortname;
    this.position = position;
    this.image = image;
    this.description = description;
  }
}

export class Sport {
  public id: number;
  public results: Result[];
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Injectable()
export class BackendService {

  allgyms: any = [];
  allsports: any = [];
  allusers: any = [];

  apibackend: any;
  apiuser: any;
  headers: any;

  constructor(public http: Http, public openGymData: OpenGymDataService, public coordService: CoordService) {
    console.log('Hello BackendService Provider');

    //this.apibackend = "/backend";
    this.apibackend = "http://gymholder.herokuapp.com";
    this.apiuser = "http://gymholder.herokuapp.com/user";
    //this.apiuser = '/user';
    this.headers = new Headers();
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
    if(this.allusers[id] == null) {
      return this.http.get(this.apibackend + '/user/' + id, { headers: this.headers })
        .map(res => res.json());
    }
    else {
      return this.allusers[id];
    }
  }

  public getUserFriends(id: number) {
    return this.http.get(this.apibackend + '/allfriends/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getUserGroups(id: number) {
    return this.http.get(this.apibackend + '/user/' + id + '/groups', { headers: this.headers })
      .map(res => res.json());
  }

  public getUserResults(id: number) {
    return this.http.get(this.apibackend + '/userresults/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  // För inloggning
  public validateUser(usernameOrEmail: string, password: string) {
    return this.http.get(this.apibackend + '/auth/' + usernameOrEmail + '/' + password, { headers: this.headers })
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
    return this.http.post(this.apibackend + '/user', body, { headers: this.headers })
      .map(res => res.json());
  }

  public postAuth(id: number, password: string) {
    let body = JSON.stringify({
      "id": id,
      "pass": password
    });
    console.log("postAuth body: " + body + " and id + pass: " + id + " + " + password);
    return this.http.post(this.apibackend + '/auth', body, { headers: this.headers })
      .map(res => res.json());
  }

    public putAuth(id: number, password: string) {
    let body = JSON.stringify({
      "id": id,
      "pass": password
    });
    return this.http.put(this.apibackend + '/auth', body, { headers: this.headers })
      .map(res => res.json());
  }

  public putUser(id: number, username: string, email: string, age: number/*, password: string*/) {
    let body = JSON.stringify({
      "id": id,
      "username": username,
      "email": email,
      "age": age
    });
    return this.http.put(this.apibackend + '/user', body, { headers: this.headers })
      .map(res => res.json());
  }

  public deleteUser(id: number) {
    return this.http.delete(this.apibackend + '/user/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getUserByUsername(username : string) {
   return this.http.get(this.apibackend + '/userbyusername/' + username , { headers: this.headers })
    .map(res => res.json());
  }



  ////////////////////////////////////////////////////////////////////////
  // GYM
  ////////////////////////////////////////////////////////////////////////

  public getGym(id: number) {
    if(this.allgyms[id] !== null) {
      return this.allgyms[id];
    }
    else {
      this.http.get(this.apibackend + '/gym/' + id, { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          // console.log(JSON.stringify("    getGym.data: " + data));
          this.openGymData.loadGymDetails(data.eid)
            .map(res => res.json())
            .subscribe(res => {
              let pos = this.coordService.gridToGeodetic(res.GeographicalPosition.X, res.GeographicalPosition.Y);
              let image = "";
              let description = "";
              for(let a of res.Attributes) {
                if(a.Id == "Image" && a.Name == "Huvudbild") {
                  image = a.Value;
                }
                if(a.Id == "ShortDescription") {
                  description = a.Value;
                }
              }
              let g = new Gym(data.id, data.eid, res.Name, res.GeographicalAreas.Name, JSON.stringify(pos), image, description);
              // console.log(JSON.stringify("    getGymDetails.res: " + res));
              // allUsers.push(new User());
              return g;
            })
        });
    }
  }

  public getAllGyms() {
    if(this.allgyms == undefined || this.allgyms.length == 0) {
      return this.loadAllGyms();
    }
    else {
      return this.allgyms;
    }
  }

  public loadAllGyms() {
    return this.http.get(this.apibackend + '/allgyms', { headers: this.headers })
      .map(res => res.json())
      .subscribe(data => {
        for(let g of data) {
          this.openGymData.loadGymDetails(g.eid)
            .subscribe(res => {
              let pos = this.coordService.gridToGeodetic(res.GeographicalPosition.X, res.GeographicalPosition.Y);
              let description = "Beskrivning saknas för detta gym.";
              let image = "";
              for(let a of res.Attributes) {
                if(a.Id == "ShortDescription") {
                  description = a.Value;
                }
                else if(a.Id == "Image" && a.Name == "Huvudbild") {
                  image = a.Value;
                }
              }
              this.allgyms[g.id] = new Gym(g.id, g.eid, res.Name, res.GeographicalAreas.Name, pos, image, description);
              console.log("  >>> loadAllGyms()>this.allgyms[g.id]: " + JSON.stringify(this.allgyms[g.id]));
            });
        }
        return this.allgyms;
      });
  }

  public getGymSports(id: number) {
    return this.http.get(this.apibackend + '/gym/' + id + '/sports', { headers: this.headers })
      .map(res => res.json());
  }

  public getGymResults(id: number) {
    return this.http.get(this.apibackend + '/gymresults/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getGymByOpenId(id: string) {
    return this.http.get(this.apibackend + '/gymbyopen/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getGymHolder(id:number){
    return this.http.get(this.apibackend + '/gymholder/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  ////////////////////////////////////////////////////////////////////////
  // RESULT
  ////////////////////////////////////////////////////////////////////////

  public getResult(id: number) {
    return this.http.get(this.apibackend + '/userresults/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  public getResultsByUser(id: number) {
    this.http.get(this.apibackend + '/userresults/' + id, { headers: this.headers })
      .map(res => res.json())
      .subscribe(data => {
        return data;
      });
  }

  public getAllResults(){
    return this.http.get(this.apibackend + '/allresults',{ headers: this.headers })
      .map(res => res.json());
  }

  public postResult(userid: number, gymid: number, sportid: number, value: number) {
    let body = JSON.stringify({
      "id": 0,
      "user": userid,
      "gym": gymid,
      "sport": sportid,
      "value": value
    });
    return this.http.post(this.apibackend + '/result', body, { headers: this.headers })
      .map(res => res.json());
  }

  public postResultVideo(id: number, picture:string){
    let body = JSON.stringify({
      "id": id,
      "picture": picture
    });
    return this.http.post(this.apibackend + 'userpicture', body, { headers: this.headers})
    .map(res => res.json());
  } 

  public getResultVideo(id: number){
    return this.http.get(this.apibackend + '/getuserpicture' + id ,{headers: this.headers})
    .map(res=> res.json());
  }
  //inte helt klar, ovan

  public putResult(id: number, userid: number, gymid: number, sportid: number, value: number) {
    let body = JSON.stringify({
      "id": id,
      "user": userid,
      "gym": gymid,
      "sport": sportid,
      "value": value
    });
    return this.http.put(this.apibackend + '/result/' + id, body, { headers: this.headers })
      .map(res => res.json());
  }

  public deleteResult(id: number) {
    return this.http.delete(this.apibackend + '/result/' + id, { headers: this.headers })
      .map(res => res.json());
  }



  ////////////////////////////////////////////////////////////////////////
  // SPORT
  ////////////////////////////////////////////////////////////////////////

  public getSport(id: number) {
    return this.http.get(this.apibackend + '/sport/' + id, { headers: this.headers })
      .map(res => res.json());
  }


  public getAllSports() {
    return this.http.get(this.apibackend + '/allsports', { headers: this.headers })
      .map(res => res.json());
  }

  ////////////////////////////////////////////////////////////////////////
  // FRIENDS
  ////////////////////////////////////////////////////////////////////////

 public postFriend(user_one_id: number, user_two_id: number) {
    let body = JSON.stringify({
      "id": 0,
      "user_1": user_one_id,
      "user_2": user_two_id
    });

   return this.http.post(this.apibackend + '/makefriends', body, { headers: this.headers })
      .map(res => res.json());
  }

  public getFriends(userid: number){
    return this.http.get(this.apibackend + '/allfriends/' + userid, {headers: this.headers})
    .map(res=> res.json());
  }  

  public searchUser(name: string){
    return this.http.get(this.apibackend + '/searchuser/' + name, {headers: this.headers})
    .map(res=> res.json());
  }

  public deleteFriend(user_one_id: number, user_two_id: number){

    return this.http.delete(this.apibackend + '/deletefriends' + user_one_id +'/'+ user_two_id, {headers: this.headers})

    .map(res=> res.json());
  }

  ////////////////////////////////////////////////////////////////////////
  // CHALLANGES
  ////////////////////////////////////////////////////////////////////////

  public getChallenges(userid: number){
    return this.http.get(this.apibackend+'/challenges/' + userid, {headers: this.headers})
    .map(res=> res.json());
  }

  public postChallenge(user_one_id: number, user_two_id: number, sport: string, message: string, reps: number){
    let body = JSON.stringify({
      "id": 0,
      "sender": user_one_id,
      "receiver": user_two_id,
      "sport": sport,
      "message": message,
      "reps": reps
    });
    return this.http.post(this.apibackend + '/newchallenge',body, {headers: this.headers})
    .map(res=> res.json());
  }



  ////////////////////////////////////////////////////////////////////////
  // MISCELLANEOUS
  ////////////////////////////////////////////////////////////////////////

  public getMessages(user_one_id: number, user_two_id: number) {
    return this.http.get(this.apibackend + '/messages/' + user_one_id + '/' + user_two_id, { headers: this.headers })
      .map(res => res.json());
  }



}
