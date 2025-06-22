import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Domain e2e test', () => {
  const domainPageUrl = '/domain';
  const domainPageUrlPattern = new RegExp('/domain(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const domainSample = { name: 'anenst please' };

  let domain;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/domains+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/domains').as('postEntityRequest');
    cy.intercept('DELETE', '/api/domains/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (domain) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/domains/${domain.id}`,
      }).then(() => {
        domain = undefined;
      });
    }
  });

  it('Domains menu should load Domains page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('domain');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Domain').should('exist');
    cy.url().should('match', domainPageUrlPattern);
  });

  describe('Domain page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(domainPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Domain page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/domain/new$'));
        cy.getEntityCreateUpdateHeading('Domain');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/domains',
          body: domainSample,
        }).then(({ body }) => {
          domain = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/domains+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/domains?page=0&size=20>; rel="last",<http://localhost/api/domains?page=0&size=20>; rel="first"',
              },
              body: [domain],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(domainPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Domain page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('domain');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPageUrlPattern);
      });

      it('edit button click should load edit Domain page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Domain');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPageUrlPattern);
      });

      it('edit button click should load edit Domain page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Domain');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPageUrlPattern);
      });

      it('last delete button click should delete instance of Domain', () => {
        cy.intercept('GET', '/api/domains/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('domain').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPageUrlPattern);

        domain = undefined;
      });
    });
  });

  describe('new Domain page', () => {
    beforeEach(() => {
      cy.visit(`${domainPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Domain');
    });

    it('should create an instance of Domain', () => {
      cy.get(`[data-cy="name"]`).type('circa er yippee');
      cy.get(`[data-cy="name"]`).should('have.value', 'circa er yippee');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        domain = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', domainPageUrlPattern);
    });
  });
});
