$(document).ready(function() {
  // Inicializácia Isotope
  var $grid = $('.collection-list').isotope({
      itemSelector: '.col-lg-4',
      layoutMode: 'fitRows',
      filter: '.sladke' // Predvolený filter
  });

  // Aktivácia filtra
  $('.filter-button-group').on('click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      resetFilterBtns();
      $(this).addClass('active-filter-btn');
      $grid.isotope({ filter: filterValue });
  });

  function resetFilterBtns() {
      $('.filter-button-group button').removeClass('active-filter-btn');
  }

  // Zatvorenie menu po kliknutí na položku
  $('.navbar-nav .nav-link').on('click', function() {
      var navbarToggler = document.querySelector('.navbar-toggler');
      if (navbarToggler) {
          var bsCollapse = new bootstrap.Collapse(document.querySelector('#navMenu'), {
              toggle: false
          });
          bsCollapse.hide();
      }
  });

  // Zmena štýlu navbar pri skrolovaní
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