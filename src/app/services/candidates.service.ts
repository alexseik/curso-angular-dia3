import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Candidate } from '../models/candidate';
import { APP_CONFIG, AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private candidates: Candidate[] = [];

  private subject: BehaviorSubject<Candidate[]>;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.candidates = Array.isArray(config.candidates) ? config.candidates : [];
    this.subject = new BehaviorSubject(this.candidates);
  }

  getCandidates(): Observable<Candidate[]> {
    return this.subject.asObservable();
  }

  getCandidate(id: number | string) {
    const candidate = this.candidates.find((c) => c.id === id);
    if (candidate) {
      return of(candidate);
    }
    const errorResponse = {
      status: 404,
      error: new Error('Recurso no encontrado'),
      message: 'Recurso no encontrado',
    };
    return throwError(() => errorResponse);
  }

  save(candidate: Candidate): Observable<Candidate> {
    const savedCandidate = Object.assign({}, candidate, {
      id: this.candidates.length,
    });
    this.candidates.push(savedCandidate);
    this.notify();
    return of(savedCandidate);
  }

  update(candidate: Candidate): Observable<Candidate> {
    let index = -1;
    if (typeof candidate.id === 'number' || typeof candidate === 'string') {
      this.candidates = this.candidates.map((c, i) => {
        if (c.id === candidate.id) {
          index = i;
          return candidate;
        }
        return c;
      });
      if (index > -1) {
        this.notify();
        return of(this.candidates[index]);
      }
    }
    const errorResponse = {
      status: 404,
      error: new Error('Recurso no encontrado'),
      message: 'Recurso no encontrado',
    };
    return throwError(() => errorResponse);
  }

  remove(id: string | number) {
    const candidateIndex = this.candidates.findIndex((c) => c.id === id);
    if (candidateIndex > -1) {
      this.candidates.splice(candidateIndex, 1);
      this.notify();
      return of({
        status: 204,
        message: 'Recurso borrado',
      });
    }
    const errorResponse = {
      status: 404,
      error: new Error('Recurso no encontrado'),
      message: 'Recurso no encontrado',
    };
    return throwError(() => errorResponse);
  }

  private notify() {
    this.subject.next(this.candidates);
  }
}
