import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Domain from './domain';
import DomainProperty from './domain-property';
import UserProperty from './user-property';
import AppUser from './app-user';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="domain/*" element={<Domain />} />
        <Route path="domain-property/*" element={<DomainProperty />} />
        <Route path="user-property/*" element={<UserProperty />} />
        <Route path="app-user/*" element={<AppUser />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
