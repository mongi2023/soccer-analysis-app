export class Player {
    fullname?: string
    birth_date?:string
    number?: number;
    picture?:string;
    position?: string;

    constructor(
        fullname: string,
birth_date:string,
number: number,
picture:string,
position: string
    ){
        this.fullname = fullname
        this.birth_date = birth_date
        this.number = number
        this.picture = picture
        this.position = position
    }
}
