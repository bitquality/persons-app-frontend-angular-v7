import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonsListComponent } from './pages/home/components/persons-list/persons-list.component';
import { HomeComponent } from './pages/home/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AboutComponent } from './pages/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './pages/add-person/add-person.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent,
    HomeComponent,
    AboutComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
