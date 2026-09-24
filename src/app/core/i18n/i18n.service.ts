import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CONTENT_EN } from './content.en';
import { Lang, SiteContent } from './content.model';
import { CONTENT_PT } from './content.pt';
import { readStorage, writeStorage } from '../storage';

const CONTENT: Record<Lang, SiteContent> = { pt: CONTENT_PT, en: CONTENT_EN };
const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.initialLang());
  readonly t = computed(() => CONTENT[this.lang()]);
  readonly locale = computed(() => (this.lang() === 'pt' ? 'pt-BR' : 'en-US'));

  constructor() {
    effect(() => {
      this.doc.documentElement.lang = this.locale();
      writeStorage(STORAGE_KEY, this.lang());
    });
  }

  toggle(): void {
    this.lang.update((lang) => (lang === 'pt' ? 'en' : 'pt'));
  }

  private initialLang(): Lang {
    // ?lang=en mantém compatível o antigo link en.html
    const fromUrl = new URLSearchParams(this.doc.location.search).get('lang');
    if (fromUrl === 'pt' || fromUrl === 'en') return fromUrl;
    const stored = readStorage(STORAGE_KEY);
    return stored === 'en' ? 'en' : 'pt';
  }
}
