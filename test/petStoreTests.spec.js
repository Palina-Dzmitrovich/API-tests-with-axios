const chai = require('chai');
const expect = chai.expect;
const ApiHelper = require ('../src/apiHelper');
const testData = require ('../resources/testData');
const { provideRandomVal } = require('../src/commonHelper');
const CommonHelper = require('../src/commonHelper');
const newPet = require('../resources/newPet.json');


describe('Store inventory should have status code 200', function() {

    it('Should have status code 200', async function() {
        let statusCode = await ApiHelper.getStatusCode(testData.urls.storeInventory);
        
        expect(statusCode).to.equal(200);
    });

});

describe('Should return 404 when an invalid id is passed', function() {

    it('Should display an error message', async function() {
        let response = await ApiHelper.getById(testData.urls.pet, 'blah');

        expect(response.message).to.equal('Request failed with status code 404');
    });

});

describe('Should find pets by a valid status', function() {

    it('Should find pets by a valid status', async function() {
        let status = provideRandomVal(testData.petStatus);
        let response = await ApiHelper.findByQueryParameter(testData.urls.findByStatus, 'status', status);
        await console.log(response.data[0].status);
        let resultStatuses = await CommonHelper.findProperties('status', response);

        expect(resultStatuses.length).to.equal(1);
        expect(resultStatuses[0]).to.equal(status);
    });

});

describe('Sould be able to add a new pet', function() {

    it('Should be able to add a pet', async function() {
        await ApiHelper.postANewPet(testData.urls.pet, newPet);
        await CommonHelper.wait(3000);
        let response = await ApiHelper.getById(testData.urls.pet, newPet.id);
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(newPet));
    });
});