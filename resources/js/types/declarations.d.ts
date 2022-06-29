import {Axios} from "axios";

declare module "*.png";

declare global {
    interface Window {
        axios: Axios;
    }
}
