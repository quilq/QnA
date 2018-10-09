# QnA
MEAN Stack QnA site

## Run dev server
1. Create server/config/config.json file.
Set mongodb_url for database:
```
{
    "development": {
        "PORT": 3000,
        "MONGODB_URL": "---"
        "JWT_SECRET": "random_string"
    }
}
```
2. Run `nodemon server/server.js --watch server` to start Express app.

3. Run Angular app in another terminal: `ng serve --proxy-config proxy.config.json`

4. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.