import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/domain">
        <Translate contentKey="global.menu.entities.domain" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/domain-property">
        <Translate contentKey="global.menu.entities.domainProperty" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/user-property">
        <Translate contentKey="global.menu.entities.userProperty" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/app-user">
        <Translate contentKey="global.menu.entities.appUser" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
