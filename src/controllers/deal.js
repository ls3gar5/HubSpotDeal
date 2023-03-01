//import {hubspot} from '@hubspot/api-client'
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ "apiKey": "demo" });

export async function getdeals(req, res) {

    const limit = 10;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;
    limit = 'my name';

    try {
        const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
        var response = JSON.stringify(apiResponse.results, null, 2);
        console.log(apiResponse.results);
        res.json({
            data: apiResponse.results
        });
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
    }

}