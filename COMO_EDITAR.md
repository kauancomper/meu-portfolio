# Guia do Portfólio: Como Usar, Editar e Atualizar

Bem-vindo(a) ao seu novo portfólio! Ele foi construído utilizando as melhores e mais modernas tecnologias de desenvolvimento web (React, Vite, Tailwind CSS e Framer Motion) para garantir alta performance e animações incrivelmente fluidas.

A melhor parte é que **você não precisa mexer em linhas complexas de código** para alterar o conteúdo do site. Toda a base de dados foi isolada em um arquivo central para facilitar a sua vida.

---

## 🚀 1. Como rodar o projeto localmente
Para ver as alterações no seu próprio computador antes de publicá-las:

1. Abra o terminal (ou a aba de terminal na sua IDE) certificando-se de que está na pasta `meu-portfolio`.
2. Rode o comando de instalação (caso não tenha rodado ainda):
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Pressione e segure o `Ctrl` (ou `Cmd`) e clique no link que aparecer (geralmente `http://localhost:5173`) para abri-lo no navegador. Tudo o que você atualizar nos arquivos recarregará o site automaticamente.

---

## ✏️ 2. Como Editar e Atualizar os Textos (O MAIS IMPORTANTE)

**Mude todos os textos e informações editando um UNICO arquivo:**

Abra o arquivo: `src/data/content.ts`

### O que você pode alterar lá:

- **hero:** Seção que fica no topo. Você pode alterar as falas ("Olá", "eu sou o"), o seu Nome e sua especialidade (`subtitle` e `description`).
- **about:** Sua biografia, título da seção (`page_title`), e as listas de conhecimentos técnicos (em `skills`).
- **projects:** A lista completa de seus trabalhos ("Trabalhos Recentes"). 
  - **Dica:** Para adicionar um novo projeto, copie um dos blocos dentro de `items`, mude o `id` e troque a imagem e os textos. As imagens de preferência devem ser do tipo retrato (widescreen).
- **contact:** Todos os e-mails, o seu link do LinkedIn, do WhatsApp e do GitHub, assim como os textos motivacionais e as opções da lista.

> **Regra de ouro:** Apenas modifique os textos que estão *dentro das aspas duplas*. Não altere os nomes das chaves (a parte antes dos dois pontos `:`), pois o código depende delas.

**Exemplo de alteração:**
```typescript
// ANTES
title_name: "Vini Novais",

// DEPOIS (O SEU NOME)
title_name: "João Silva",
```

---

## 🎨 3. Como Mudar as Cores do Site
Se você quiser mudar a identidade visual (como a cor do "glow" que segue o mouse ou os detalhes roxos):

Abra o arquivo: `src/index.css`

Lá você vai encontrar:
```css
  :root {
    --background: #000000;
    --brand-primary: #8B5CF6; /* Roxo claro */
    --brand-secondary: #A78BFA; /* Lilás */
  }
```

Altere os valores hexadecimais (ex: `#8B5CF6`) pelas cores da sua marca pessoal.
> Dica: Se quiser saber a cor correta, procure geradores de paletas HEX online. Se for mudar a cor de destaque, mude também no arquivo `tailwind.config.js` na seção `colors.primary`.

---

## 🚀 4. Como Publicar o Site na Vercel (Gratuitamente)

Quando seu portfólio estiver 100% atualizado com seu nome e seus dados:

1. Crie uma conta no **GitHub** e suba este projeto para um repositório chamado `meu-portfolio`.
2. Crie uma conta na plataforma **Vercel** (https://vercel.com/) vinculando com seu GitHub.
3. No painel da Vercel, clique em **Add New Project**.
4. Importe o repositório `meu-portfolio`.
5. A Vercel vai reconhecer *automaticamente* que é um projeto Vite. Basta clicar em **Deploy**.
6. Pronto! A Vercel lhe dará um link (ex: seu-nome.vercel.app) para você colocar nas suas redes e mandar para recrutadores.

Parabéns pelo novo portfólio de alta fidelidade!

---

## 📅 5. Como Adicionar o Agendamento do Google Calendar
Para permitir que seus clientes marquem reuniões diretamente pelo site:

1. **No Google Calendar:** Clique em **Criar (+)** > **Programação de horários**.
2. **Configure:** Nome, duração e seus horários disponíveis.
3. **Compartilhar:** Clique em "Compartilhar" > "Incorporar ao site" e copie o link dentro do `src="https://..."`.
4. **No Código:** Abra `src/components/Contact.tsx`.
5. Procure por `src="SEU_LINK_AQUI"` e cole o seu link.

---
**Dica:** Se você preferir o **Calendly**, o processo é o mesmo: copie o link de "Share" e cole no mesmo lugar do código.
