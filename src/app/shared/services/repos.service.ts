import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Repo } from '../interfaces/';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  private readonly _repos = new BehaviorSubject<Repo[]>([]);

  readonly repos$ = this._repos.asObservable();

  constructor(private http: HttpClient) {
    this.getRepos().subscribe();
  }

  private getRepos(): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${environment.githubApi}/repos?per_page=100&sort=full_name`).pipe(
      map(repos => repos.filter(repo => !repo.name.includes('nightwolfdev'))),
      tap(repos => this._repos.next(repos))
    );
  }
}
