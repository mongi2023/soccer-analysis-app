require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
// var ffmpeg = require('fluent-ffmpeg');
// ffmpeg.ffprobe('/Users/hicham/Desktop/notion/fireship.io/11-routing.mp4',function(err, metadata) {
//     console.log('info : ',metadata);
// });

app.use(cors())
// * ROUTES IMPORTS
const projectRouter = require('./project/projectRoutes');
const teamRouter = require('./team/teamRoutes')
const videoUploaderRouter = require('./video-uploader/videoUploaderRoutes');

// ! ERROR HANDLERS IMPORTS
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler');
// ! DB IMPORT
const connectBD = require('./shared-services/connct');

// ! PORT SETTING
const port = process.env.APP_PORT || 3000

// ! hundle body-parsing
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// !ROUTES USES

app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/team', teamRouter)
app.use('/api/v1/upload-video', videoUploaderRouter)



// ? USE OF ERROR HANDLERS
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
// ! server 

const start = async() => {
    try {
        await connectBD(process.env.MONGO_URI)
    // db connection
    app.listen(port, () => console.log(`Live on : http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
