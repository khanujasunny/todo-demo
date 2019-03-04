import { AboutComponent } from './../about/about.component';
import { TodoComponent } from './../todo/todo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'todo',
        children: [
          {
            path: '',
            component: TodoComponent
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            component: AboutComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/todo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
