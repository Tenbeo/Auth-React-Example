

# Tenbeo Auth React Example

This is an implementation example for the **Tenbeo Login** with **React** and **Node** technologies.

### Dependencies

- Node v18+ and NPM

### Stack

- **Preact** for the UI
- **Fastify** for the Node server
- **Esbuild** for the **server** and **client** build

### Install dependencies

- `npm i`

### Run

#### In dev mode
- `npm run dev`

> esbuild will refresh when **server** or **client** files are modified


#### In production
- `npm run build`


### Tenbeo Auth Instance

You will need a [Tenbeo Auth Instance](https://github.com/Tenbeo/Tenbeo-Auth) running to use this example.

#### If you do not have a deployed instance

Follow instructions [here](https://github.com/Tenbeo/Tenbeo-Auth) and create your own instance.
Deploy it anywhere ( it only needs an SSL ), or start the dev server locally to test how it works.

#### You have access to an instance

Connect to you Tenbeo Auth Instance admin panel and create an app. Let's name it `react-application-example`.
Your user has to subscribe to this app. 
Next, edit `tenbeoAuthInstanceLocation` in `src/_common/tenbeo.config.ts` and replace your instance URL. 

### Main files

On the client side, the more important files are 

- [src/client/index.tsx](./src/client/index.tsx) This is where we store the connected user and show the login page.
- [src/client/pages/LoginPage/LoginPage.tsx](./src/client/pages/LoginPage/LoginPage.tsx) How to show the login QR code and handle session status.
- [src/client/pages/SecuredAreaPage/SecuredAreaPage.tsx](./src/client/pages/SecuredAreaPage/SecuredAreaPage.tsx) Connect to secured APIs and logout.
- [src/client/models/*.model.ts](./src/client/models/) both models to understand requirements for the fetch requests.

On the server side :

- [src/server/api/secured.api.ts](./src/server/api/secured.api.ts) The secured API, shows how to handle `SecuredArea.tsx` actions to verify that user has a valid session.