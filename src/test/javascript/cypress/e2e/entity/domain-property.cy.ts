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

describe('DomainProperty e2e test', () => {
  const domainPropertyPageUrl = '/domain-property';
  const domainPropertyPageUrlPattern = new RegExp('/domain-property(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const domainPropertySample = { name: 'er', mandatory: false };

  let domainProperty;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/domain-properties+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/domain-properties').as('postEntityRequest');
    cy.intercept('DELETE', '/api/domain-properties/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (domainProperty) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/domain-properties/${domainProperty.id}`,
      }).then(() => {
        domainProperty = undefined;
      });
    }
  });

  it('DomainProperties menu should load DomainProperties page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('domain-property');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DomainProperty').should('exist');
    cy.url().should('match', domainPropertyPageUrlPattern);
  });

  describe('DomainProperty page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(domainPropertyPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DomainProperty page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/domain-property/new$'));
        cy.getEntityCreateUpdateHeading('DomainProperty');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPropertyPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/domain-properties',
          body: domainPropertySample,
        }).then(({ body }) => {
          domainProperty = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/domain-properties+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [domainProperty],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(domainPropertyPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DomainProperty page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('domainProperty');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPropertyPageUrlPattern);
      });

      it('edit button click should load edit DomainProperty page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DomainProperty');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPropertyPageUrlPattern);
      });

      it('edit button click should load edit DomainProperty page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DomainProperty');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPropertyPageUrlPattern);
      });

      it('last delete button click should delete instance of DomainProperty', () => {
        cy.intercept('GET', '/api/domain-properties/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('domainProperty').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', domainPropertyPageUrlPattern);

        domainProperty = undefined;
      });
    });
  });

  describe('new DomainProperty page', () => {
    beforeEach(() => {
      cy.visit(`${domainPropertyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('DomainProperty');
    });

    it('should create an instance of DomainProperty', () => {
      cy.get(`[data-cy="name"]`).type('joyously');
      cy.get(`[data-cy="name"]`).should('have.value', 'joyously');

      cy.get(`[data-cy="mandatory"]`).should('not.be.checked');
      cy.get(`[data-cy="mandatory"]`).click();
      cy.get(`[data-cy="mandatory"]`).should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        domainProperty = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', domainPropertyPageUrlPattern);
    });
  });
});
