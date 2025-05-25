import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion-button',
  standalone: true,
  imports: [],
  templateUrl: './accordion-button.component.html',
  styleUrl: './accordion-button.component.css'
})
export class AccordionButtonComponent {
  @Input() open: any = 'N';
  @Input() count: any = '';
  @Input() total: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  toggleOpen() {
    this.open = this.open === 'Y' ? 'N' : 'Y';
    this.showIt();
  }

  showIt() {
    this.close.emit(this.open);
   }

}
