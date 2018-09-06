# QnA
MEAN Stack QnA site

## Development server (Angular in production)
1. Run `ng build --aot` to build Angular app.

2. Run `nodemon server/server.js` for a dev server. 

3. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Angular + Node dev environment
1. Run `nodemon server/server.js --watch server` to start Express app.

2. Run Angular app in another terminal tab: `ng serve --proxy-config proxy.config.json`

3. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.