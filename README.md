# curriculo_animado_em_2_minutos

Minha tragetória em 2 minutos 😎

Currículo animado feito em **Angular 22** (standalone components, signals, zoneless) e **TypeScript**, com animações em GSAP.

## Rodando localmente

```bash
npm install
npm start          # http://localhost:4200
```

## Build

```bash
npm run build          # dist/curriculo/browser
npm run build:pages    # build com base-href do GitHub Pages + fallback de rotas
```

O deploy no GitHub Pages é feito pelo workflow `.github/workflows/deploy.yml` a cada push na `main`
(em *Settings → Pages*, a fonte deve ser **GitHub Actions**).

## Estrutura

```
src/app/
  core/            serviços: idioma (PT/EN), tema (Standard/Cyberpunk), animação/rolagem
    i18n/          todo o conteúdo do site, em content.pt.ts e content.en.ts
  shared/
    components/    fundo de partículas, chuva Matrix, cursor, navegação, barra de progresso
    directives/    appReveal, appScramble, appSplitText, appTilt, appMagnetic, appCountUp, appTypewriter
  features/
    home/          página inicial, uma seção por componente
    projects/      página de projetos
public/assets/     imagens, vídeos e PDFs do currículo
```

Para editar textos, mexa apenas em `src/app/core/i18n/content.pt.ts` e `content.en.ts`.

## Efeitos

- Intro do hero: título com letras girando em 3D, troca da foto com glitch e virada automática para o tema Cyberpunk com revelação circular (View Transitions API)
- Fundo de partículas interativo que foge do cursor, aurora animada e holofote que segue o mouse
- Tema Cyberpunk com chão em grade synthwave, scanlines e títulos com glitch
- Títulos que "decodificam" (scramble) ao aparecer e ao trocar de idioma
- Cards com inclinação 3D e reflexo de luz, botões magnéticos, bordas neon girando
- Contadores animados, faixas infinitas de tecnologias, linha do tempo que se desenha com a rolagem
- Rolagem suave (Lenis), transição animada entre páginas e confete no modal de contato
- Respeita `prefers-reduced-motion`: com ele ativo, as animações são desligadas
