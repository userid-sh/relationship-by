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

describe('AppUser e2e test', () => {
  const appUserPageUrl = '/app-user';
  const appUserPageUrlPattern = new RegExp('/app-user(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const appUserSample = { name: 'gadzooks properly hunt' };

  let appUser;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/app-users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/app-users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/app-users/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (appUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/app-users/${appUser.id}`,
      }).then(() => {
        appUser = undefined;
      });
    }
  });

  it('AppUsers menu should load AppUsers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('app-user');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AppUser').should('exist');
    cy.url().should('match', appUserPageUrlPattern);
  });

  describe('AppUser page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(appUserPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AppUser page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/app-user/new$'));
        cy.getEntityCreateUpdateHeading('AppUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', appUserPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/app-users',
          body: appUserSample,
        }).then(({ body }) => {
          appUser = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/app-users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/app-users?page=0&size=20>; rel="last",<http://localhost/api/app-users?page=0&size=20>; rel="first"',
              },
              body: [appUser],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(appUserPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AppUser page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('appUser');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', appUserPageUrlPattern);
      });

      it('edit button click should load edit AppUser page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AppUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', appUserPageUrlPattern);
      });

      it('edit button click should load edit AppUser page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AppUser');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', appUserPageUrlPattern);
      });

      it('last delete button click should delete instance of AppUser', () => {
        cy.intercept('GET', '/api/app-users/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('appUser').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', appUserPageUrlPattern);

        appUser = undefined;
      });
    });
  });

  describe('new AppUser page', () => {
    beforeEach(() => {
      cy.visit(`${appUserPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AppUser');
    });

    it('should create an instance of AppUser', () => {
      cy.get(`[data-cy="name"]`).type('firsthand queasily');
      cy.get(`[data-cy="name"]`).should('have.value', 'firsthand queasily');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        appUser = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', appUserPageUrlPattern);
    });
  });
});
