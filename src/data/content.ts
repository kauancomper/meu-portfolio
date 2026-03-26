// content.ts
// Este arquivo contém todo o texto e informações do site.
// Edite os valores aqui para atualizar o portfólio.

export const portfolioContent = {
  nav: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato"
  },
  hero: {
    title_line1: "Olá,",
    title_line2: "eu sou o",
    title_name: "Kauan Comper",
    subtitle: "Desenvolvedor de Sistemas, Automação e IA",
    description: "Desenvolvo sistemas inteligentes, automações e soluções com IA que aumentam a eficiência de negócios e eliminam tarefas manuais. Do backend robusto à automação completa de processos, crio soluções que geram resultado real.",
    cta_primary: "Ver Projetos",
    cta_secondary: "Ver CV",
    location: "Brasil",
    remote: "Atendimento remoto global",
    skills: "Node.js • Python • Automação • APIs • Inteligência Artificial • Sistemas Web",
    badge_label: "Disponível para projetos",
    exp_label: "Experiência",
    exp_value: "+2 Anos",
    projects_label: "Projetos",
    projects_value: "+10 Soluções Desenvolvidas"
  },

  about: {
    page_title: "Sobre Mim",
    bio_title: "Código, Automação e Inteligência",
    bio_p1: "Sou Kauan Comper, desenvolvedor focado em criar soluções inteligentes que automatizam processos e escalam negócios.",
    bio_p2: "Minha jornada começou desenvolvendo aplicações web, mas rapidamente evoluí para automação e integração de sistemas — eliminando tarefas repetitivas e conectando ferramentas de forma estratégica.",
    bio_p3: "Hoje, trabalho com desenvolvimento backend, APIs, bots e soluções com IA, criando sistemas que operam praticamente sozinhos e aumentam a produtividade de empresas.",
    bio_p4: "Meu foco é simples: transformar processos manuais em sistemas automatizados, eficientes e escaláveis.",
    bio_highlight: "Não desenvolvo apenas código — desenvolvo sistemas que trabalham por você.",
    specialties_title: "Especialidades",
    skills_title: "Stack Técnica",
    experience_title: "Experiências Recentes",
    download_cv: "Download CV",
    badge_label: "Disponibilidade",
    badge_value: "Aberto para projetos",
    skills: [
      { category: "Backend & Sistemas", items: ["Node.js", "Python", "APIs REST", "Banco de Dados"] },
      { category: "Automação", items: ["Web Automation", "Bots", "Integrações", "Scraping"] },
      { category: "Inteligência Artificial", items: ["OpenAI", "Chatbots", "IA aplicada", "Agentes inteligentes"] },
      { category: "Ferramentas", items: ["Git", "Docker", "Vercel", "N8N / Workflows"] }
    ]
  },

  projects: {
    page_title: "Projetos e Soluções",
    page_subtitle: "O que eu construo na prática",
    items: [
      {
        id: 1,
        title: "Sistema de Automação Comercial",
        category: "Automação / Backend",
        description: "Automação completa de atendimento e processos internos, reduzindo tempo operacional e aumentando conversão.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        link: "#"
      },
      {
        id: 2,
        title: "Agente de IA para Atendimento",
        category: "Inteligência Artificial",
        description: "Desenvolvimento de chatbot inteligente capaz de qualificar leads e automatizar conversas.",
        image: "https://images.unsplash.com/photo-1616077168079-7e09a6a3b2b3?auto=format&fit=crop&q=80&w=800",
        link: "#"
      },
      {
        id: 3,
        title: "Integração de APIs e Sistemas",
        category: "Backend / Integrações",
        description: "Conexão entre múltiplas plataformas criando fluxos automatizados e sincronização de dados.",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800",
        link: "#"
      }
    ]
  },

  contact: {
    page_title: "Vamos Automatizar Seu Negócio?",
    subtitle: "Agende uma conversa estratégica",
    bullets: [
      "Entender seu processo atual e gargalos",
      "Identificar oportunidades de automação",
      "Sugerir soluções com IA e sistemas",
      "Definir próximos passos de implementação (sem compromisso)"
    ],
    response_time: "Respondo 100% das solicitações em até 24h.",
    btn_schedule: "Agendar Chamada",
    btn_email: "Enviar Email",
    email: "mailto:kauancomper.dev@gmail.com",
    linkedin: "https://linkedin.com/in/kauan-comper/",
    github: "https://github.com/kauancomper",
    whatsapp: "https://api.whatsapp.com/send/?phone=5594992239540"
  },
  process: {
    title: "Diferente de tudo que você já viu",
    subtitle: "MEU PROCESSO",
    description: "Uma metodologia estruturada que une design estratégico, desenvolvimento técnico e inteligência artificial. Design engineering de ponta-a-ponta de verdade.",
    steps: [
      {
        id: "01",
        title: "Briefing & PRD",
        description: "Levantamento completo de requisitos, Personas, Jornadas do usuário, arquitetura da informação, análise de stakeholders e documentação detalhada do produto através de PRD estruturado.",
        tags: ["Research", "Documentation", "Strategy"],
        icon: "FileText"
      },
      {
        id: "02",
        title: "Branding, Fundamentos de design e Design System",
        description: "Branding alinhado à construção de fundamentos sólidos de design com tokens, variables, componentes e padrões escaláveis, garantindo consistência e manutenibilidade.",
        tags: ["Figma", "Tokens", "Variables", "Components"],
        icon: "Layers"
      },
      {
        id: "03",
        title: "Prototipagem & Vibecoding",
        description: "Prototipagem de alta fidelidade para testes mais assertivos e reais antes de construir qualquer linha de código. Integração via MCP do Figma com Claude code e Cursor para handoff perfeito ou desenvolvimento avançado com código de alta qualidade. Nada de Protótipos estáticos e sem interação.",
        tags: ["Figma", "Prototype", "Handoff", "Code"],
        icon: "Monitor"
      },
      {
        id: "04",
        title: "Manutenção e análise de dados",
        description: "Manutenção contínua, análise de dados, SEO, acessibilidade, testes de usabilidade, testes A/B e otimização para garantir que seu produto esteja sempre evoluindo e performando da melhor maneira. E o melhor: encontrando problemas antes deles acontecerem.",
        tags: ["Research", "Analytics", "User Testing", "Code"],
        icon: "TrendingUp"
      }
    ]
  },

  footer: {
    built_with: "Construído com código, automação e IA",
    rights: "© Kauan Comper — Todos os direitos reservados"
  }
};