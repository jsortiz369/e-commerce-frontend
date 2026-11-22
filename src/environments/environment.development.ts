const baseUrlApi = 'https://dev-api.tu-dominio-en-la-nube.com';

export const environment = {
  production: false,
  envName: 'development',
  apiUrl: baseUrlApi,
  urlStore: `${baseUrlApi}/api/v1/store`,
  urlAdmin: `${baseUrlApi}/api/v1/admin`,
  urlFiles: `${baseUrlApi}/storage/`,
  urlFilesPrivate: `${baseUrlApi}/files/`,
};
