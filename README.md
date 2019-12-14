This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup and run VNG-TEST app

After clone this repo to your local machine, do following steps to run this app:   
Run command:
1. ### `cd vng-test/`
2. ### `npm install`
3. ### `npm start`

After finished all of the commands above, you can open any browsers and   
access to `http://localhost:3000` to see visit website.

This project use:   
 * [Redux](https://redux.js.org/) to save data customer.
 * [React-bootstrap-table2](https://react-bootstrap-table.github.io/react-bootstrap-table2/) to display table customers and export csv file.
 * [jsPdf, jspdf-autotable](https://www.npmjs.com/package/jspdf-autotable) to export pdf file.



Structure for this project.   

<pre>
src/   
  ├──components/  
  |    ├──chart/   
  |    |     ├──index.js   
  |    |     ├──pieChart.js   
  |    |     └──styles.scss   
  |    └──dataTable/   
  |          ├──index.js   
  |          └──styles.scss   
  ├──constants/   
  |    └──index.js   
  |
  ├──containers/   
  |    ├──customer/
  |    |     ├──constants.js      
  |    |     ├──formCustomer.js   
  |    |     ├──index.js   
  |    |     └──styles.scss   
  |    ├──header/   
  |    |    ├──__tests__/   
  |    |    |     └──App.test.js   
  |    |    ├──actions.js   
  |    |    ├──index.scss      
  |    |    ├──mockInitData.json      
  |    |    ├──reducer.js  
  |    |    ├──styles.scss      
  |    |    └──type.js   
  |    └──App.js   
  |
  ├──store/   
  |    └──index.js   
  ├──ulti/   
  |    └──index.js   
  ├──styles.scss   
  ├──index.js   
  └── serviceWorker.js
</pre>
