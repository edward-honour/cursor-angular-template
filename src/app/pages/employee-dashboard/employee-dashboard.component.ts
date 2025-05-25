import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from '../../search-filter.pipe';
import { NavMenuComponent } from '../../layout/nav-menu/nav-menu.component';
import { DepartmentFormComponent } from '../../forms/department-form/department-form.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchFilterPipe, NgxPaginationModule, NavMenuComponent, DepartmentFormComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent  implements OnInit {

  data: any;
  message: any;
  searchText: string = '';
  p: any = 1;
  showing: string = 'N';
  assign: string = 'N';
  upload: string = 'N';
  isProcessing: boolean = false;  // Add loading state
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient  // used by upload
) { }

  ngOnInit(): void
  {      
      this._activatedRoute.data.subscribe(({ 
          data })=> { 
          this.data=data;
      }) 
  }

  toggleThoughts() {
    if (this.showing=='N') {
      this.showing='Y'
    } else {
      this.showing='N';
    }
}

toggleUpload() {
  if (this.upload=='N') {
    this.upload='Y'
  } else {
    this.upload='N';
  }
}

toggleAssign() {
  if (this.assign=='N') {
    this.assign='Y'
  } else {
    this.assign='N';
  }
}

  switchUserGeneral(m: any): void { 
    let formData: any = { "member_id": m.id }
    this._dataService.postData("switch-member", formData).subscribe((data: any)=> { 
    this._router.navigate(['/general']);
  }) 

  }

  switchUserLongevity(m: any): void { 
    let formData: any = { "member_id": m.id }
    this._dataService.postData("switch-member", formData).subscribe((data: any)=> { 
    this._router.navigate(['/longevity']);
  }) 

  }

  switchUserDiet(m: any): void { 
    let formData: any = { "member_id": m.id }
    this._dataService.postData("switch-member", formData).subscribe((data: any)=> { 
    this._router.navigate(['/diet-exercise']);
  }) 

  }

  switchUserSkincare(m: any): void { 
    let formData: any = { "member_id": m.id }
    this._dataService.postData("switch-member", formData).subscribe((data: any)=> { 
    this._router.navigate(['/skincare']);
  }) 

  }

  switchUser(m: any): void { 
    let formData: any = { "member_id": m.id }
    this._dataService.postData("switch-member", formData).subscribe((data: any)=> { 
    this._router.navigate(['/general']);
  }) 
  }

  postForm(): void {  
    this.isProcessing = true;  // Set loading state to true before API call
    this._dataService.postData("process-ai", this.data.formData).subscribe({
      next: (data: any) => {
        this.isProcessing = false;  // Reset loading state on success
        location.reload();
      },
      error: (error: any) => {
        this.isProcessing = false;  // Reset loading state on error
        console.error('Error processing AI:', error);
      }
    });
  }

  postClinic(): void {  
    this._dataService.postData("post-clinic", this.data.formData).subscribe((data: any)=> { 
    location.reload();
  }) 
  }

  addProtocol(m: any): void {  
    let formData: any = { "protocol_id": m.id }
    this._dataService.postData("add-protocol", formData).subscribe((data: any)=> { 
      location.reload();
  }) 

  }

  removeProtocol(m: any): void {  
    let formData: any = { "protocol_id": m.id }
    this._dataService.postData("remove-protocol", formData).subscribe((data: any)=> { 
      location.reload();
  }) 

  }

}

