import { HomeComponent } from './pages/home/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard/auth-guard.service';
import { AboutComponent } from './pages/about/about.component';
import { AddPersonComponent } from './pages/add-person/add-person.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-person',
    component: AddPersonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
