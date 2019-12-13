import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import * as actions from './actions';
import { PieChart } from '../../components/chart';
import * as Constants from '../../constants';
import './styles.scss';


function getColumns(history) {
  return [
    {
      dataField: "customerId",
      text: "customerId",
      hidden: true,
    },
    {
      dataField: "",
      text: "No.",
      formatter: (cell, row, rowIdx) => (<div>{rowIdx + 1}</div>),
    },
    {
      dataField: "customerName",
      text: "Name"
    },
    {
      dataField: "customerType",
      text: "Type"
    },
    {
      dataField: "balance",
      text: "Balance"
    },
    {
      dataField: "phone",
      text: "Phone"
    },
    {
      dataField: "email",
      text: "Email"
    },
    {
      dataField: "address",
      text: "Address"
    },
    {
      dataField: "status",
      text: "Status"
    },
    {
      dataField: "accountNumber",
      text: "Account Number"
    },
    {
      dataField: "gender",
      text: "Gender"
    },
    {
      dataField: "",
      text: "#",
      formatter: (cell, row) => <button onClick={() => history.push(`${Constants.URL_PATH.EDIT_CUSTOMER}/${row.customerId}`)}>Edit</button>
    },
    {
      dataField: "",
      text: "#",
      formatter: (cell, row) => <button>Delete</button>
    }
  ];
}
function generateDataForChart(data) {
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
        color: "#00ff00",
      };
    }
    return [...acc, dt];
  }, []);
}
const colorCharts = ["red", "blue", "green"];

function Homepage(props) {
  const { data, requesting, history } = props;
  return (
    <div className='home-containers'>
      <header>List Customers</header>
      <PieChart
        data={generateDataForChart(data)}
        colors={colorCharts}
      />
      <BootstrapTable
        keyField="id"
        data={data}
        columns={getColumns(history)}
      />
    </div>
  );
}
Homepage.propTypes = {
  actions: PropTypes.shape({
    getCustomers: PropTypes.func,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  requesting: PropTypes.bool,
};
Homepage.defaultProps = {
  data: [],
  requesting: false,
};
const mapStateToProps = state => ({
  data: state.homeReducer.get('data'),
  requesting: state.homeReducer.get('requesting'),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions , dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
