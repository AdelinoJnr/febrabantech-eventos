import { IGetPageIngressos } from '@/@types/getPageIngressos';
import { api } from './api';

import type { IAppConfig } from '@/@types/appConfig';
import { IGetPagePalestrantes } from '@/@types/getPagePalestrantes';
import { IGetPagePatrocinadores } from '@/@types/getPagePatrocinadores';
import type { IGetPageSobre } from '@/@types/getPageSobre';
import { IGetPageTrilhas } from '@/@types/getPageTrilhas';
import { IGetPageDicas } from '@/@types/getPageDicas';
import { IGetPageNoticias } from '@/@types/getPageNoticias';
import { IGetPageVideos } from '@/@types/getPageVideos';

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

export const getPagePalestrantes = async (event_id: string, limit: number = 20): Promise<IGetPagePalestrantes[]> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPagePalestrantes[]>(
    `/pages-events/pc/getPagePalestrantes?event_id=${event_id}&limit=${limit}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPagePatrocinadores = async (event_id: string): Promise<IGetPagePatrocinadores> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPagePatrocinadores>(
    `/pages-events/pc/getPagePatrocinadores?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPageIngressos = async (event_id: string): Promise<IGetPageIngressos> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPageIngressos>(
    `/pages-events/pc/getPageIngressos?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPageDicas = async (event_id: string): Promise<IGetPageDicas> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPageDicas>(
    `/pages-events/pc/getPageDicas?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPageNoticias = async (event_id: string): Promise<IGetPageNoticias[]> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPageNoticias[]>(
    `/pages-events/pc/getPageNoticias?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}

export const getPageVideos = async (event_id: string): Promise<IGetPageVideos[]> => {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetPageVideos[]>(
    `/pages-events/pc/getPageVideos?event_id=${event_id}`,
    { headers: token ? { Authorization: token } : {}, }
  );

  return response.data;
}