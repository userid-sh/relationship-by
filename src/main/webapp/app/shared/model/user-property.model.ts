import { IAppUser } from 'app/shared/model/app-user.model';
import { IDomainProperty } from 'app/shared/model/domain-property.model';

export interface IUserProperty {
  id?: number;
  strValue?: string | null;
  user?: IAppUser | null;
  domainProperty?: IDomainProperty | null;
}

export const defaultValue: Readonly<IUserProperty> = {};
