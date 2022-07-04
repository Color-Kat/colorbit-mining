declare module "*.png";

import {Axios} from "axios";

declare global {
    interface Window {
        axios: Axios;
    }
}

