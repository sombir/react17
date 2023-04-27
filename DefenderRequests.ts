import axios, { AxiosRequestConfig } from 'axios';

import { DevelopmentToggles, GetRolesType, GetServices, User } from './DefenderTypes';
import axiosInstance from '../../utils/request';

export async function getUser(config?: AxiosRequestConfig) {
  return await axiosInstance.get<User>('/user', config);
}

export async function getUserById(id: string, config?: AxiosRequestConfig) {
  return await axiosInstance.get<User>(`/user/${id}`, config);
}

export async function getUserRoles(config?: AxiosRequestConfig) {
  return await axiosInstance.get<GetRolesType>('/roles', config);
}

export async function getServices(config?: AxiosRequestConfig) {
  return await axiosInstance.get<GetServices>('/services', config);
}

export async function deleteUserById(id: string, config?: AxiosRequestConfig) {
  return await axiosInstance.delete<User>(`/user/${id}`, config);
}

export async function getToggles() {
  return await axios.get<DevelopmentToggles>('/static/json/toggles.json');
}
