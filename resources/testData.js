const baseUrl = 'https://petstore.swagger.io/v2';

const testData = {

    urls: {
        pet: `${baseUrl}/pet`,
        storeInventory: `${baseUrl}/store/inventory`,
        findByStatus: `${baseUrl}/pet/findByStatus`
    },

    petStatus: ['available', 'pending', 'sold'],

}

module.exports = testData;

