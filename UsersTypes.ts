import { Service, User } from '../DefenderInfo/DefenderTypes';

export type GetUsersResponse = User[];

export interface GetUsersStatusGroup {
  group: string;
  value: number;
}

export type GetUsersStatusGroupType = GetUsersStatusGroup[];

export interface InviteUsersFormType {
  email1: string;
  email2: string;
  email3: string;
  email4: string;
  email5: string;
  roles: string[];
  tenantId: string;
  tenantName: string;
}

export interface InviteUsersType {
  emails: string[];
  services: Service[];
  tenantId: string;
  tenantName: string;
}

export interface InviteUsersResponse {
  successful: string[];
  failed: string[];
}
