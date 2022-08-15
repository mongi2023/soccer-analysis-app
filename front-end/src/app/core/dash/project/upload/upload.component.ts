import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Video } from './video';
import { VideoUploadService } from './video-upload.service';
const httpoptions = {
  headers: new HttpHeaders
    (
      {
        'Contenet-type': 'multipart/form-data'
      })
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  title = 'video upload';
  files: any[] = [];

  videoData!: Video;
  videoData2!: Video;

  videos!: any;
  url!: any;
  show = false;
  show2 = false;

  constructor(
    private http: HttpClient,
    private videoService: VideoUploadService
  ) {}

  ngOnInit() {}

  selectVideo(event: any) {
    var reader = new FileReader();
    const file = event.target.files[0];
    //localStorage.removeItem('')

    if (event.target.files.length > 0) {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.videos = file;
        this.show2=!this.show2
      //  console.log(reader.result);
        
      };
    }
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('video', this.videos);
  // fsExtra.copyFileSync(pathOrigin, `${pathDest}`);
   let project=localStorage.getItem('id_project')
   let user=localStorage.getItem('userId')
   let path=localStorage.getItem('path')


   console.log(project);

    this.http
      .post<any>(`http://localhost:3000/api/v1/upload-video/${project}`, formData)
      .subscribe((data) => {
        console.log('datta====',data);
        this.videoData = data;
        this.videoData2 = data;
        console.log('dat===>',this.videoData2);

        console.log('data =',{...this.videoData,project,user,path,origin:'local'});
 this.http.post<any>(`http://localhost:3000/api/v1/upload-video/create`,{...this.videoData,project,user,path,origin:'local'}).subscribe(data=>{
        
     console.log('data2=',data);
     console.log('data3=',this.videoData);

    
   })

      });
      
     
  }
createVideoController(){
  let project=localStorage.getItem('id_project')
  let user=localStorage.getItem('userId')
  let path=localStorage.getItem('path')

  // this.http.post<any>(`http://localhost:3000/api/v1/upload-video/create`,{...this.videoData,project,user,path,origin:'local'}).subscribe(data=>{
        
  //   console.log('data2=',data);
  //   console.log('data3=',this.videoData);

    
  // })
}
  //********************************* */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
