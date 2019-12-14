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
    } else if (val.customerType === Constants.CUSTOMER_TYPE_C) {
      const typeC = acc.find(obj => obj.title === Constants.CUSTOMER_TYPE_C) || { value: 0 };
      dt = {
        title: Constants.CUSTOMER_TYPE_C,
        value: typeC.value + 1,
        color: "#5232ff",
      };
    } else if (val.customerType === Constants.CUSTOMER_TYPE_D) {
      const typeD = acc.find(obj => obj.title === Constants.CUSTOMER_TYPE_D) || { value: 0 };
      dt = {
        title: Constants.CUSTOMER_TYPE_D,
        value: typeD.value + 1,
        color: "#ad98ff",
      };
    } else {
      const others = acc.find(obj => obj.title === Constants.CUSTOMER_TYPE_OTHERS) || { value: 0 };
      dt = {
        title: Constants.CUSTOMER_TYPE_OTHERS,
        value: others.value + 1,
        color: "#000000",
      };
    }
    const resultIgnore = acc.filter(a => a.title !== dt.title);
    return [...resultIgnore, dt];
  }, []);
}