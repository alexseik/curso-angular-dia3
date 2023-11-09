import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateListComponent,
  },
  {
    path: 'create',
    component: CreateCandidateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
