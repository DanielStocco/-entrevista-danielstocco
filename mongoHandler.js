const { readdirSync, statSync, existsSync } = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');

/**
 *  cargar modelos.
 */
const _loadModels = () => {
    const modulesPath = join(__dirname, 'modules')
    return readdirSync(modulesPath).map((file) => {
        const dirPath = join(modulesPath, file)
        const statFile = statSync(dirPath);
        if (!statFile.isDirectory()) { return }
        const filePath = join(dirPath, `${file}.model.js`);
        if (!existsSync(filePath)) return;
        console.log(filePath);
        require(filePath)(mongoose);
    })
}

const _connect = async ({ mongo }, logger) => {
    const connectionString = `mongodb://${mongo.host}:${mongo.port}/${mongo.db}`
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
    const db = mongoose.connection;
    db.on('error', logger.error.bind(logger, 'connection error'));
    db.once('open', function() {
        logger.info('Mongo Connected');
    });
    await mongoose.connect(connectionString, options)
};

const intDb = async (config, logger) => {
    await _connect(config, logger);
    _loadModels();
}

module.exports = {
    intDb,
    getModel: name => mongoose.model(name),
    getMongoose: () => mongoose
};