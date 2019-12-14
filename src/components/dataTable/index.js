import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import './styles.scss';

const { SearchBar } = Search;
function DataTable(props) {
  const { data, columns, keyField } = props;
  return (<ToolkitProvider
    keyField={keyField}
    data={data}
    columns={columns}
    search
  >
    {
      propsToolKit => (
        <div className="data-table-component">
          <div className="search-element">
            <h3>Search Customers</h3>
            <SearchBar
              { ...propsToolKit.searchProps }
              className="custome-search-field"
            />
          </div>
          <BootstrapTable
            { ...propsToolKit.baseProps }
            noDataIndication={() => 'No data to display'}
            headerClasses="react-table-header-custome"
          />
        </div>
      )
    }
  </ToolkitProvider>);
}
DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};
export default DataTable;

{/*<BootstrapTable*/}
{/*  {...props}*/}
{/*  keyField={keyField}*/}
{/*  data={data || []}*/}
{/*  columns={columns}*/}
{/*  noDataIndication={() => 'No data to display'}*/}
{/*  headerClasses="react-table-header-custome"*/}
{/*/>*/}