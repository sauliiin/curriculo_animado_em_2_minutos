import { SiteContent } from './content.model';

export const CONTENT_PT: SiteContent = {
  controls: {
    themeLabel: 'Alternar tema',
    langSwitch: 'EN 🇺🇸',
    langSwitchAria: 'Switch to English',
  },

  home: {
    pageTitle: 'Saulo Hugo Rossi | Desenvolvedor Full Stack e Back-end Python',
    nav: [
      { label: 'Início', fragment: 'hero' },
      { label: 'Resumo', fragment: 'resumo' },
      { label: 'Projetos', route: '/projetos' },
      { label: 'Skills', fragment: 'skills' },
      { label: 'Experiências', fragment: 'experiences' },
    ],

    hero: {
      badge: 'Aberto a oportunidades · Remoto, híbrido ou mudança de cidade',
      ctaContact: 'Falar comigo',
      ctaCv: 'Baixar CV',
      title: 'Meu currículo animado em 2 minutos',
      subtitle:
        'Sou Saulo Hugo Rossi, formado em Direito (UFMG), Análise e Desenvolvimento de Sistemas e Ciência da Computação (Newton Paiva).',
      subtitleAfter: 'Saulo Hugo Rossi: Desenvolvedor Full Stack e Back-end Python | Analista de Sistemas',
      photoFunAlt: 'Foto divertida (não é o Saulo)',
      photoRealAlt: 'Foto real do Saulo',
      caption: 'Ops! Mentira, sou este! Informal e sempre animado!',
      scrollHint: 'Role para baixo',
    },

    snapshot: {
      title: 'Em 30 segundos',
      summary:
        'Desenvolvedor full stack e back-end Python, com experiência na criação de sites, sistemas web, APIs, pipelines de dados e apps mobile. Trago uma trajetória pouco comum: 6 anos como advogado e quase 8 anos na Prefeitura de Belo Horizonte, primeiro como analista de sistemas e, desde 2022, também como desenvolvedor web, construindo os sistemas que antes especificava. Essa combinação me permite traduzir regras de negócio complexas em software confiável. <strong>Inglês fluente.</strong>',
      stats: [
        { value: 8, prefix: '~', suffix: ' anos', label: 'na Prefeitura de BH, de analista a desenvolvedor' },
        { value: 15, label: 'pessoas na equipe multidisciplinar que liderei' },
        { from: 90, value: 30, suffix: ' dias', label: 'prazo médio de julgamento após a digitalização' },
        { value: 449, suffix: '+', label: 'sessões de julgamento indexadas pelo meu pipeline' },
        { value: 38, suffix: ' mil+', label: 'registros extraídos de PDFs com até 16 workers' },
        { value: 70, suffix: ' mil', label: 'linhas de Kotlin nos apps Android do OmniStream' },
      ],
      facts: [
        { label: 'Cargo', value: 'Full Stack e Back-end Python' },
        { label: 'Local', value: 'Belo Horizonte, MG' },
        { label: 'Modelo', value: 'Remoto, híbrido ou mudança' },
        { label: 'Idiomas', value: 'Português nativo · Inglês fluente' },
      ],
    },

    featured: {
      title: 'Projetos em destaque',
      subtitle: 'Produtos reais, publicados e em uso.',
      details: 'Detalhes',
      all: 'Ver todos os projetos →',
      items: [
        {
          id: 'omnistream',
          title: 'OmniStream',
          metric: 'APK de 3,3 MB · abre em ~340 ms',
          text: 'Produto open source em Android TV, Android, web e desktop. Apps em Kotlin/Compose com player próprio sobre o Media3 e versão web em Angular 22.',
          tags: ['Kotlin', 'Jetpack Compose', 'Angular 22', 'Electron'],
          link: { label: 'openstream.com.br', href: 'https://openstream.com.br' },
        },
        {
          id: 'jurisprudencia',
          title: 'Pipeline de Decisões Administrativas',
          metric: '449+ sessões · 12 mil+ votos',
          text: 'Pipeline em Python com 3 estágios paralelos ligados por filas, leitura de PDF, DOCX e Google Docs, OCR e site de busca com SQLite FTS5.',
          tags: ['Python', 'SQLite FTS5', 'OCR', 'Google Drive API'],
          link: { label: 'GitHub', href: 'https://github.com/sauliiin/jurisprudencia-juntas' },
        },
        {
          id: 'dashboard',
          title: 'Dashboard de Autos de Infração',
          metric: '38 mil+ registros · 16 workers',
          text: 'Extração automatizada de milhares de PDFs com Selenium e Python, alimentando um painel interativo em SVG e JavaScript puro.',
          tags: ['Python', 'Selenium', 'JavaScript', 'SVG'],
        },
        {
          id: 'carreiramais',
          title: 'CarreiraMais',
          metric: 'Recomendação explicada',
          text: 'Recomenda cursos e vagas cruzando habilidades, área, nível, localização e modalidade, mostrando a compatibilidade e o motivo de cada sugestão.',
          tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
          link: { label: 'match-job-tau.vercel.app', href: 'https://match-job-tau.vercel.app' },
        },
      ],
    },

    hobbies: {
      title: 'Sempre curioso e apaixonado por TI:',
      prev: 'Slide anterior',
      next: 'Próximo slide',
      goTo: 'Ir para o slide',
      slides: [
        {
          img: 'assets/img5.png',
          alt: 'Dashboard de autos de infração',
          caption:
            'Python + frontend: extrair informações de milhares de PDFs e transformar esses dados brutos em um dashboard interativo.',
        },
        { img: 'assets/img5a.png', alt: 'Análise de julgamentos', caption: 'Análise de dados dos Julgamentos' },
        {
          img: 'assets/img11.png',
          alt: 'Julgamentos remotos',
          caption:
            'Implementei a legislação e os sistemas para que os julgamentos presenciais fossem realizados de forma remota',
        },
        {
          img: 'assets/img6.png',
          alt: 'Painel de férias e trabalho híbrido',
          caption:
            'Aplicativo para gestão de férias da equipe, escalas de trabalho híbrido e designações de substitutos (CSS + JS + HTML + firebase integrated).',
        },
        {
          img: 'assets/img7.png',
          alt: 'Envio de arquivos para o Steam Deck',
          caption: 'Aplicativo .exe para envio de arquivos via SSH do Windows para o Steam Deck (mostly in python)',
        },
        {
          img: 'assets/img8.png',
          alt: 'Hospedagem de cursos',
          caption: 'Hospedagem gratuita e centralizada para divulgação de cursos',
        },
        {
          img: 'assets/img4.png',
          alt: 'BetterFlix',
          caption:
            'Integração com APIs (mdblist, tmdb, omdb, imdb e youtube) para criar um aplicativo único e completo de streaming (python + xml)',
        },
        { img: 'assets/img10.png', alt: 'BetterFlix', caption: 'E mais python backend' },
        {
          img: 'assets/img4a.jpg',
          alt: 'Plugin ReShade',
          caption:
            'Um plugin para gerenciar o ReShade (image enhancer) no Steam Deck e em dispositivos portáteis Linux semelhantes (python + shell).',
        },
        {
          img: 'assets/img2.png',
          alt: 'Firmware de patinete elétrico',
          caption: 'Firmware para patinete elétrico, principalmente em C e flasheado via ST-Link',
        },
        {
          img: 'assets/img3.png',
          alt: 'Patinete elétrico desmontado',
          caption: 'Estragando patinete após hackear demais 🥲',
        },
      ],
    },

    prefeitura: {
      title: "Now, let's talk about big projects 😎",
      intro:
        'Em 2019, conduzi e participei ativamente do desenvolvimento de um sistema para a Prefeitura de Belo Horizonte, viabilizando a digitalização de processos até então tramitados em papel.',
      realizedBefore: 'Foi então que percebi',
      realizedTyped:
        ' com minha sólida experiência jurídica, adquiri uma visão analítica de processos e a habilidade para desenvolver soluções de TI eficientes 🦸🏻‍♂️',
      realizedAfter: ', passando a atuar também como analista de sistemas.',
      flowIntro: 'Simplificando: este é o fluxo do sistema onde julgamos mais de <strong>20.000</strong> processos.',
      fluxoAlt: 'Fluxo do processo — versão compacta',
      processoAlt: 'Visão do processo (detalhe)',
      mobileHint: 'Click on me 👆🏻!',
      popover: [
        'O cidadão apresenta uma defesa (prazo ou cancelamento).',
        'Se cancelamento → Regional anexa docs.',
        'Distribuído para uma das 5 Juntas (podem pedir auxílio a experts).',
        'Cancelado → segue para a Fazenda.',
        'Indeferido sem recurso → arquivado.',
        'Se houver recurso → vai para uma das Turmas.',
        'Em caso de erro → retorna às Juntas.',
      ],
    },

    services: {
      title:
        'Em 2022, conduzi uma equipe maior para a criação e implementação de um fluxo mais robusto, responsável por integrar os seguintes serviços à plataforma SYDLE ONE:',
      links: [
        {
          label: 'Defesa (1ª Instância)',
          href: 'https://servicos.pbh.gov.br/i/5e5ecdfae1bf5e706b1c9d82/servicos+defesa-contra-autos-emitidos-pela-fiscalizacao',
        },
        {
          label: 'Recurso (2ª Instância)',
          href: 'https://servicos.pbh.gov.br/i/5eb40fabcf23934c43693261/servicos+recurso-contra-decisao-das-juntas-integradas-de-julgamento-fiscal-2-instancia',
        },
        {
          label: 'Desistência',
          href: 'https://servicos.pbh.gov.br/servicos/i/620571b74164c62f6499f715/5dc8470253fd6b5bbd99185f/servicos+desistencia-de-defesa-ou-recurso-referente-a-fiscalizacao-de-controle-urbanistico-e-ambiental?s=6279169d6e88713dfacba115',
        },
        {
          label: 'Anexar Documentos',
          href: 'https://servicos.pbh.gov.br/servicos+anexar-novos-documentos-de-defesa-ou-recurso-referentes-a-fiscalizacao-de-controle-urbanistico-e-ambiental+6364fec5e959e52d9a2c694e',
        },
      ],
    },

    fluxao: {
      title: 'O processo que era digitalizado, virou digital.',
      paragraphs: [
        'O fluxo cresceu, ganhou subfluxo e ficou mais claro. Não se engane pelo tamanho, sou apaixonado pela simplificação, mas simplificar não significa reduzir!',
        'Etapas foram automatizadas e timers foram criados. Isso reduziu minha equipe pela metade e o <strong>prazo médio de julgamento caiu de 90 para 30 dias.</strong>',
      ],
      stats: [
        { value: 20000, suffix: '+', label: 'processos julgados' },
        { from: 90, value: 30, suffix: ' dias', label: 'prazo médio de julgamento' },
        { value: 4, label: 'serviços integrados ao SYDLE ONE' },
      ],
      alt: 'fluxão com subfluxo — zoomável',
      instruction:
        'A imagem "fluxao.png", com opção de <strong>zoom</strong>. Alguns trechos foram ocultados por questões de privacidade e ética profissional.',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      reset: 'Restaurar zoom',
    },

    about: {
      title: 'Projetos, tecnologia e soluções',
      text: 'Minha curiosidade vai além do código: gosto de otimizar sistemas, modificar hardware e criar automações no Android, Windows e Linux.',
      quote:
        'Sou movido pela curiosidade, pela lógica e pela vontade constante de aprender. Acredito que a tecnologia potencializa ideias, mas é a criatividade humana que transforma problemas em soluções.',
    },

    skills: {
      title: 'Skills',
      groups: [
        {
          name: 'Front-end',
          icon: '🎨',
          items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Interfaces responsivas'],
        },
        { name: 'Back-end', icon: '⚙️', items: ['Python', 'FastAPI', 'Flask', 'Node.js', 'APIs RESTful'] },
        {
          name: 'Dados',
          icon: '🗄️',
          items: ['SQL', 'MySQL', 'SQLite (FTS5)', 'Firebase/Firestore', 'ETL', 'pdfplumber', 'PyMuPDF', 'Selenium'],
        },
        { name: 'Mobile e desktop', icon: '📱', items: ['Kotlin', 'Jetpack Compose', 'Media3', 'Electron'] },
        {
          name: 'DevOps e ferramentas',
          icon: '🚀',
          items: ['Docker', 'Docker Compose', 'Git', 'GitHub Actions', 'Vercel', 'Cloudflare Workers', 'Grafana', 'Loki'],
        },
        {
          name: 'Análise',
          icon: '🧭',
          items: ['Levantamento de requisitos', 'Modelagem de processos', 'Regras de negócio', 'Power BI'],
        },
      ],
    },

    experience: {
      title: 'Experiências Profissionais',
      items: [
        {
          company: 'Prefeitura de Belo Horizonte – PBH',
          role: 'Desenvolvedor Web Full Stack',
          period: '08/2022–atual',
          highlights: [
            'Sistema web de controle de votação em tempo real (JavaScript e Firebase) para sessões de julgamento administrativo, com perfis de acesso para relatores, secretaria e administradores.',
            'Painel web de planejamento de férias e trabalho híbrido da equipe, com regras de negócio para escala de substitutos e sincronização em tempo real.',
            'Pipeline em Python com processamento concorrente (filas e workers) que indexa, baixa e classifica as decisões de mais de 449 sessões de julgamento, com busca de texto completo em SQLite.',
            'Extração automatizada de dados de autos de infração a partir de PDFs, com até 16 workers em paralelo, alimentando um painel de análise com mais de 38 mil registros.',
          ],
        },
        {
          company: 'Prefeitura de Belo Horizonte – PBH',
          role: 'Analista de Sistemas',
          period: '12/2018–atual',
          highlights: [
            'Levantamento de requisitos, mapeamento de processos e definição de regras de negócio dos sistemas SIGESP e BH Digital, fazendo a ponte entre áreas de negócio e equipes de desenvolvimento.',
            'Homologação de entregas e validação de fluxos antes da implantação.',
            'Extração e tratamento de dados com SQL, Excel e Power BI para relatórios e indicadores de gestão.',
            'Liderança de equipe multidisciplinar de 15 pessoas, com gestão de demandas, prioridades e prazos.',
          ],
        },
        {
          company: 'A5 Labs · Remoto · Terceirizado',
          role: 'Desenvolvedor Back-end Python',
          period: '01/2025–12/2025',
          highlights: [
            'APIs RESTful em Flask e FastAPI para uma plataforma de jogos online, com criação de endpoints, validação de dados e integração com MySQL.',
            'Scripts de ETL para extrair, tratar e consolidar dados de múltiplos sistemas e arquivos.',
            'Padronização de ambientes com Docker e Docker Compose.',
            'Monitoramento de rotinas com Grafana e consultas de logs no Loki (LogQL).',
          ],
        },
        {
          company: 'GAMAA Advocacia Empresarial',
          role: 'Advogado Sênior',
          period: '02/2010–03/2016',
          highlights: [
            'Liderança de equipe jurídica, com distribuição de demandas, revisão de peças e mentoria de advogados juniores.',
            'Análise de normas e riscos em questões empresariais e administrativas complexas.',
          ],
        },
      ],
    },

    education: {
      title: 'Formação e idiomas',
      items: [
        { course: 'Bacharelado em Ciência da Computação', school: 'Centro Universitário Newton Paiva', period: '2022–2026' },
        {
          course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
          school: 'Centro Universitário Newton Paiva',
          period: '2022–2025',
        },
        { course: 'Bacharelado em Direito', school: 'Universidade Federal de Minas Gerais (UFMG)', period: '2005–2009' },
      ],
      languagesTitle: 'Idiomas',
      languages: ['🇧🇷 Português nativo', '🇺🇸 Inglês fluente'],
    },

    cta: {
      title: 'Este sou eu!',
      text: 'Se vc chegou até aqui, pode abrir seu presente!',
      button: '🎁 Clique aqui',
      buttonAria: 'Abrir contato',
    },

    contact: {
      name: 'Saulo Hugo Rossi',
      title: 'Desenvolvedor Full Stack e Back-end Python',
      location: 'Belo Horizonte, MG · Remoto, híbrido ou mudança de cidade',
      phoneLabel: 'Telefone',
      phone: '+55 (31) 99105-4715',
      emailLabel: 'E-mail',
      email: 'saulohr@yahoo.com.br',
      copy: 'Copiar',
      copied: 'Copiado!',
      whatsapp: 'WhatsApp',
      whatsappMessage: 'Olá, Saulo! Vi seu portfólio e gostaria de conversar.',
      sendEmail: 'Enviar e-mail',
      close: 'Fechar',
      cv: 'Download CV (PDF)',
      cvHref: 'assets/Saulo_Rossi_FullStack_Developer.pdf',
      floating: 'Contato',
    },
  },

  projects: {
    pageTitle: 'Projetos - Saulo Hugo Rossi',
    eyebrow: '// portfólio',
    title: 'Projetos em destaque',
    subtitle: 'Do scraping de PDFs a plataformas de streaming: como cada solução foi pensada e construída.',
    back: '← Voltar para o Início',
    others: 'Outros',
    projects: [
      {
        id: 'dashboard',
        nav: 'Dashboard',
        title: 'Dashboard Interativo de Autos de Infração',
        tags: ['Python', 'Selenium', 'PapaParse', 'SVG', 'JavaScript'],
        blocks: [
          {
            type: 'p',
            html: 'O projeto transforma dados de autos de infração em um dashboard interativo. Ele tem duas partes independentes: um extrator em Python e uma interface web estática.',
          },
          {
            type: 'p',
            html: 'A extração roda com até <strong>16 workers em paralelo</strong> e alimenta um painel de análise com <strong>mais de 38 mil registros</strong>.',
          },
          { type: 'video', src: 'assets/videos/dashboard.webm' },
          {
            type: 'flow',
            steps: [
              'Sistema governamental',
              'Selenium baixa os PDFs',
              'Python extrai a descrição da infração',
              'CSV enriquecido',
              'JavaScript filtra e apresenta os dados',
            ],
          },
          { type: 'heading', text: '1. Extração dos dados' },
          { type: 'p', html: 'O script principal é <strong>scrape_autos.py</strong>.' },
          { type: 'p', html: 'Ele:' },
          {
            type: 'list',
            items: [
              'Lê um CSV de monitoramento.',
              'Obtém os números dos autos.',
              'Abre várias instâncias do Chrome com Selenium.',
              'Autentica no sistema SIF.',
              'Navega até cada auto e baixa seu PDF.',
              'Corrige PDFs que venham precedidos por HTML inválido.',
              'Procura o campo "ATO OU FATO CONSTITUTIVO DA INFRAÇÃO".',
              'Salva os resultados periodicamente em JSON.',
              'Gera outro CSV com a descrição da infração acrescentada.',
            ],
          },
          {
            type: 'p',
            html: 'A extração do PDF começa na linha 221 e o processamento paralelo começa na linha 323.',
          },
          {
            type: 'p',
            html: 'Se alguns autos não forem extraídos corretamente, o script <strong>retry_vazios.py</strong> encontra as linhas vazias e tenta novamente com heurísticas diferentes.',
          },
          {
            type: 'p',
            html: '<em>Um detalhe importante:</em> os scripts estão configurados para um caminho absoluto do Windows (<code>BASE_DIR = r"c:\\Users\\Saulin\\Downloads\\Data Science"</code>). Portanto, antes de executar em outra máquina, é necessário alterar <code>BASE_DIR</code> nos dois scripts.',
          },
          { type: 'heading', text: '2. Carregamento no dashboard' },
          {
            type: 'p',
            html: 'A página principal é <strong>index.html</strong>. Não existem React, backend ou banco de dados: é HTML, CSS e JavaScript puro.',
          },
          { type: 'p', html: 'Ao abrir a página, o <strong>app.js</strong> tenta carregar os dados nesta ordem:' },
          {
            type: 'list',
            items: [
              '<code>Input/monitoramento_com_infracoes.csv</code>',
              '<code>monitoramento_com_infracoes.csv</code>, na raiz',
              'Dados pré-compilados em <code>data.js</code>',
              'Upload manual pelo botão da página',
            ],
          },
          {
            type: 'p',
            html: 'O CSV é lido no navegador com PapaParse. O código pressupõe separador <code>;</code> e as seguintes colunas principais: Período, Tipo de pedido, Decisão, Número do auto e Ato ou fato constitutivo.',
          },
          { type: 'heading', text: '3. Filtros e renderização' },
          {
            type: 'p',
            html: 'O estado atual dos filtros fica em um objeto JavaScript dentro de <strong>app.js</strong>. Sempre que um filtro muda, a função <code>render()</code>:',
          },
          {
            type: 'list',
            items: [
              'Filtra e ordena os registros.',
              'Recalcula os indicadores.',
              'Redesenha a linha do tempo.',
              'Redesenha o gráfico de decisões.',
              'Agrupa os tipos de pedido.',
              'Calcula os atos mais frequentes.',
              'Atualiza a tabela paginada.',
            ],
          },
          {
            type: 'p',
            html: 'Os gráficos não usam Chart.js: são produzidos diretamente com SVG, CSS e HTML. A tabela mostra 40 registros por página.',
          },
          {
            type: 'p',
            html: 'O filtro textual de infração normaliza acentos e maiúsculas para oferecer autocomplete, mas depois que uma sugestão é selecionada, a filtragem exige correspondência exata.',
          },
          { type: 'heading', text: '4. data.js' },
          {
            type: 'p',
            html: 'O script <strong>build_data.ps1</strong> converte um CSV estruturado em JavaScript e grava em <code>data.js</code>, permitindo que o dashboard tenha um cache embarcado. Atualmente esse arquivo tem cerca de 7,6 MB, enquanto o CSV de input tem aproximadamente 8,2 MB.',
          },
          { type: 'heading', text: 'Como rodar somente o dashboard' },
          { type: 'p', html: 'Na raiz do projeto:<br><code>python -m http.server 8080</code>' },
          { type: 'p', html: 'Depois, acesse:<br><code>http://localhost:8080</code>' },
          {
            type: 'p',
            html: 'O servidor local é importante porque o navegador normalmente bloqueia o <code>fetch()</code> do CSV quando acessado como arquivo local.',
          },
          {
            type: 'summary',
            html: '<strong>Em resumo:</strong> o Python coleta e enriquece os dados; o CSV é a interface entre as duas partes; e o JavaScript faz toda a análise e visualização localmente no navegador.',
          },
        ],
      },
      {
        id: 'jurisprudencia',
        nav: 'Jurisprudência',
        title: 'Acervo Pesquisável de Decisões das Juntas',
        tags: ['Python', 'Google Drive API', 'SQLite FTS5', 'Tesseract OCR', 'GitHub Pages'],
        links: [{ label: 'GitHub', href: 'https://github.com/sauliiin/jurisprudencia-juntas' }],
        blocks: [
          {
            type: 'p',
            html: 'Este projeto cria e publica um acervo pesquisável de decisões das Juntas de Julgamento Fiscal de Belo Horizonte. Ele coleta votos no Google Drive, complementa as informações consultando o SIF e disponibiliza decisões e pareceres em um site público.',
          },
          { type: 'video', src: 'assets/videos/juris.webm' },
          { type: 'p', html: 'Atualmente, o índice contém aproximadamente:' },
          {
            type: 'list',
            items: ['Decisões de mais de 449 sessões de julgamento', '12.178 votos', '314 pareceres', '69 MB de dados textuais sobre votos'],
          },
          { type: 'heading', text: 'Visão geral do fluxo principal' },
          {
            type: 'flow',
            steps: [
              'Google Drive',
              'Download e extração de texto',
              'Identificação das decisões e dos autos',
              'Consulta dos autos no SIF',
              'Classificação por lei e infração',
              'Índice SQLite e arquivos JSONL',
              'Site público de pesquisa',
            ],
          },
          { type: 'heading', text: '1. Coleta dos votos' },
          {
            type: 'p',
            html: 'O núcleo do projeto é o script <strong>baixar_e_organizar_por_ato.py</strong>. Ele procura no Google Drive:',
          },
          {
            type: 'list',
            items: [
              'Pastas <code>SESSÃO NNN</code>, relativas à primeira instância.',
              'Pastas com variações de <code>Votos dos Relatores</code>, relativas à segunda instância.',
            ],
          },
          { type: 'p', html: 'São aceitos: PDF, Google Docs, DOCX e DOC.' },
          {
            type: 'p',
            html: 'O acesso ao Drive usa OAuth em modo somente leitura. Arquivos como <code>credentials.json</code> e <code>token.json</code> ficam locais e são ignorados pelo Git.',
          },
          {
            type: 'p',
            html: 'O processamento é concorrente e dividido em filas: <code>indexadores → downloaders → organizadores</code>. Isso permite trabalhar com milhares de documentos sem precisar esperar uma etapa inteira terminar antes de iniciar a seguinte.',
          },
          { type: 'heading', text: '2. Identificação das decisões' },
          {
            type: 'p',
            html: 'Depois de extrair o texto, o sistema verifica se o documento realmente é uma decisão. Ele descarta, por exemplo: atas de sessão, controles de votação, documentos genéricos, arquivos sem a expressão "DISPOSITIVO DA DECISÃO" e arquivos cujo texto não pôde ser extraído.',
          },
          {
            type: 'p',
            html: 'Para cada decisão válida, são extraídos: Protocolo, Assunto, Instância, Números dos autos e o Texto integral da decisão.',
          },
          { type: 'heading', text: '3. Consulta ao SIF' },
          {
            type: 'p',
            html: 'Para cada auto encontrado, o pipeline consulta o SIF e lê o PDF correspondente. Do auto são extraídos dados como: Número e tipo do auto, Autuado, Infração, Dispositivo legal transgredido, Local da constatação e Lei aplicável.',
          },
          { type: 'p', html: 'Esses dados permitem organizar fisicamente os votos desta forma:' },
          {
            type: 'tree',
            text: 'pdfs_por_lei_e_ato/\n├── 1a_instancia/\n│   └── LEI 8616-03/\n│       └── DEIXAR DE CONSERVAR O PASSEIO/\n└── 2a_instancia/\n    └── ...',
          },
          {
            type: 'p',
            html: 'Um voto pode aparecer em mais de uma pasta quando contém autos relacionados a leis ou infrações diferentes. O arquivo <code>assuntos.csv</code> também registra uma visão tabular com protocolo, assunto e atos.',
          },
          { type: 'heading', text: '4. Acervo público' },
          {
            type: 'p',
            html: 'O script <strong>preparar_acervo_publico.py</strong> transforma o material coletado no índice utilizado pelo site. Diferentemente da organização por lei e ato, o acervo público mantém apenas uma cópia de cada voto e produz dois formatos:',
          },
          {
            type: 'list',
            items: [
              '<code>indice_busca.db</code>: banco SQLite com FTS5 para busca local rápida.',
              '<strong>votos.jsonl</strong>: índice estático publicado no GitHub Pages.',
            ],
          },
          {
            type: 'p',
            html: 'Cada linha do JSONL contém uma decisão completa, incluindo texto, autos, metadados e links públicos do Drive. O processamento pode ser incremental: o arquivo <code>marco_atualizacao.json</code> registra o último estado processado, e o Drive é consultado somente por arquivos novos ou modificados.',
          },
          { type: 'heading', text: '5. Pareceres' },
          {
            type: 'p',
            html: 'O script <strong>preparar_pareceres.py</strong> mantém um acervo separado de pareceres. Além da extração normal de texto, ele suporta OCR com Tesseract para PDFs digitalizados, imagens incorporadas em DOCX e documentos sem camada de texto. O resultado é publicado em <code>pareceres.jsonl</code>.',
          },
          { type: 'heading', text: '6. Site de busca' },
          {
            type: 'p',
            html: 'O site fica em <code>site_publico/index.html</code> (o index da raiz apenas redireciona para ele). A interface permite:',
          },
          {
            type: 'list',
            items: [
              'Buscar uma expressão exata ou todas as palavras informadas.',
              'Filtrar por primeira/segunda instância e por mês/ano.',
              'Ver trechos com os termos destacados.',
              'Visualizar o documento pelo Google Drive e consultar informações dos autos.',
              'Alternar para a busca de pareceres.',
            ],
          },
          {
            type: 'p',
            html: 'O frontend possui dois modos: no GitHub Pages ele carrega todo o <code>votos.jsonl</code> e pesquisa no navegador. Num Servidor local usa a API de <code>site_server.py</code> e o SQLite FTS5. O modo estático simplifica a hospedagem, mas tem um custo: o navegador precisa baixar aproximadamente 69 MB de votos antes de pesquisar.',
          },
          { type: 'heading', text: '7. Atualização e publicação' },
          {
            type: 'p',
            html: 'O script <strong>atualizar_tudo.sh</strong> automatiza a operação: organiza novos votos por lei e ato, atualiza o acervo público, reaplica os links do Drive e atualiza os pareceres. Em seguida faz <code>git add</code>, <code>commit</code> e <code>push</code>. Portanto, esse script não é apenas local: executá-lo pode publicar alterações diretamente no repositório remoto.',
          },
          { type: 'heading', text: 'Tecnologias usadas' },
          {
            type: 'list',
            items: [
              'Python, Google Drive API e OAuth',
              'Requests e BeautifulSoup para o SIF',
              'pdfplumber para PDFs, docx2txt para DOCX, LibreOffice para DOC antigo',
              'Tesseract para OCR',
              'SQLite com FTS5',
              'HTML, CSS e JavaScript puro, GitHub Pages',
            ],
          },
          {
            type: 'summary',
            html: '<strong>Em resumo:</strong> o projeto é uma combinação de coletor documental, extrator de informações jurídicas, classificador, mecanismo de busca e site público. O pipeline pesado roda localmente; o resultado final é versionado como JSONL e pode ser servido sem backend.',
          },
        ],
      },
      {
        id: 'omnistream',
        nav: 'OmniStream',
        title: 'OmniStream: Site e Apps Multiplataforma',
        tags: ['Kotlin', 'Jetpack Compose', 'Media3', 'Angular 22', 'Cloudflare Workers', 'Electron'],
        links: [
          { label: 'openstream.com.br', href: 'https://openstream.com.br' },
          { label: 'GitHub', href: 'https://github.com/sauliiin' },
        ],
        blocks: [
          {
            type: 'p',
            html: 'Produto open source publicado em <strong>Android TV, Android, web e desktop</strong>. Consome a API do mdblist e combina dados de TMDB, OMDb e Wikipedia em uma única experiência.',
          },
          { type: 'video', src: 'assets/videos/stremiolike.webm' },
          { type: 'heading', text: 'Android e Android TV' },
          {
            type: 'list',
            items: [
              'Apps em <strong>Kotlin e Jetpack Compose</strong> (cerca de 70 mil linhas), com arquitetura em módulos (app, dados e player).',
              'Testes unitários e de dispositivo e build automatizado no GitHub Actions.',
              'Player próprio sobre o <strong>Media3</strong>, com controle de travamentos, pré-carregamento e orçamento de memória para rodar em aparelhos de entrada: <strong>APK de 3,3 MB, abrindo em cerca de 340 ms</strong>.',
            ],
          },
          { type: 'heading', text: 'Web e desktop' },
          {
            type: 'list',
            items: [
              'Versão web em <strong>Angular 22 e TypeScript</strong> (standalone components, signals, zoneless), com proxies em Cloudflare Workers e deploy automatizado.',
              'Busca semântica por tema, recomendações personalizadas e sincronização de progresso para continuar assistindo.',
              'Carregamento sob demanda com <code>@defer</code>.',
              'Versão desktop com <strong>Electron</strong> para Windows e Linux.',
            ],
          },
          { type: 'heading', text: 'Integrações' },
          {
            type: 'list',
            items: [
              '5 APIs externas: mdblist, TMDB, OMDb, OpenSubtitles e Trakt.',
              'Login OAuth via <em>device flow</em>.',
            ],
          },
          {
            type: 'summary',
            html: '<strong>Em resumo:</strong> um mesmo produto em quatro plataformas, com um player próprio otimizado para aparelhos de entrada e uma versão web moderna em Angular.',
          },
        ],
      },
      {
        id: 'carreiramais',
        nav: 'CarreiraMais',
        title: 'CarreiraMais: Recomendação de Cursos e Vagas',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
        links: [{ label: 'match-job-tau.vercel.app', href: 'https://match-job-tau.vercel.app' }],
        blocks: [
          {
            type: 'p',
            html: 'Aplicação web que recomenda cursos e vagas cruzando <strong>habilidades, área, nível, localização e modalidade</strong>, e mostra a compatibilidade e o motivo de cada recomendação.',
          },
          {
            type: 'summary',
            html: '<strong>Stack:</strong> JavaScript, HTML5 e CSS3, publicada na Vercel.',
          },
        ],
      },
      {
        id: 'jediflix',
        nav: 'Jediflix',
        title: 'Jediflix: Streaming Customizado (Kodi)',
        tags: ['Python', 'XML', 'Kodi', 'APIs REST'],
        blocks: [
          {
            type: 'p',
            html: 'Este projeto consiste em uma interface (skin) customizada para o aplicativo Kodi, transformando-o em uma plataforma de streaming completa, rica e unificada. O desenvolvimento combina <strong>Python</strong> para a lógica de backend e requisições, e <strong>XML</strong> para a estruturação da interface visual.',
          },
          { type: 'video', src: 'assets/videos/jediflix.webm' },
          { type: 'heading', text: 'Integração Poderosa de APIs' },
          {
            type: 'p',
            html: 'Para garantir que o catálogo seja dinâmico, rico em detalhes e sempre atualizado, o aplicativo consome dados simultaneamente de diversas fontes conceituadas:',
          },
          {
            type: 'list',
            items: [
              '<strong>MDBList & TMDb:</strong> Metadados principais de filmes e séries.',
              '<strong>OMDb & IMDb:</strong> Avaliações consolidadas e notas da crítica.',
              '<strong>Wikipédia:</strong> Biografias contextuais e histórico da produção.',
              '<strong>YouTube:</strong> Trailers e vídeos promocionais em alta qualidade.',
            ],
          },
          { type: 'heading', text: 'Principais Funcionalidades' },
          {
            type: 'p',
            html: 'A aplicação vai muito além de um simples reprodutor de vídeo, proporcionando uma experiência imersiva de exploração do catálogo. Você pode:',
          },
          {
            type: 'list',
            items: [
              '<strong>Reproduzir Filmes:</strong> Acesso direto e fluido aos vídeos integrados.',
              '<strong>Ver Informações de Atores:</strong> Biografias ricas extraídas dinamicamente, mantendo o usuário engajado no aplicativo.',
              '<strong>Navegar pela Filmografia:</strong> Exploração interativa pelos trabalhos anteriores do elenco e diretores.',
              '<strong>Acessar Reviews e Notas:</strong> Agregação de críticas reais e avaliações que auxiliam na escolha do que assistir.',
            ],
          },
          {
            type: 'summary',
            html: '<strong>Em resumo:</strong> A orquestração de APIs utilizando Python aliada à flexibilidade do XML no Kodi entrega um nível de requinte e informação interligada comparável às maiores plataformas comerciais de streaming do mercado.',
          },
        ],
      },
      {
        id: 'hybrid',
        nav: 'Painel Híbrido',
        title: 'Painel Central de Férias e Trabalho Híbrido',
        tags: ['Firebase', 'Firestore', 'JavaScript', 'HTML/CSS'],
        blocks: [
          {
            type: 'p',
            html: 'Uma aplicação web moderna e interativa, desenvolvida para gerenciar escalas de trabalho e períodos de descanso de uma equipe de forma dinâmica e eficiente. Utilizando o <strong>Firebase (Firestore)</strong> como backend <em>serverless</em> em tempo real e <strong>JavaScript Vanilla</strong> para o frontend, a ferramenta resolve o desafio de organizar a rotina do time com toques de gamificação e humor.',
          },
          { type: 'video', src: 'assets/videos/hybrid.webm' },
          { type: 'heading', text: '1. Sistema Inteligente de Perfis e Permissões' },
          {
            type: 'p',
            html: 'A experiência abandona o login tradicional em prol de uma interface fluida com avatares customizáveis e seleção via dropdown. A segurança e organização são mantidas através de papéis bem definidos:',
          },
          {
            type: 'list',
            items: [
              '<strong>Administrador (Mestre Yoda):</strong> Perfil protegido por senha com visão global do histórico e poder de realizar ajustes manuais na gestão de equipe.',
              '<strong>Gerentes e Secretários:</strong> Perfis com acesso às escalas e funcionalidades colaborativas baseadas na função desempenhada.',
            ],
          },
          { type: 'heading', text: '2. Gestão Dinâmica de Férias' },
          { type: 'p', html: 'O painel elimina a burocracia do agendamento de descanso:' },
          {
            type: 'list',
            items: [
              'Marcação de até 3 períodos (limite de 25 dias úteis), com o sistema descontando automaticamente finais de semana e feriados.',
              'Alertas visuais preventivos contra conflitos de agenda (ex: ausência simultânea de colegas em funções essenciais).',
              'Um <strong>Mapa de Férias Geral</strong> limpo e intuitivo, filtrado inteligentemente para exibir apenas eventos presentes e futuros (exceto para o administrador, que possui visão completa).',
            ],
          },
          { type: 'heading', text: '3. Calendário Híbrido Integrado' },
          { type: 'p', html: 'A adaptação aos novos modelos de trabalho é tratada de forma nativa:' },
          {
            type: 'list',
            items: [
              'Suporte a múltiplos regimes flexíveis (ex: 3 dias presenciais e 2 remotos, ou dias fixos na semana).',
              'Visões divididas entre o calendário individual de cada funcionário e um painel consolidado ("Quem Está Presencial na Semana"), garantindo transparência total sobre a presença da equipe no escritório.',
            ],
          },
          { type: 'heading', text: '4. A "Roleta Maluca" (Sistema de Substituições)' },
          { type: 'p', html: 'Para evitar falhas na operação, o sistema traz um mecanismo automático e divertido:' },
          {
            type: 'list',
            items: [
              'Quando um funcionário crucial (como um Secretário) marca férias em um dia de reunião, o algoritmo detecta o desfalque automaticamente.',
              'A <strong>"Roleta Maluca"</strong> entra em ação: sorteia um substituto elegível baseando-se em um balanceamento justo da carga de trabalho (priorizando quem cobriu menos ausências recentemente).',
              'O administrador sempre tem o poder de substituir manualmente o resultado sorteado, caso seja necessário.',
            ],
          },
          {
            type: 'summary',
            html: '<strong>Em resumo:</strong> Arquitetada com HTML/CSS puro e lógica robusta em JavaScript, a ferramenta transforma o que seria uma planilha complexa em uma experiência de produtividade gamificada e altamente funcional, perfeitamente orquestrada com a escalabilidade do Firebase.',
          },
        ],
      },
    ],
  },
};
