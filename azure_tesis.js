const msalConfig = {
  auth: {
    clientId: '0d54b15c-10a8-4799-91d5-bc1891f12af0',
    authority: 'https://login.microsoftonline.com/8f7f02e4-5497-4cee-b1b6-4b80373a6717',
    redirectUri: 'https://192.168.81.166/login.html'
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
export { msalInstance };


export function signOut() {
  const logoutRequest = {
      account: msalInstance.getAllAccounts()[0],
      postLogoutRedirectUri: 'https://192.168.81.166/login.html',
  };

  msalInstance.logout(logoutRequest);
}

// Asignar la función al contexto global
window.signOut = signOut;