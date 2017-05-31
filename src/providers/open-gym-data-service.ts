import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the OpenGymDataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OpenGymDataService {

  public openData: any;
  public apistockholm: string;
  public apismhi: string;
  private ourApiKey = 'ffd5810dd624442ca44452e55964fd67';

  constructor(public http: Http) {
    //this.apismhi = "http://opendata-download-metfcst.smhi.se";
    this.apismhi= '/smhi';
    //this.apistockholm = "http://api.stockholm.se";
    this.apistockholm  = '/openStockholm';
  }

  public getForecast(lon: number, lat: number) {
    console.log(lon + ", " + lat);
    return this.http.get(this.apismhi + '/api/category/pmp2g/version/2/geotype/point/lon/' + lon + '/lat/' + lat + '/data.json')
      .map(res => res.json());
  }

  // Hämtar generell data om alla utegym.
  public loadGymData() {
    // http://api.stockholm.se/ServiceGuideService/ServiceUnitTypes/96a67da3-938b-487e-ac34-49b155cb277b/ServiceUnits/json?apikey=ffd5810dd624442ca44452e55964fd67
    return this.http.get(this.apistockholm + '/ServiceGuideService/ServiceUnitTypes/96a67da3-938b-487e-ac34-49b155cb277b/ServiceUnits/json?apikey=' + this.ourApiKey)
      .map(res => res.json());
  }

  public loadGymDetails(gymid: string) {
    return this.http.get(this.apistockholm + '/ServiceGuideService/DetailedServiceUnits/' + gymid + '/json?apikey=' + this.ourApiKey)
      .map(res => res.json());
  }

  public loadGymImage(imageid: string) {
    return this.http.get(this.apistockholm + '/ServiceGuideService/ImageFiles/' + imageid + '/Data?apikey=' + this.ourApiKey);
  }

}
