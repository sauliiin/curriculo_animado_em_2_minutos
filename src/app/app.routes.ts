import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage) },
  { path: 'projetos', loadComponent: () => import('./features/projects/projects.page').then((m) => m.ProjectsPage) },
  // Link antigo (projetos.html) — ver scripts/pages-fallback.mjs
  { path: 'projetos.html', redirectTo: 'projetos' },
  { path: '**', redirectTo: '' },
];
