import domain from 'app/entities/domain/domain.reducer';
import domainProperty from 'app/entities/domain-property/domain-property.reducer';
import userProperty from 'app/entities/user-property/user-property.reducer';
import appUser from 'app/entities/app-user/app-user.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  domain,
  domainProperty,
  userProperty,
  appUser,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
