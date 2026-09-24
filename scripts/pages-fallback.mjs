// Pós-build para o GitHub Pages (que não tem reescrita de rotas de SPA):
// - 404.html: qualquer rota desconhecida carrega o app e o roteador do Angular resolve;
// - projetos.html: o Pages serve /projetos a partir de projetos.html, então ele também é o app
//   (e mantém funcionando o antigo link projetos.html).
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join('dist', 'curriculo', 'browser');
for (const target of ['404.html', 'projetos.html']) {
  copyFileSync(join(dist, 'index.html'), join(dist, target));
}
console.log('SPA fallback: 404.html e projetos.html criados.');
