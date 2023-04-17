import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'client/list', component: ClientListComponent },
  { path: 'client/details/:username', component: ClientDetailsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
