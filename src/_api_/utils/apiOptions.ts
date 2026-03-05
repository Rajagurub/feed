import { AxiosRequestConfig, Method } from "axios";

interface ApiOptionsProps {
  params?: Record<string, unknown>;
  url: string;
  method?: Method;
  data?: unknown;
}

export const apiOptions = ({
  params = {},
  url,
  method = "post",
  data,
}: ApiOptionsProps): AxiosRequestConfig => {
  const options: AxiosRequestConfig = {
    method: method.toLowerCase() as Method,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    params,
  };

  switch (options.method) {
    case "post":
    case "patch":
    case "put":
      return {
        ...options,
        data,
      };

    case "delete":
    case "get":
    default:
      return options;
  }
};