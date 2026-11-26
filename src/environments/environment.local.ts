declare const BASE_URL_API: string;

const baseUrlApi = typeof BASE_URL_API !== 'undefined' ? BASE_URL_API : '';

export const environment = {
  production: false,
  envName: 'local',
  apiUrl: baseUrlApi,
  urlStore: `${baseUrlApi}/api/v1/store`,
  urlAdmin: `${baseUrlApi}/api/v1/admin`,
  urlFiles: `${baseUrlApi}/storage/`,
  urlFilesPrivate: `${baseUrlApi}/files/`,
};
