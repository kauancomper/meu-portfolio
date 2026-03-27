import type { Language } from './content';

export const REPO_DESCRIPTIONS: Record<string, Record<Language, { highlight: string; detail: string }> & { image?: string; url?: string }> = {
  'meu-portfolio': {
    pt: {
      highlight: 'Portfólio de alta performance com React, Vite e Framer Motion.',
      detail: 'Desenvolvimento focado em design premium, animações fluidas e otimização extrema de Core Web Vitals para uma experiência sênior.'
    },
    en: {
      highlight: 'High-performance portfolio with React, Vite, and Framer Motion.',
      detail: 'Development focused on premium design, fluid animations, and extreme Core Web Vitals optimization for a senior experience.'
    },
    es: {
      highlight: 'Portafolio de alto rendimiento con React, Vite y Framer Motion.',
      detail: 'Desarrollo enfocado en diseño premium, animaciones fluidas y optimización extrema de Core Web Vitals para una experiencia senior.'
    },
    image: '/capa-portfolio.png',
    url: 'https://www.kauancomper.com.br'
  },
  'portfolio_kc': {
    pt: {
      highlight: 'Versão experimental e minimalista do portfólio pessoal.',
      detail: 'Exploração de fundamentos de design e animações puras em HTML/CSS para estabelecer a identidade visual da marca Kauan Comper.'
    },
    en: {
      highlight: 'Experimental and minimalist version of the personal portfolio.',
      detail: 'Exploration of design fundamentals and pure HTML/CSS animations to establish the Kauan Comper brand visual identity.'
    },
    es: {
      highlight: 'Versión experimental e minimalista del portafolio personal.',
      detail: 'Exploración de fundamentos de diseño y animaciones puras en HTML/CSS para establecer la identidad visual de la marca Kauan Comper.'
    }
  },
  'portfolio_jn_redesign': {
    pt: {
      highlight: 'Redesign completo de portfólio profissional para cliente.',
      detail: 'Implementação de automação com Playwright para extração de dados e arquitetura baseada em Docker para facilitação de deploy.'
    },
    en: {
      highlight: 'Complete redesign of a professional portfolio for a client.',
      detail: 'Implementation of automation with Playwright for data extraction and Docker-based architecture for easy deployment.'
    },
    es: {
      highlight: 'Rediseño completo de un portafolio profesional para un cliente.',
      detail: 'Implementación de automatización com Playwright para extracción de datos y arquitetura basada en Docker para facilitar el despliegue.'
    },
    image: '/portfolio-jn.png',
    url: 'https://www.jordaonunes.com.br/'
  },
  'portfolio_JordaoNunes': {
    pt: {
      highlight: 'Ecossistema digital focado em branding e presença profissional.',
      detail: 'Integração de feeds dinâmicos e arquitetura limpa desenvolvida para escalar a presença digital do profissional Jordão Nunes.'
    },
    en: {
      highlight: 'Digital ecosystem focused on branding and professional presence.',
      detail: 'Integration of dynamic feeds and clean architecture developed to scale the digital presence of the professional Jordão Nunes.'
    },
    es: {
      highlight: 'Ecosistema digital enfocado en branding y presencia profesional.',
      detail: 'Integración de feeds dinámicos y arquitectura limpia desarrollada para escalar la presencia digital del profesional Jordão Nunes.'
    },
    image: '/portfolio-jn.png',
    url: 'https://www.jordaonunes.com.br/'
  },
  'BDII-TGI': {
    pt: {
      highlight: 'Sistema de Gestão Imobiliária robusto com FastAPI e Postgres.',
      detail: 'Mapeamento ORM complexo, modelagem de banco de dados relacional e containerização completa para ambiente de desenvolvimento.'
    },
    en: {
      highlight: 'Robust Real Estate Management System with FastAPI and Postgres.',
      detail: 'Complex ORM mapping, relational database modeling, and full containerization for a development environment.'
    },
    es: {
      highlight: 'Sistema de Gestión Inmobiliaria robusto con FastAPI y Postgres.',
      detail: 'Mapeo ORM complejo, modelado de bases de datos relacionales y contenedorización completa para el entorno de desarrollo.'
    },
    image: '/apache-imobiliaria.png'
  },
  'tg1bdi': {
    pt: {
      highlight: 'Sistema de Gestão Imobiliária robusto com FastAPI e Postgres.',
      detail: 'Mapeamento ORM complexo, modelagem de banco de dados relacional e containerização completa para ambiente de desenvolvimento.'
    },
    en: {
      highlight: 'Robust Real Estate Management System with FastAPI and Postgres.',
      detail: 'Complex ORM mapping, relational database modeling, and full containerization for a development environment.'
    },
    es: {
      highlight: 'Sistema de Gestión Inmobiliaria robusto con FastAPI y Postgres.',
      detail: 'Mapeo ORM complejo, modelado de bases de datos relacionales y contenedorización completa para el entorno de desarrollo.'
    },
    image: '/apache-imobiliaria.png'
  }
};
