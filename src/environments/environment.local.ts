const baseUrlApi = 'http://localhost:8000';
export const environment = {
  production: false,
  envName: 'local',
  apiUrl: baseUrlApi,
  urlStore: `${baseUrlApi}/api/v1/store`,
  urlAdmin: `${baseUrlApi}/api/v1/admin`,
  urlFiles: `${baseUrlApi}/storage/`,
  urlFilesPrivate: `${baseUrlApi}/files/`,
};
