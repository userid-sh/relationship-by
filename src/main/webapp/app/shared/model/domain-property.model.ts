import { IDomain } from 'app/shared/model/domain.model';

export interface IDomainProperty {
  id?: number;
  name?: string;
  mandatory?: boolean;
  domain?: IDomain | null;
}

export const defaultValue: Readonly<IDomainProperty> = {
  mandatory: false,
};
