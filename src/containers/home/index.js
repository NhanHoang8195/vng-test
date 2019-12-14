import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from '../../components/dataTable';
import * as actions from './actions';
import { PieChart } from '../../components/chart';
import { generateDataForPieChart } from '../../utils';

import './styles.scss';


function getColumns(onEdit, onDelete) {
  return [
    {
      dataField: "customerId",
      text: "Id",
      sort: true,
      csvExport: true,
      headerStyle: {width: "50px"},

    },
    {
      dataField: "customerName",
      text: "Name",
      sort: true,
      csvExport: true,
      headerStyle: {width: "200px"},
    },
    {
      dataField: "customerType",
      text: "Type",
      sort: true,
      csvExport: true,
      headerStyle: {width: "70px"},
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      csvExport: true,
      headerStyle: {width: "100px"},
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      csvExport: true,
      headerStyle: {width: "150px"},
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      csvExport: true,
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      csvExport: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      csvExport: true,
      headerStyle: {width: "100px"},
    },
    {
      dataField: "accountNumber",
      text: "Account Number",
      sort: true,
      csvExport: true,
      headerStyle: {width: "200px"},
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
      csvExport: true,
      headerStyle: {width: "100px"},
    },
    {
      dataField: "edit",
      text: "#",
      formatter: (cell, row) => <button className="btn btn-primary" onClick={() => onEdit(row.customerId)}>Edit</button>,
      csvExport: false,
      headerStyle: {width: "100px"},
    },
    {
      dataField: "delete",
      text: "#",
      formatter: (cell, row) => <button onClick={() => onDelete(row.customerId)} className="btn btn-danger">Delete</button>,
      csvExport: false,
      headerStyle: {width: "100px"},
    }
  ];
}

// function ExportFUnc

function Homepage(props) {
  const { data } = props;
  function onGoToUpdatePage(id) {
    if (id !== undefined) {
      props.actions.saveCustomerToEdit(id);
      props.history.push(`customer/edit?id=${id}`);
    } else {
      props.actions.clearCustomerEdited();
      props.history.push('customer/add');
    }
  }
  return (
    <div className='home-containers'>
      <header className="header-home-container"><h1>View Customers</h1></header>
      <PieChart
        data={generateDataForPieChart(data)}
      />
        <DataTable
          keyField="customerId"
          data={data}
          search
          columns={getColumns(onGoToUpdatePage, props.actions.deleteCustomer)}
          onAddNewCustomer={onGoToUpdatePage}
        />

    </div>
  );
}
Homepage.propTypes = {
  actions: PropTypes.shape({
    getCustomers: PropTypes.func,
    deleteCustomer: PropTypes.func,
    saveCustomerToEdit: PropTypes.func,
    clearCustomerEdited: PropTypes.func,
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
