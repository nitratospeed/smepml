export class Pagination<T> {
    items : Array<T>;
    pageIndex : number = 0;
    totalPages : number = 0;
    totalCount : number = 0;
    hasPreviousPage : boolean = false;
    hasNextPage : boolean = true;
}