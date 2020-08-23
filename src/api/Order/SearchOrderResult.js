import { Client } from "@elastic/elasticsearch";

export default {
  SearchOrderResult: {
    orders: async (_, args) => {
      let orders = new Array();

      try {
        orders = _.orders;
      } catch (e) {
        console.log("orders exception: " + e);
      }

      return orders;
    },
  },
  Order: {
    customer: async (_, args) => {
      let client = null;
      let customer = {};

      try {
        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD
          }
        });

        let searchResult = await client.search({
          index: "customer",
          body: {
            "query": {
              "term": {
                "id": _.customerId
              }
            }
          }
        });

        if (searchResult != null && searchResult.body != null && searchResult.body.hits != null && searchResult.body.hits.hits != null) {
          if (searchResult.body.hits.hits.length == 1) {
            customer = searchResult.body.hits.hits[0]._source;
          }
        }
      } catch (e) {
        console.log("customer exception: " + e);
      }

      return customer;
    },
    products: async (_, args) => {
      let products = new Array();

      try {
        console.log(_.id);
      } catch (e) {
        console.log("product exception: " + e);
      }

      return products;
    }
  }
}