import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import jsPDF from "jspdf";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Modal, FormCheck } from 'react-bootstrap';
import "jspdf-autotable";

import './styles.scss';


const { SearchBar } = Search;

/**
 * Handle data need to export.
 * @param customers
 * @returns {*}
 */
function getDataExportPDF(customers) {
  return customers.map(dt => {
    return Object.keys(dt).map(k => dt[k]);
  });
}


/**
 * Handle column header
 * @param columns
 * @returns {Array[]}
 */
function getHeadersExportPDF(columns) {
  const head = [];
  const columnStyles = {};
  columns.forEach(col => {
    if (col.csvExport) {
      head.push(col.text);
      columnStyles[col.dataField] = col.headerStyle ? col.headerStyle.width: 'auto';
    }
  });
  return {
    head: [head],
    columnStyles,
  };
}



function DataTable(props) {
  const [showModal, setShowModal] = useState(false);
  const { data, keyField, onAddNewCustomer } = props;
  const [updatedColumns, setUpdatedColumns] = useState(props.columns);

  /**
   * Function handle update column csvExport attribute.
   * @param {event} e
   */
  function handleChangeCheckbox(e) {
    const newColumns = [...updatedColumns];
    const indexTarget = updatedColumns.findIndex(c => c.dataField === e.target.name);
    newColumns[indexTarget] = {...newColumns[indexTarget], csvExport: e.target.checked };

    setUpdatedColumns(newColumns);
  }

  /**
   * Export csv file
   */
  function handleExportCSV(tooKitExportProps) {
    tooKitExportProps.onExport();
  }
  function handleExportPDF() {

    const marginLeft = 40;
    const doc = new jsPDF("portrait", "pt", "A4");
    doc.setFontSize(10);
    const title = "Customer List";
    const headers = getHeadersExportPDF(updatedColumns);


    const dataExported = getDataExportPDF(data);

    let content = {
      ...headers,
      startY: 50,
      // head: headers,
      body: dataExported,
      styles: {cellWidth: 'wrap'},
      // columnStyles: get
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);

    doc.save("customers.pdf")
}
  return (<ToolkitProvider
    keyField={keyField}
    data={data}
    columns={updatedColumns}
    search
    exportCSV={{fileName: 'customers.csv'}}
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
          <footer className="footer-home-container">
            <button onClick={() => onAddNewCustomer()} className="btn btn-primary">Add new customer</button>
            <button className="btn btn-success" onClick={() => setShowModal(!showModal)}>Export</button>
          </footer>
          <Modal className="modal-customer-export" show={showModal} onHide={() => setShowModal(!showModal)}>
            <Modal.Header>
              <Modal.Title>Select columns that you want to export</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  {updatedColumns.map(col => {
                    return col.text !== '#' ? (
                      <FormCheck key={col.text} type="checkbox" name={col.dataField} label={col.text} checked={col.csvExport} onChange={handleChangeCheckbox} />) : null;
                  })}
                  <button className="btn btn-secondary cancel-export-btn" onClick={() => setShowModal(!showModal)}>Cancel</button>
                  <button className="btn btn-success export-btn" onClick={() => handleExportCSV({...propsToolKit.csvProps})}>Export CSV</button>
                  <button className="btn btn-danger export-btn" onClick={handleExportPDF}>Export PDF</button>
            </Modal.Body>
          </Modal>
        </div>
      )
    }
  </ToolkitProvider>);
}
DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  onAddNewCustomer: PropTypes.func.isRequired,
};
export default DataTable;
