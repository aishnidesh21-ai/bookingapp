import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'hotels', loadComponent: () => import('./pages/hotels/hotels').then(m => m.HotelsComponent) },
  { path: 'hotels/:id', loadComponent: () => import('./pages/hotel-detail/hotel-detail').then(m => m.HotelDetailComponent) },
  { path: 'flights', loadComponent: () => import('./pages/flights/flights').then(m => m.FlightsComponent) },
  { path: 'trains', loadComponent: () => import('./pages/trains/trains').then(m => m.TrainsComponent) },
  { path: 'cabs', loadComponent: () => import('./pages/cabs/cabs').then(m => m.CabsComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent) },
  { path: '**', redirectTo: '/home' }
];
