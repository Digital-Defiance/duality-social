# DualitySocial

## Architecture

- Azure App Service for hosting
  - https://azure.microsoft.com/en-us/products/app-service
  - https://duality-social.azurewebsites.net
- Azure Cosmos DB for database
  - https://azure.microsoft.com/en-us/services/cosmos-db/
  - https://duality-social.documents.azure.com:443/
- Azure Web PubSub for real-time communication
  - https://azure.microsoft.com/en-us/services/web-pubsub/
  - duality-social.webpubsub.azure.com
- Mongoose for database access
  - https://mongoosejs.com/
- Express for web server
  - https://expressjs.com/
- Angular 15 for frontend
  - https://angular.io/
- Angular Material for UI components
  - https://material.angular.io/
- markdown-it for markdown rendering
  - https://markdown-it.github.io/markdown-it/
- Font Awesome for icons, with custom icon formatting helpers
  - https://fontawesome.com/icons

## References
- https://github.com/Azure-Samples/angular-cosmosdb
- https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/tutorial-develop-nodejs-part-3
- https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/tutorial-develop-nodejs-part-5
- https://azure.microsoft.com/en-us/blog/easily-build-realtime-apps-with-websockets-and-azure-web-pubsub-now-in-preview/
- https://markdown-it.github.io/markdown-it/#MarkdownIt.disable
- https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
- https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
- https://www.mongodb.com/docs/manual/core/index-compound/
- https://mongoosejs.com/docs/schematypes.html#objectids
- https://github.com/graphql-compose/graphql-compose-mongoose
- https://github.com/typegoose/typegoose
- https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-web-api-call-api-overview
- https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-protected-web-api-app-registration
- https://learn.microsoft.com/en-us/azure/active-directory/develop/index-web-api
- https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-protected-web-api-app-registration
- https://stackoverflow.com/questions/57789550/how-to-fix-aadsts90102-redirect-uri-value-must-be-a-valid-absolute-uri-err
- https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/quickstarts/JavaScript/V12/nodejs/index.js
- https://stuarteggerton.com/b2c/README/
- https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad
- https://thecodeblogger.com/2020/04/29/secure-your-web-api-using-azure-ad-and-msal/
- https://partner.microsoft.com/en-us/dashboard/membership/isvsuccess/buildandpublish
- https://stackoverflow.com/questions/71616434/i-am-not-able-to-login-using-msal-angular-please-find-issue-details-below
- https://stackoverflow.com/questions/69039718/msal-angular-how-to-fetch-latest-payload-after-edit-profile
- https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
- https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
- https://github.com/appliedtechnologies/PowerCIDPortal/blob/dc4041a0b10045666ae8a593795ddc4d109618f1/at.D365.PowerCID.Portal/ClientApp/src/app/shared/services/user.service.ts#L84
- https://learn.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=angular
- https://devblogs.microsoft.com/devops/comparing-azure-static-web-apps-vs-azure-webapps-vs-azure-blob-storage-static-sites/
- https://docs.github.com/en/actions/deployment/deploying-to-your-cloud-provider/deploying-to-azure/deploying-to-azure-static-web-app
- https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration?tabs=github-actions
- https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
- https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-webapp-msal
- https://www.bezkoder.com/angular-10-node-js-express-mysql/
- https://developer.okta.com/blog/2018/10/30/basic-crud-angular-and-node
- https://platform.openai.com/docs/api-reference/images/create-variation
- https://learn.microsoft.com/en-us/azure/active-directory-b2c/configure-authentication-sample-angular-spa-app
- https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code
- https://learn.microsoft.com/en-us/azure/active-directory/develop/accounts-overview
- https://azure.microsoft.com/en-us/blog/easily-build-realtime-apps-with-websockets-and-azure-web-pubsub-now-in-preview/
- https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-nodejs?tabs=azure-cli%2Cpasswordless%2Cwindows%2Csign-in-azure-cli
- https://learn.microsoft.com/en-us/azure/active-directory/develop/web-app-quickstart?pivots=devlang-nodejs-passport#download-the-sample-application-and-modules
- https://learn.microsoft.com/en-us/azure/azure-web-pubsub/key-concepts?WT.mc_id=Portal-Microsoft_Azure_SignalR
- https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-node-samples/auth-code
-  https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=development-environment-vscode&tabs=linux
----

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
