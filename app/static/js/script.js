function addRow() {
  var container = document.getElementById("rows-container");
  var row = document.createElement("div");
  row.className = "row";
  
  var select = document.createElement("select");
  select.name = "dropdown[]";
  select.style.marginRight = "7px";
  select.innerHTML = `
  <option value="address">Full Address</option>
  <option value="address">Full Address</option>
  <option value="street_address">Street Address</option>
  <option value="postcode">Postal Code</option>
  <option value="city">City</option>
  <option value="state">State</option>
  <option value="country">Country</option>
  
  <option value="first_name">First Name</option>
  <option value="last_name">Last Name</option>
  <option value="first_name_male">Male First Name</option>
  <option value="first_name_female">Female First Name</option>
  <option value="prefix">Name Prefix</option>
  <option value="suffix">Name Suffix</option>
  <option value="prefix_male">Male Title Prefix</option>
  <option value="prefix_female">Female Title Prefix</option>
  
  <option value="int_identifiant">INT/IDENTIFIANT</option>
  <option value="phone_number">Phone Number</option>
  <option value="cellphone_number">Cellphone Number</option>
  <option value="international_phone_number">International Phone Number</option>
  
  <option value="email">Email Address</option>
  <option value="user_name">Username</option>
  <option value="domain_name">Domain Name</option>
  
  <option value="date_of_birth">Date of Birth</option>
  <option value="date_time">Date and Time</option>
  <option value="time">Time</option>
  <option value="year">Year</option>
  <option value="month">Month</option>
  <option value="day_of_month">Day</option>
  <option value="day_of_week">Day of the Week</option>
  
  <option value="sentence">Sentence</option>
  <option value="paragraph">Paragraph</option>
  <option value="text">Full Text</option>
  <option value="word">Word</option>
  <option value="words">List of Words</option>
  
  <option value="company">Company Name</option>
  <option value="bs">Business Sector</option>
  <option value="company_logo">Company Logo</option>
  <option value="job">Job</option>
  <option value="user_agent">User Agent</option>
  
  <option value="price">Price</option>
  <option value="amount">Amount</option>
  <option value="currency_code">Currency Code</option>
  <option value="credit_card_number">Credit Card Number</option>
  <option value="bank_account_number">Bank Account Number</option>
  
  <option value="url">URL</option>
  <option value="user_name">Username</option>
  <option value="domain_name">Domain Name</option>
  <option value="ipv4">IPv4 Address</option>
  <option value="ipv6">IPv6 Address</option>
  
  <option value="color_name">Color Name</option>
  <option value="hex_color">Hex Color Code</option>
  <option value="rgb_color">RGB Color</option>
  `;
  
  var inputText = document.createElement("input");
  inputText.type = "text";
  inputText.name = "text[]";
  inputText.placeholder = "Column name";
  
  var dropdownFormat = document.getElementById("dropdown-select-f");
  
  if (dropdownFormat.value === "sql") {
    var SqlOption = document.createElement("select");
    SqlOption.name = "sql[]";
    SqlOption.style.marginRight = "7px";
    //INTEGER FLOAT DECIMAL CHAR VARCHAR TEXT DATE TIME DATETIME BOOLEAN TINYINT SMALLINT BIGINT BLOB CLOB ENUM JSON XML UUID INTERVAL
    SqlOption.innerHTML = `
    <option value="INTEGER">INTEGER</option>
    <option value="FLOAT">FLOAT</option>
    <option value="DECIMAL">DECIMAL</option>
    <option value="CHAR">CHAR</option>
    <option value="VARCHAR">VARCHAR</option>
    <option value="TEXT">TEXT</option>
    <option value="DATE">DATE</option>
    <option value="TIME">TIME</option>
    <option value="DATETIME">DATETIME</option>
    <option value="BOOLEAN">BOOLEAN</option>
    <option value="TINYINT">TINYINT</option>
    <option value="SMALLINT">SMALLINT</option>
    <option value="BIGINT">BIGINT</option>
    <option value="BLOB">BLOB</option>
    <option value="CLOB">CLOB</option>
    <option value="ENUM">ENUM</option>
    <option value="JSON">JSON</option>
    <option value="XML">XML</option>
    <option value="UUID">UUID</option>
    <option value="INTERVAL">INTERVAL</option>
    `;
    row.appendChild(SqlOption);
  }
  
  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.style.marginLeft = "7px";
  deleteButton.style.borderRadius = "7px";
  deleteButton.style.fontWeight = "bold";
  deleteButton.style.fontSize = "10px";
  deleteButton.textContent = "-";
  
  row.appendChild(select);
  row.appendChild(inputText);
  if (dropdownFormat.value === "sql") {
    row.appendChild(SqlOption);

  }
  row.appendChild(deleteButton);
  
  container.appendChild(row);
  
  deleteButton.addEventListener("click", function() {
    container.removeChild(row);
  });
}


var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addRow);


  
var generateButton = document.getElementById("generate-button");
generateButton.addEventListener("click", function() {

  var dropdownFormat = document.getElementById("dropdown-select-f");

  // Récupérer les valeurs des éléments de sélection
  var columnType = Array.from(document.querySelectorAll("select[name='dropdown[]']"))
    .map(select => select.value);

  // Récupérer la valeur de l'input de type number
  var numberOfRows = document.getElementById("number-of-rows").value;

  // Récupérer les valeurs des inputs de type texte
  var columnName = Array.from(document.querySelectorAll("input[name='text[]']"))
    .map(input => input.value);
  
  var sqlType = Array.from(document.querySelectorAll("select[name='sql[]']"))
    .map(select => select.value);
    
  
  if (dropdownFormat.value === "sql") {
    var tableName = document.getElementById("sql-input").value;
    var boolSQL = "true";
  } else if (dropdownFormat.value === "csv") {
    var tableName = "None";
    var boolSQL = "false";
  }

  // Créer un objet avec les données à envoyer
  var data = {
    columnType: columnType,
    numberOfRows: numberOfRows,
    columnName: columnName,
    tableName: tableName,
    sqlType: sqlType,
    boolSQL: boolSQL
  };
  
  // Envoyer les données via une requête POST
  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      // Traiter la réponse du serveur
      console.log(result);
      console.log(data);
      console.log(result.success);
  
      // Afficher un message pop-up en fonction de la réponse
      if (result.success) {
        alert('La génération a échoué. Veuillez réessayer.');
      } else {
        alert('La génération s\'est bien passée !');
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
     
    });
  
});

const downloadButton = document.getElementById('download-button');
const dropdownFormat = document.getElementById("dropdown-select-f");

downloadButton.addEventListener('click', () => {
fetch('/download/') 
    .then(response => {
    // Vérifier si la réponse est OK
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response;
    }
    })
    .then(response => response.blob())
    .then(blob => {
    // Créer un lien de téléchargement et déclencher le téléchargement
    const url = URL.createObjectURL(blob); // permet de créer un lien vers un objet Blob qui représente le fichier indiqué et se trouve dans le dossier temporaire du système d'exploitation
    const link = document.createElement('a'); // permet de créer un élément HTML
    link.href = url;
    if (dropdownFormat.value === "sql") {
      link.download = 'data_generated.sql';
    }else if (dropdownFormat.value === "csv") {
      link.download = 'data_generated.csv';
    }
    link.setAttribute('nonce', Date.now()); // Ajouter un attribut nonce dynamique pour empêcher le navigateur de mettre en cache le fichier
    link.click();
    URL.revokeObjectURL(url);
    })
    .catch(error => {
    console.error('Error:', error);
    });
});

(function() {
  var select_format = document.getElementById("dropdown-select-f");
  var label_format = document.createElement("label");
  var input_row_input = document.createElement("input");
  var label_indiq_type_sql = document.createElement("label");
  var selct_sql_type = document.createElement("select");
 
  select_format.addEventListener("change", function() {
      if (select_format.value === "sql") {
          selct_sql_type.setAttribute("id", "sql-type");
          selct_sql_type.setAttribute("name", "sql[]");
          selct_sql_type.classList.add("select-type-sql");
          selct_sql_type.innerHTML = `
          <option value="INTEGER">INTEGER</option>
          <option value="FLOAT">FLOAT</option>
          <option value="DECIMAL">DECIMAL</option>
          <option value="CHAR">CHAR</option>
          <option value="VARCHAR">VARCHAR</option>
          <option value="TEXT">TEXT</option>
          <option value="DATE">DATE</option>
          <option value="TIME">TIME</option>
          <option value="DATETIME">DATETIME</option>
          <option value="BOOLEAN">BOOLEAN</option>
          <option value="TINYINT">TINYINT</option>
          <option value="SMALLINT">SMALLINT</option>
          <option value="BIGINT">BIGINT</option>
          <option value="BLOB">BLOB</option>
          <option value="CLOB">CLOB</option>
          <option value="ENUM">ENUM</option>
          <option value="JSON">JSON</option>
          <option value="XML">XML</option>
          <option value="UUID">UUID</option>
          <option value="INTERVAL">INTERVAL</option>
          `;
          // pour le placer à l'avant dernier endroit
          document.getElementsByClassName("row")[0].insertBefore(selct_sql_type, document.getElementsByClassName("row")[0].childNodes[document.getElementsByClassName("row")[0].childNodes.length - 2]);
          label_indiq_type_sql.setAttribute("for", "sql-input");
          label_indiq_type_sql.textContent = "SQL Type";
          label_indiq_type_sql.classList.add("label-type-sql");
          label_format.setAttribute("for", "sql-input");
          label_format.textContent = "Table Name";
          label_format.classList.add("input-label");
          input_row_input.setAttribute("type", "text");
          input_row_input.setAttribute("id", "sql-input");
          input_row_input.setAttribute("name", "sql-input");
          input_row_input.setAttribute("placeholder", "Table Name");
          input_row_input.classList.add("input-text");
          document.getElementById("lh4").appendChild(label_indiq_type_sql);
          document.getElementById("tbl").appendChild(label_format);
          document.getElementById("tb").appendChild(input_row_input);
      } else if (select_format.value === "csv") {
          document.getElementById("tbl").removeChild(label_format);
          document.getElementById("tb").removeChild(input_row_input);
          document.getElementById("lh4").removeChild(label_indiq_type_sql);
          document.getElementsByClassName("row")[0].removeChild(selct_sql_type);
      }
  });
})();