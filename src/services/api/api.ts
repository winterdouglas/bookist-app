import axios, { AxiosRequestConfig } from "axios";

import { Config } from "@/config";

export type ApiConfig = {
  url?: string;
};

const DefaultApiConfig: ApiConfig = {
  url: Config.API_URL,
};

const createClient = ({ url }: ApiConfig) => {
  return axios.create({
    baseURL: url,
    headers: {
      Accept: "application/json",
    },
  });
};

export const createApi = (config: ApiConfig = DefaultApiConfig) => {
  const client = createClient(config);

  const get = async <T>(
    url: string,
    reqConfig?: Pick<AxiosRequestConfig, "params" | "headers" | "signal">,
  ) => {
    try {
      const response = await client.get<T>(url, reqConfig);
      return response.data;
    } catch (error) {
      if (__DEV__) {
        console.log("Api Error", error);
      }

      // TODO: Rethrow a managed error
      throw error;
    }
  };

  return { get };
};

export const Api = createApi();
