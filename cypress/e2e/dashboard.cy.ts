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
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    // Verificar o primeiro card
    cy.get('[data-cy="user-card"]').first().within(() => {
      // Verificar se o nome está presente (primeiro span com data-cy="user-card-name")
      cy.get('[data-cy="user-card-name"]').first().should('be.visible').and('not.be.empty');
      // Verificar se o email está presente (segundo span com data-cy="user-card-name")
      cy.get('[data-cy="user-card-name"]').eq(1).should('be.visible').and('contain', '@');
    });

    // Verificar se a empresa está presente (pode não existir para todos)
    cy.get('[data-cy="user-card"]').first().then(($card) => {
      const nameElements = $card.find('[data-cy="user-card-name"]');
      // Se houver 3 elementos, o terceiro é a empresa
      if (nameElements.length >= 3) {
        cy.get('[data-cy="user-card"]').first().find('[data-cy="user-card-name"]').eq(2).should('be.visible');
      }
    });
  });

  // Cenário 4: Verificar se múltiplos usuários são exibidos corretamente
  it('deve exibir múltiplos usuários corretamente', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    
    // Verificar que há múltiplos cards
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 2);
    
    // Verificar que cada card tem as informações básicas
    cy.get('[data-cy="user-card"]').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('[data-cy="user-card-name"]').should('have.length.at.least', 2);
        cy.get('[data-cy="user-button-detail"]').should('be.visible');
      });
    });
  });

  // Cenário 7: Verificar se o empty state é exibido quando a pesquisa não encontra resultados
  it('deve exibir empty state quando a pesquisa não encontrar resultados', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    // Limpar o campo de pesquisa primeiro
    cy.get('[data-cy="user-search-by-name"]').find('input');
    cy.wait(500);

    // Digitar um termo de pesquisa que não existe
    cy.get('[data-cy="user-search-by-name"]').find('input').type('XYZ123NaoExiste', { force: true });

    // Aguardar o debounce (400ms) + tempo para o Angular processar a mudança
    cy.wait(1500);

    // Verificar se não há cards (a filtragem removeu todos)
    cy.get('[data-cy="user-card"]', { timeout: 3000 }).should('not.exist');

    // Verificar se o empty state é exibido
    cy.get('[data-cy="user-empty-state"]', { timeout: 5000 }).should('be.visible');
    cy.contains('Nenhum registro encontrado!', { timeout: 5000 }).should('be.visible');
  });

  // Cenário 11: Verificar se ao clicar em "Ver detalhe" navega para a página de detalhes
  it('deve navegar para a página de detalhes ao clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    // Clicar no primeiro botão "Ver detalhe"
    cy.get('[data-cy="user-button-detail"]').first().click();

    // Verificar se navegou para a página de usuário
    cy.url().should('include', '/user');
  });

  // Cenário 12: Verificar se o usuário selecionado é salvo no localStorage
  it('deve salvar o usuário selecionado no localStorage ao clicar em "Ver detalhe"', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    // Capturar o nome do primeiro usuário antes de clicar
    let userName = '';
    cy.get('[data-cy="user-card"]').first().within(() => {
      cy.get('[data-cy="user-card-name"]').first().invoke('text').then((text) => {
        userName = text.trim();
      });
    });

    // Clicar no botão "Ver detalhe"
    cy.get('[data-cy="user-button-detail"]').first().click();

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
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    // Verificar que está na página do dashboard
    cy.url().should('include', '/dashboard');

    // Clicar no botão "Ver detalhe"
    cy.get('[data-cy="user-button-detail"]').first().click();

    // Verificar que a URL mudou para /user
    cy.url().should('include', '/user');
    cy.url().should('not.include', '/dashboard');
  });

  // Teste adicional: Verificar se a pesquisa funciona corretamente
  it('deve filtrar usuários corretamente quando pesquisar por nome', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    cy.get('[data-cy="user-card"]', { timeout: 20000 }).should('have.length.at.least', 1);

    // Capturar o nome do primeiro usuário
    let firstName = '';
    cy.get('[data-cy="user-card"]').first().within(() => {
      cy.get('[data-cy="user-card-name"]').first().invoke('text').then((text) => {
        firstName = text.trim();
      });
    });

    // Pegar as primeiras 3 letras do nome para fazer a pesquisa
    cy.then(() => {
      const searchTerm = firstName.substring(0, 3);
      
      // Limpar o campo de pesquisa primeiro
      cy.get('[data-cy="user-search-by-name"]').find('input');
      cy.wait(500);
      
      // Digitar o termo de pesquisa
      cy.get('[data-cy="user-search-by-name"]').find('input').type(searchTerm, { force: true });

      // Aguardar o debounce (400ms) + tempo para o Angular processar a mudança
      cy.wait(1500);

      // Verificar que ainda há cards (pelo menos o usuário pesquisado)
      cy.get('[data-cy="user-card"]', { timeout: 5000 }).should('have.length.at.least', 1);

      // Verificar que o primeiro card contém o nome pesquisado
      cy.get('[data-cy="user-card"]').first().within(() => {
        cy.get('[data-cy="user-card-name"]').first().should('contain', searchTerm);
      });

      // Limpar a pesquisa para voltar à lista completa
      cy.get('[data-cy="user-search-by-name"]').find('input').clear();
      cy.wait(1500);

      // Verificar que todos os cards voltaram
      cy.get('[data-cy="user-card"]', { timeout: 5000 }).should('have.length.at.least', 1);
    });
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
    
    // Aguardar o loading desaparecer e o ngOnInit executar completamente
    cy.get('[data-cy="dashboard-loading"]', { timeout: 15000 }).should('not.exist');
    
    // Aguardar um pouco mais para garantir que o cleanSession foi executado
    cy.wait(1000);

    // Verificar se o localStorage foi limpo
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
      expect(win.localStorage.getItem('otherData')).to.be.null;
      expect(win.localStorage.length).to.equal(0);
    });
  });
});
