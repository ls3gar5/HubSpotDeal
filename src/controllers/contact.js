import { Client } from '@hubspot/api-client'
import request from 'request-promise';
import dotenv from 'dotenv';
dotenv.config();

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
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

        res.json({
            data: apiResponse.results
        });

        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
    }
}


export async function getProperties(req, res) {

    try {
        const apiResponse = await request({
            method: 'GET',
            uri: 'https://api.hubapi.com/properties/v1/contacts/properties?=${}',
            qs:{
                hapikey: process.env.HUBSPOT_KEY
            }
        });
        var response = JSON.parse(apiResponse);

        res.json({
            data: response
        });
        
    } catch (error) {
        console.error(error);
    }


}

