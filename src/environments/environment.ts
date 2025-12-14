export interface Environment {
  production: boolean;
  apiUrl: string;
  // Adicione outras variáveis de ambiente aqui conforme necessário
}

export const environment: Environment = {
  production: false,
  apiUrl: 'https://jsonplaceholder.typicode.com'
};
