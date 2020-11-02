
export enum SearchStates {
    NONE        = 0,
    PROGRESS    = 1,
    SUCCESS     = 2,
    FAILED      = 3
}

export type Search = {
    name: string,
    bDate: string,
    years: number,
    days: number,
    hours: number
}

//function types
export type AddSearch = (search: Search) => void;
