import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Happy Birthday — A Cinematic Surprise',
  },
  {
    path: 'letter',
    loadComponent: () =>
      import('./pages/letter/letter.component').then((m) => m.LetterComponent),
    title: 'A Letter For You',
  },
  { path: '**', redirectTo: '' },
];
