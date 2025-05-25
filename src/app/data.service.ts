import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  t: any;
  uid: any;
  url: any;
  hash: any;

  constructor(private http: HttpClient) { 
    this.url='http://localhost:8888/router.php';
  }

  getLocalStorage() {
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }
    if (localStorage.getItem('hash')===null) {
      this.hash="";
    } else {
      this.hash=localStorage.getItem('hash')
    }
  }


  getData(path: any, id: any, id2: any, id3: any) {
    this.getLocalStorage();
    const data = {
      "path" : path,
      "id": id,
      "id2": id2,
      "id3": id3,
      "hash": this.hash,   
      "uid": this.uid
    }
  
  this.t= this.http.post(this.url, data);
  return this.t;

  }

  postData(path: any, formData: any) { 
    this.getLocalStorage();
    const data = {
      "path" : path,
      "formData": formData,
      "hash": this.hash,    
      "uid": this.uid
    }
  this.t= this.http.post(this.url, data);
  return this.t;

  }

}
