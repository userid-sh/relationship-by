import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getDomainProperties } from 'app/entities/domain-property/domain-property.reducer';
import { createEntity, getEntity, reset, updateEntity } from './user-property.reducer';

export const UserPropertyUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const domainProperties = useAppSelector(state => state.domainProperty.entities);
  const userPropertyEntity = useAppSelector(state => state.userProperty.entity);
  const loading = useAppSelector(state => state.userProperty.loading);
  const updating = useAppSelector(state => state.userProperty.updating);
  const updateSuccess = useAppSelector(state => state.userProperty.updateSuccess);

  const handleClose = () => {
    navigate('/user-property');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getDomainProperties({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...userPropertyEntity,
      ...values,
      user: appUsers.find(it => it.id.toString() === values.user?.toString()),
      domainProperty: domainProperties.find(it => it.id.toString() === values.domainProperty?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...userPropertyEntity,
          user: userPropertyEntity?.user?.id,
          domainProperty: userPropertyEntity?.domainProperty?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterApp.userProperty.home.createOrEditLabel" data-cy="UserPropertyCreateUpdateHeading">
            <Translate contentKey="jhipsterApp.userProperty.home.createOrEditLabel">Create or edit a UserProperty</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-property-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterApp.userProperty.strValue')}
                id="user-property-strValue"
                name="strValue"
                data-cy="strValue"
                type="text"
              />
              <ValidatedField
                id="user-property-user"
                name="user"
                data-cy="user"
                label={translate('jhipsterApp.userProperty.user')}
                type="select"
              >
                <option value="" key="0" />
                {appUsers
                  ? appUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="user-property-domainProperty"
                name="domainProperty"
                data-cy="domainProperty"
                label={translate('jhipsterApp.userProperty.domainProperty')}
                type="select"
              >
                <option value="" key="0" />
                {domainProperties
                  ? domainProperties.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-property" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserPropertyUpdate;
