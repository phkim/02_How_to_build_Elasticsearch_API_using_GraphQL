import { Client } from "@elastic/elasticsearch";

export default {
  Query: {
    searchOrdersByProductName: async (_, args) => {
      let client = null;
      let { searchKeyword } = args;
      let searchResult = null;
      let searchOrderResult = {};

      try {
        searchOrderResult = {};

        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD
          }
        });

        searchResult = await client.search({
          index: "product",
          body: {
            "size": 10000,
            "query": {
              "match": {
                "productName": searchKeyword
              }
            }
          }
        })

        searchOrderResult.products = new Array();

        for (let hit of searchResult.body.hits.hits) {
          searchOrderResult.orders.push(hit._source);
        }
      } catch (e) {
        console.log("searchOrders exception: " + e);
      }

      return searchOrderResult;
    }
  }
}