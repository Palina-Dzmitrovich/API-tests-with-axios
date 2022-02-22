const axios = require('axios');
const logger = require('../configs/logger');
const CommonHelper = require('./commonHelper');
const axiosProxy = require('../configs/axiosProxy');

class ApiHelper {

    static async getStatusCode(url) {
        try {
            const response = await axios.get(`${url}`, axiosProxy);
            logger.info(`Requesting ${url}`);

            return response.status;

        } catch (error) {
            logger.error(`Failed when requesting ${url}`);

            return error;
        }
    }

    static async getById(url, id) {
        try {
            const response = await axios.get(`${url}/${id}`, axiosProxy);
            logger.info(`Requesting ${url}/${id}`);

            return response;

        } catch (error) {
            logger.error(`Failed when requesting ${url}/${id}. Message: ${error.message}`);

            return error;
        }
    }

    static async findByQueryParameter(url, parameterName, parameterValue) {
        try {
            const response = await axios.get(`${url}?${parameterName}=${parameterValue}`, axiosProxy);
            logger.info(`Requesting ${url}?${parameterName}=${parameterValue}`);

            return response;

        } catch (error) {
            logger.error(`Failed when requesting ${url}?${parameterName}=${parameterValue}. Message: ${error.message}`);

            return error;
        }
    }

    static async postAnEntry(url, data) {
        try {
            await axios.post(url, data, axiosProxy);
            logger.info(`Adding an item with id ${data.id} to ${url}`);
        } catch (error) {
            logger.error(`Failed when posting to ${url}.  Message: ${error.message}`);
        }
    }

    static async deletewithRetry(url, id, config, limit, timeInterval) {
        for (let i = 0; i < limit; i++) {
            try {
                await CommonHelper.wait(timeInterval);
                await axios.delete(`${url}/${id}`, config, axiosProxy);
                logger.warn(`Deleting ${url}/${id}`);
                break;
            } catch (error) {
                logger.error(`Failed deleting from ${url}/${id}.  Message: ${error.message}`);
                if (i < limit) {
                    logger.info('Retrying...')
                } else if (i === limit) {
                    return error;
                }
            }
        }
    }

    static async getWithRetry(url, id, limit, timeInterval) {
        for (let i = 0; i < limit; i++) {
            try {
                await CommonHelper.wait(timeInterval);
                const response = await axios.get(`${url}/${id}`, axiosProxy);
                logger.info(`Requesting ${url}/${id}`);

                return response;

            } catch (error) {
                logger.error(`Failed when requesting ${url}/${id}. Message: ${error.message}`);
                if (i < limit) {
                    logger.info('Retrying...')
                } else if (i === limit) {
                    return error;
                }
            }
        }
    }

    static async updateAnExistingEntry(url, data) {
        try {
            await axios.put(url, data);
            logger.info(`Updating an item at ${url}`);
        } catch (error) {
            logger.error(`Failed when updating ${url}. Message: ${error.message}`);
            return error;
        }

    }

}

module.exports = ApiHelper;