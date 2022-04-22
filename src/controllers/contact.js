import { Client } from '@hubspot/api-client'
import dotenv from 'dotenv';
dotenv.config();

const hubspotClient = new Client({ "apiKey": process.env.HUBSPOT_KEY });
const limit = 10;
const after = 0;
const properties = undefined;
const propertiesWithHistory = undefined;
const associations = undefined;
const archived = false;

export async function get(req, res) {

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


export async function search(req, res) {

    const { email } = req.params;

    const PublicObjectSearchRequest = {
        "filterGroups":[
          {
            "filters":[
              {
                "propertyName": "email",
                "operator": "EQ",
                "value": email
              }
            ]
          }
        ],
        "properties": [ "firstname", "lastname", "email", "company","mobilephone", "fax", "phone", "city", "jobtitle"
    , "state", "lifecyclestage", "leo_test"]
      };

    //   const PublicObjectSearchRequest = {
    //     "query": email,
    //     "properties": [ "email", "becamealeaddate", "leotest" ]
    //   }

    try {
        const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
        console.log(JSON.stringify(apiResponse.results, null, 2));

        res.json({
            data: apiResponse.results
        });

        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
    }
}