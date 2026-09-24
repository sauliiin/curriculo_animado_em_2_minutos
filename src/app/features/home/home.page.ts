import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../../core/i18n/i18n.service';
import { ParticlesBg } from '../../shared/components/particles-bg';
import { TopNav } from '../../shared/components/top-nav';
import { About } from './sections/about';
import { Cta } from './sections/cta';
import { EducationSection } from './sections/education';
import { ExperienceSection } from './sections/experience';
import { Featured } from './sections/featured';
import { Fluxao } from './sections/fluxao';
import { Hero } from './sections/hero';
import { Hobbies } from './sections/hobbies';
import { Prefeitura } from './sections/prefeitura';
import { Services } from './sections/services';
import { Skills } from './sections/skills';
import { Snapshot } from './sections/snapshot';

@Component({
  selector: 'app-home-page',
  imports: [
    ParticlesBg,
    TopNav,
    Hero,
    Snapshot,
    Featured,
    Hobbies,
    Prefeitura,
    Services,
    Fluxao,
    About,
    Skills,
    ExperienceSection,
    EducationSection,
    Cta,
  ],
  template: `
    <app-particles-bg />
    <app-top-nav [items]="t().nav" />
    <main>
      <app-hero />
      <!-- O essencial para quem recruta vem logo após o hero; a história vem depois. -->
      <app-snapshot />
      <app-featured />
      <app-hobbies />
      <app-prefeitura />
      <app-services />
      <app-fluxao />
      <app-about />
      <app-skills />
      <app-experience />
      <app-education />
      <app-cta />
    </main>
  `,
})
export class HomePage {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home);

  constructor() {
    const title = inject(Title);
    effect(() => title.setTitle(this.t().pageTitle));
  }
}
