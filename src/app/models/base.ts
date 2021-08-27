import { Pagination } from "./pagination";

export class Base {
    isSuccess : boolean;
    data : any;
    message : string;
    exception : string;
    validationErrors : object;
}