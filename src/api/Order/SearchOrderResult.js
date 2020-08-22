export default {
  SearchOrderResult: {
    orders: async (_, args) => {
      let orders = new Array();

      try {
        console.log(_);
      } catch (e) {
        console.log("orders exception: " + e);
      }

      return orders;
    }
  }
}