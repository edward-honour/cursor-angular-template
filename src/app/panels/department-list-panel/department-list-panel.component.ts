import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Navigation, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-list-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './department-list-panel.component.html',
  styleUrl: './department-list-panel.component.css'
})
export class DepartmentListPanelComponent  implements OnInit, OnChanges {
  
  data: any;
  formData: any = {};
  
  @Input() path: any = 'lab-results';
  @Input() id: any = '';
  @Input() id2: any = '';
  @Input() id3: any = '';
  @Input() lab_name: any = 'Lab Results';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  
  show: string = 'N';
  isLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadLabData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.loadLabData();
    }
  }

  loadLabData(): void {
    this.isLoading = true;
    this._dataService.getData(this.path, this.id, this.id2, this.id3).subscribe({
      next: (data: any) => {
        this.data = data;
        this.formData = data.formData || {};
      },
      error: (error: Error) => {
        console.error('Error loading lab data:', error);
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
}
