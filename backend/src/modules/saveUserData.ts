import { writeFile, writeFileSync } from "node:fs";
export function saveUserData(userObject: object) {
    writeFileSync(process.cwd() + "/data/user.json", JSON.stringify(userObject, null, 4));
}