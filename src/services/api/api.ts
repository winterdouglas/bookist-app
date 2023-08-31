import axios, { AxiosRequestConfig } from "axios";

import { Config } from "@/config";
import { ApiConfig, SearchResultPage } from "./api.types";

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

export const apiClient = (config: ApiConfig = DefaultApiConfig) => {
  const client = createClient(config);

  const searchBooks = async (
    searchTerm: string,
    page: number,
    cancelSignal?: AxiosRequestConfig["signal"],
  ) => {
    try {
      const response = await client.get<SearchResultPage>("/search.json", {
        params: {
          q: searchTerm,
          page: page,
        },
        signal: cancelSignal,
      });
      return response.data;
    } catch (error) {
      if (__DEV__) {
        console.log("Search error", error);
      }

      throw error;
    }
  };

  return { searchBooks };
};

export const Api = apiClient();
