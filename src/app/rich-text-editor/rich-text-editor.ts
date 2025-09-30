// app.component.ts

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Underline
  ,Strikethrough,Link, BlockQuote, 
 } from 'ckeditor5';
 import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {BIRTHDAY_EMAIL_TEMPLATE, NEW_TASK_EMAIL_TEMPLATE, WORK_ANNOUNCEMENT_TEMPLATE,
  BIRTHDAY_SUBJECT,ANNIVERSARY_SUBJECT,NEW_TASK_SUBJECT
} from '../Email-templates'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
    selector: 'rich-text-editor',
    templateUrl: './rich-text-editor.html',
    styleUrls: ['./rich-text-editor.css'],
    encapsulation: ViewEncapsulation.None,
    imports: [ CKEditorModule, FormsModule, CommonModule ],
    standalone: true
} )
export class RichTextEditorComponent {

  constructor(
      private snackBar: MatSnackBar
  ) {}

   showSnack(message: string, type: 'success' | 'error' | 'delete') {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: [`${type}-snackbar`]
  });
}
    title = 'angular';
   birthdayEmail = BIRTHDAY_EMAIL_TEMPLATE;
   newTaskEmail = NEW_TASK_EMAIL_TEMPLATE;
   workAnnouncement = WORK_ANNOUNCEMENT_TEMPLATE;
         userName = 'John Doe';
  otpCode = '123456';
     toEmail = ''; 
   subject = 'New Task Assigned';
editorData = `
<p>Hello, world!</p>
`;
    public Editor = ClassicEditor;
    public config = {
        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTk4ODE1OTksImp0aSI6IjVhNWM1Njc0LWJkNzYtNDEyNi1hYTExLWM2Yzk0OTE4OWNhOCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImU5NjljZDEwIn0.Ni-1lTejF_1wJTmWXg8PIjzqioz569ZGeRwFvlGu0-By0menmAS70vKAazUPULLIrjSyaiiSq5GqhYaJSMVm2Q', // Or 'GPL'.
        plugins: [ Essentials, Paragraph, Bold, Italic, Underline, Strikethrough, Link, BlockQuote ],
        toolbar: [
      'undo', 'redo', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'link', 'blockQuote', 'codeBlock', '|',
      'bulletedList', 'numberedList', 'outdent', 'indent', '|',
      'insertTable', 'mediaEmbed', '|',
      'alignment', 'fontColor', 'fontBackgroundColor', '|',
      'highlight', 'removeFormat'
    ]
    }

      sendEmail() {
        if(!this.toEmail){
          this.showSnack('Please enter recipient email', 'error');
          return;
        }
       const templateParams = {
      to_email: this.toEmail,
      subject: this.subject,
      message: this.editorData
    };
 console.log(templateParams);

this.showSnack('Email sent successfully', 'success');
   return emailjs.send(
      'service_uo11tdn',       // your EmailJS service ID
      'template_a18nfjp',   // template ID in EmailJS (with {{message_html}})
     templateParams,
      'THuDm_75Djq8mab80'           // your public key
    );

  }


  setBirthdayTemplate() {
    this.editorData = this.birthdayEmail;
    this.subject = BIRTHDAY_SUBJECT
  }

  setAnniversaryTemplate() {
    this.editorData = this.workAnnouncement;
    this.subject = ANNIVERSARY_SUBJECT
  }

  setNewTaskTemplate() {
    this.editorData = this.newTaskEmail;
    this.subject = NEW_TASK_SUBJECT
  }
  
}
