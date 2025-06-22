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

describe('UserProperty e2e test', () => {
  const userPropertyPageUrl = '/user-property';
  const userPropertyPageUrlPattern = new RegExp('/user-property(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const userPropertySample = {};

  let userProperty;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/user-properties+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/user-properties').as('postEntityRequest');
    cy.intercept('DELETE', '/api/user-properties/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (userProperty) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/user-properties/${userProperty.id}`,
      }).then(() => {
        userProperty = undefined;
      });
    }
  });

  it('UserProperties menu should load UserProperties page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('user-property');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('UserProperty').should('exist');
    cy.url().should('match', userPropertyPageUrlPattern);
  });

  describe('UserProperty page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(userPropertyPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create UserProperty page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/user-property/new$'));
        cy.getEntityCreateUpdateHeading('UserProperty');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userPropertyPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/user-properties',
          body: userPropertySample,
        }).then(({ body }) => {
          userProperty = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/user-properties+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [userProperty],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(userPropertyPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details UserProperty page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('userProperty');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userPropertyPageUrlPattern);
      });

      it('edit button click should load edit UserProperty page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UserProperty');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userPropertyPageUrlPattern);
      });

      it('edit button click should load edit UserProperty page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UserProperty');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userPropertyPageUrlPattern);
      });

      it('last delete button click should delete instance of UserProperty', () => {
        cy.intercept('GET', '/api/user-properties/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('userProperty').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userPropertyPageUrlPattern);

        userProperty = undefined;
      });
    });
  });

  describe('new UserProperty page', () => {
    beforeEach(() => {
      cy.visit(`${userPropertyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('UserProperty');
    });

    it('should create an instance of UserProperty', () => {
      cy.get(`[data-cy="strValue"]`).type('provided but till');
      cy.get(`[data-cy="strValue"]`).should('have.value', 'provided but till');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        userProperty = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', userPropertyPageUrlPattern);
    });
  });
});
