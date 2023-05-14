export interface AddClientFacadeInputDTO{
    id?:string;
    name:string;
    email:string;
    address:string;
}



// ------------------------------

export interface FindClientFacadeInputDto{
    id:string;
}

export interface FindClientFacadeOutputDTO{
    id:string;
    name:string;
    email:string;
    address:string;
    createdAt:Date;
    updatedAt:Date;
}
