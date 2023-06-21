import { Component, Input } from '@angular/core';

import { Repo } from '../shared/interfaces';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent {
  @Input() repos: Repo[];
}
