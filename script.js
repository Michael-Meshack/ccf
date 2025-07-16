document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        offset: 120, // déclenche l'animation 120px avant l'élément
        duration: 800, // durée plus courte pour un effet plus naturel
        easing: 'ease-in-out', // courbe d'animation plus douce
        once: false // répète l'animation au scroll
    });
});

// Menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // Active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // If want to use animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Animation footer on scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
};

// Form submission with SweetAlert2
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const inscriptionForm = document.getElementById('inscriptionForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Message envoyé!',
                        text: 'Nous vous contacterons bientôt.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.reset();
                } else {
                    throw new Error('Erreur réseau');
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Une erreur est survenue. Veuillez réessayer plus tard.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        });
    }

    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Inscription réussie!',
                        text: 'Nous avons bien reçu votre demande d\'inscription.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.reset();
                } else {
                    throw new Error('Erreur réseau');
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.heading, .about-img, .about-content, .btn-box.btns, .prof-container, .education .education-row, .cours-container, .inscription form, .contact form').forEach(el => {
        observer.observe(el);
    });

    // Text animation for home section
    const text = document.querySelector('.home-content .text-animate h3');
    if (text) {
        const textContent = text.textContent;
        text.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < textContent.length) {
                text.textContent += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 2000);
    }
});

// Modal functionality for "Voir plus" buttons
const boutonsVoirPlus = document.querySelectorAll('.btn1');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeButtons = document.querySelectorAll('.close');

if (boutonsVoirPlus.length && modal) {
    boutonsVoirPlus.forEach(bouton => {
        bouton.addEventListener('click', (e) => {
            e.preventDefault();
            const idCours = bouton.getAttribute('href').replace('#', '');
            const contenuCours = document.getElementById(idCours);
            if (contenuCours) {
                modalBody.innerHTML = contenuCours.innerHTML;
                modal.style.display = 'block';
            }
        });
    });

    closeButtons.forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}