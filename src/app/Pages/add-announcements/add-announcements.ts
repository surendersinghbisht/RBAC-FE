import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddAnnouncementService } from '../../Services/AnnouncementService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-announcements',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-announcements.html',
  styleUrls: ['./add-announcements.css']
})
export class AddAnnouncements implements OnInit {
@ViewChild('announcementFormContainer', { static: false })
announcementFormContainer!: ElementRef;


  isEditing: boolean = false;
  form!: FormGroup;
  allAnnouncements: any[] = [];
  constructor(private fb: FormBuilder, private announcementService: AddAnnouncementService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      announcements: this.fb.array([])
    });
  }
showSuccess() {
  this.snackBar.open(
    this.isEditing ? '✅ Updated Successfully!' : '✅ Added Successfully!',
    'Close',
    {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    }
  );
}

showDeleteSuccess() {
  this.snackBar.open('🗑️ Deleted Successfully!', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['delete-snackbar']
  });
}




  ngOnInit() {
  this.getAllAnnouncements();
    this.addAnnouncement(); 
  }

  getAllAnnouncements(){
 this.announcementService.getAnnouncements().subscribe({
      next: (res) => {
        this.allAnnouncements = res;
        console.log('Existing announcements:', this.allAnnouncements);
      },
      error: (err) => console.error(err)
    });
  }

  get announcements(): FormArray {
    return this.form.get('announcements') as FormArray;
  }

 addAnnouncement() {
  this.announcements.push(
    this.fb.group({
      title: ['', [Validators.required, Validators.nullValidator]],
      message: ['', [Validators.required, Validators.nullValidator]],
      createdBy: [''],
      announcementId: [0]
    })
  );
}


  removeAnnouncement(index: number) {
    this.announcements.removeAt(index);
  }

  createAnnouncements() {
    console.log(this.announcements.value);
    if(this.form.invalid){
      alert('Please fill all required fields');
      return;
    }
    this.announcementService.createAnnouncement(this.announcements.value).subscribe({
      next: (res) => {
      this.showSuccess();
        this.form.reset();
        this.announcements.clear();
        this.getAllAnnouncements();
        this.form.reset();
      },
      error: (err) => console.error(err)
    });
  }

  deleteAnnouncement(id: number, index: number) {
    this.announcementService.deleteAnnouncement(id).subscribe({
      next: (res) => {
        this.form.value.announcements.splice(index, 1);
       this.showDeleteSuccess();
        this.getAllAnnouncements();
      },
      error: (err) => console.error(err)
    });
  }

editAnnouncement(announcement: any, index: number) {
  this.isEditing = true;
  console.log('edit announcement',announcement, index)
  this.announcements.at(0).patchValue({
    title: announcement.title,
    message: announcement.message,
      createdBy: announcement.createdBy,
      announcementId: announcement.announcementId
  })
  setTimeout(() => {
    this.announcementFormContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}


  updateAnnouncement() {
    console.log('adasdas',this.form.value.announcements[0]);
    this.announcementService.editAnnouncement(this.form.value.announcements[0]).subscribe({
      next: (res) => {
        this.showSuccess()
              this.isEditing = false;
        this.form.reset();
  
        
        this.getAllAnnouncements();
      },
      error: (err) => console.error(err)
    })
  }
}
