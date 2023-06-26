import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'update',
    component: UpdateUserComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'editUser/:id',
    component: AdminEditUserComponent,
  },
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}