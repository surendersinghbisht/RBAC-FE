import { Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-template',
  standalone: true,
  imports: [CKEditorModule, FormsModule],
  template: `
    <ckeditor [editor]="Editor" [(ngModel)]="emailHtml"></ckeditor>
  `
})
export class EmailTemplateComponent {
  public Editor = ClassicEditor;
  public emailHtml: string = '';
}
