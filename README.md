<p align="center">
<img height="32px" width="32px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" />
<img height="32px" width="32px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" />
<img height="32px" width="32px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
<img height="32px" width="32px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg" />
<img height="32px" width="32px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" />
<img height="32px" width="32px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" />
</p>

# Defender UI 
User Interface for IBM Storage Defender

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. yarn 1.22.18 - this is the same version travis uses to build

   - `npm install -g yarn@1.22.18` or `yarn set version 1.22.18` if you have yarn 2 already installed - this will install the correct version of yarn

2. node 16.14.2

   - Download node lts [here](https://nodejs.org/en/download/)
   - If you use nvm you can run `nvm install`

3. Request access to the Fusion component's npm registry
   - [Fusion npm registry access form](https://github.ibm.com/ProjectAbell/abell-tracking/issues/new?assignees=btuminar%2C+prajaktak%2C+tniemeye&labels=AccessRequest&template=isf-access-request-template.md&title=%5BAccess+Request%5D+IBM+Spectrum+Fusion)
   - On the form, select Read and under artifactory select dev, squad is Dragon UI.

4. Create `.npmrc` to authenticate into private registries

   - Run the following commands in the project root to create file `defender-ui/.npmrc`
   - Use your w3 user id when authenticating through the final `curl` command

   ```sh
   echo registry=https://na.artifactory.swg-devops.com/artifactory/api/npm/wcp-tmp-ace-fr-team-npm-virtual/ >> .npmrc
   echo @isf:registry=https://na.artifactory.swg-devops.com/artifactory/api/npm/hyc-abell-devops-team-dev-isf-npm-local/ >> .npmrc
   # replace yourW3@ibm.com with your w3 user id and enter password when prompted
   curl -u yourW3@ibm.com https://na.artifactory.swg-devops.com/artifactory/api/npm/auth >> .npmrc
   ```

### Useful GIT commands

Create a new branch for a new feature or issue and switching to it
```
git checkout -b <new branch name>
```

Stage all changed files to prepare for a commit
```
git add .
```

Commit changes (The message should be in the format <workitem:brief description>)
```
git commit -m <message>
```

Push branch to github
```
git push origin <branch name>
```
### Installing

```sh
git clone git@github.ibm.com:ibm-storage-defender/defender-ui.git
cd defender-ui
yarn     # installs deps
yarn start # starts the development server:
```

To create a production build (build output will appear in the /build directory)
```sh
git clone git@github.ibm.com:ibm-storage-defender/defender-ui.git
cd defender-ui
yarn     # installs deps
yarn build # creates optimized build artifacts
```

### Adding new `.env` variables
A base `.env` file is `defender-ui/.env`.

### Additional resources
- [UI documents and how to's](https://ibm.ent.box.com/folder/194829585744)
- [Carbon](https://v10.carbondesignsystem.com/)
- [Carbon for IBM products](https://pages.github.ibm.com/cdai-design/pal/)
- [Fusion repo](https://github.ibm.com/ProjectAbell/fusion-ui)
- [Tekton Build Pipeline](https://console-openshift-console.apps.ocpcluster2.cluster.cloud.local/k8s/ns/defender-build/tekton.dev~v1beta1~Pipeline/defender-ui)
- [How to access Tekton Pipelines](https://pages.github.ibm.com/ibm-storage-defender/defender-docs/devops_guide/devopsguide/)

### Running the UI in a container

```sh
git clone git@github.ibm.com:ibm-storage-defender/defender-ui.git
cd defender-ui
```
Open the .env file and update the REACT_APP_API_URL variable with the URL of the defender ui api
```sh
yarn     # installs deps
yarn build # creates optimized build artifacts
```
Build the container

```
docker build -t defender/ui .
```

If building the container on a MacBook with a M1 chip, you'll need to add the following flag

```
docker build -t defender/ui . --platform linux/x86_64
```

6. Run the container

```
docker run -dp 9082:9443 defender/ui
```# react17
