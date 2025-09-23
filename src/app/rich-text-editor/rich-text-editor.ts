// app.component.ts

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Underline
  ,Strikethrough,Link, BlockQuote, 
 } from 'ckeditor5';

@Component( {
    selector: 'rich-text-editor',
    templateUrl: './rich-text-editor.html',
    styleUrls: ['./rich-text-editor.css'],
    encapsulation: ViewEncapsulation.None,
    imports: [ CKEditorModule, FormsModule, CommonModule ],
    standalone: true
} )
export class RichTextEditorComponent {
    title = 'angular';
editorData = `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px;">
    <h2 style="text-align:center; color:#333;">Your OTP Code</h2>
    <p>Hi {{userName}},</p>
    <p>Use the following One-Time Password (OTP) to complete your login or verify your action:</p>
    <p style="text-align:center; font-size: 24px; font-weight: bold; color:#007bff; margin: 20px 0;">
      {{otpCode}}
    </p>
    <p>This code will expire in <strong>5 minutes</strong>. Do not share this code with anyone.</p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <p style="font-size:12px; color:#888; text-align:center;">&copy; 2025 My Company. All rights reserved.</p>
  </div>
</div>
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
}
