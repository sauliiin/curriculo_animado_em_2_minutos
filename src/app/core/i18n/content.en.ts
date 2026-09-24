import { SiteContent } from './content.model';

export const CONTENT_EN: SiteContent = {
  controls: {
    themeLabel: 'Toggle theme',
    langSwitch: 'PT 🇧🇷',
    langSwitchAria: 'Mudar para português',
  },

  home: {
    pageTitle: 'Saulo Hugo Rossi | Full Stack & Python Back-end Developer',
    nav: [
      { label: 'Home', fragment: 'hero' },
      { label: 'Summary', fragment: 'resumo' },
      { label: 'Projects', route: '/projetos' },
      { label: 'Skills', fragment: 'skills' },
      { label: 'Experience', fragment: 'experiences' },
    ],

    hero: {
      badge: 'Open to opportunities · Remote, hybrid or relocation',
      ctaContact: 'Get in touch',
      ctaCv: 'Download CV',
      title: 'My 2-minute animated resume',
      subtitle:
        'I am Saulo Hugo Rossi, with degrees in Law (UFMG), Systems Analysis and Development, and Computer Science (Newton Paiva).',
      subtitleAfter: 'Saulo Hugo Rossi: Full Stack & Python Back-end Developer | Systems Analyst',
      photoFunAlt: 'Fun photo (not Saulo)',
      photoRealAlt: 'Actual photo of Saulo',
      caption: 'Oops! Not really, this is me! Informal and always upbeat!',
      scrollHint: 'Scroll down',
    },

    snapshot: {
      title: 'In 30 seconds',
      summary:
        'Full stack and Python back-end developer, experienced in building websites, web systems, APIs, data pipelines and mobile apps. I bring an unusual background: 6 years as a lawyer and almost 8 years at the City Hall of Belo Horizonte, first as a systems analyst and, since 2022, also as a web developer, building the systems I used to specify. This combination lets me turn complex business rules into reliable software. <strong>Fluent English.</strong>',
      stats: [
        { value: 8, prefix: '~', suffix: ' years', label: 'at Belo Horizonte City Hall, from analyst to developer' },
        { value: 15, label: 'people on the multidisciplinary team I led' },
        { from: 90, value: 30, suffix: ' days', label: 'average judgment time after digitization' },
        { value: 449, suffix: '+', label: 'judgment sessions indexed by my pipeline' },
        { value: 38, suffix: 'k+', label: 'records extracted from PDFs with up to 16 workers' },
        { value: 70, suffix: 'k', label: 'lines of Kotlin in the OmniStream Android apps' },
      ],
      facts: [
        { label: 'Role', value: 'Full Stack & Python Back-end' },
        { label: 'Location', value: 'Belo Horizonte, Brazil' },
        { label: 'Work model', value: 'Remote, hybrid or relocation' },
        { label: 'Languages', value: 'Native Portuguese · Fluent English' },
      ],
    },

    featured: {
      title: 'Featured projects',
      subtitle: 'Real products, published and in use.',
      details: 'Details',
      all: 'See all projects →',
      items: [
        {
          id: 'omnistream',
          title: 'OmniStream',
          metric: '3.3 MB APK · opens in ~340 ms',
          text: 'Open source product on Android TV, Android, web and desktop. Kotlin/Compose apps with a custom Media3 player and a web version in Angular 22.',
          tags: ['Kotlin', 'Jetpack Compose', 'Angular 22', 'Electron'],
          link: { label: 'openstream.com.br', href: 'https://openstream.com.br' },
        },
        {
          id: 'jurisprudencia',
          title: 'Administrative Decisions Pipeline',
          metric: '449+ sessions · 12k+ votes',
          text: 'Python pipeline with 3 parallel stages connected by queues, reading PDF, DOCX and Google Docs, with OCR and a search site on SQLite FTS5.',
          tags: ['Python', 'SQLite FTS5', 'OCR', 'Google Drive API'],
          link: { label: 'GitHub', href: 'https://github.com/sauliiin/jurisprudencia-juntas' },
        },
        {
          id: 'dashboard',
          title: 'Infraction Notices Dashboard',
          metric: '38k+ records · 16 workers',
          text: 'Automated extraction from thousands of PDFs with Selenium and Python, feeding an interactive dashboard built with SVG and plain JavaScript.',
          tags: ['Python', 'Selenium', 'JavaScript', 'SVG'],
        },
        {
          id: 'carreiramais',
          title: 'CarreiraMais',
          metric: 'Explained recommendations',
          text: 'Recommends courses and jobs by matching skills, field, level, location and work model, showing the fit and the reason behind each suggestion.',
          tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
          link: { label: 'match-job-tau.vercel.app', href: 'https://match-job-tau.vercel.app' },
        },
      ],
    },

    hobbies: {
      title: 'Always curious and passionate about IT:',
      prev: 'Previous slide',
      next: 'Next slide',
      goTo: 'Go to slide',
      slides: [
        {
          img: 'assets/img5.png',
          alt: 'Infraction notices dashboard',
          caption:
            'Python + frontend: extracting information from thousands of PDFs and turning that raw data into an interactive dashboard.',
        },
        { img: 'assets/img5a.png', alt: 'Judgment analysis', caption: 'Judgment data analysis' },
        {
          img: 'assets/img11.png',
          alt: 'Remote judgments',
          caption: 'I implemented the legislation and systems so in-person judgments could be carried out remotely.',
        },
        {
          img: 'assets/img6.png',
          alt: 'Vacation and hybrid work dashboard',
          caption:
            'Application for managing team vacations, hybrid work schedules and substitute assignments (CSS + JS + HTML + Firebase integrated).',
        },
        {
          img: 'assets/img7.png',
          alt: 'File transfer to the Steam Deck',
          caption: 'An .exe app for sending files via SSH from Windows to the Steam Deck (mostly in Python)',
        },
        { img: 'assets/img8.png', alt: 'Course hosting', caption: 'Free centralized hosting for course promotion' },
        {
          img: 'assets/img4.png',
          alt: 'BetterFlix',
          caption:
            'API integration (mdblist, TMDb, OMDb, IMDb and YouTube) to create a single complete streaming app (Python + XML)',
        },
        { img: 'assets/img10.png', alt: 'BetterFlix', caption: 'And more Python backend' },
        {
          img: 'assets/img4a.jpg',
          alt: 'ReShade plugin',
          caption:
            'A plugin to manage ReShade (image enhancer) on Steam Deck and similar portable Linux devices (Python + shell).',
        },
        {
          img: 'assets/img2.png',
          alt: 'Electric scooter firmware',
          caption: 'Firmware for an electric scooter, mostly in C and flashed via ST-Link',
        },
        {
          img: 'assets/img3.png',
          alt: 'Disassembled electric scooter',
          caption: 'Breaking an electric scooter after too much hacking 🥲',
        },
      ],
    },

    prefeitura: {
      title: "Now, let's talk about big projects 😎",
      intro:
        'In 2019, I led and actively participated in the development of a system for the City Hall of Belo Horizonte, enabling the digitization of processes that had previously been handled on paper.',
      realizedBefore: "That's when I realized",
      realizedTyped:
        ' with my solid legal background, I gained an analytical view of processes and the ability to develop efficient IT solutions 🦸🏻‍♂️',
      realizedAfter: ', and also started working as a systems analyst.',
      flowIntro: 'Simply put: this is the system flow where we judged more than <strong>20,000</strong> cases.',
      fluxoAlt: 'Process flow - compact version',
      processoAlt: 'Process view (detail)',
      mobileHint: 'Click on me 👆🏻!',
      popover: [
        'The citizen files a defense (deadline extension or cancellation).',
        'If cancellation → the Regional office attaches documents.',
        'Assigned to one of the 5 Boards (they may request expert assistance).',
        'Cancelled → goes to the Treasury.',
        'Denied without appeal → archived.',
        'If there is an appeal → goes to one of the Chambers.',
        'In case of error → returns to the Boards.',
      ],
    },

    services: {
      title:
        'In 2022, I led a larger team in creating and implementing a more robust workflow, responsible for integrating the following services into the SYDLE ONE platform:',
      links: [
        {
          label: 'Defense (1st Instance)',
          href: 'https://servicos.pbh.gov.br/i/5e5ecdfae1bf5e706b1c9d82/servicos+defesa-contra-autos-emitidos-pela-fiscalizacao',
        },
        {
          label: 'Appeal (2nd Instance)',
          href: 'https://servicos.pbh.gov.br/i/5eb40fabcf23934c43693261/servicos+recurso-contra-decisao-das-juntas-integradas-de-julgamento-fiscal-2-instancia',
        },
        {
          label: 'Withdrawal',
          href: 'https://servicos.pbh.gov.br/servicos/i/620571b74164c62f6499f715/5dc8470253fd6b5bbd99185f/servicos+desistencia-de-defesa-ou-recurso-referente-a-fiscalizacao-de-controle-urbanistico-e-ambiental?s=6279169d6e88713dfacba115',
        },
        {
          label: 'Attach Documents',
          href: 'https://servicos.pbh.gov.br/servicos+anexar-novos-documentos-de-defesa-ou-recurso-referentes-a-fiscalizacao-de-controle-urbanistico-e-ambiental+6364fec5e959e52d9a2c694e',
        },
      ],
    },

    fluxao: {
      title: 'The process that used to be digitized became fully digital.',
      paragraphs: [
        'The workflow grew, gained subflows and became clearer. Do not be fooled by its size: I am passionate about simplification, but simplifying does not mean reducing!',
        'Steps were automated and timers were created. This cut my team in half and the <strong>average judgment time dropped from 90 to 30 days.</strong>',
      ],
      stats: [
        { value: 20000, suffix: '+', label: 'cases judged' },
        { from: 90, value: 30, suffix: ' days', label: 'average judgment time' },
        { value: 4, label: 'services integrated into SYDLE ONE' },
      ],
      alt: 'Flow with subflow - zoomable',
      instruction:
        'The image "fluxao.png" includes a <strong>zoom</strong> option. Some sections were hidden for privacy and professional ethics reasons.',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      reset: 'Reset zoom',
    },

    about: {
      title: 'Projects, technology and solutions',
      text: 'My curiosity goes beyond code: I like optimizing systems, modifying hardware and creating automations on Android, Windows and Linux.',
      quote:
        'I am driven by curiosity, logic and the constant desire to learn. I believe technology amplifies ideas, but human creativity is what turns problems into solutions.',
    },

    skills: {
      title: 'Skills',
      groups: [
        {
          name: 'Front-end',
          icon: '🎨',
          items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive interfaces'],
        },
        { name: 'Back-end', icon: '⚙️', items: ['Python', 'FastAPI', 'Flask', 'Node.js', 'RESTful APIs'] },
        {
          name: 'Data',
          icon: '🗄️',
          items: ['SQL', 'MySQL', 'SQLite (FTS5)', 'Firebase/Firestore', 'ETL', 'pdfplumber', 'PyMuPDF', 'Selenium'],
        },
        { name: 'Mobile and desktop', icon: '📱', items: ['Kotlin', 'Jetpack Compose', 'Media3', 'Electron'] },
        {
          name: 'DevOps and tools',
          icon: '🚀',
          items: ['Docker', 'Docker Compose', 'Git', 'GitHub Actions', 'Vercel', 'Cloudflare Workers', 'Grafana', 'Loki'],
        },
        {
          name: 'Analysis',
          icon: '🧭',
          items: ['Requirements gathering', 'Process modeling', 'Business rules', 'Power BI'],
        },
      ],
    },

    experience: {
      title: 'Professional Experience',
      items: [
        {
          company: 'Belo Horizonte City Hall – PBH',
          role: 'Full Stack Web Developer',
          period: '08/2022–present',
          highlights: [
            'Built a real-time voting control web system (JavaScript and Firebase) for administrative judgment sessions, with access profiles for rapporteurs, secretariat and administrators.',
            'Created a web dashboard for team vacation and hybrid work planning, with business rules for substitute scheduling and real-time sync.',
            'Built a Python pipeline with concurrent processing (queues and workers) that indexes, downloads and classifies decisions from 449+ judgment sessions, with full-text search on SQLite.',
            'Automated data extraction from infraction notice PDFs with up to 16 parallel workers, feeding an analytics dashboard with 38k+ records.',
          ],
        },
        {
          company: 'Belo Horizonte City Hall – PBH',
          role: 'Systems Analyst',
          period: '12/2018–present',
          highlights: [
            'Requirements gathering, process mapping and business rule definition for the SIGESP and BH Digital systems, bridging business areas and development teams.',
            'Acceptance testing of deliveries and workflow validation before deployment.',
            'Data extraction and processing with SQL, Excel and Power BI for management reports and KPIs.',
            'Led a 15-person multidisciplinary team, managing demands, priorities and deadlines.',
          ],
        },
        {
          company: 'A5 Labs · Remote · Contractor',
          role: 'Python Back-end Developer',
          period: '01/2025–12/2025',
          highlights: [
            'RESTful APIs in Flask and FastAPI for an online gaming platform, including endpoints, data validation and MySQL integration.',
            'ETL scripts to extract, clean and consolidate data from multiple systems and files.',
            'Standardized environments with Docker and Docker Compose.',
            'Job monitoring with Grafana and log queries in Loki (LogQL).',
          ],
        },
        {
          company: 'GAMAA Corporate Law',
          role: 'Senior Attorney',
          period: '02/2010–03/2016',
          highlights: [
            'Led the legal team: distributing work, reviewing filings and mentoring junior lawyers.',
            'Analyzed regulations and risks in complex corporate and administrative matters.',
          ],
        },
      ],
    },

    education: {
      title: 'Education and languages',
      items: [
        { course: 'B.Sc. in Computer Science', school: 'Newton Paiva University Center', period: '2022–2026' },
        {
          course: 'Associate Degree in Systems Analysis and Development',
          school: 'Newton Paiva University Center',
          period: '2022–2025',
        },
        { course: 'Bachelor of Laws (LL.B.)', school: 'Federal University of Minas Gerais (UFMG)', period: '2005–2009' },
      ],
      languagesTitle: 'Languages',
      languages: ['🇧🇷 Native Portuguese', '🇺🇸 Fluent English'],
    },

    cta: {
      title: 'This is me!',
      text: 'If you made it this far, you can open your gift!',
      button: '🎁 Click here',
      buttonAria: 'Open contact',
    },

    contact: {
      name: 'Saulo Hugo Rossi',
      title: 'Full Stack & Python Back-end Developer',
      location: 'Belo Horizonte, Brazil · Remote, hybrid or relocation',
      phoneLabel: 'Phone',
      phone: '+55 (31) 99105-4715',
      emailLabel: 'Email',
      email: 'saulohr@yahoo.com.br',
      copy: 'Copy',
      copied: 'Copied!',
      whatsapp: 'WhatsApp',
      whatsappMessage: 'Hi Saulo! I saw your portfolio and would like to talk.',
      sendEmail: 'Send email',
      close: 'Close',
      cv: 'Download CV (PDF)',
      cvHref: 'assets/Saulo_Rossi_FullStack_Developer_en.pdf',
      floating: 'Contact',
    },
  },

  projects: {
    pageTitle: 'Projects - Saulo Hugo Rossi',
    eyebrow: '// portfolio',
    title: 'Featured projects',
    subtitle: 'From PDF scraping to streaming platforms: how each solution was designed and built.',
    back: '← Back to Home',
    others: 'Others',
    projects: [
      {
        id: 'dashboard',
        nav: 'Dashboard',
        title: 'Interactive Infraction Notices Dashboard',
        tags: ['Python', 'Selenium', 'PapaParse', 'SVG', 'JavaScript'],
        blocks: [
          {
            type: 'p',
            html: 'The project turns infraction notice data into an interactive dashboard. It has two independent parts: a Python extractor and a static web interface.',
          },
          {
            type: 'p',
            html: 'Extraction runs with up to <strong>16 parallel workers</strong> and feeds an analytics dashboard with <strong>38k+ records</strong>.',
          },
          { type: 'video', src: 'assets/videos/dashboard.webm' },
          {
            type: 'flow',
            steps: [
              'Government system',
              'Selenium downloads the PDFs',
              'Python extracts the infraction description',
              'Enriched CSV',
              'JavaScript filters and presents the data',
            ],
          },
          { type: 'heading', text: '1. Data extraction' },
          { type: 'p', html: 'The main script is <strong>scrape_autos.py</strong>.' },
          { type: 'p', html: 'It:' },
          {
            type: 'list',
            items: [
              'Reads a monitoring CSV.',
              'Gets the notice numbers.',
              'Opens several Chrome instances with Selenium.',
              'Authenticates into the SIF system.',
              'Navigates to each notice and downloads its PDF.',
              'Fixes PDFs that come preceded by invalid HTML.',
              'Looks for the "ATO OU FATO CONSTITUTIVO DA INFRAÇÃO" field.',
              'Periodically saves the results as JSON.',
              'Generates another CSV with the infraction description added.',
            ],
          },
          { type: 'p', html: 'PDF extraction starts at line 221 and parallel processing starts at line 323.' },
          {
            type: 'p',
            html: 'If some notices are not extracted correctly, the <strong>retry_vazios.py</strong> script finds the empty rows and retries with different heuristics.',
          },
          {
            type: 'p',
            html: '<em>An important detail:</em> the scripts are configured with an absolute Windows path (<code>BASE_DIR = r"c:\\Users\\Saulin\\Downloads\\Data Science"</code>). So before running on another machine, <code>BASE_DIR</code> must be changed in both scripts.',
          },
          { type: 'heading', text: '2. Loading the dashboard' },
          {
            type: 'p',
            html: 'The main page is <strong>index.html</strong>. There is no React, backend or database: it is plain HTML, CSS and JavaScript.',
          },
          { type: 'p', html: 'When the page opens, <strong>app.js</strong> tries to load the data in this order:' },
          {
            type: 'list',
            items: [
              '<code>Input/monitoramento_com_infracoes.csv</code>',
              '<code>monitoramento_com_infracoes.csv</code>, at the root',
              'Precompiled data in <code>data.js</code>',
              'Manual upload through the page button',
            ],
          },
          {
            type: 'p',
            html: 'The CSV is parsed in the browser with PapaParse. The code assumes a <code>;</code> separator and the following main columns: Period, Request type, Decision, Notice number and Constitutive act or fact.',
          },
          { type: 'heading', text: '3. Filters and rendering' },
          {
            type: 'p',
            html: 'The current filter state lives in a JavaScript object inside <strong>app.js</strong>. Whenever a filter changes, the <code>render()</code> function:',
          },
          {
            type: 'list',
            items: [
              'Filters and sorts the records.',
              'Recalculates the indicators.',
              'Redraws the timeline.',
              'Redraws the decisions chart.',
              'Groups the request types.',
              'Computes the most frequent acts.',
              'Updates the paginated table.',
            ],
          },
          {
            type: 'p',
            html: 'The charts do not use Chart.js: they are built directly with SVG, CSS and HTML. The table shows 40 records per page.',
          },
          {
            type: 'p',
            html: 'The infraction text filter normalizes accents and casing to offer autocomplete, but once a suggestion is selected, filtering requires an exact match.',
          },
          { type: 'heading', text: '4. data.js' },
          {
            type: 'p',
            html: 'The <strong>build_data.ps1</strong> script converts a structured CSV into JavaScript and writes it to <code>data.js</code>, giving the dashboard an embedded cache. This file is currently about 7.6 MB, while the input CSV is roughly 8.2 MB.',
          },
          { type: 'heading', text: 'How to run only the dashboard' },
          { type: 'p', html: 'At the project root:<br><code>python -m http.server 8080</code>' },
          { type: 'p', html: 'Then open:<br><code>http://localhost:8080</code>' },
          {
            type: 'p',
            html: 'The local server matters because browsers usually block the CSV <code>fetch()</code> when the page is opened as a local file.',
          },
          {
            type: 'summary',
            html: '<strong>In short:</strong> Python collects and enriches the data; the CSV is the interface between the two parts; and JavaScript does all the analysis and visualization locally in the browser.',
          },
        ],
      },
      {
        id: 'jurisprudencia',
        nav: 'Case Law',
        title: 'Searchable Archive of Board Decisions',
        tags: ['Python', 'Google Drive API', 'SQLite FTS5', 'Tesseract OCR', 'GitHub Pages'],
        links: [{ label: 'GitHub', href: 'https://github.com/sauliiin/jurisprudencia-juntas' }],
        blocks: [
          {
            type: 'p',
            html: 'This project builds and publishes a searchable archive of decisions from the Tax Judgment Boards of Belo Horizonte. It collects votes from Google Drive, enriches the information by querying SIF and makes decisions and legal opinions available on a public website.',
          },
          { type: 'video', src: 'assets/videos/juris.webm' },
          { type: 'p', html: 'The index currently holds approximately:' },
          {
            type: 'list',
            items: ['Decisions from 449+ judgment sessions', '12,178 votes', '314 legal opinions', '69 MB of vote text data'],
          },
          { type: 'heading', text: 'Main flow overview' },
          {
            type: 'flow',
            steps: [
              'Google Drive',
              'Download and text extraction',
              'Identification of decisions and notices',
              'Notice lookup in SIF',
              'Classification by law and infraction',
              'SQLite index and JSONL files',
              'Public search website',
            ],
          },
          { type: 'heading', text: '1. Collecting the votes' },
          {
            type: 'p',
            html: 'The core of the project is the <strong>baixar_e_organizar_por_ato.py</strong> script. It searches Google Drive for:',
          },
          {
            type: 'list',
            items: [
              '<code>SESSÃO NNN</code> folders, for the first instance.',
              'Folders with variations of <code>Votos dos Relatores</code>, for the second instance.',
            ],
          },
          { type: 'p', html: 'Accepted formats: PDF, Google Docs, DOCX and DOC.' },
          {
            type: 'p',
            html: 'Drive access uses read-only OAuth. Files such as <code>credentials.json</code> and <code>token.json</code> stay local and are ignored by Git.',
          },
          {
            type: 'p',
            html: 'Processing is concurrent and split into queues: <code>indexers → downloaders → organizers</code>. This makes it possible to handle thousands of documents without waiting for a whole stage to finish before starting the next one.',
          },
          { type: 'heading', text: '2. Identifying decisions' },
          {
            type: 'p',
            html: 'After extracting the text, the system checks whether the document really is a decision. It discards, for example: session minutes, voting controls, generic documents, files without the expression "DISPOSITIVO DA DECISÃO" and files whose text could not be extracted.',
          },
          {
            type: 'p',
            html: 'For each valid decision it extracts: Protocol, Subject, Instance, Notice numbers and the full text of the decision.',
          },
          { type: 'heading', text: '3. Querying SIF' },
          {
            type: 'p',
            html: 'For each notice found, the pipeline queries SIF and reads the corresponding PDF. From the notice it extracts data such as: Notice number and type, Offender, Infraction, Legal provision breached, Location and Applicable law.',
          },
          { type: 'p', html: 'This data makes it possible to physically organize the votes like this:' },
          {
            type: 'tree',
            text: 'pdfs_por_lei_e_ato/\n├── 1a_instancia/\n│   └── LEI 8616-03/\n│       └── DEIXAR DE CONSERVAR O PASSEIO/\n└── 2a_instancia/\n    └── ...',
          },
          {
            type: 'p',
            html: 'A vote can appear in more than one folder when it contains notices related to different laws or infractions. The <code>assuntos.csv</code> file also keeps a tabular view with protocol, subject and acts.',
          },
          { type: 'heading', text: '4. Public archive' },
          {
            type: 'p',
            html: 'The <strong>preparar_acervo_publico.py</strong> script turns the collected material into the index used by the website. Unlike the law-and-act organization, the public archive keeps only one copy of each vote and produces two formats:',
          },
          {
            type: 'list',
            items: [
              '<code>indice_busca.db</code>: SQLite database with FTS5 for fast local search.',
              '<strong>votos.jsonl</strong>: static index published on GitHub Pages.',
            ],
          },
          {
            type: 'p',
            html: 'Each JSONL line holds a complete decision, including text, notices, metadata and public Drive links. Processing can be incremental: the <code>marco_atualizacao.json</code> file records the last processed state, and Drive is queried only for new or modified files.',
          },
          { type: 'heading', text: '5. Legal opinions' },
          {
            type: 'p',
            html: 'The <strong>preparar_pareceres.py</strong> script maintains a separate archive of legal opinions. Besides regular text extraction, it supports OCR with Tesseract for scanned PDFs, images embedded in DOCX files and documents without a text layer. The result is published as <code>pareceres.jsonl</code>.',
          },
          { type: 'heading', text: '6. Search website' },
          {
            type: 'p',
            html: 'The website lives in <code>site_publico/index.html</code> (the root index just redirects to it). The interface lets you:',
          },
          {
            type: 'list',
            items: [
              'Search for an exact phrase or all of the given words.',
              'Filter by first/second instance and by month/year.',
              'See snippets with the terms highlighted.',
              'View the document on Google Drive and check notice details.',
              'Switch to the legal opinions search.',
            ],
          },
          {
            type: 'p',
            html: 'The frontend has two modes: on GitHub Pages it loads the whole <code>votos.jsonl</code> and searches in the browser. On a local server it uses the <code>site_server.py</code> API and SQLite FTS5. The static mode simplifies hosting, but has a cost: the browser has to download about 69 MB of votes before searching.',
          },
          { type: 'heading', text: '7. Updating and publishing' },
          {
            type: 'p',
            html: 'The <strong>atualizar_tudo.sh</strong> script automates the operation: it organizes new votes by law and act, updates the public archive, reapplies the Drive links and updates the legal opinions. It then runs <code>git add</code>, <code>commit</code> and <code>push</code>. So this script is not only local: running it can publish changes directly to the remote repository.',
          },
          { type: 'heading', text: 'Technologies used' },
          {
            type: 'list',
            items: [
              'Python, Google Drive API and OAuth',
              'Requests and BeautifulSoup for SIF',
              'pdfplumber for PDFs, docx2txt for DOCX, LibreOffice for legacy DOC',
              'Tesseract for OCR',
              'SQLite with FTS5',
              'Plain HTML, CSS and JavaScript, GitHub Pages',
            ],
          },
          {
            type: 'summary',
            html: '<strong>In short:</strong> the project combines a document collector, a legal information extractor, a classifier, a search engine and a public website. The heavy pipeline runs locally; the final result is versioned as JSONL and can be served without a backend.',
          },
        ],
      },
      {
        id: 'omnistream',
        nav: 'OmniStream',
        title: 'OmniStream: Multiplatform Website and Apps',
        tags: ['Kotlin', 'Jetpack Compose', 'Media3', 'Angular 22', 'Cloudflare Workers', 'Electron'],
        links: [
          { label: 'openstream.com.br', href: 'https://openstream.com.br' },
          { label: 'GitHub', href: 'https://github.com/sauliiin' },
        ],
        blocks: [
          {
            type: 'p',
            html: 'Open source product published on <strong>Android TV, Android, web and desktop</strong>. It consumes the mdblist API and combines TMDB, OMDb and Wikipedia data into a single experience.',
          },
          { type: 'video', src: 'assets/videos/stremiolike.webm' },
          { type: 'heading', text: 'Android and Android TV' },
          {
            type: 'list',
            items: [
              'Apps in <strong>Kotlin and Jetpack Compose</strong> (about 70k lines), with a modular architecture (app, data and player).',
              'Unit and device tests, with automated builds on GitHub Actions.',
              'Custom player on <strong>Media3</strong>, with stall control, preloading and a memory budget to run on entry-level devices: <strong>3.3 MB APK, opening in about 340 ms</strong>.',
            ],
          },
          { type: 'heading', text: 'Web and desktop' },
          {
            type: 'list',
            items: [
              'Web version in <strong>Angular 22 and TypeScript</strong> (standalone components, signals, zoneless), with Cloudflare Workers proxies and automated deployment.',
              'Semantic search by theme, personalized recommendations and progress sync to keep watching.',
              'On-demand loading with <code>@defer</code>.',
              'Desktop version with <strong>Electron</strong> for Windows and Linux.',
            ],
          },
          { type: 'heading', text: 'Integrations' },
          {
            type: 'list',
            items: [
              '5 external APIs: mdblist, TMDB, OMDb, OpenSubtitles and Trakt.',
              'OAuth login via <em>device flow</em>.',
            ],
          },
          {
            type: 'summary',
            html: '<strong>In short:</strong> one product across four platforms, with a custom player optimized for entry-level devices and a modern web version in Angular.',
          },
        ],
      },
      {
        id: 'carreiramais',
        nav: 'CarreiraMais',
        title: 'CarreiraMais: Course and Job Recommendations',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
        links: [{ label: 'match-job-tau.vercel.app', href: 'https://match-job-tau.vercel.app' }],
        blocks: [
          {
            type: 'p',
            html: 'Web application that recommends courses and jobs by matching <strong>skills, field, level, location and work model</strong>, showing the fit and the reason behind each recommendation.',
          },
          {
            type: 'summary',
            html: '<strong>Stack:</strong> JavaScript, HTML5 and CSS3, deployed on Vercel.',
          },
        ],
      },
      {
        id: 'jediflix',
        nav: 'Jediflix',
        title: 'Jediflix: Custom Streaming (Kodi)',
        tags: ['Python', 'XML', 'Kodi', 'REST APIs'],
        blocks: [
          {
            type: 'p',
            html: 'This project is a custom interface (skin) for the Kodi app, turning it into a complete, rich and unified streaming platform. Development combines <strong>Python</strong> for backend logic and requests, and <strong>XML</strong> for structuring the visual interface.',
          },
          { type: 'video', src: 'assets/videos/jediflix.webm' },
          { type: 'heading', text: 'Powerful API integration' },
          {
            type: 'p',
            html: 'To keep the catalog dynamic, detailed and always up to date, the app consumes data from several well-known sources at once:',
          },
          {
            type: 'list',
            items: [
              '<strong>MDBList & TMDb:</strong> Core movie and series metadata.',
              '<strong>OMDb & IMDb:</strong> Consolidated ratings and critic scores.',
              '<strong>Wikipedia:</strong> Contextual biographies and production history.',
              '<strong>YouTube:</strong> High-quality trailers and promotional videos.',
            ],
          },
          { type: 'heading', text: 'Main features' },
          {
            type: 'p',
            html: 'The app goes far beyond a simple video player, offering an immersive way to explore the catalog. You can:',
          },
          {
            type: 'list',
            items: [
              '<strong>Play movies:</strong> Direct, smooth access to the integrated videos.',
              '<strong>See actor information:</strong> Rich biographies fetched dynamically, keeping users engaged in the app.',
              '<strong>Browse filmographies:</strong> Interactive exploration of the cast and directors’ previous work.',
              '<strong>Read reviews and ratings:</strong> Aggregated real reviews and scores that help decide what to watch.',
            ],
          },
          {
            type: 'summary',
            html: '<strong>In short:</strong> Orchestrating APIs with Python combined with the flexibility of Kodi’s XML delivers a level of polish and interconnected information comparable to the largest commercial streaming platforms.',
          },
        ],
      },
      {
        id: 'hybrid',
        nav: 'Hybrid Panel',
        title: 'Central Vacation and Hybrid Work Panel',
        tags: ['Firebase', 'Firestore', 'JavaScript', 'HTML/CSS'],
        blocks: [
          {
            type: 'p',
            html: 'A modern, interactive web application built to manage a team’s work schedules and time off dynamically and efficiently. Using <strong>Firebase (Firestore)</strong> as a real-time <em>serverless</em> backend and <strong>Vanilla JavaScript</strong> on the frontend, the tool tackles the challenge of organizing the team’s routine with touches of gamification and humor.',
          },
          { type: 'video', src: 'assets/videos/hybrid.webm' },
          { type: 'heading', text: '1. Smart profiles and permissions' },
          {
            type: 'p',
            html: 'The experience drops traditional login in favor of a fluid interface with customizable avatars and dropdown selection. Security and organization are kept through well-defined roles:',
          },
          {
            type: 'list',
            items: [
              '<strong>Administrator (Master Yoda):</strong> Password-protected profile with a global view of the history and the power to make manual team adjustments.',
              '<strong>Managers and Secretaries:</strong> Profiles with access to schedules and collaborative features based on their role.',
            ],
          },
          { type: 'heading', text: '2. Dynamic vacation management' },
          { type: 'p', html: 'The panel removes the bureaucracy of scheduling time off:' },
          {
            type: 'list',
            items: [
              'Booking up to 3 periods (limit of 25 business days), with weekends and holidays deducted automatically.',
              'Preventive visual alerts against scheduling conflicts (e.g. colleagues in essential roles away at the same time).',
              'A clean, intuitive <strong>General Vacation Map</strong>, smartly filtered to show only current and future events (except for the administrator, who has the full view).',
            ],
          },
          { type: 'heading', text: '3. Integrated hybrid calendar' },
          { type: 'p', html: 'Adapting to new work models is handled natively:' },
          {
            type: 'list',
            items: [
              'Support for multiple flexible arrangements (e.g. 3 days in the office and 2 remote, or fixed weekdays).',
              'Views split between each employee’s individual calendar and a consolidated panel ("Who Is In the Office This Week"), giving full transparency about the team’s presence.',
            ],
          },
          { type: 'heading', text: '4. The "Crazy Roulette" (substitution system)' },
          { type: 'p', html: 'To avoid operational gaps, the system has an automatic and fun mechanism:' },
          {
            type: 'list',
            items: [
              'When a key employee (such as a Secretary) books time off on a meeting day, the algorithm detects the gap automatically.',
              'The <strong>"Crazy Roulette"</strong> kicks in: it draws an eligible substitute based on a fair workload balance (prioritizing whoever covered fewer absences recently).',
              'The administrator can always manually override the drawn result if needed.',
            ],
          },
          {
            type: 'summary',
            html: '<strong>In short:</strong> Built with plain HTML/CSS and robust JavaScript logic, the tool turns what would be a complex spreadsheet into a gamified, highly functional productivity experience, perfectly orchestrated with Firebase’s scalability.',
          },
        ],
      },
    ],
  },
};
