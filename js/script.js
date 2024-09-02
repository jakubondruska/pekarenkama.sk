
$(document).ready(function(){
  // init Isotope with initial filter
  var $grid = $('.collection-list').isotope({
    itemSelector: '.col-lg-4',
    layoutMode: 'fitRows',
    filter: '.sladke' // Set the initial filter
  });


  // Set initial active class for "sladke" category button
  $('.filter-button-group button[data-filter=".sladke"]').addClass('active-filter-btn');


  // filter items on button click
  $('.filter-button-group').on('click', 'button', function(){
    var filterValue = $(this).attr('data-filter');
    resetFilterBtns();
    $(this).addClass('active-filter-btn');
    $grid.isotope({ filter: filterValue });
  });


  var filterBtns = $('.filter-button-group').find('button');
  function resetFilterBtns(){
    filterBtns.each(function(){
      $(this).removeClass('active-filter-btn');
    });
  }


  // Zatvorenie menu pri kliknutí na položku
  $('.navbar-nav .nav-link').on('click', function () {
    var navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      var bsCollapse = new bootstrap.Collapse(document.querySelector('#navMenu'), {
        toggle: false
      });
      bsCollapse.hide();
    }
  });

  // Pri skrolovaní stránky
  window.onscroll = function() {
    var navbar = document.querySelector('.navbar');
    var iconsSection = document.querySelector('#icons-section');
    var iconsSectionBottom = iconsSection.offsetTop + iconsSection.offsetHeight;

    if (window.pageYOffset > iconsSectionBottom) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
  };
});

// JavaScript pre spracovanie formulára
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector("#submit-btn");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

// Inicializácia EmailJS
const publicKey = "-TuZIFWmyqcjvd4SQ";
const serviceID = "service_oasu7i8";
const templateID = "template_zfrg68r";

emailjs.init(publicKey);

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  submitBtn.innerText = "Just a moment...";

  const inputFields = {
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value
  };

  emailjs.send(serviceID, templateID, inputFields)
  .then(() => {
    submitBtn.innerText = "Message Sent Successfully";
    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
  }, (error) => {
    console.log(error);
    submitBtn.innerText = "Something went wrong";
  });
});

