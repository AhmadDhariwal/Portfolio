import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { profile, socialLinks } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly profile = profile;
  readonly socialLinks = socialLinks;
  readonly contactEndpoint = `https://formsubmit.co/${profile.email}`;
  notice = '';

  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submit(event: SubmitEvent): void {
    if (!this.form.name.trim() || !this.form.email.trim() || !this.form.message.trim()) {
      event.preventDefault();
      this.notice = 'Please add your name, email, and message before sending.';
      return;
    }

    this.notice = 'Sending your message to Ahmad. You may see a quick email verification page the first time.';
  }
}
