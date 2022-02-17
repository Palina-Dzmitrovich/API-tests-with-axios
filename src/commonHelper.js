const logger = require('../configs/logger');

class CommonHelper {

    static provideRandomVal(array) {
        let index = Math.floor(Math.random() * array.length);
        logger.info(`The random value in use is: "${array[index]}"`);
        return array[index];
    }

    static findProperties(propertyName, obj) {
        let values = [];

        for(let i = 0; i < obj.data.length; i++) {
            values.push(obj.data[i][propertyName]);
        }

        let propertiesFound = new Set(values);

        logger.info(`Properties found: ${[...propertiesFound]}`);

        return [...propertiesFound];   
    }

    static wait(time) {
        logger.info(`Waiting for ${time}ms`);
        return new Promise( (resolve) => { setTimeout(resolve, time) });
    }

}

module.exports = CommonHelper;