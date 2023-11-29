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
    let box2Height = document.getElementById('box4').offsetHeight;
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
	@@ -162,3 +140,37 @@ form.addEventListener("submit", function (e) {
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
