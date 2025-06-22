import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DomainProperty from './domain-property';
import DomainPropertyDetail from './domain-property-detail';
import DomainPropertyUpdate from './domain-property-update';
import DomainPropertyDeleteDialog from './domain-property-delete-dialog';

const DomainPropertyRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DomainProperty />} />
    <Route path="new" element={<DomainPropertyUpdate />} />
    <Route path=":id">
      <Route index element={<DomainPropertyDetail />} />
      <Route path="edit" element={<DomainPropertyUpdate />} />
      <Route path="delete" element={<DomainPropertyDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DomainPropertyRoutes;
