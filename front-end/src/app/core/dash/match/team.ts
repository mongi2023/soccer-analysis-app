export class Team {
    
    name?: string
    creation_date?:string
    logo?:string;
    user?: string;

    constructor(
        name: string,
creation_date:string,
logo:string,
user: string,
    ){
        this.name = name
        this.creation_date = creation_date
        this.logo = logo
        this.user = user
    }
}
