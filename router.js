const { readdirSync, statSync, existsSync } = require('fs');
const { join } = require('path');

/**
 *  Busca las rutas de los módulos.
 */
const getRoutes = () => {
    const modulesPath = join(__dirname, 'modules')
    return readdirSync(modulesPath).reduce((routes, file) => {
        const dirPath = join(modulesPath, file)
        const statFile = statSync(dirPath);
        if (!statFile.isDirectory()) { return }
        const filePath = join(dirPath, `${file}.routes.js`);
        if (!existsSync(filePath)) return;
        routes[file] = require(filePath);
        return routes;
    }, [])
}

module.exports = getRoutes;
