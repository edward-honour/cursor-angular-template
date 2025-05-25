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
import { EmployeeListPanelComponent } from '../../panels/employee-list-panel/employee-list-panel.component';
import { EmployeeDisplayPanelComponent } from '../../panels/employee-display-panel/employee-display-panel.component';

@Component({
  selector: 'app-department-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchFilterPipe, NgxPaginationModule, 
    NavMenuComponent, DepartmentFormComponent, EmployeeListPanelComponent, 
    EmployeeDisplayPanelComponent],
  templateUrl: './department-dashboard.component.html',
  styleUrl: './department-dashboard.component.css'
})
export class DepartmentDashboardComponent  implements OnInit {

  data: any;
  message: any;
  searchText: string = '';
  p: any = 1;
  showing: string = 'N';
  assign: string = 'N';
  upload: string = 'N';
  current_employee: any = 0;
  isProcessing: boolean = false;  
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router
) { }

  ngOnInit(): void
  {      
      this._activatedRoute.data.subscribe(({ 
          data })=> { 
          this.data=data;
      }) 
  }

    // Toggle display form.
    toggleEditForm() {
      this.showing = this.showing === 'N' ? 'Y' : 'N';
    }

  switchEmployee(m: any): void { 
        this.current_employee=m['ROWID'];     
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




}

