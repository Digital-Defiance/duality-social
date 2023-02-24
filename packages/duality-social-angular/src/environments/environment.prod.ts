export const environment = {
  production: true,
  msal: {
    authority: 'https://login.microsoftonline.com/83f34336-afeb-4706-b665-02995bbdffc8',
    clientId: '8c8572d9-9cad-4cee-b00f-4b642f7441bb',
    cloudInstance: 'https://login.microsoftonline.com/',
    redirectUri: 'https://localhost:3000/',
    postLogoutRedirectUri: 'https://localhost:3000/',
  },
  save: {
    redirectUri: 'https://duality.social/',
    postLogoutRedirectUri: 'https://duality.social/',
  }
};
