export class Video {
  name?: string;
  resolution?: string;
  extension?: string;
  duration?: string;
  size?: string;
  user?: string;
  project?: string;
  origin?:string
  path?:string

  constructor(
    name: string,
    resolution: string,
    extension: string,
    duration: string,
    size: string,
    user: string,
    project: string,
    origin:string,
    path:string
  ) {
    this.name = name;
    this.extension = extension;
    this.resolution = resolution;
    this.duration = duration;
    this.size = size;
    this.user = user;
    this.project = project;
    this.origin=origin
    this.path=path
  }
}
