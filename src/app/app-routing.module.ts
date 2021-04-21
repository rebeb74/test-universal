import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesResolver } from './pages.resolver';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    resolve: { pages: PagesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
