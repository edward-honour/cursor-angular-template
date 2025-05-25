import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service'; 
import { catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  r: any;
  path: any;
  id: any;
  id2: any;
  id3: any;

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.path = '';
    this.id='';
    this.id2='';
    this.id3='';

    if (state.url!==undefined) {
      this.path = state.url;
    }

    this.r=this.dataService.getData(this.path, this.id, this.id2, this.id3).pipe(catchError(err=> 
      { 
        console.log(err);
        return of(null);
      }));
      console.log(this.r);
    return (this.r)

    
  }

}
