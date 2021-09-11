export interface Base<T> {
    isSuccess : boolean;
    data : T;
    message : string;
    exception : string;
    validationErrors : string[];
}