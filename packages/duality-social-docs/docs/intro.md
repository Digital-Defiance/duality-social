# Duality Social

![Duality Social](/img/logo.svg)

## Developing

- Clone the repository with ```https://github.com/Mulein-Studios/duality-social.git```
- In the root of the repository, run ```yarn```
- In each of the packages, run ```yarn```
- Open the repository with VS Code


### Shared library

- Stored in packages/duality-social-lib
- Build the library with ```nx build duality-social-lib``` from the toplevel directory

### Node app

- Stored in packages/duality-social-node
- Ensure the library is built first
- Build with ```nx build duality-social-node``` from the toplevel directory

### Front-End

- Stored in packages/duality-social-angular
- Ensure the library is built first
- Build with ```nx build duality-social-angular``` from the toplevel directory
- Need to get the NPM key for FontAwesome from https://fontawesome.com/docs/web/setup/packages
  - The NPM password is given under the "1. Configure Access" section.

### Database

- Azure Cosmos DB
- Mongoose connector for both Node and JS/Angular
- Connection string located at in the Azure Portal under Azure Cosmos DB > Connection Strings > Primary Connection String

### Keys

- In Azure Portal go to Key Vaults > duality-social > Secrets

## Documentation

- Docusaurus: [https://docusaurus.io/docs/installation](https://docusaurus.io/docs/installation)
- Stored in packages/duality-social-docs
- Build the documentation with ```nx build duality-social-docs``` from the toplevel directory
- Serve the documentation with ```nx start duality-social-docs``` from the toplevel directory
