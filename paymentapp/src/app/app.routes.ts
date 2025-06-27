import { Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path: 'payment', component: PaymentComponent },
    { path: '', redirectTo: 'payment', pathMatch: 'full' },
    
];
