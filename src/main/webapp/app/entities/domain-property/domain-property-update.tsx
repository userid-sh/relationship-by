import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getDomains } from 'app/entities/domain/domain.reducer';
import { createEntity, getEntity, reset, updateEntity } from './domain-property.reducer';

export const DomainPropertyUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const domains = useAppSelector(state => state.domain.entities);
  const domainPropertyEntity = useAppSelector(state => state.domainProperty.entity);
  const loading = useAppSelector(state => state.domainProperty.loading);
  const updating = useAppSelector(state => state.domainProperty.updating);
  const updateSuccess = useAppSelector(state => state.domainProperty.updateSuccess);

  const handleClose = () => {
    navigate('/domain-property');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDomains({}));
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
      ...domainPropertyEntity,
      ...values,
      domain: domains.find(it => it.id.toString() === values.domain?.toString()),
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
          ...domainPropertyEntity,
          domain: domainPropertyEntity?.domain?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterApp.domainProperty.home.createOrEditLabel" data-cy="DomainPropertyCreateUpdateHeading">
            <Translate contentKey="jhipsterApp.domainProperty.home.createOrEditLabel">Create or edit a DomainProperty</Translate>
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
                  id="domain-property-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterApp.domainProperty.name')}
                id="domain-property-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhipsterApp.domainProperty.mandatory')}
                id="domain-property-mandatory"
                name="mandatory"
                data-cy="mandatory"
                check
                type="checkbox"
              />
              <ValidatedField
                id="domain-property-domain"
                name="domain"
                data-cy="domain"
                label={translate('jhipsterApp.domainProperty.domain')}
                type="select"
              >
                <option value="" key="0" />
                {domains
                  ? domains.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/domain-property" replace color="info">
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

export default DomainPropertyUpdate;
