# spotifysyncedserver

installation:
1. `cd backend`
2. `bun i`
3. create empty json files in `/backend/config.json` and `/backend/data/user.json`
4. run start.bat (bun run index.ts)
5. go to `%appdata%\spicetify\CustomApps\` and paste the spicetify-custom-app folder here
7. `spicetify config custom_apps spicetify-custom-app`
8. `spicetify apply`

config json strucutre:

```
{
    "port" : 25500,
    "client_id" : "...",
    "client_secret" : "...",
    "callback" : "http://example.com:25500/api/callback"
}
```
