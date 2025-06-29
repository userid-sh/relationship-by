import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-property.reducer';

export const UserPropertyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userPropertyEntity = useAppSelector(state => state.userProperty.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userPropertyDetailsHeading">
          <Translate contentKey="jhipsterApp.userProperty.detail.title">UserProperty</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userPropertyEntity.id}</dd>
          <dt>
            <span id="strValue">
              <Translate contentKey="jhipsterApp.userProperty.strValue">Str Value</Translate>
            </span>
          </dt>
          <dd>{userPropertyEntity.strValue}</dd>
          <dt>
            <Translate contentKey="jhipsterApp.userProperty.user">User</Translate>
          </dt>
          <dd>{userPropertyEntity.user ? userPropertyEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterApp.userProperty.domainProperty">Domain Property</Translate>
          </dt>
          <dd>{userPropertyEntity.domainProperty ? userPropertyEntity.domainProperty.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-property" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-property/${userPropertyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserPropertyDetail;
