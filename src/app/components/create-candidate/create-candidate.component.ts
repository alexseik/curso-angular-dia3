import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss'],
})
export class CreateCandidateComponent {
  constructor(
    private service: CandidatesService,
    private router: Router,
    private location: Location
  ) {}
  doSubmit(candidate: Candidate) {
    this.service.save(candidate);
    this.router.navigate(['/']);
  }
  doBack() {
    this.location.back();
  }
}
