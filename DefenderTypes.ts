export type RoleName =
  | 'securityAdmin'
  | 'serviceUser'
  | 'sre'
  | 'admin'
  | 'backupOperator'
  | 'dataProtection'
  | 'dataSecurity'
  | 'highClassified'
  | 'operator'
  | 'quorumSupport'
  | 'replication'
  | 'security'
  | 'supportAdmin'
  | 'superAdmin'
  | 'viewer';

export interface Role {
  id: string;
  name: RoleName;
}

export interface Tenant {
  services?: Service[];
  users?: User[];
  tenantName: string;
  tenantId: string;
}

export interface Service {
  id: string;
  name: ServiceName;
  redirectUrl?: string;
  roles?: Role[];
  currentRole?: RoleName;
}

export type ServiceName = 'helios' | 'defender';
export const HELIOS_SERVICE_NAME = 'helios';
export const DEFENDER_SERVICE_NAME = 'defender';

export type UserStatus = 'active' | 'pending';

export interface User {
  addedOn: string;
  displayName: string;
  status: UserStatus;
  email: string;
  enabledFeatures?: string[];
  id: string;
  preferredUserName: string;
  tenants: Tenant[];
  industry?: string;
}
export type GetUserInfoType = User;

export type GetRolesType = Role[];

export type GetServices = Service[];

export type Values<T> = T[keyof T];

//Property values must be consistent with toggle.json toggle property names
export const ToggleName = {
  Connection_Agents: 'Connection_Agents'
} as const;

export type ToggleNameValues = Values<typeof ToggleName>;

/** Application development toggles */
export type DevelopmentToggles = Partial<Record<ToggleNameValues, boolean>>;
