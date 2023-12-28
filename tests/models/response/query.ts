export interface QueryResponse {
    id: any
    totalSize: number
    done : boolean
    records : Record[]
}
export interface Record {
    attributes : Attributes
    Id : string
}
export interface Attributes{
    type : string
    url : string
}