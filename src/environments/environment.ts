// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC4AlgD0EOIxyWnZphielpV3177Q4-ZemM",
    authDomain: "ashta-gram.firebaseapp.com",
    databaseURL: "https://ashta-gram.firebaseio.com",
    projectId: "ashta-gram",
    storageBucket: "ashta-gram.appspot.com",
    messagingSenderId: "1079815238768"
  }
};
