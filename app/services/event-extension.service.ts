import { api } from './api';

import type { IAppConfig } from '@/@types/appConfig';
import type { IGetPageSobre } from '@/@types/getPageSobre';
import { IGetPageTrilhas } from '@/@types/getPageTrilhas';

export const appConfig = async (id: string): Promise<IAppConfig> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IAppConfig>(
    `/event-extension/pc/appConfig?friendly_url=${id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPageSobre = async (event_id: string): Promise<IGetPageSobre> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPageSobre>(
    `/pages-events/pc/getPageSobre?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPageTrilhas = async (event_id: string): Promise<IGetPageTrilhas> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPageTrilhas>(
    `/pages-events/pc/getPageTrilhas?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}