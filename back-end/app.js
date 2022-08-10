require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// * ROUTES IMPORTS
const projectRouter = require('./project/projectRoutes');
const teamRouter = require('./team/teamRoutes');
const videoUploaderRouter = require('./video-uploader/videoUploaderRoutes');
const userRouter = require('./user/userRoutes');
const playerRouter = require('./player/playerRoutes');
const categoryRouter = require('./actionCategory/actionCategoryRoutes');
const subCategoryRouter = require('./actionSubCategory/actionSubCategoryRoutes');
const sequenceRouter = require('./video_sequences/sequenceRoutes');
const matchRouter = require('./match-details/matchRoutes');

// ! ERROR HANDLERS IMPORTS
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler');
// ! DB IMPORT
const connectBD = require('./shared-services/connct');

// ? AUTHENTICATION MIDDLEWARE
const authenticateUser = require('./middlewares/authentication');

// ! PORT SETTING
const port = process.env.APP_PORT || 3000

// ? MORGAN
app.use(morgan('tiny'))

// ! hundle body-parsing
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// ! USING COOKIE PARSER
app.use(cookieParser(process.env.JWT_SECRET))

// ! USING CORS
app.use(cors({origin: 'http://localhost:4200', credentials: true}))

// !ROUTES USES

app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/team', teamRouter)
app.use('/api/v1/upload-video', videoUploaderRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/player', playerRouter)
app.use('/api/v1/categories', authenticateUser,categoryRouter)
app.use('/api/v1/sub-categories', subCategoryRouter)
app.use('/api/v1/sequence', sequenceRouter)
app.use('/api/v1/match-details', matchRouter)

// HOTFIX BRANCH CAN ACCESS ALL BRANCHES FOLDERS 
// FOR EMERGENCY NEEDS

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
