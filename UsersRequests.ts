import { AxiosRequestConfig } from 'axios';

import { GetUsersResponse, InviteUsersResponse, InviteUsersType } from './UsersTypes';
import axiosInstance from '../../utils/request';
import { User } from '../DefenderInfo/DefenderTypes';

export async function getUsersList(config?: AxiosRequestConfig) {
  return await axiosInstance.get<GetUsersResponse>('/users', config);
}

export async function inviteUsers(data: InviteUsersType, config?: AxiosRequestConfig) {
  const res = await axiosInstance.post<InviteUsersResponse>('/user', data, config);
  return res;
}

export async function updateUser(data: User, config?: AxiosRequestConfig) {
  return await axiosInstance.put<User>('/user', data, config);
}
