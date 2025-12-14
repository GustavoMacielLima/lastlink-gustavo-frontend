# Lastlink Frontend Test

Projeto frontend desenvolvido com Angular 21, focado em performance, manutenibilidade e boas práticas de desenvolvimento.

## 📋 Índice

- [Documentação Técnica](#documentação-técnica)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🏗️ Documentação Técnica

### Decisões Arquiteturais

Este projeto foi desenvolvido seguindo as melhores práticas do Angular moderno, com foco em performance, escalabilidade e manutenibilidade.

#### **Framework e Versão**
- **Angular 21**: Utiliza a versão mais recente do framework, aproveitando os recursos mais modernos e otimizações de performance.

#### **Arquitetura de Componentes**
- **Standalone Components**: Todos os componentes são standalone, eliminando a necessidade de módulos e simplificando a estrutura do projeto. Isso reduz o bundle size e melhora a tree-shaking.
- **ChangeDetectionStrategy.OnPush**: Todos os componentes utilizam `OnPush` para otimizar a detecção de mudanças, reduzindo ciclos de verificação desnecessários e melhorando significativamente a performance da aplicação.

#### **Gerenciamento de Estado**
- **Angular Signals**: Utilizado para gerenciamento de estado local reativo. Signals oferecem uma API mais simples e performática comparada ao RxJS para estado local, com detecção automática de dependências.
- **Computed Signals**: Para valores derivados, como filtros e transformações de dados, garantindo atualizações automáticas quando as dependências mudam.

#### **Roteamento e Lazy Loading**
- **Lazy Loading com `loadComponent`**: As rotas de features (dashboard, user) são carregadas sob demanda usando `loadComponent()`, reduzindo o bundle inicial e melhorando o tempo de carregamento da aplicação.
- **Server-Side Rendering (SSR)**: Configurado com Angular SSR para melhorar SEO e performance de carregamento inicial.

#### **Camada HTTP**
- **Tipagem Forte**: Toda a camada HTTP é tipada, sem uso de `any`, garantindo type-safety e melhor experiência de desenvolvimento.
- **Service Layer Abstrato**: `HttpRoute` fornece uma abstração reutilizável para requisições HTTP, centralizando a configuração e tratamento de erros.
- **Error Interceptor**: Interceptor global que captura erros HTTP e exibe notificações toast para o usuário, centralizando o tratamento de erros.

#### **Estilização**
- **Tailwind CSS 4**: Framework de CSS utility-first para desenvolvimento rápido e consistente de interfaces, com configuração otimizada via PostCSS.

#### **Testes**
- **Vitest**: Framework moderno e rápido para testes unitários, com suporte nativo a TypeScript e ESM.
- **Cypress**: Framework para testes end-to-end (E2E), garantindo que os fluxos críticos da aplicação funcionem corretamente.

#### **Estrutura de Pastas**
- **Feature-based**: Organização por features (dashboard, user) facilita a manutenção e escalabilidade.
- **Shared Components**: Componentes reutilizáveis centralizados em `shared/components`.
- **Services**: Lógica de negócio e comunicação com APIs isoladas em services.
- **Utilities**: Funções auxiliares e helpers reutilizáveis.

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js**: Versão 18 ou superior
- **npm**: Versão 10.9.2 (gerenciador de pacotes configurado no projeto)

### Passo a Passo

1. **Clone o repositório** (se aplicável):
   ```bash
   git clone https://github.com/GustavoMacielLima/lastlink-gustavo-frontend.git
   cd lastlink-frontend-test
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   
   O projeto utiliza arquivos de ambiente para configuração:
   - `src/environments/environment.ts` - Ambiente padrão (desenvolvimento)
   - `src/environments/environment.dev.ts` - Ambiente de desenvolvimento
   - `src/environments/environment.prod.ts` - Ambiente de produção
   
   Ajuste a URL da API conforme necessário em cada arquivo.

4. **Execute o servidor de desenvolvimento**:
   ```bash
   npm start
   # ou
   ng serve
   ```
   
   A aplicação estará disponível em `http://localhost:4200/`

5. **Para build de produção**:
   ```bash
   npm run build
   # ou
   ng build
   ```
   
   Os arquivos compilados estarão na pasta `dist/`.

## 📜 Scripts Disponíveis

### Scripts de Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm start
# ou
ng serve

# Build em modo watch (desenvolvimento)
npm run watch
```

### Scripts de Build

```bash
# Build de produção (otimizado)
npm run build
# ou
ng build

# Build de desenvolvimento
ng build --configuration development

# Build de produção
ng build --configuration production
```

**Configurações de Build:**
- **Production**: 
  - Otimizações ativadas
  - Output hashing para cache
  - Budgets configurados (500kB warning, 1MB error para bundle inicial)
  - Source maps desabilitados
  - Licenças extraídas
  
- **Development**:
  - Otimizações desabilitadas
  - Source maps habilitados
  - Build mais rápido para desenvolvimento

### Scripts de Testes

```bash
# Executa testes unitários com Vitest
npm test
# ou
ng test

# Executa testes E2E com Cypress (modo headless)
npm run e2e
# ou
npm run cypress:run

# Abre o Cypress em modo interativo
npm run cypress:open
```

**Configuração de Testes:**
- **Vitest**: Testes unitários com suporte a TypeScript
- **Cypress**: 
  - Base URL: `http://localhost:4200`
  - Viewport: 1280x720
  - Screenshots em caso de falha
  - Vídeos desabilitados

### Scripts de SSR

```bash
# Serve a aplicação SSR após build
npm run serve:ssr:lastlink-frontend-test
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── feature/              # Features da aplicação
│   │   ├── dashboard/        # Feature Dashboard
│   │   └── user/             # Feature User (com sub-features)
│   ├── shared/               # Componentes compartilhados
│   │   └── components/       # Button, Card, Input, Toast, etc.
│   ├── app.routes.ts         # Configuração de rotas
│   └── app.config.ts         # Configuração da aplicação
├── environments/             # Configurações de ambiente
├── interceptor/              # Interceptors HTTP
├── service/                  # Services (HTTP, lógica de negócio)
├── utility/                  # Funções auxiliares
└── styles.css                # Estilos globais
```

## 🔧 Tecnologias Utilizadas

- **Angular** 21.0.0
- **TypeScript** 5.9.2
- **Tailwind CSS** 4.1.18
- **Vitest** 4.0.8 (testes unitários)
- **Cypress** 15.7.1 (testes E2E)
- **RxJS** 7.8.0
- **Express** 5.1.0 (SSR)

## 📝 Notas Adicionais

- O projeto utiliza **Prettier** para formatação de código (configurado no `package.json`)
- **Package Manager**: npm 10.9.2 (lockado no projeto)
- **SSR**: Configurado com Angular SSR para melhor performance e SEO
- **Error Handling**: Tratamento centralizado via interceptor com notificações toast

## 📚 Recursos Adicionais

Para mais informações sobre Angular CLI, visite a [documentação oficial do Angular CLI](https://angular.dev/tools/cli).
