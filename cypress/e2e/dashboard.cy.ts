describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('deve exibir nome, email e empresa em cada card', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    cy.get('[data-cy="user-card"]').first().within(() => {
      cy.get('[data-cy="user-card-name"]').first().should('be.visible').and('not.be.empty');
      cy.get('[data-cy="user-card-name"]').eq(1).should('be.visible').and('contain', '@');
    });

    cy.get('[data-cy="user-card"]').first().then(($card) => {
      const nameElements = $card.find('[data-cy="user-card-name"]');
      if (nameElements.length >= 3) {
        cy.get('[data-cy="user-card"]').first().find('[data-cy="user-card-name"]').eq(2).should('be.visible');
      }
    });
  });

  it('deve exibir múltiplos usuários corretamente', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 2);
    
    cy.get('[data-cy="user-card"]').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('[data-cy="user-card-name"]').should('have.length.at.least', 2);
        cy.get('[data-cy="user-button-detail"]').should('be.visible');
      });
    });
  });

  it('deve exibir empty state quando a pesquisa não encontrar resultados', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    cy.get('[data-cy="user-search-by-name"]').find('input');
    cy.wait(500);

    cy.get('[data-cy="user-search-by-name"]').find('input').type('XYZ123NaoExiste', { force: true });

    cy.wait(1500);

    cy.get('[data-cy="user-card"]', { timeout: 3000 }).should('not.exist');

    cy.get('[data-cy="user-empty-state"]', { timeout: 5000 }).should('be.visible');
    cy.contains('Nenhum registro encontrado!', { timeout: 5000 }).should('be.visible');
  });

  it('deve navegar para a página de detalhes ao clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    cy.get('[data-cy="user-button-detail"]').first().click();

    cy.url().should('include', '/user');
  });

  it('deve salvar o usuário selecionado no localStorage ao clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    let userName = '';
    cy.get('[data-cy="user-card"]').first().within(() => {
      cy.get('[data-cy="user-card-name"]').first().invoke('text').then((text) => {
        userName = text.trim();
      });
    });

    cy.get('[data-cy="user-button-detail"]').first().click();

    cy.window().then((win) => {
      const user = JSON.parse(win.localStorage.getItem('user') || '{}');
      expect(user).to.have.property('name');
      expect(user.name).to.equal(userName);
    });
  });

  it('deve mudar a URL para /user após clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    cy.url().should('include', '/dashboard');

    cy.get('[data-cy="user-button-detail"]').first().click();

    cy.url().should('include', '/user');
    cy.url().should('not.include', '/dashboard');
  });

  it('deve filtrar usuários corretamente quando pesquisar por nome', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    let firstName = '';
    cy.get('[data-cy="user-card"]').first().within(() => {
      cy.get('[data-cy="user-card-name"]').first().invoke('text').then((text) => {
        firstName = text.trim();
      });
    });

    cy.then(() => {
      const searchTerm = firstName.substring(0, 3);
      
      cy.get('[data-cy="user-search-by-name"]').find('input');
      cy.wait(500);
      
      cy.get('[data-cy="user-search-by-name"]').find('input').type(searchTerm, { force: true });

      cy.wait(1500);

      cy.get('[data-cy="user-card"]', { timeout: 5000 }).should('have.length.at.least', 1);

      cy.get('[data-cy="user-card"]').first().within(() => {
        cy.get('[data-cy="user-card-name"]').first().should('contain', searchTerm);
      });

      cy.get('[data-cy="user-search-by-name"]').find('input').clear();
      cy.wait(1500);

      cy.get('[data-cy="user-card"]', { timeout: 5000 }).should('have.length.at.least', 1);
    });
  });

  it('deve limpar o localStorage ao carregar o dashboard', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
      win.localStorage.setItem('otherData', 'test-value');
    });

    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.not.be.null;
      expect(win.localStorage.getItem('otherData')).to.not.be.null;
    });

    cy.visit('/dashboard');
    
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    
    cy.wait(1000);

    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
      expect(win.localStorage.getItem('otherData')).to.be.null;
      expect(win.localStorage.length).to.equal(0);
    });
  });
});
