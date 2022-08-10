export class Team {
    fullname?: string
    birth_date?:string
    number?: number;
    picture?:string;
    position?: string;
    teams?: string;
    project:string

    constructor(
        fullname: string,
birth_date:string,
number: number,
picture:string,
position: string,
teams: string,
project:string
    ){
        this.fullname = fullname
        this.birth_date = birth_date
        this.number = number
        this.picture = picture
        this.position = position
        this.teams = teams
        this.project=project
    }
}
