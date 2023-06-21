import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../interfaces/';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private buildPostUrl(categoryId: number, orderBy: string, perPage: number) {
    return `${environment.wpApi}/posts?categories=${categoryId}&orderby=${orderBy}&per_page=${perPage}&_embed`;
  }

  getRandomArticles(): Observable<Post[]> {
    return this.http.get<Post[]>(this.buildPostUrl(2, 'rand', 3)).pipe(
      map(posts => posts.map(post => ({ ...post, title: { rendered: new DOMParser().parseFromString(post.title.rendered, 'text/html').documentElement.textContent! } }) ))
    );
  }

  getRandomProjects(): Observable<Post[]> {
    return this.http.get<Post[]>(this.buildPostUrl(14, 'rand', 3)).pipe(
      map(posts => posts.map(post => ({ ...post, title: { rendered: new DOMParser().parseFromString(post.title.rendered, 'text/html').documentElement.textContent! } }) ))
    );
  }

}
