$(document).ready(function() {
    var $grid = $('.collection-list').isotope({
        itemSelector: '.col-lg-4',
        layoutMode: 'fitRows',
        filter: '.sladke' // Predvolený filter
    });

    $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        resetFilterBtns();
        $(this).addClass('active-filter-btn');
        $grid.isotope({ filter: filterValue });

        // Zobrazovanie tlačidiel "Späť na kategórie"
        showBackButtons(filterValue);
    });

    function resetFilterBtns() {
        $('.filter-button-group button').removeClass('active-filter-btn');
    }

    function showBackButtons(filterValue) {
        // Skryť všetky tlačidlá
        $('.back-button').hide();

        // Zobraziť tlačidlo len pre aktuálne filtrovanú kategóriu
        if (filterValue !== '*') {
            $('.back-button' + filterValue).show();
        }
    }

    // Počiatočné zobrazenie tlačidiel
    showBackButtons('.sladke'); // Predvolený filter

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


