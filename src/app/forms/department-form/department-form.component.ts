// Form Component  
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css'
})
export class DepartmentFormComponent   implements OnInit {
  
  data: any;

  @Input() path: any = 'department-form';  
  @Input() delete_path: any = 'delete-department-form';  
  @Input() nav_path: any = 'department-dashboard';  
  @Input() id: any = '';
  @Input() id2: any = '';
  @Input() id3: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();  // Used to notify parent component to close form.

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router
) { }

  
  ngOnInit(): void {
    // Common function to get data from data service when the component is initialized.
    if (this.id!="") {
      this._dataService.getData(this.path, this.id, this.id2, this.id3).subscribe((data: any)=> { 
        this.data=data;
    }) 
    }
  }


  doReload() {
    location.reload;
  }

  closeForm() {
    this.close.emit('N');
  }

  deleteForm() {
    if (confirm('Are you sure you want to Delete this record?')) {
      this._dataService.postData(this.delete_path, this.data['formData']).subscribe((data: any)=> { 
        this.closeForm();
      }) 
    }
  }
  
  postForm(): void {
    this._dataService.postData('post-' + this.path, this.data.formData).subscribe((data: any)=> { 
      //this.closeForm();
      location.reload();
      //this._router.navigate([this.nav_path, data.id]);
  }) 

  }

}
