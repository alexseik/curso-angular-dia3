import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { CandidatesService } from 'src/app/services/candidates.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  @Input() candidate!: Candidate;

  skills: { technology: string; experience: number }[] = [];

  seniority = {
    junior: false,
    mid: false,
    senior: false,
  };

  constructor(
    public dialog: MatDialog,
    private candidateService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.seniority.junior = this.candidate?.experience === 'Junior';
    this.seniority.mid = this.candidate?.experience === 'Midlevel';
    this.seniority.senior = this.candidate?.experience === 'Senior';
    this.buildUniqueSkills();
  }

  /* Build an unique array of techs with years where only appears the
  technology with biggest experience number */
  private buildUniqueSkills() {
    if (this.candidate && Array.isArray(this.candidate.previousProjects)) {
      function onlyUnique(
        value: { technology: string; experience: number },
        index: number,
        self: { technology: string; experience: number }[]
      ) {
        const found = self.findIndex(
          (v: { technology: string; experience: number }) =>
            v.technology === value.technology && v.experience > value.experience
        );
        return found === -1 || found === index;
      }

      this.skills = this.candidate.previousProjects
        .map((project) => {
          return project.technology.map((t) => ({
            technology: t,
            experience: project.experience,
          }));
        })
        .flat()
        .filter(onlyUnique);
    }
  }

  remove() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: this.candidate,
    });

    dialogRef.afterClosed().subscribe((result) => {
      debugger;
      if (result) {
        this.candidateService.remove(this.candidate.id as number);
      }
    });
  }
}
