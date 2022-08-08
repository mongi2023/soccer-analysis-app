export class Project {

 name:string;
 description:string;
 _id:string;

 project_path:string


 constructor(_id:string, name:string,description:string,project_path:string
   ){
    this.name=name
    this.description=description
    this.project_path=project_path
    this._id=_id
 }
}
