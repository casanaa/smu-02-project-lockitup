const viewLockFormHandler = async (event) => {
  event.preventDefault();

// Get the button and dropdown content elements
const dropdownBtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

// Toggle the dropdown when the button is clicked
dropdownBtn.addEventListener('click', function() {
  dropdownContent.style.display === 'block'
    ? (dropdownContent.style.display = 'none')
    : (dropdownContent.style.display = 'block');
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
  if (!event.target.matches('.dropbtn')) {
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    }
  }
});}