import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';
import { APP_CONFIG } from '../config/app.config';
import { mergeAll, mergeMap, switchMap } from 'rxjs';

describe('CandidatesService', () => {
  let service: CandidatesService;
  let testBed: TestBed;

  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Nombre 1',
      surname: 'Apellido 1',
      email: 'email@email.com',
      experience: Experience.Junior,
      previousProjects: [],
      age: 25,
    },
  ];

  const appConfig = { candidates };

  beforeEach(() => {
    testBed = TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_CONFIG,
          useValue: appConfig,
        },
      ],
    });
    service = TestBed.inject(CandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initialized with empty array by default', (done) => {
    service = new CandidatesService({});
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved).toEqual([]);
      done();
    });
  });

  it('allows retrieve the candidates', (done) => {
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved).toEqual(candidates);
      done();
    });
  });

  describe('create', () => {
    const newCandidate: Candidate = {
      name: 'Nombre 2',
      surname: 'Apellido 2',
      email: 'email@email.com',
      experience: Experience.Senior,
      previousProjects: [],
      age: 52,
    };

    it('allows add a new candidate', (done) => {
      service.save(newCandidate).subscribe((candidate) => {
        expect(candidate).toEqual(
          Object.assign({}, newCandidate, { id: candidate.id })
        );
        done();
      });
    });

    it('should emit a new list', (done) => {
      service = new CandidatesService({});
      service
        .save(newCandidate)
        .pipe(switchMap(() => service.getCandidates()))
        .subscribe((candidates) => {
          expect(candidates.length).toBe(1);
          done();
        });
    });
  });

  describe('update', () => {
    const updatedCandidate = Object.assign({}, candidates[0], {
      name: 'Enrique',
    });
    it('should fail if user does not exist', (done) => {
      updatedCandidate.id = 999;
      service.update(updatedCandidate).subscribe({
        complete: () => {
          done.fail(); // el test debe fallar asi que si devuelve algo, fallo
        },
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.status).toBe(404);
          done();
        },
      });
    });
    it('should update an existing candidate', (done) => {
      updatedCandidate.id = 1;
      service
        .update(updatedCandidate)
        .pipe(mergeMap(() => service.getCandidates()))
        .subscribe((candidates) => {
          expect(candidates[0]).toEqual(updatedCandidate);
          done();
        });
    });
  });

  describe('getCandidate', () => {
    beforeEach(() => {
      testBed.resetTestingModule();
    });
    it('should return the candidate if it exists', (done) => {
      service.getCandidate(1).subscribe({
        next: (candidate: Candidate) => {
          expect(candidates[0]).toEqual(candidate);
          done();
        },
        error: () => {
          done.fail(); // test fail if does not found
        },
      });
    });
    it('should throw error if the candidate does not exist', (done) => {
      service.getCandidate(99).subscribe({
        complete: () => {
          done.fail();
        },
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.status).toBe(404);
          done();
        },
      });
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      testBed.resetTestingModule();
    });
    // it('should remove a candidate if it exists', (done) => {
    //   service
    //     .remove(1)
    //     .pipe(mergeMap(() => service.getCandidates()))
    //     .subscribe({
    //       next: (candidates) => {
    //         expect(candidates.length).toEqual(0);
    //         done();
    //       },
    //       error: (error) => {
    //         done.fail(error);
    //       },
    //     });
    // });
    it('should throws error if it does not exist', (done) => {
      service.remove(99).subscribe({
        complete: () => {
          done.fail();
        },
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.status).toBe(404);
          done();
        },
      });
    });
  });
});
