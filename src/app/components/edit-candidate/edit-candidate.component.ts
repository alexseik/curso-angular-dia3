import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from 'src/app/services/candidates.service';
import { Observable, map, switchMap } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.scss'],
})
export class EditCandidateComponent implements OnInit {
  candidate!: Candidate;

  candidate$!: Observable<Candidate>;

  // param: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private candidatesService: CandidatesService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const miObs = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const selectedId = parseInt(params.get('id')!, 10);
        return this.candidatesService.getCandidate(selectedId);
      })
    );

    miObs.subscribe((candidate) => {
      this.candidate = candidate;
    });
  }

  onSubmit(candidate: Candidate) {
    debugger;
    this.candidatesService.update(candidate);
    this.router.navigate(['/']);
  }

  back() {
    this.location.back();
  }
}
