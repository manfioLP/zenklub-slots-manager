const {promisify} = require('util');
const lambda = require( '../handlers/create');
const handler = promisify(lambda.create);

const {closeConnection} = require('../db')

// TODO: set environment for jest with mongoose

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

const reqBody = {
    professionalId: '5edc301ea480e94c8efd914a',
    hour: 8,
    minute: 30,
    weekday: 1,
    month: 2,
    year: 2020
}

describe('Create', () => {

    test('Basic create', async (done) => {
        const result = await handler({body: JSON.stringify(reqBody)}, context);
        const slot= JSON.parse(result.body)
        expect(slot).toHaveProperty('month', 2)
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

    afterAll(done => {
        closeConnection();
        done();
    })
});
