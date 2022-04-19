import * as hubspot from '@hubspot/api-client';

export async function getConatcts(req, res) {

    const hubspotClient = new hubspot.Client({ "apiKey": "demo" });
    const limit = 10;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;


    try {
        const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);

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