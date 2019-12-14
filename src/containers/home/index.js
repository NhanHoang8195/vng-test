import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import * as actions from './actions';
import { PieChart } from '../../components/chart';
import { generateDataForPieChart } from '../../utils';

import './styles.scss';


function getColumns(onEdit, onDelete) {
  return [
    {
      dataField: "customerId",
      text: "Customer Id",
      sort: true,
    },
    {
      dataField: "customerName",
      text: "Name",
      sort: true,
    },
    {
      dataField: "customerType",
      text: "Type",
      sort: true,
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "accountNumber",
      text: "Account Number",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },
    {
      dataField: "edit",
      text: "#",
      formatter: (cell, row) => <button className="btn btn-primary" onClick={() => onEdit(`customer/edit?id=${row.customerId}`)}>Edit</button>
    },
    {
      dataField: "delete",
      text: "#",
      formatter: (cell, row) => <button onClick={() => onDelete(row.customerId)} className="btn btn-danger">Delete</button>
    }
  ];
}

function Homepage(props) {
  const { data, requesting } = props;
  return (
    <div className='home-containers'>
      <header className="header-home-container"><h1>List Customers</h1></header>
      <PieChart
        data={generateDataForPieChart(data)}
      />
      { !requesting && <BootstrapTable
        keyField="customerId"
        data={data || []}
        columns={getColumns(props.history.push, props.actions.deleteCustomer)}
        noDataIndication={() => 'No data to display'}
        headerClasses="react-table-header-custome"
      />}
      <footer className="footer-home-container">
        <button className="btn btn-primary" onClick={() => props.history.push('/customer/add')}>Add new customer</button>
        <button className="btn btn-success">Export customer</button>
      </footer>
    </div>
  );
}
Homepage.propTypes = {
  actions: PropTypes.shape({
    getCustomers: PropTypes.func,
    deleteCustomer: PropTypes.func,
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
