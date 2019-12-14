import * as Constants from '../constants';

export function generateDataForPieChart(data) {
  if (!data) {
    return [];
  }
  return data.reduce((acc, val) => {
    let dt = {};
    if (val.customerType === Constants.CUSTOMER_TYPE_A) {
      const typeA = acc.find(obj => obj.title === Constants.CUSTOMER_TYPE_A) || { value: 0 };
      dt = {
        title: Constants.CUSTOMER_TYPE_A,
        value: typeA.value + 1,
        color: "#ff0000",
      };
    } else if (val.customerType === Constants.CUSTOMER_TYPE_B) {
      const typeB = acc.find(obj => obj.title === Constants.CUSTOMER_TYPE_B) || { value: 0 };
      dt = {
        title: Constants.CUSTOMER_TYPE_B,
        value: typeB.value + 1,
        color: "#00ff00",
      };
    } else {
      const others = acc.find(obj => obj.title === Constants.CUSTOMER_TYPE_OTHERS) || { value: 0 };
      dt = {
        title: Constants.CUSTOMER_TYPE_OTHERS,
        value: others.value + 1,
        color: "#0000ff",
      };
    }
    const resultIgnore = acc.filter(a => a.title !== dt.title);
    return [...resultIgnore, dt];
  }, []);
}