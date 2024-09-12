$(document).ready(function() {
    // Initialize Isotope
    var $grid = $('.collection-list').isotope({
        itemSelector: '.col-lg-4',
        layoutMode: 'fitRows',
        filter: '.bezlepkove' // Default filter
    });

    // Filter items on button click
    $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        resetFilterBtns();
        $(this).addClass('active-filter-btn');
        $grid.isotope({ filter: filterValue });

        // Show appropriate back buttons
        showBackButtons(filterValue);
    });

    // Reset filter buttons
    function resetFilterBtns() {
        $('.filter-button-group button').removeClass('active-filter-btn');
    }

    // Show back buttons for current filter
    function showBackButtons(filterValue) {
        // Hide all back buttons
        $('.back-button').hide();

        // Show back button for the current filter
        if (filterValue !== '*') {
            $('.back-button' + filterValue).show();
        }
    }

    // Initial display of back buttons
    showBackButtons('.special'); // Default filter

    // Close navbar menu on link click
    $('.navbar-nav .nav-link').on('click', function() {
        var navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            var bsCollapse = new bootstrap.Collapse(document.querySelector('#navMenu'), {
                toggle: false
            });
            bsCollapse.hide();
        }
    });

    // Change navbar style on scroll
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

document.addEventListener('DOMContentLoaded', function() {
    const timeInput = document.getElementById('time');
    const dateInput = document.getElementById('date');

    function updateTimeConstraints() {
        const selectedDate = new Date(dateInput.value);
        const day = selectedDate.getDay(); // 0 = nedeľa, 1 = pondelok, ..., 6 = sobota

        let minTime = '00:00';
        let maxTime = '23:59';

        if (day >= 1 && day <= 5) { // Pondelok až piatok
            minTime = '06:00';
            maxTime = '17:00';
        } else if (day === 6) { // Sobota
            minTime = '07:00';
            maxTime = '12:00';
        } else { // Nedeľa
            minTime = '00:00';
            maxTime = '00:00'; // Nedeľa je neprístupná
        }

        timeInput.setAttribute('min', minTime);
        timeInput.setAttribute('max', maxTime);

        // Deaktivovať časový vstup na nedeľu
        if (day === 0) {
            timeInput.setAttribute('disabled', 'true');
        } else {
            timeInput.removeAttribute('disabled');
        }
    }

    function setMinDate() {
        const currentDate = new Date();
        const minDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Pridať 24 hodín
        const formattedDate = minDate.toISOString().split('T')[0];

        dateInput.setAttribute('min', formattedDate);
    }

    function validateOrder() {
        const selectedDate = new Date(dateInput.value);
        const selectedTime = timeInput.value;
        const selectedDateTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedTime}`);

        const currentDate = new Date();
        const minDateTime = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Minimálne 24 hodín vopred

        if (selectedDateTime < minDateTime) {
            alert('Objednávky môžu byť vykonané iba minimálne 24 hodín vopred.');
            // Resetovanie časového vstupu
            dateInput.value = '';
            timeInput.value = '';
            return false;
        }
        return true;
    }

    // Inicializácia pri načítaní stránky
    updateTimeConstraints();
    setMinDate();

    // Aktualizácia času a dátumu pri zmene dátumu
    dateInput.addEventListener('change', function() {
        updateTimeConstraints();
        setMinDate();
        validateOrder(); // Overenie po zmene dátumu
    });

    // Blokovanie času mimo rozsahu
    timeInput.addEventListener('input', function() {
        const minTime = timeInput.getAttribute('min');
        const maxTime = timeInput.getAttribute('max');
        const currentTime = timeInput.value;

        if (currentTime < minTime) {
            timeInput.value = minTime;
        } else if (currentTime > maxTime) {
            timeInput.value = maxTime;
        }
    });

    // Validácia objednávky pri zmene času
    timeInput.addEventListener('input', validateOrder);
});

// JavaScript pre dynamické nastavenie predmetu
document.getElementById('contact-form').addEventListener('submit', function() {
    var meno = document.getElementById('name').value; // Získanie mena z inputu
    document.getElementById('subject').value = 'Prišla ti nová objedávka od ' + meno; // Nastavenie predmetu
});
    

