import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserProperty from './user-property';
import UserPropertyDetail from './user-property-detail';
import UserPropertyUpdate from './user-property-update';
import UserPropertyDeleteDialog from './user-property-delete-dialog';

const UserPropertyRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserProperty />} />
    <Route path="new" element={<UserPropertyUpdate />} />
    <Route path=":id">
      <Route index element={<UserPropertyDetail />} />
      <Route path="edit" element={<UserPropertyUpdate />} />
      <Route path="delete" element={<UserPropertyDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserPropertyRoutes;
