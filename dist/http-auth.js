import { createbasicauth } from "./createbasicauth";
import { createdigestauth } from "./createdigestauth";
export function createhttpauth(options) {
    const realm = "Default realm";
    const auth =
        options.authentication === "HTTPBasicAuthentication"
            ? createbasicauth(realm, options.user, options.pass)
            : createdigestauth(realm, options.user, options.pass);
    return (ctx, next) => {
        auth.check((req, res) => {
            next();
        })(ctx.request, ctx.response);
    };
}
