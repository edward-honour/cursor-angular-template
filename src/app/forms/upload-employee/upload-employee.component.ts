import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-employee.component.html',
  styleUrl: './upload-employee.component.css'
})
export class UploadEmployeeComponent   {

  selectedFile: File | null = null;
  securityId: string = '';
  recordDate: string = '';
  uid: any = '';
  isProcessing: boolean = false;

  constructor(private http: HttpClient, private _router: Router) {}

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  getLocalStorage() {
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }
  }

  onSubmit() {
    this.getLocalStorage();
    if (this.selectedFile) {
      this.isProcessing = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('uid', this.uid); 
      
      this.http.post('https://localhost:8888/upload_employee_roster.php', formData).subscribe({
        next: (data: any) => {
          this.isProcessing = false;
          this._router.navigate(['/member-dashboard', data['hash']]);
        },
        error: (error: any) => {
          this.isProcessing = false;
          console.error('Error uploading member:', error);
        }
      });
    }
  }
}