import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Navigation, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list-panel.component.html',
  styleUrl: './employee-list-panel.component.css'
})
export class EmployeeListPanelComponent  implements OnInit, OnChanges {
  
  data: any;
  formData: any = {};
  
  @Input() path: any = 'employee-list-panel';
  @Input() id: any = '';
  @Input() id2: any = '';
  @Input() id3: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclick: EventEmitter<any> = new EventEmitter<any>();

  show: string = 'N';
  isLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.loadEmployeeList();
    }
  }

  loadEmployeeList(): void {
    this.isLoading = true;
    this._dataService.getData(this.path, this.id, this.id2, this.id3).subscribe({
      next: (data: any) => {
        this.data = data;
        this.formData = data.formData || {};
      },
      error: (error: Error) => {
        console.error('Error loading employee list:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  toggleShow(): void {
    this.show = this.show === 'Y' ? 'N' : 'Y';
  }

  closeWindow(): void {
    this.close.emit('N');
  }

  clickEvent(m: any): void {
    this.onclick.emit(m);
  }

}
