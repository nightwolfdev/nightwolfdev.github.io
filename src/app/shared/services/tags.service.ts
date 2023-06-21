import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Tag } from '../interfaces/';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private readonly _tags = new BehaviorSubject<Tag[]>([]);

  readonly tags$ = this._tags.asObservable();

  constructor(private http: HttpClient) {
    this.getTags().subscribe();
  }

  private getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.wpApi}/tags?per_page=100`).pipe(
      tap(tags => this._tags.next(tags))
    );
  }
}
