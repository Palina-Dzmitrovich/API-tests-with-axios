const baseUrl = 'https://petstore.swagger.io/v2';

const testData = {

    urls: {
        pet: `${baseUrl}/pet`,
        storeInventory: `${baseUrl}/store/inventory`,
        findByStatus: `${baseUrl}/pet/findByStatus`
    },

    petStatus: ['available', 'pending', 'sold'],

    config: {
        headers: {
            api_key: 'special-key'
        }
    },

    newPet: {
        id: 'placeholder',
        category: {
          id: 0,
          name: "string"
        },
        name: "Igor The Cool",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            "id": 0,
            "name": "string"
          }
        ],
        status: "pending"
      },

      updatedPet: {
        id: 'placeholder',
        category: {
          id: 0,
          name: "string"
        },
        name: "Kolya",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            "id": 0,
            "name": "string"
          }
        ],
        status: "sold"
      }

}

module.exports = testData;

