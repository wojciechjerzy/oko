import {base64encode} from "./base64encode";
import {sha256} from "./sha256";

export async function codeChallenge(plain: string) {
    return base64encode(await sha256(plain));
}