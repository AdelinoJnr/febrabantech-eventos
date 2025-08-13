import { api } from './api';

import type { IAppConfig } from '../@types/appConfig';
import type { IGetPageSobre } from '../@types/getPageSobre';

export async function appConfig(id: string): Promise<IAppConfig> {
  const token = localStorage.getItem("token");

  const response = await api.get<IAppConfig>(
    `/event-extension/pc/appConfig?friendly_url=${id}`,
    {
      headers: token ? { Authorization: token } : {},
    }
  );

  return response.data;
}

export async function getPageSobre(event_id: string): Promise<IGetPageSobre> {
  const token = localStorage.getItem("token");
  console.log("event_id", event_id);

  const response = await api.get<IGetPageSobre>(
    `/pages-events/pc/getPageSobre?event_id=${event_id}`,
    {
      headers: token ? { Authorization: token } : {},
    }
  );

  return response.data;
}