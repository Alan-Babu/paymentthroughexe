import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  constructor(private http: HttpClient) {}
  
  triggerPayment() {
    console.log('Triggering payment...');
    this.http.get('http://localhost:3000/ping', { responseType: 'text' }).subscribe({
      next: () => {
        this.http.get('http://localhost:3000/start-payment', { responseType: 'text' })
          .subscribe({
            next: msg => alert('✅ ' + msg),
            error: () => alert('❌ Failed to start payment.')
          });
      },
      error: () => {
        if (confirm('Payment software not found. Do you want to install it?')) {
          window.location.href = 'https://limewire.com/d/qIRsN#liJoHrCjeo';
        }
      }
    });
  }


}
