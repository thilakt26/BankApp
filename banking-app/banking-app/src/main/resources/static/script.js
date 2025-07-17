document.addEventListener('DOMContentLoaded', function() {
    const addBankAccountBtn = document.getElementById("addBankAccountBtn");
    const addBankAccountForm = document.getElementById("addBankAccountForm");
        const withdrawBtn = document.getElementById("withdrawBtn");
        const depositBtn = document.getElementById("depositBtn");
        const viewTransactionsBtn=document.getElementById("viewTransactionsBtn");



    if (addBankAccountBtn && addBankAccountForm) {
        addBankAccountBtn.addEventListener("click", function() {
            addBankAccountForm.style.display = "block";
        });

        addBankAccountForm.addEventListener('submit', handleAddBankAccountFormSubmit);
    } else {
        console.error('Error: addBankAccountBtn or addBankAccountForm not found');
    }

    function handleAddBankAccountFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('accountHolderName').value;
        const dob = formatDate(document.getElementById('dob').value); // Format date
        const email = document.getElementById('email').value;
        const balance = parseFloat(document.getElementById('balance').value);
        const phone = document.getElementById('phoneNumber').value;

        const formData = {
            accountHolderName: name,
            dob: dob,
            email: email,
            balance: balance,
            phoneNumber: phone
        };

        if (validateForm(addBankAccountForm)) {
            addBankAccount(formData); // Call addBankAccount function if form is valid
        }
    }

    function validateForm(form) {
        const inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.hasAttribute("required") && !input.value.trim()) {
                alert(`Please fill in the ${input.name} field.`);
                return false;
            }
        }
        return true;
    }

    //Clearing form
    function clearForm() {
        document.getElementById('accountHolderName').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('email').value = '';
        document.getElementById('balance').value = '';
        document.getElementById('phoneNumber').value = '';
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
        return `${year}-${month}-${day}`;
    }

    function addBankAccount(formData) {
        fetch('http://localhost:8080/api/accounts/', { // Adjust the URL to match your backend server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create bank account');
            }
            return response.json();
        })
        .then(data => {
            console.log('Bank account created successfully:', data);
            console.log('addBankAccountForm:', addBankAccountForm); // Add this line for debugging
            if (addBankAccountForm && typeof addBankAccountForm.reset === 'function') {
                addBankAccountForm.reset();
            } else {
                console.error('Error resetting form: addBankAccountForm is not a valid form element');
            }
            clearForm(addBankAccountForm);
        })

        .catch(error => {
            console.error('Error creating bank account:', error);

              document.getElementById('accountHolderName').value = '';
                document.getElementById('dob').value = '';
                document.getElementById('email').value = '';
                document.getElementById('balance').value = '';
                document.getElementById('phoneNumber').value = '';
                alert("Bank Account Created Successfully");
        });
    }
});

//withdrawing Money

withdrawBtn.addEventListener("click", function() {
            withdrawForm.style.display = "block";
            addBankAccountForm.style.display = "none"; // Hide add bank account form when "Withdraw" is clicked
            depositForm.style.display = "none"; // Hide deposit form when "Withdraw" is clicked
            viewTransactionsForm.style.display = "none"; // Hide view transactions form when "Withdraw" is clicked
        });


//event listener



withdrawForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the account ID and withdrawal amount entered by the user
    const accountId = document.getElementById('withdrawAccountNo').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);

    // Construct the URL for the withdrawal API request
    const withdrawUrl = 'http://localhost:8080/api/accounts/' + accountId + '/withdraw';

    // Send a POST request to the withdrawal API endpoint with the account ID and withdrawal amount
    fetch(withdrawUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to withdraw money');
        }
        return response.json();
    })
    .then(data => {
        console.log('Money withdrawn successfully:', data);
        // Add any further actions after successful withdrawal, such as updating UI or displaying a message
    })
    .catch(error => {
        console.error('Error withdrawing money:', error);
        // Handle errors, such as displaying an error message to the user
         document.getElementById('withdrawAccountNo').value = '';
                document.getElementById('withdrawAmount').value = '';
                alert("Amount Withdraw Successfully done....")

    });
});





  // Add event listener to the "Deposit" button to toggle form visibility
        depositBtn.addEventListener("click", function() {
            depositForm.style.display = "block";
            addBankAccountForm.style.display = "none"; // Hide add bank account form when "Deposit" is clicked
            withdrawForm.style.display = "none"; // Hide withdraw form when "Deposit" is clicked
            viewTransactionsForm.style.display = "none"; // Hide view transactions form when "Deposit" is clicked

        });


// Add event listener to the "Deposit" form submission
depositForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the account ID and deposit amount from the form inputs
    const accountId = document.getElementById('accountNo').value;
    const depositAmount = document.getElementById('amount').value;

    // Construct the URL with the account ID included in the path
    const depositUrl = `http://localhost:8080/api/accounts/${accountId}/deposit`;

    // Prepare the request body with the deposit amount
    const requestBody = {
        amount: depositAmount
    };

    // Send a PUT request to the backend API to deposit money
    fetch(depositUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to deposit money');
        }
        return response.json();
    })
    .then(data => {
        console.log('Money deposited successfully:', data);
        // Optionally, you can display a success message to the user

    })
    .catch(error => {
        console.error('Error depositing money:', error);
        // Optionally, you can display an error message to the user
              document.getElementById("accountNo").value = "";
              document.getElementById("amount").value = "";
              alert("Deposited Successfully");
    });
});





// Add event listener to the "View Transactions" button to toggle form visibility

//const viewTransactionsBtn = document.getElementById("viewTransactionsBtn");

viewTransactionsBtn.addEventListener("click", function() {
    viewTransactionsForm.style.display = "block";
    addBankAccountForm.style.display = "none"; // Hide add bank account form when "View Transactions" is clicked
    depositForm.style.display = "none"; // Hide deposit form when "View Transactions" is clicked
    withdrawForm.style.display = "none"; // Hide withdraw form when "View Transactions" is clicked

   });

   document.addEventListener('DOMContentLoaded', function() {
       const viewTransactionsBtn = document.getElementById('viewTransactionsBtn');
       const viewTransactionsForm = document.getElementById('viewTransactionsForm');
       const viewAccountNoInput = document.getElementById('viewAccountNo');
       const mainContent = document.querySelector('.main-content');

       viewTransactionsBtn.addEventListener("click", function() {
           viewTransactionsForm.style.display = "block";
           hideOtherForms(['addBankAccountForm', 'depositForm', 'withdrawForm']);
       });

       viewTransactionsForm.addEventListener('submit', function(event) {
           event.preventDefault(); // Prevent form submission

           const accountNo = viewAccountNoInput.value;

           // Make HTTP request to fetch transaction data
          fetch(`http://localhost:8080/api/transactions/account/${accountNo}`)

               .then(response => {
                   if (!response.ok) {
                       throw new Error('Failed to fetch transaction data');
                   }
                   return response.json();
               })
               .then(transactions => {
                   // Clear previous transaction table
                   while (mainContent.firstChild) {
                       mainContent.removeChild(mainContent.firstChild);
                   }

                   // Create table to display transaction data
                   const transactionTable = document.createElement('table');
                   transactionTable.innerHTML = `
                       <tr>
                           <th>Date</th>
                           <th>Type</th>
                           <th>Amount</th>
                       </tr>
                   `;

                   // Populate table with transaction data
                   transactions.forEach(transaction => {
                       const row = document.createElement('tr');
                       row.innerHTML = `
                           <td>${transaction.transactionDate}</td>
                           <td>${transaction.transactionType}</td>
                           <td>${transaction.amount}</td>
                       `;
                       transactionTable.appendChild(row);
                   });

                   // Append transaction table to main content
                   mainContent.appendChild(transactionTable);
               })
               .catch(error => {
                   console.error('Error fetching transaction data:', error);
               });
       });

       // Helper function to hide other forms when "View Transactions" is clicked
       function hideOtherForms(formsToHide) {
           formsToHide.forEach(formId => {
               const form = document.getElementById(formId);
               if (form) {
                   form.style.display = 'none';
               }
           });
       }
   });


