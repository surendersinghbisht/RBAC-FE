import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddAnnouncementService } from '../../Services/AnnouncementService';

@Component({
  selector: 'app-add-announcements',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-announcements.html',
  styleUrls: ['./add-announcements.css']
})
export class AddAnnouncements implements OnInit {

  form!: FormGroup;
  allAnnouncements: any[] = [];
  constructor(private fb: FormBuilder, private announcementService: AddAnnouncementService) {
    this.form = this.fb.group({
      announcements: this.fb.array([])
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
        title: ['', Validators.required, Validators.nullValidator],
        message: ['', Validators.required, Validators.nullValidator],
        createdBy: ['', Validators.required]
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
        alert('Announcements created successfully');
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
        alert(res.message);
        this.getAllAnnouncements();
      },
      error: (err) => console.error(err)
    });
  }
}
