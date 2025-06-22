import { IDomain } from 'app/shared/model/domain.model';

export interface IAppUser {
  id?: number;
  name?: string;
  domain?: IDomain | null;
}

export const defaultValue: Readonly<IAppUser> = {};
