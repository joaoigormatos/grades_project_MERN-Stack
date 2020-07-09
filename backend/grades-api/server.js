import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'

import dataBaseConfig from './src/config/dataBaseConfig.js'


app.listen(process.env.PORT || 8081, dataBaseConfig);