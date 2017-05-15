import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CoordService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CoordService {

  axis: any;
  flattening: any;
  centralMeridian: any;
  latOfOrigin: any;
  scale: any;
  falseNorthing: any;
  falseEasting: any;

  constructor(public http: Http) {
    console.log('Hello CoordService Provider');
  }

  grs80Params() {
    this.axis = 6378137.0; // GRS 80.
    this.flattening = 1.0 / 298.257222101; // GRS 80.
    this.centralMeridian = null;
    this.latOfOrigin = 0.0;
  }

    //rt90_2.5_gon_v
  rt90Projection() {
    this.centralMeridian = 15.0 + 48.0 / 60.0 + 22.624306 / 3600.0;
    this.scale = 1.00000561024;
    this.falseNorthing = -667.711;
    this.falseEasting = 1500064.274;
  }

  mathSinh(value) {
    return 0.5 * (Math.exp(value) - Math.exp(-value));
  }

  mathCosh(value) {
    return 0.5 * (Math.exp(value) + Math.exp(-value));
  }

  mathAtanh(value) {
    return 0.5 * Math.log((1.0 + value) / (1.0 - value));
  }

  gridToGeodetic(x, y) {
    this.grs80Params();
    this.rt90Projection();
    var lat_lon = new Array(2);
    if (this.centralMeridian == null) {
      return lat_lon;
    }
    // Prepare ellipsoid-based stuff.
    var e2 = (this.flattening * (2.0 - this.flattening));
    var n = (this.flattening / (2.0 - this.flattening));
    var a_roof = this.axis / (1.0 + n) * (1.0 + n * n / 4.0 + n * n * n * n / 64.0);
    var delta1 = n / 2.0 - 2.0 * n * n / 3.0 + 37.0 * n * n * n / 96.0 - n * n * n * n / 360.0;
    var delta2 = n * n / 48.0 + n * n * n / 15.0 - 437.0 * n * n * n * n / 1440.0;
    var delta3 = 17.0 * n * n * n / 480.0 - 37 * n * n * n * n / 840.0;
    var delta4 = 4397.0 * n * n * n * n / 161280.0;

    var Astar = e2 + e2 * e2 + e2 * e2 * e2 + e2 * e2 * e2 * e2;
    var Bstar = -(7.0 * e2 * e2 + 17.0 * e2 * e2 * e2 + 30.0 * e2 * e2 * e2 * e2) / 6.0;
    var Cstar = (224.0 * e2 * e2 * e2 + 889.0 * e2 * e2 * e2 * e2) / 120.0;
    var Dstar = -(4279.0 * e2 * e2 * e2 * e2) / 1260.0;

    // Convert.
    var deg_to_rad = Math.PI / 180;
    var lambda_zero = this.centralMeridian * deg_to_rad;
    var xi = (x - this.falseNorthing) / (this.scale * a_roof);
    var eta = (y - this.falseEasting) / (this.scale * a_roof);
    var xi_prim = xi -
            delta1 * Math.sin(2.0 * xi) * this.mathCosh(2.0 * eta) -
            delta2 * Math.sin(4.0 * xi) * this.mathCosh(4.0 * eta) -
            delta3 * Math.sin(6.0 * xi) * this.mathCosh(6.0 * eta) -
            delta4 * Math.sin(8.0 * xi) * this.mathCosh(8.0 * eta);
    var eta_prim = eta -
            delta1 * Math.cos(2.0 * xi) * this.mathSinh(2.0 * eta) -
            delta2 * Math.cos(4.0 * xi) * this.mathSinh(4.0 * eta) -
            delta3 * Math.cos(6.0 * xi) * this.mathSinh(6.0 * eta) -
            delta4 * Math.cos(8.0 * xi) * this.mathSinh(8.0 * eta);
    var phi_star = Math.asin(Math.sin(xi_prim) / this.mathCosh(eta_prim));
    var delta_lambda = Math.atan(this.mathSinh(eta_prim) / Math.cos(xi_prim));
    var lon_radian = lambda_zero + delta_lambda;
    var lat_radian = phi_star + Math.sin(phi_star) * Math.cos(phi_star) *
            (Astar +
                    Bstar * Math.pow(Math.sin(phi_star), 2) +
                    Cstar * Math.pow(Math.sin(phi_star), 4) +
                    Dstar * Math.pow(Math.sin(phi_star), 6));
    lat_lon[0] = lat_radian * 180.0 / Math.PI;
    lat_lon[1] = lon_radian * 180.0 / Math.PI;
    //return lat_lon;
    return {lat: lat_lon[0], lon: lat_lon[1]};
  }
}
