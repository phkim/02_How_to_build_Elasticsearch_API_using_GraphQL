export default {
  SearchOrderResult: {
    orderCountByDayOfWeek: async (_, args) => {
      let result = {};

      result.Sunday = 0;
      result.Monday = 1;
      result.Tuesday = 2;
      result.Wednesday = 3;
      result.Thursday = 4;
      result.Friday = 5;
      result.Saturday = 6;

      return result;
    },
    orders: async (_, args) => {
      let result = null;

      return result;
    }
  }
}