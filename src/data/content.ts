export type Language = 'pt' | 'en' | 'es';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface PortfolioContent {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    title_line1: string;
    title_line2: string;
    title_name: string;
    subtitle: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
    badge_label: string;
    location: string;
    remote: string;
    skills: string;
    exp_label: string;
    exp_value: string;
    projects_label: string;
    projects_value: string;
  };
  about: {
    page_title: string;
    bio_title: string;
    bio_p1: string;
    bio_p2: string;
    bio_p3: string;
    bio_p4: string;
    bio_highlight: string;
    skills: SkillGroup[];
  };
  projects: {
    page_title: string;
    page_subtitle: string;
    title_line1: string;
    title_line2: string;
    description: string;
    view_project: string;
    items: ProjectItem[];
  };
  recent_works: {
    subtitle: string;
    title_part1: string;
    title_part2: string;
    view_all: string;
  };
  process: {
    title: string;
    subtitle: string;
    description: string;
    steps: ProcessStep[];
  };
  contact: {
    page_title: string;
    subtitle: string;
    email: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
}

export const portfolioContent: Record<Language, PortfolioContent> = {
  pt: {
    nav: { home: "Início", about: "Sobre", projects: "Projetos", contact: "Contato" },
    hero: {
      title_line1: "Olá,", title_line2: "eu sou o", title_name: "Kauan Comper",
      subtitle: "Desenvolvedor de Sistemas, Automação e IA",
      description: "Desenvolvo sistemas inteligentes, automações e soluções com IA que aumentam a eficiência de negócios e eliminam tarefas manuais. Do backend robusto à automação completa de processos, crio soluções que geram resultado real.",
      cta_primary: "VER PROJETOS", cta_secondary: "VER CV",
      badge_label: "DISPONÍVEL PARA PROJETOS", location: "Brasil", remote: "Atendimento remoto global",
      skills: "NODE.JS • PYTHON • AUTOMAÇÃO • APIS • INTELIGÊNCIA ARTIFICIAL • SISTEMAS WEB",
      exp_label: "EXPERIÊNCIA", exp_value: "+2 Anos",
      projects_label: "PROJETOS", projects_value: "+10 Soluções Desenvolvidas"
    },
    about: {
      page_title: "SOBRE MIM",
      bio_title: "Construindo o futuro com código e estratégia",
      bio_p1: "Meu nome é Kauan Comper, e sou movido pela transformação de dados em ação. Com base sólida em análise e desenvolvimento de sistemas, meu foco é criar ecossistemas digitais que pulsam com eficiência.",
      bio_p2: "Não escrevo apenas código; projeto soluções que resolvem gargalos complexos e escalam operações, integrando tecnologias de ponta em fluxos de trabalho tradicionais.",
      bio_p3: "Atualmente focado em automação inteligente e sistemas escaláveis, busco sempre a fronteira entre performance técnica e impacto real no negócio.",
      bio_p4: "Seja através de APIs robustas ou interfaces intuitivas, meu objetivo é tornar a tecnologia uma aliada invisível porém poderosa para o crescimento sustentável.",
      bio_highlight: "Transformando complexidade técnica em vantagem competitiva.",
      skills: [
        { category: "Desenvolvimento", items: ["React", "TypeScript", "Node.js", "Python", "FastAPI"] },
        { category: "IA & Automação", items: ["LangChain", "OpenAI APIs", "n8n", "Playwright", "Docker"] },
        { category: "Ferramentas", items: ["Git", "PostgreSQL", "Tailwind CSS", "Framer Motion"] }
      ]
    },
    projects: { 
      page_title: "PROJETOS", 
      page_subtitle: "Vitrine Tecnológica", 
      title_line1: "MEUS", 
      title_line2: "PROJETOS", 
      description: "Uma coleção de soluções técnicas, automações e sistemas desenvolvidos para resolver problemas reais e escalar operações.", 
      view_project: "Explorar Projeto", 
      items: [] 
    },
    recent_works: { subtitle: "GitHub Showcase", title_part1: "Trabalhos", title_part2: "Recentes", view_all: "ver todos os projetos" },
    process: {
      title: "MUITO ALÉM DE DESENVOLVIMENTO", subtitle: "Metodologia de Trabalho",
      description: "Uma metodologia focada em automação, sistemas escaláveis e inteligência artificial. Do diagnóstico ao deploy, cada etapa é pensada para eliminar processos manuais e gerar eficiência real no seu negócio.",
      steps: [
        { id: "01", title: "DIAGNÓSTICO & ESTRATÉGIA", description: "Análise profunda do seu negócio, identificando gargalos operacionais.", icon: "Search", tags: ["ANÁLISE", "ESTRATEGIA"] },
        { id: "02", title: "ARQUITETURA & PLANEJAMENTO", description: "Definição de stack tecnológica e modelagem de banco de dados.", icon: "Layers", tags: ["DESIGN", "OPERAÇÃO"] },
        { id: "03", title: "DESENVOLVIMENTO ÁGIL", description: "Codificação de alta performance utilizando tecnologias modernas.", icon: "Code", tags: ["FRONTEND", "BACKEND"] },
        { id: "04", title: "AUTOMAÇÃO & SISTEMAS", description: "Implementação de automações inteligentes e deploy final.", icon: "TrendingUp", tags: ["RESULTADOS", "IA"] }
      ]
    },
    contact: { page_title: "CONTATO", subtitle: "Vamos conversar?", email: "mailto:contato@kauancomper.com.br", linkedin: "https://linkedin.com/in/kauancomper", github: "https://github.com/kauancomper", whatsapp: "https://wa.me/55479992239540" }
  },
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact" },
    hero: {
      title_line1: "Hello,", title_line2: "I am", title_name: "Kauan Comper",
      subtitle: "Systems Developer, Automation & AI",
      description: "I develop intelligent systems, automations and AI solutions that increase business efficiency and eliminate manual tasks. From robust backend to complete process automation, I create solutions that generate real results.",
      cta_primary: "VIEW PROJECTS", cta_secondary: "VIEW CV",
      badge_label: "AVAILABLE FOR PROJECTS", location: "Brazil", remote: "Global Remote Service",
      skills: "NODE.JS • PYTHON • AUTOMATION • APIS • ARTIFICIAL INTELLIGENCE • WEB SYSTEMS",
      exp_label: "EXPERIENCE", exp_value: "+2 Years",
      projects_label: "PROJECTS", projects_value: "+10 Solutions Developed"
    },
    about: {
      page_title: "ABOUT ME",
      bio_title: "Building the future with code and strategy",
      bio_p1: "My name is Kauan Comper, and I am driven by the transformation of data into action. With a solid foundation in systems analysis and development, my focus is creating digital ecosystems that pulse with efficiency.",
      bio_p2: "I don't just write code; I design solutions that solve complex bottlenecks and scale operations, integrating cutting-edge technologies into traditional workflows.",
      bio_p3: "Currently focused on intelligent automation and scalable systems, I always seek the frontier between technical performance and real business impact.",
      bio_p4: "Whether through robust APIs or intuitive interfaces, my goal is to make technology an invisible yet powerful ally for sustainable growth.",
      bio_highlight: "Transforming technical complexity into competitive advantage.",
      skills: [
        { category: "Development", items: ["React", "TypeScript", "Node.js", "Python", "FastAPI"] },
        { category: "AI & Automation", items: ["LangChain", "OpenAI APIs", "n8n", "Playwright", "Docker"] },
        { category: "Tools", items: ["Git", "PostgreSQL", "Tailwind CSS", "Framer Motion"] }
      ]
    },
    projects: { 
      page_title: "PROJECTS", 
      page_subtitle: "Tech Showcase", 
      title_line1: "MY", 
      title_line2: "PROJECTS", 
      description: "A collection of technical solutions, automations, and systems developed to solve real-world problems and scale operations.", 
      view_project: "Explore Project", 
      items: [] 
    },
    recent_works: { subtitle: "GitHub Showcase", title_part1: "Recent", title_part2: "Works", view_all: "view all projects" },
    process: {
      title: "MUCH BEYOND DEVELOPMENT", subtitle: "Working Methodology",
      description: "A methodology focused on automation, scalable systems, and artificial intelligence. From diagnosis to deployment, each step is designed to eliminate manual processes and generate real efficiency.",
      steps: [
        { id: "01", title: "DIAGNOSIS & STRATEGY", description: "Deep analysis of your business, identifying operational bottlenecks.", icon: "Search", tags: ["ANALYSIS", "STRATEGY"] },
        { id: "02", title: "ARCHITECTURE & PLANNING", description: "Technology stack definition and database modeling.", icon: "Layers", tags: ["DESIGN", "OPERATION"] },
        { id: "03", title: "AGILE DEVELOPMENT", description: "High-performance coding using modern technologies.", icon: "Code", tags: ["FRONTEND", "BACKEND"] },
        { id: "04", title: "AUTOMATION & SYSTEMS", description: "Implementation of intelligent automations and final deployment.", icon: "TrendingUp", tags: ["RESULTS", "AI"] }
      ]
    },
    contact: { page_title: "CONTACT", subtitle: "Let's talk?", email: "mailto:contato@kauancomper.com.br", linkedin: "https://linkedin.com/in/kauancomper", github: "https://github.com/kauancomper", whatsapp: "https://wa.me/55479992239540" }
  },
  es: {
    nav: { home: "Inicio", about: "Sobre", projects: "Proyectos", contact: "Contacto" },
    hero: {
      title_line1: "Hola,", title_line2: "soy", title_name: "Kauan Comper",
      subtitle: "Desarrollador de Sistemas, Automatización e IA",
      description: "Desarrollo sistemas inteligentes, automatizaciones y soluciones con IA que aumentan la eficiencia de los negocios y eliminan tareas manuales. Del backend robusto a la automatización completa de procesos, creo soluciones que generan resultados reales.",
      cta_primary: "VER PROYECTOS", cta_secondary: "VER CV",
      badge_label: "DISPONIBLE PARA PROYECTOS", location: "Brasil", remote: "Servicio Remoto Global",
      skills: "NODE.JS • PYTHON • AUTOMATIZACIÓN • APIS • INTELIGENCIA ARTIFICIAL • SISTEMAS WEB",
      exp_label: "EXPERIENCIA", exp_value: "+2 Años",
      projects_label: "PROYECTOS", projects_value: "+10 Soluciones Desarrolladas"
    },
    about: {
      page_title: "SOBRE MÍ",
      bio_title: "Construyendo el futuro con código y estrategia",
      bio_p1: "Mi nombre es Kauan Comper, e me motiva la transformación de datos en acciones. Con una base sólida en análisis y desarrollo de sistemas, mi enfoque es crear ecosistemas digitales que pulsen con eficiencia.",
      bio_p2: "No solo escribo código; diseño soluciones que resuelven cuellos de botella complejos y escalan operaciones, integrando tecnologías de vanguardia en flujos de trabajo tradicionales.",
      bio_p3: "Actualmente enfocado en automatización inteligente y sistemas escalables, busco siempre la frontera entre el rendimiento técnico y el impacto real en el negocio.",
      bio_p4: "Ya sea a través de APIs robustas o interfaces intuitivas, mi objetivo es hacer de la tecnología un aliado invisible pero poderoso para el crecimiento sostenible.",
      bio_highlight: "Transformando la complejidad técnica en ventaja competitiva.",
      skills: [
        { category: "Desarrollo", items: ["React", "TypeScript", "Node.js", "Python", "FastAPI"] },
        { category: "IA y Automatización", items: ["LangChain", "OpenAI APIs", "n8n", "Playwright", "Docker"] },
        { category: "Herramientas", items: ["Git", "PostgreSQL", "Tailwind CSS", "Framer Motion"] }
      ]
    },
    projects: { 
      page_title: "PROYECTOS", 
      page_subtitle: "Vitrina Tecnológica", 
      title_line1: "MIS", 
      title_line2: "PROYECTOS", 
      description: "Una colección de soluciones técnicas, automatizaciones y sistemas desarrollados para resolver problemas reales y escalar operaciones.", 
      view_project: "Explorar Proyecto", 
      items: [] 
    },
    recent_works: { subtitle: "GitHub Showcase", title_part1: "Trabajos", title_part2: "Recientes", view_all: "ver todos los proyectos" },
    process: {
      title: "MUCHO MÁS ALLÁ DEL DESARROLLO", subtitle: "Metodología de Trabajo",
      description: "Una metodología enfocada en automatización, sistemas escalables e inteligencia artificial. Del diagnóstico al despliegue, cada paso está diseñado para eliminar procesos manuales.",
      steps: [
        { id: "01", title: "DIAGNÓSTICO Y ESTRATEGIA", description: "Análisis profundo de su negocio e identificación de cuellos de botella.", icon: "Search", tags: ["ANÁLISIS", "ESTRATEGIA"] },
        { id: "02", title: "ARQUITECTURA Y PLANIFICACIÓN", description: "Definición de stack tecnológico y modelado de bases de datos.", icon: "Layers", tags: ["DISEÑO", "OPERACIÓN"] },
        { id: "03", title: "DESARROLLO ÁGIL", description: "Codificación de alto rendimiento utilizando tecnologías modernas.", icon: "Code", tags: ["FRONTEND", "BACKEND"] },
        { id: "04", title: "AUTOMATIZACIÓN Y SISTEMAS", description: "Implementación de automatizaciones inteligentes y despliegue final.", icon: "TrendingUp", tags: ["RESULTADOS", "IA"] }
      ]
    },
    contact: { page_title: "CONTACTO", subtitle: "¿Hablamos?", email: "mailto:contato@kauancomper.com.br", linkedin: "https://linkedin.com/in/kauancomper", github: "https://github.com/kauancomper", whatsapp: "https://wa.me/55479992239540" }
  }
};