import { Client } from "@elastic/elasticsearch";

export default {
  Query: {
    searchOrdersByProductName: async (_, args) => {
      let client = null;
      let { searchKeyword, pageSize, pageIndex } = args;
      let searchOrderResult = {};

      try {
        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD
          }
        });

        let searchResult = await client.search({
          index: "order",
          body: {
            "from": (pageIndex * pageSize),
            "size": pageSize,
            "query": {
              "match": {
                "productName": searchKeyword
              }
            },
            "sort": [
              { "id": { "order": "desc", "mode": "max" } }
            ]
          }
        })

        let orders = new Array();

        if (searchResult != null && searchResult.body != null && searchResult.body.hits != null && searchResult.body.hits.hits != null) {
          for (let hit of searchResult.body.hits.hits) {
            orders.push(hit._source);
          }
          searchOrderResult.total = searchResult.body.hits.total.value;
        }
        searchOrderResult.orders = orders;
      } catch (e) {
        console.log("searchOrdersByProductName exception: " + e);
      }

      return searchOrderResult;
    }
  }
}