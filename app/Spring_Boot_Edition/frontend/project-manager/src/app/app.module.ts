import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { Service } from './service';
import { HttpClientModule } from '@angular/common/http';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { CattributeCreateComponent } from './cattribute-create/cattribute-create.component';
import { CattributeUpdateComponent } from './cattribute-update/cattribute-update.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientUpdateComponent } from './client-update/client-update.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'users', component: UsersComponent },
  { path: 'clients', component: ClientsComponent },  // 'about' route
  { path: '**', redirectTo: '' }  // Wildcard route (for 404 or invalid paths)
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserUpdateComponent,
    UserCreateComponent,
    LoadingScreenComponent,
    CattributeCreateComponent,
    CattributeUpdateComponent,
    ClientsComponent,
    ClientCreateComponent,
    ClientUpdateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
