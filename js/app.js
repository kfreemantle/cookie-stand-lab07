'use strict';

// Global variables

// Array for store hours, stored as a string.  Second placeholder arrays for hourly totals.
let hours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
let hourlyTotal = [];

// Creating store location objects for use later.  Deon Curry's example was very helpful.
let seattleStore = new StoreLocation('Seattle', 23, 65, 6.3);
let tokyoStore = new StoreLocation('Tokyo', 3, 24, 1.2);
let dubaiStore = new StoreLocation('Dubai', 11, 38, 3.7);
let parisStore = new StoreLocation('Paris', 20, 38, 2.3);
let limaStore = new StoreLocation('Lima', 2, 16, 4.6);

let allStores = [];
allStores.push (seattleStore, tokyoStore, dubaiStore, parisStore, limaStore);

// Global DOM/constructor functions: to be used later on in constructor objects, kept here for cleanliness.

// Window to the DOM.  
let salesTable = document.getElementById('salesTable');

// Tabular functions: used to create the main structural table elements.
const tableFooterElement = document.createElement('tfoot');
const tableBodyElement = document.createElement('tbody');
const tableHeadElement = document.createElement('thead');

salesTable.appendChild(tableHeadElement);
salesTable.appendChild(tableBodyElement);
salesTable.appendChild(tableFooterElement);






// Constructor function StoreLocation.  Builds an object for each store, requiring the name, min/max customer and average sales data provided.

function StoreLocation(name, minCustomer, maxCustomer, avgSales) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgSales = avgSales;
  this.hourlySalesArray = [];
  
  this.sumSale = 0;
  
  
};

// Average sales calculation function goes here.  It's accessible by all store objects, so that store objects only have to muck about with store-related variables.
function calculateSalesAverages(avg, min, max){   
  let avgSalesEst = [];
  for (let i = 0; i < hours.length ; i++) {
    avgSalesEst[i] = Math.floor(avg * (Math.random() * (max - min + 1) + min));   
  }
   
    return avgSalesEst;
}
// Notes on the math methods. math.floor rounds down to the nearest whole integer, which is useful for clean estimates of cookie consumption.  This code was copypasta'd from the MDN page, and tbh I'm still not fully grokking it.  For each iteration of this loop, it sets the value of avgSalesEst at each index to be the result of the avgSalesEst with min max and avg values plugged in.  Since we're going to use the calculateSalesAverages function inside each object, we're going to make sure to plug in this.minCustomer, this.maxCustomer and this.avgSales as the arguments later on.
// we set parameters for average, min and max, since we'll need all those to calculate a average per hour.  The loop runs for the length of the index, starting from 0, counting up by one.  Moving on...

// StoreLocation Prototype methods, trying to render our data into a HTML table.
// prototype for rendering table body data, all the sales data from the stores


StoreLocation.prototype.avgSalesEst = function(){
  this.hourlySalesArray = calculateSalesAverages(this.avgSales, this.minCustomer, this.maxCustomer);
  for (let i = 0; i < this.hourlySalesArray.length; i++) {
    this.sumSale += this.hourlySalesArray[i];
  }
};


// this render function generates the HTML table row and data elements for each of our store sales data, and renders them into the table body. 

StoreLocation.prototype.render = function() {
  this.avgSalesEst();  
  
  let storeRow = document.createElement('tr');
  tableBodyElement.appendChild(storeRow);
  
  let cityStoreCell = document.createElement('td');
  storeRow.appendChild(cityStoreCell);
  cityStoreCell.innerText = this.name;

  for (let i = 0; i < hours.length; i++) {
    let saleData = document.createElement('td');
    storeRow.appendChild(saleData);
    saleData.innerText = this.hourlySalesArray[i];
  }

  let storeTotalCell = document.createElement('td');
  storeRow.appendChild(storeTotalCell);
  storeTotalCell.innerText = this.sumSale;

  
}



// these static functions build the table header and table footer.  The header displays labels for the top row, starting with a 'empty' cell and then filling out the rest with the hours array we made earlier.    The table footer row should contain the subtotals for each hour from each store.

function tableHeader () {
  let headerRow = document.createElement('tr');
  tableHeadElement.appendChild(headerRow);

  let headerData = document.createElement('th');
  headerRow.appendChild(headerData);
  headerData.innerText = 'Sales Data';

  for (let i = 0; i < hours.length; i++) {
    let hourHeader = document.createElement('th');
    headerRow.appendChild(hourHeader);
    hourHeader.innerText = hours[i];
  }

  let headerTotals = document.createElement('th');
  headerRow.appendChild(headerTotals);
  headerTotals.innerText = 'Daily Sales Total';


}


function tableFooter () {
  let footerRow = document.createElement('tr');
  tableFooterElement.appendChild(footerRow);

  let footerData =  document.createElement('td');
  footerRow.appendChild(footerData);
  footerData.innerText = "Hourly Totals:"

  let grandTotal = 0;
  
  for (let i = 0; i < hours.length; i++) {
    let hourlySubTotal = 0;
    for (let j = 0; j < allStores.length; j++) {
      hourlySubTotal += allStores[j].hourlySalesArray[i];
      console.log (hourlySubTotal);
    } 

    grandTotal += hourlySubTotal;

    let hourSubTotal = document.createElement('td');
    footerRow.appendChild(hourSubTotal);
    hourSubTotal.innerText = hourlySubTotal;
  }



  let footerTotals = document.createElement('td');
  footerRow.appendChild(footerTotals);
  footerTotals.innerText = grandTotal;

}


// Here we render the tables and the store objects.


tableHeader();


seattleStore.render();
tokyoStore.render();
dubaiStore.render();
parisStore.render();
limaStore.render();


tableFooter();