const fs = require('fs');
// JSON data
const data = require('./data.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');

/**
 * Take an object which has the following model
 * @param {Object} item 
 * @model
 * {"title": `String`,
    "price": `String`,
    "storeName": `String`,
    "storeLink": `String`,
    "rate": `String`,
    "ratings": `String`,
    "colors": `String`,
    "description": `String`,
    "availability": `String`,
    "sellerLink": `String`,
    "sellerName": `String`,
    "bulletsList": `String`,
    "technicalDetails": `String`,
    "additionalIinfo": `String`,
    "imageList": `String`,
 * }
 * 
 * @returns {String}
 */
const createRow = (item) => `
<tr>
    <th>Title</td>
    <td>${item.title}</td>
</tr>
<tr>
    <th>Price</td>
    <td>${item.price}</td>
</tr>
<tr>
    <th>Store name</td>
    <td>${item.storeName}</td>
</tr>
<tr>
    <th>Store link</td>
    <td>${item.storeLink}</td>
</tr>
<tr>
    <th>Rate</td>
    <td>${item.rate}</td>
</tr>
<tr>
    <th>Ratings</td>
    <td>${item.ratings}</td>
</tr>
<tr>
    <th>Colors</td>
    <td>${item.colors}</td>
</tr>
<tr>
    <th>Description</td>
    <td>${item.description}</td>
</tr>
<tr>
    <th>Availability</td>
    <td>${item.availability}</td>
</tr>
<tr>
    <th>Seller link</td>
    <td>${item.sellerLink}</td>
</tr>
<tr>
    <th>Seller name</td>
    <td>${item.sellerName}</td>
</tr>
<tr>
    <th>Bullets list</td>
    <td>${item.bulletsList}</td>
</tr>
<tr>
    <th>Technical details</td>
    <td>${item.technicalDetails}</td>
</tr>
<tr>
    <th>Additional info</td>
    <td>${item.additionalIinfo}</td>
</tr>
<tr>
    <th>Image list</td>
    <td>${item.imageList}</td>
</tr>
`;

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} column
 * @returns {String}
 */
const createTable = (column) => `
  <table>
    ${column}
  </table>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          vertical-align: top;
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          height: auto;
          padding: 10px;
          border: 1px solid black;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath 
 * @returns {Boolean}
 */
const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath); // get information of the specified file path.
        return true;
    } catch (error) {
        return false;
    }
};

try {
    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(buildPathHtml)) {
        console.log('Deleting old build file');
        /* If the file exists delete the file from system */
        fs.unlinkSync(buildPathHtml);
    }
    /* generate rows */
    const column = data.map(createRow).join('');
    /* generate table */
    const table = createTable(column);
    /* generate html */
    const html = createHtml(table);
    /* write the generated html to file */
    fs.writeFileSync(buildPathHtml, html);
    console.log('Succesfully created an HTML table');
} catch (error) {
    console.log('Error generating table', error);
}
