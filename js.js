let isFlipped = false;

function reorderDivs() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const container = document.querySelector('.container');

  // Order of unmerged boxes for desktop view
  const desktopOrder = ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9', 'box10', 'box11'];

  // Reorder divs based on screen width
  if (screenWidth > 600) {
    desktopOrder.forEach(id => {
      const box = document.getElementById(id);
      container.appendChild(box);
    });

    // Reset overflow for width above 600px
    document.body.style.overflow = 'auto';

    // Set the height of specified boxes to be the same as box 2
    const specifiedBoxes = document.querySelectorAll('#box2, #box3, #box4, #box5, #box6, #box7, #box8');
    let box2Height = document.getElementById('box5').offsetHeight;

    specifiedBoxes.forEach(box => {
      box.style.height = `${box2Height}px`;
    });

    // Set the width of row 8 to auto
    const row6 = document.getElementById('box9');
    const row7 = document.getElementById('box10');
    const row8 = document.getElementById('box11');
    row6.style.width = '100%';
    row7.style.width = '100%';
    row8.style.width = '100%';
  }
}

function centerChildVertically() {
  // Check if the window width is above 600px
  if (window.innerWidth > 600) {
      var parentContainer1 = document.getElementById('box1');
      var childContainer1 = document.getElementById('text1');
      var childContainer2 = document.getElementById('text2');
      var childContainer3 = document.getElementById('text3');
      var childContainer4 = document.getElementById('image1');
      var childContainer5 = document.getElementById('image2');
      var childContainer6 = document.getElementById('image3');
      var childContainer7 = document.getElementById('image4');
      
      // Calculate the top margin to center the child vertically
      var marginTop = (parentContainer1.clientHeight - childContainer1.clientHeight) / 2;
      var marginTop2 = (parentContainer1.clientHeight - childContainer5.clientHeight) / 2;
      var marginTop3 = (parentContainer1.clientHeight - childContainer2.clientHeight) / 2;
      var marginTop4 = (parentContainer1.clientHeight - childContainer3.clientHeight) / 2;
      var marginTop5 = (parentContainer1.clientHeight - childContainer7.clientHeight) / 2;
      
      // Apply the margin to the child container
      childContainer1.style.marginTop = marginTop + 'px';
      childContainer2.style.marginTop = marginTop3 + 'px';
      childContainer3.style.marginTop = marginTop4 + 'px';
      childContainer5.style.marginTop = marginTop2 + 'px';
      childContainer6.style.marginTop = marginTop2 + 'px';
      childContainer7.style.marginTop = marginTop5 + 'px';

    // Reset styles for small screens (width <= 600px)
    var childContainers = [childContainer2, childContainer3, childContainer4, childContainer5, childContainer6, childContainer7];

    childContainers.forEach(function (childContainer) {
      childContainer.style.marginBottom = '0';
    });
  }
}

function callScriptWithDelay() {
  // Call the script again with a delay of 250ms, excluding the form upload function
  setTimeout(() => {
    isFlipped = false;
    reorderDivs();
    centerChildVertically();
  }, 250);
}

// Reorder Divs on page load
window.addEventListener('load', reorderDivs);
// Reorder Divs on resize
window.addEventListener('resize', function () {
  if (!isFlipped) {
    isFlipped = true;
    callScriptWithDelay();
  }
});

// JavaScript to dynamically center the text1 div vertically
// ... (your existing code)

// Add event listener for window resize
window.addEventListener('resize', centerChildVertically);
document.addEventListener('DOMContentLoaded', centerChildVertically);

function scrollToBox10() {
  var box10 = document.getElementById('box10');

  // Check if the element exists
  if (box10) {
    // Scroll to the box10 element
    box10.scrollIntoView({ behavior: 'smooth' });
  }
}

// FormUpload
var form = document.getElementById('sheetdb-form');
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the current date and time
  var currentDateTime = new Date();
  var submissionDate = currentDateTime.toISOString().split('T')[0]; // Extract date part
  var submissionTime = currentDateTime.toTimeString().split(' ')[0]; // Extract time part

  // Set the values in the hidden fields
  document.getElementById('submission-date').value = submissionDate;
  document.getElementById('submission-time').value = submissionTime;

  // Build the data object with form fields and separated date/time
  var data = {
    'first-name': document.getElementById('first-name').value,
    'last-name': document.getElementById('last-name').value,
    'email': document.getElementById('email').value,
    'phone': document.getElementById('phone').value,
    'submission-date': submissionDate,  // Add the submission date
    'submission-time': submissionTime   // Add the submission time
  };

  // Check if the form is valid
  if (form.checkValidity()) {
    fetch(form.action, {
      method: "POST",
      body: JSON.stringify({ data: data }), // Convert the data object to JSON
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
    ).then(() => {
      // Show success pop-up
      alert('Success! Form submitted successfully.');

      // Clear form fields
      form.reset();

    }).catch(error => {
      // Show error pop-up with specific error message
      alert('Error: ' + error.message);
    });
  } else {
    // Show error pop-up for form validation failure
    alert('Error: Please fill in all the required fields.');
  }
});

// Orientation change handling
function getOrientation() {
  let _orn = screen.msOrientation || (screen.orientation || screen.mozOrientation).type;

  switch(_orn){
      case 'portrait-primary':
      case 'portrait-secondary':
          // Handle portrait orientation if needed
          location.reload(true);
          break;
      case 'landscape-primary':
          console.log('This is the laptop/desktop version')
          // No reload for landscape-primary
          break;
      case 'landscape-secondary':
          // Handle landscape-secondary orientation if needed
          location.reload(true);
          break;
      case undefined:
          //not supported
          break;
      default:
          //something unknown
          location.reload(true);
  }
  return _orn;
}

window.addEventListener('orientationchange', (ev)=>{
  orn = getOrientation();
  // Reload the page or perform necessary actions for other orientations if needed
  location.reload(true);
});
