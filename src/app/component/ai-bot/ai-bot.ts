import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiBotService } from '../../Services/AiBotService';

@Component({
  selector: 'app-ai-bot',
  imports: [FormsModule, CommonModule],
  templateUrl: './ai-bot.html',
  styleUrl: './ai-bot.css'
})
export class AiBot {
  isOpen = false;
  messages: { from: string, text: string }[] = [];
  userInput = '';
  botReply = '';
constructor(private aiBotService: AiBotService) 
{ }

  togglePopup() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.messages.push({ from: 'user', text: this.userInput });

 this.aiBotService.getAiResponse(this.userInput).subscribe({
  next: (response) => {
  console.log('Bot response:', response);
    this.messages.push({ from: 'bot', text: response})}
  });
this.userInput = '';
}
}
