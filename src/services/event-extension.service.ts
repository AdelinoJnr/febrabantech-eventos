import { api } from './api';

import type { IGetHomeSearch } from '../@types/appConfig';

export async function appConfig(id: string): Promise<IGetHomeSearch> {
  const token = localStorage.getItem("token");

  const response = await api.get<IGetHomeSearch>(
    `/event-extension/pc/appConfig?friendly_url=${id}`,
    {
      headers: token ? { Authorization: token } : {},
    }
  );

  return response.data;
}