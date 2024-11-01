C:/Users/ACER/OneDrive - ESMT/Bureau/Autodidacte/JYENDataGenerator/app

  fetch('/api/data?' + new URLSearchParams(data), {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      // Traiter la réponse du serveur
      console.log(result);
  
      // Afficher un message pop-up en fonction de la réponse
      if (result.success) {
        alert('La génération s\'est bien passée !');
      } else {
        alert('La génération a échoué. Veuillez réessayer.');
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
    });  


    function addRow() {
    var container = document.getElementById("rows-container");
    var row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <select name="dropdown[]" style="margin-right: 7px;">
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
      </select>
      <input type="text" name="text[]" placeholder="Column name">
      <button class="delete-button" style="margin-left: 7px; border-radius: 7px; font-weight: bold; font-size: 10px;">-</button>
    `;
    container.appendChild(row);
  
    // Ajouter un gestionnaire d'événements pour supprimer la ligne
    var deleteButton = row.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
      container.removeChild(row);
    });
  }