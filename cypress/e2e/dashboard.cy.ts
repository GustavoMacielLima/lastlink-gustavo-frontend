describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  // Cenário 2: Verificar se cada card exibe nome, email e empresa (quando houver)
  it('deve exibir nome, email e empresa em cada card', () => {
    cy.visit('/dashboard');
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');
    cy.get('app-card', { timeout: 20000 }).should('have.length.at.least', 1);

    // Verificar o primeiro card
    cy.get('app-card').first().within(() => {
      // Verificar se o nome está presente
      cy.get('span.text-sm').should('be.visible').and('not.be.empty');
      // Verificar se o email está presente
      cy.get('span.text-xs').first().should('be.visible').and('contain', '@');
      // Verificar se a empresa está presente (pode não existir para todos)
      cy.get('body').then(($body) => {
        if ($body.find('span.text-xs.font-light').length > 0) {
          cy.get('span.text-xs.font-light').should('be.visible');
        }
      });
    });
  });

  // Cenário 4: Verificar se múltiplos usuários são exibidos corretamente
  it('deve exibir múltiplos usuários corretamente', () => {
    cy.visit('/dashboard');
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');
    
    // Verificar que há múltiplos cards
    cy.get('app-card', { timeout: 20000 }).should('have.length.at.least', 2);
    
    // Verificar que cada card tem as informações básicas
    cy.get('app-card').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('span.text-sm').should('be.visible');
        cy.get('span.text-xs').first().should('be.visible');
        cy.get('app-button').should('be.visible');
      });
    });
  });

  // Cenário 7: Verificar se o empty state é exibido quando não há usuários
  it('deve exibir empty state quando não houver usuários', () => {
    // Interceptar a API para retornar array vazio
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: []
    }).as('getEmptyUsers');

    cy.visit('/dashboard');
    cy.wait('@getEmptyUsers', { timeout: 10000 });
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');

    // Verificar se o empty state é exibido
    cy.get('app-empty-state').should('be.visible');
    cy.contains('Nenhum registro encontrado!').should('be.visible');

    // Verificar se não há cards
    cy.get('app-card').should('not.exist');
  });

  // Cenário 8: Verificar se o toast de erro aparece quando a API falha
  it('deve exibir toast de erro quando a API falhar', () => {
    // Interceptar a API para retornar erro
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getUsersError');

    cy.visit('/dashboard');
    cy.wait('@getUsersError', { timeout: 10000 });
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');

    // Verificar se o toast de erro é exibido
    cy.get('app-toast', { timeout: 10000 }).should('be.visible');
    cy.contains('Não foi possível trazer a lista de Usuários!').should('be.visible');
  });

  // Cenário 11: Verificar se ao clicar em "Ver detalhe" navega para a página de detalhes
  it('deve navegar para a página de detalhes ao clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');
    cy.get('app-card', { timeout: 20000 }).should('have.length.at.least', 1);

    // Clicar no primeiro botão "Ver detalhe"
    cy.get('app-card').first().within(() => {
      cy.contains('Ver detalhe').click();
    });

    // Verificar se navegou para a página de usuário
    cy.url().should('include', '/user');
  });

  // Cenário 12: Verificar se o usuário selecionado é salvo no localStorage
  it('deve salvar o usuário selecionado no localStorage ao clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');
    cy.get('app-card', { timeout: 20000 }).should('have.length.at.least', 1);

    // Capturar o nome do primeiro usuário antes de clicar
    let userName = '';
    cy.get('app-card').first().within(() => {
      cy.get('span.text-sm').invoke('text').then((text) => {
        userName = text.trim();
      });
    });

    // Clicar no botão "Ver detalhe"
    cy.get('app-card').first().within(() => {
      cy.contains('Ver detalhe').click();
    });

    // Verificar se o usuário foi salvo no localStorage
    cy.window().then((win) => {
      const user = JSON.parse(win.localStorage.getItem('user') || '{}');
      expect(user).to.have.property('name');
      expect(user.name).to.equal(userName);
    });
  });

  // Cenário 13: Verificar se a URL muda para /user após clicar em "Ver detalhe"
  it('deve mudar a URL para /user após clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');
    cy.get('app-card', { timeout: 20000 }).should('have.length.at.least', 1);

    // Verificar que está na página do dashboard
    cy.url().should('include', '/dashboard');

    // Clicar no botão "Ver detalhe"
    cy.get('app-card').first().within(() => {
      cy.contains('Ver detalhe').click();
    });

    // Verificar que a URL mudou para /user
    cy.url().should('include', '/user');
    cy.url().should('not.include', '/dashboard');
  });

  // Cenário 14: Verificar se o localStorage é limpo ao carregar o dashboard
  it('deve limpar o localStorage ao carregar o dashboard', () => {
    // Simular dados no localStorage antes de visitar
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
      win.localStorage.setItem('otherData', 'test-value');
    });

    // Verificar que os dados existem antes
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.not.be.null;
      expect(win.localStorage.getItem('otherData')).to.not.be.null;
    });

    // Visitar o dashboard
    cy.visit('/dashboard');
    cy.get('app-loading', { timeout: 15000 }).should('not.exist');

    // Verificar se o localStorage foi limpo
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
      expect(win.localStorage.getItem('otherData')).to.be.null;
      expect(win.localStorage.length).to.equal(0);
    });
  });
});
