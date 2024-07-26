import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "./services/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  // Logic to check if the user is logged in
  const isLoggedIn = auth.isLoggedIn();
  if(isLoggedIn){
    router.navigate(['/home']);
    return false;
  }
  return true;

};

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  // Logic to check if the user is logged in
  const isLoggedIn = auth.isLoggedIn();
  if (!isLoggedIn) {
    router.navigate(['/authentication/login']);
    showNotification();
    return false;
  }
  return true;
}

function showNotification(): void {
  const notification = document.createElement('div');
  notification.classList.add('fixed', 'bottom-0', 'right-0', 'm-6', 'p-4', 'bg-red-500', 'text-white', 'rounded-md', 'z-50');
  notification.textContent = 'You need to be logged in to start a campaign.';
  document.body.appendChild(notification);
  setTimeout(() => {
  document.body.removeChild(notification);
}, 5000);
}

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if(!auth.isAdmin()){
    router.navigate(['/home']);
    return false;
  }
  return true
}
