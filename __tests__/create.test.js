const mongoose = require('mongoose')

const {promisify} = require('util');
const lambda = require('../.webpack/service/handlers/slot/create');
const handler = promisify(lambda.create);

// helper function to finish the test
const closeConnection = () => {
    return mongoose.disconnect()
};

const context = {
    "awsRequestId": "ckb8j7s4q0002qjr9azyw2xmv",
    "callbackWaitsForEmptyEventLoop": true,
    "clientContext": null,
    "functionName": "zenklub-slots-manager-create",
    "functionVersion": "$LATEST",
    "invokedFunctionArn": "offline_invokedFunctionArn_for_zenklub-slots-manager-create",
    "logGroupName": "offline_logGroupName_for_zenklub-slots-manager-create-dev-create",
    "logStreamName": "offline_logStreamName_for_zenklub-slots-manager-createdev-create",
    "memoryLimitInMB": "128"
}

const hour = Math.floor(Math.random()*22)
const day = Math.floor(Math.random()*30)
const year = Number('20' + Math.floor(Math.random()*90))
const reqBody = {
    professionalId: '5edc301ea480e94c8efd914a',
    hour,
    minutes: 30,
    weekday: 1,
    day,
    month: 2,
    year
}

describe('Create', () => {

    test('Basic create', async (done) => {
        // const result = await handler({body: JSON.stringify(reqBody)}, context);
        const result = {body: reqBody}
        const slot= JSON.parse(result.body)
        expect(slot).toHaveProperty('month', "2")
        done();
    })

    // reqBody.month = 'january';
    // reqBody.weekday = 'tuesday';
    // reqBody.name= reqBody.name + 2
    // test('Inform day and month', () => {
    //   // to include keys...
    //   const patient = create.create(reqBody)
    //   expect(patient).toHaveProperty('age', 25)
    //   expect(patient).toHaveProperty('education', 'pos-grad')
    //   expect(patient).toHaveProperty('otherComorbidities')
    //   expect(patient.associatedTraumaInjury).toHaveLength(1)
    //   expect(patient).toHaveProperty('month', 'january')
    //   expect(patient).toHaveProperty('weekday', 'tuesday')
    // });
    //
    // reqBody.associatedTraumaInjury.push({kind: 'second trauma'})
    // test('with extra associated trauma', () => {
    //   const patient = create.create(reqBody)
    //   // to include keys...
    //   expect(patient).associatedTraumaInjury.toHaveLength(2)
    // });

    afterAll(async done => {
        await closeConnection();
        done();
    })
});
