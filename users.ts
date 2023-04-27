import { GetRolesType, Role, RoleName, Service, ServiceName, User } from './../api/DefenderInfo/DefenderTypes';
import { GetUsersResponse } from './../api/Users/UsersTypes';

export const getUsersGroupByStatus = (users: GetUsersResponse | undefined, activeGroup: string, pendingGroup: string) => {
  const userStatusGroupsData = [
    {
      group: activeGroup,
      value: 0
    },
    {
      group: pendingGroup,
      value: 0
    }
  ];
  if (users) {
    for (const key in users) {
      if (users[key].status === 'active') {
        userStatusGroupsData[0].value = userStatusGroupsData[0].value + 1;
      } else {
        userStatusGroupsData[1].value = userStatusGroupsData[1].value + 1;
      }
    }
  }
  return userStatusGroupsData;
};

export const getRoleObject = (roles: GetRolesType | undefined, selectedRoles: string[]) => {
  const rolesArr: Role[] = [];
  roles?.forEach(e => {
    if (selectedRoles && selectedRoles.includes(e.name)) {
      rolesArr.push(e);
    }
  });
  return rolesArr;
};

export const getInvitedUsersEmailsArr = (email1: string, email2: string, email3: string, email4: string, email5: string) => {
  const emailsArr = [email1];
  if (email2) {
    emailsArr.push(email2);
  }
  if (email3) {
    emailsArr.push(email3);
  }
  if (email4) {
    emailsArr.push(email4);
  }
  if (email5) {
    emailsArr.push(email5);
  }
  return emailsArr;
};

export const getInvitedUsersCount = (email1: string, email2: string, email3: string, email4: string, email5: string) => {
  let emailCount = 1;
  if (email2) {
    emailCount = emailCount + 1;
  }
  if (email3) {
    emailCount = emailCount + 1;
  }
  if (email4) {
    emailCount = emailCount + 1;
  }
  if (email5) {
    emailCount = emailCount + 1;
  }
  return emailCount;
};

export const getServices = (user: User | undefined) => {
  let services: Service[] = [];
  if (user) {
    services = user.tenants[0].services || [];
  }

  return services;
};

export const getService = (user: User | undefined, serviceName: ServiceName) => {
  let service: Service | undefined;
  if (user) {
    service = getServices(user).find(svc => svc.name === serviceName);
  }

  return service;
};

export const getRolesByService = (user: User | undefined, serviceName: ServiceName) => {
  let roles: Role[] = [];
  if (user) {
    roles = getService(user, serviceName)?.roles || [];
  }

  return roles;
};

export const getRoleNamesByService = (user: User | undefined, serviceName: ServiceName) => {
  let roles: RoleName[] = [];
  if (user) {
    roles = getRolesByService(user, serviceName)?.map(role => role.name) || [];
  }

  return roles;
};

export const getRedirectUrl = (user: User | undefined, serviceName: ServiceName) => {
  let redirectUrl = '';
  if (user) {
    redirectUrl = getService(user, serviceName)?.redirectUrl ?? '';
  }

  return redirectUrl;
};

export const getRoleByName = (user: User | undefined, serviceName: ServiceName, roleName: RoleName | undefined) => {
  let role: Role | undefined;
  if (user) {
    role = getRolesByService(user, serviceName).find(r => r.name === roleName);
  }

  return role;
};

export const getCurrentRole = (user: User | undefined, serviceName: ServiceName) => {
  let role: Role | undefined;
  if (user) {
    const roleName = getService(user, serviceName)?.currentRole;
    role = getRoleByName(user, serviceName, roleName);
  }

  return role;
};

export const updateRolesByService = (user: User, serviceName: ServiceName, newRoles: Role[], newCurrentRole?: string) => {
  if (user) {
    const service = getService(user, serviceName);
    if (service) {
      service.roles = newRoles;
      if (newCurrentRole) {
        service.currentRole = newCurrentRole as RoleName;
      }
    }
  }
  return user;
};

export const getNewUserServiceObject = (serviceName: ServiceName, newRoles: Role[]) => {
  return {
    id: '0',
    name: serviceName,
    redirectUrl: '',
    roles: newRoles
  };
};
