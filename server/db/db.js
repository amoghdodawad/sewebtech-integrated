const { connect } = require('mongoose');

function check(){
    console.log('No arguments passed to the connectToDB function in db/db.js file...\nKilling the process...');
    process.exit(1);
}

async function connectToDB(database = check()){
    try {
        await connect(database);
    } catch (error){
        console.log('Database couldnt be connected...\nShutting down the server...');
        process.exit(1);
    }
}

module.exports = {
    connectToDB
}