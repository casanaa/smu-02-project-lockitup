const addLockFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const site = document.querySelector('#siteName').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (site && username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/locks/', {
        method: 'POST',
        body: JSON.stringify({ site, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        alert(response.statusText);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('#addLock-form')
    .addEventListener('submit', addLockFormHandler);
  