const axios = require ('axios');
const logger = require('../configs/logger');

class ApiHelper {

    static async getStatusCode(url) {
        try {
            const response = await axios.get(`${url}`);
            logger.info(`Requesting ${url}`);
            return response.status;

        } catch (error) {
            logger.error(`Failed when requesting ${url}`);
            return error;
        }
    }

    static async getById(url, id) {
        try {
            const response = await axios.get(`${url}/${id}`);
            logger.info(`Requesting ${url}/${id}`);
            return response;

        } catch (error) {
            logger.error(`Failed when requesting ${url}/${id}. Message: ${error.message}`);
            return error;
        }
    }

    static async findByQueryParameter(url, parameterName, parameterValue) {
        try {
            const response = await axios.get(`${url}?${parameterName}=${parameterValue}`);
            logger.info(`Requesting ${url}?${parameterName}=${parameterValue}`);
            return response;

        } catch (error) {
            logger.error(`Failed when requesting ${url}?${parameterName}=${parameterValue}. Message: ${error.message}`);
            return error;
        } 
    }

    static async postANewPet(url, data) {
        try {
            await axios.post(url, data);
            logger.info(`Adding a pet with id ${data.id} to ${url}`);
        } catch (error) {
            logger.error(`Failed when posting to ${url}.  Message: ${error.message}`);
        }
    }

}

module.exports = ApiHelper;