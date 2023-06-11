export interface AddClientFacadeInputDTO{
    id?:string;
    name:string;
    email:string;
    address:string;    
    document:string;
    street:string;
    number:string;
    complement:string;
    city:string;
    state:string;
    zipCode:string;
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
    document:string;
    street:string;
    number:string;
    complement:string;
    city:string;
    state:string;
    zipCode:string;
    createdAt:Date;
    updatedAt:Date;
}
