// toogle spin class on icon
let open = document.querySelector(".toogle-settings i");
let settingsbox = document.querySelector(".settings-box");
open.onclick = function () {
  settingsbox.classList.toggle("open");
  open.classList.toggle("fa-spin");
};

// check if localstorage has a color
if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  // remove class active from all li if local storage has a color
  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");
    // add active class for li if he === localstorage.color
    if (localStorage.getItem("color") === li.dataset.color) {
      li.classList.add("active");
    }
  });
}

// switch colors
let licolors = document.querySelectorAll(".colors-list li");
licolors.forEach((li) => {
  li.addEventListener("click", (li) => {
    document.documentElement.style.setProperty(
      "--main-color",
      li.currentTarget.dataset.color
    );
    // set color in local storage
    localStorage.setItem("color", li.currentTarget.dataset.color);
    // remove active class from all li
    licolors.forEach((li) => {
      li.classList.remove("active");
    });
    // add class active on color click
    li.currentTarget.classList.toggle("active");
  });
});

// random background option
let backgroundOption = true;
// varibale to control the  background interval
let backgroundInterval;
let optionsBackground = document.querySelectorAll(".randombackgrounds span");

// check if the  local storage has background random option
if (localStorage.getItem("background-option")) {
  optionsBackground.forEach((span) => {
    span.classList.remove("active");
    if (span.dataset.background === localStorage.getItem("background-option")) {
      span.classList.add("active");
    }
  });
  if (localStorage.getItem("background-option") === "yes") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
}

// switch backgroud random option
optionsBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove active class from all span
    optionsBackground.forEach((span) => {
      span.classList.remove("active");
    });
    // add active class for span in click
    e.currentTarget.classList.add("active");
    // condution if we want background to be random or not
    if (e.currentTarget.dataset.background === "yes") {
      backgroundOption = true;
      randomimgs();
      localStorage.setItem(
        "background-option",
        e.currentTarget.dataset.background
      );
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem(
        "background-option",
        e.currentTarget.dataset.background
      );
    }
  });
});

// select landing page element
let landingpage = document.querySelector(".landing-page");
// get arry of images to change landing background
let imgarry = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// function to random imgs
function randomimgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //  get randoum number
      let random = Math.floor(Math.random() * imgarry.length);
      // change background image url
      landingpage.style.backgroundImage = `url("imgs/` + imgarry[random] + `")`;
    }, 5000);
  }
}
randomimgs();

// add width by dataset to span in scroll window in section
let ourspan = document.querySelectorAll(".skills .skill-box  span");
let ourskills = document.querySelector(".skills");
window.onscroll = () => {
  // add width to span
  if (window.scrollY >= ourskills.offsetTop - 100) {
    ourspan.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

//  button to scroll top
let btn_scroll = document.querySelector(" footer .scroll-top");
btn_scroll.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// create popup for image in our gallery section
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    // add class for overlay
    overlay.className = "popup-overlay";
    // append overlay to body
    document.body.appendChild(overlay);
    // create the popup box
    let popupbox = document.createElement("div");
    // add class to popup box
    popupbox.className = "popup-box";
    // create image for popup box
    let popupimage = document.createElement("img");
    //  set src for image
    popupimage.src = img.src;
    //  add image in popupbox
    popupbox.appendChild(popupimage);
    // append popupbox to body
    document.body.appendChild(popupbox);

    if (img.alt !== null) {
      // create heading alt in img
      let imgheading = document.createElement("h3");
      // create text for heading
      let imgtext = document.createTextNode(img.alt);
      // append imgtext to heading
      imgheading.appendChild(imgtext);
      // append imgheading in popuppox
      popupbox.prepend(imgheading);
      // create span for close image
      let closeButton = document.createElement("span");
      // create the close button text
      let close_button_text = document.createTextNode("X");
      // append close text to close button
      closeButton.appendChild(close_button_text);
      // add class to close button
      closeButton.className = "close-button";
      // add closebutton to popupbox
      popupbox.prepend(closeButton);
    }
  });
});

// close popup image by close button("x")
document.addEventListener("click", (el) => {
  if (el.target.className === "close-button") {
    // remove overlay div (previousSibling: means the element befor popup in html)
    el.target.parentElement.previousSibling.remove();
    // remove popup img
    el.target.parentElement.remove();
  }
});

// scroll to all sections in click
// select all bulltes
let allbulltes = document.querySelectorAll(".nav-bullets .bullet");
// select all links
let alllinks = document.querySelectorAll("header ul li a");
//  function concat bulltes and links to scroll (dont repeat your self)
function scroll_to_sections(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      // stop behavior all links
      e.preventDefault();
      //  scroll to section in click
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scroll_to_sections(allbulltes);
scroll_to_sections(alllinks);

// show or hide bullets
let bulletsspan = document.querySelectorAll(".option-box .bullets span");
let navbullets = document.querySelector(".nav-bullets");
let storagevalue = localStorage.getItem("bullets-option");
if (storagevalue) {
  // remove active class from all span
  bulletsspan.forEach((span) => {
    span.classList.remove("active");
    //  add active class to span clicked
    if (span.dataset.display === storagevalue) {
      span.classList.add("active");
    }
  });
  if (storagevalue === "show") {
    navbullets.style.display = "block";
  } else {
    navbullets.style.display = "none";
  }
}
bulletsspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove class active from all span
    bulletsspan.forEach((span) => {
      span.classList.remove("active");
    });
    //  add active class to span clicked
    e.target.classList.add("active");

    if (e.target.dataset.display === "show") {
      navbullets.style.display = "block";
    } else {
      navbullets.style.display = "none";
    }
    // add bullets option to local storage
    localStorage.setItem("bullets-option", e.target.dataset.display);
  });
});

//  reset all options in settings box by button(resert options)
let btn = document.querySelector(".settings-box .reset-options");
btn.onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// toogle menu
let tooglebtn = document.querySelector("header .toogle-menu");
let links = document.querySelector("header ul");

//  stop propagation for ul
links.onclick = function (e) {
  e.stopPropagation();
};

tooglebtn.onclick = function (e) {
  // stop propagation in button
  e.stopPropagation();
  //  toogle class menu-active to toogle menu
  this.classList.toggle("menu-active");
  //  toogle class open to ul
  links.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== tooglebtn && e.target !== links) {
    //  check if menu is open or not
    if (tooglebtn.classList.contains("menu-active")) {
      tooglebtn.classList.remove("menu-active");
      links.classList.remove("open");
    }
  }
});
