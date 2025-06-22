import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './domain-property.reducer';

export const DomainPropertyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const domainPropertyEntity = useAppSelector(state => state.domainProperty.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="domainPropertyDetailsHeading">
          <Translate contentKey="jhipsterApp.domainProperty.detail.title">DomainProperty</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{domainPropertyEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhipsterApp.domainProperty.name">Name</Translate>
            </span>
          </dt>
          <dd>{domainPropertyEntity.name}</dd>
          <dt>
            <span id="mandatory">
              <Translate contentKey="jhipsterApp.domainProperty.mandatory">Mandatory</Translate>
            </span>
          </dt>
          <dd>{domainPropertyEntity.mandatory ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="jhipsterApp.domainProperty.domain">Domain</Translate>
          </dt>
          <dd>{domainPropertyEntity.domain ? domainPropertyEntity.domain.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/domain-property" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/domain-property/${domainPropertyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DomainPropertyDetail;
