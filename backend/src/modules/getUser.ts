import fs from "node:fs";
export type User = {
    access_token: string;
    token_type: string | null;
    expires_in: number;
    refresh_token: string;
    scope: string | null;
}
export function getUser() {
    return fs.readFileSync(process.cwd() + "/data/user.json", {encoding: "utf-8"});
}