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
import { NameCapitalizePipe } from '../../pipes/name-capitalize.pipe';
import { NumericOnlyPipe } from '../../pipes/numeric-only.pipe';
import { DepartmentFormComponent } from '../../forms/department-form/department-form.component';
import { UploadEmployeeComponent } from '../../forms/upload-employee/upload-employee.component';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule, 
    SearchFilterPipe, 
    NgxPaginationModule, 
    DepartmentFormComponent,
    NavMenuComponent, 
    UploadEmployeeComponent, 
    NameCapitalizePipe,
    NumericOnlyPipe
  ],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent  implements OnInit {

  data: any;
  message: any;
  searchText: string = '';
  p: any = 1;
  showing: string = 'N';
  upload: string = 'N';
  
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
  toggleDisplayForm() {
    this.showing = this.showing === 'N' ? 'Y' : 'N';
  }

  // Toggle upload form.
  toggleUploadForm() {
    this.upload = this.upload === 'N' ? 'Y' : 'N';
  }

}
