const express = require('express')

const app = express()

app.use(express.json());

require('./utils/dbconnection');
require('./utils/relations').modelRelationships();

//import routes
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

//setting routes
app.use('/user',userRoutes)
app.use('/task',taskRoutes)

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})


//setting port
const PORT = process.env.PORT || 8000;

//server
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})