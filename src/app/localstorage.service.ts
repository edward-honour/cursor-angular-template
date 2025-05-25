import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageSub = new BehaviorSubject<boolean>(false);

  watchStorage(): BehaviorSubject<boolean> {
    return this.storageSub;
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.storageSub.next(true);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.storageSub.next(true);
  }

  getItem(key: string): any {
    return (localStorage.getItem(key) || 'null');
  }

  clear(): void {
    localStorage.clear();
    this.storageSub.next(true);
  }
}
