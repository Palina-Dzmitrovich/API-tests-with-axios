const chai = require('chai');
const expect = chai.expect;
const ApiHelper = require ('../src/apiHelper');
const urls = require ('../resources/testData');

describe('Store inventory should have status code 200', function() {

    it('Should have status code 200', async function() {
        let statusCode = await ApiHelper.getStatusCode(urls.storeInventory);
        expect(statusCode).to.equal(200);
    });

});

describe('Should return 404 when an invalid id is passed', function() {

    it('Should display an error message', async function() {
        let response = await ApiHelper.getById(urls.pet, 'blah');
        expect(response.message).to.equal('Request failed with status code 404');
    });

})