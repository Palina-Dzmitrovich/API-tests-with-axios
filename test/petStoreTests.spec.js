const chai = require('chai');
const expect = chai.expect;
const ApiHelper = require('../src/apiHelper');
const testData = require('../resources/testData');
const CommonHelper = require('../src/commonHelper');

let newPetId = CommonHelper.provideRandomNumber(10000);


describe('Store inventory should have status code 200', function () {

    it('Should have status code 200', async function () {
        let statusCode = await ApiHelper.getStatusCode(testData.urls.storeInventory);

        expect(statusCode).to.equal(200);
    });

});

describe('Should return 404 when an invalid id is passed', function () {

    it('Should display an error message', async function () {
        let response = await ApiHelper.getById(testData.urls.pet, 'blah');

        expect(response.message).to.equal('Request failed with status code 404');
    });

});

describe('Should find pets by a valid status', function () {

    it('Should find pets by a valid status', async function () {
        let status = CommonHelper.provideRandomValFromArr(testData.petStatus);
        let response = await ApiHelper.findByQueryParameter(testData.urls.findByStatus, 'status', status);
        await console.log(response.data[0].status);
        let resultStatuses = await CommonHelper.findProperties('status', response);

        expect(resultStatuses.length).to.equal(1);
        expect(resultStatuses[0]).to.equal(status);
    });

});

describe('Should be able to add a new pet', function () {

    it('Should be able to add a pet', async function () {
        testData.newPet.id = newPetId;
        await ApiHelper.postAnEntry(testData.urls.pet, testData.newPet);
        let response = await ApiHelper.getWithRetry(testData.urls.pet, testData.newPet.id, 10, 10000);

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(testData.newPet));
    });
});

describe('Should be able to update an existing pet', function () {

    it('Should be able to update an existing pet', async function () {
        testData.updatedPet.id = newPetId;
        await ApiHelper.updateAnExistingEntry(testData.urls.pet, testData.updatedPet);
        let response = await ApiHelper.getWithRetry(testData.urls.pet, testData.newPet.id, 10, 10000);

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(testData.updatedPet));
    });
});

describe('Should be able to delete a pet', function () {

    it('Should be able to delete a pet', async function () {
        let responseBefore = await ApiHelper.getWithRetry(testData.urls.pet, newPetId, 10, 10000);
        await ApiHelper.deletewithRetry(testData.urls.pet, newPetId, testData.config, 10, 5000);
        CommonHelper.wait(5000);
        let responseAfter = await ApiHelper.getById(testData.urls.pet, newPetId);

        expect(responseBefore.data.id).to.equal(newPetId);
        expect(responseAfter.response.data.message).to.equal('Pet not found');
    });
});

