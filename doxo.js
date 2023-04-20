const xhr = new XMLHttpRequest();

xhr.onload = function() {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g; // Regular expression to match email addresses
  const emailMatches = xhr.responseText.match(emailRegex); // Find all email addresses in the response
  if (emailMatches) {
    alert(`Email address found in /settings page: ${emailMatches[0]}`); // Print the first email address found
  } else {
    alert('No email addresses found in the response');
  }
};

xhr.onerror = function() {
  console.error(`Error retrieving page: ${xhr.statusText}`);
};

xhr.open('GET', 'https://user.doxo.com/settings');
xhr.send();
