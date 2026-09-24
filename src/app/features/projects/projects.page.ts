import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../../core/i18n/i18n.service';
import { NavItem } from '../../core/i18n/content.model';
import { MatrixRain } from '../../shared/components/matrix-rain';
import { TopNav } from '../../shared/components/top-nav';
import { AutoplayInViewDirective } from '../../shared/directives/autoplay-in-view.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../shared/directives/scramble.directive';
import { SplitTextDirective } from '../../shared/directives/split-text.directive';
import { GITHUB_REPOS_URL } from '../../core/links';
import { FlowChart } from './flow-chart';

@Component({
  selector: 'app-projects-page',
  imports: [
    AutoplayInViewDirective,
    FlowChart,
    MatrixRain,
    RevealDirective,
    ScrambleDirective,
    SplitTextDirective,
    TopNav,
  ],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.css',
})
export class ProjectsPage {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().projects);

  protected readonly nav = computed<NavItem[]>(() => [
    { label: this.t().back, route: '/' },
    ...this.t().projects.map((p) => ({ label: p.nav, fragment: p.id })),
    { label: this.t().others, href: GITHUB_REPOS_URL },
  ]);

  constructor() {
    const title = inject(Title);
    effect(() => title.setTitle(this.t().pageTitle));
  }

  protected number(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
