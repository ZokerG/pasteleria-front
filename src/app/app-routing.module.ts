import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then((m) => m.SecurityModule)
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
