import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PostsService, ReposService, TagsService } from './shared/services';
import { PostWithTagInfo, Repo } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  randomArticles$: Observable<PostWithTagInfo[]>;
  randomProjects$: Observable<PostWithTagInfo[]>;
  repos$: Observable<Repo[]>;

  constructor(
    private postsSvc: PostsService,
    private reposSvc: ReposService,
    private tagsSvc: TagsService
  ) {}

  ngOnInit() {
    this.randomArticles$ = combineLatest([
      this.postsSvc.getRandomArticles(),
      this.tagsSvc.tags$
    ]).pipe(
      map(([posts, tags]) => posts.map(post => ({ ...post, tagInfo: post.tags.map(tag => tags.find(t => t.id === tag)!) })))
    );

    this.randomProjects$ = combineLatest([
      this.postsSvc.getRandomProjects(),
      this.tagsSvc.tags$
    ]).pipe(
      map(([posts, tags]) => posts.map(post => ({ ...post, tagInfo: post.tags.map(tag => tags.find(t => t.id === tag)!) })))
    )

    this.repos$ = this.reposSvc.repos$;
  }

}
