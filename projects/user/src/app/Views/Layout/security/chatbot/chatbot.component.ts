import { Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs';
import { MatFormSharedModule } from '../../../../Shared/Modules/mat-form-shared.module';

@Component({
  selector: 'app-chatbot',
  imports: [MatFormSharedModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit {
  show: boolean = false;
  Chat: MassageBody[] = [];
  newMassage = '';
  ngOnInit(): void {
    this.Chat.push({
      Id: this.generateUniqueId(),
      Massage: ' Hey there How Can <br> I Help You Today 👋?',
      Sender: 'system',
      Date: Date.now().toString(),
    } as MassageBody);
  }

  closePopup() {
    // إضافة الكلاس fade-out لإخفاء الـ popup
    const popupElement = document.querySelector('.chatbot-popup');
    if (popupElement) {
      popupElement.classList.add('fade-out');
    }

    setTimeout(() => {
      this.show = false;
    }, 200);
  }
  ShowPopup() {
    this.show = !this.show;
  }
  SendMassage() {
    if (this.newMassage !== '') {
      this.Chat.push({
        Id: this.generateUniqueId(),
        Massage: this.newMassage,
        Sender: 'user',
        Date: Date.now().toString(),
      } as MassageBody);
    }
  }
  generateUniqueId(): string {
    return Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
}
interface MassageBody {
  Id: string;
  Massage: string;
  Sender: string;
  Date: string;
}
