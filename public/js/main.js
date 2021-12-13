
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }




  // requirejs([
  //   '../vendor/isotope/isotope.pkgd.min.js'
  // ], function (Isotope) {
  //   var iso = new Isotope('.gird', {
  //     layoutMode: 'masonryHorizontal'
  //   })
  // })

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  let bottomHeader = select('.bottom-header')
  if (backtotop && bottomHeader) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
        bottomHeader.classList.add('scrolled')
      } else {
        backtotop.classList.remove('active')
        bottomHeader.classList.remove('scrolled')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }


  on('click', '.toggles .btn-list', function (e) {
    e.stopPropagation();
    e.preventDefault();

    this.classList.add('active');
    select('.toggles .btn-grid').classList.remove('active');

    select('.items .card').classList.add('col-12');

    select('.items .card').classList.add('row');

    // select('.card.listing').classList.add('d-none');
    // select('.card.grid').classList.remove('d-none');
  })

  on('click', '.toggles .btn-grid', function (e) {
    e.stopPropagation();
    e.preventDefault();

    this.classList.add('active');
    select('.toggles .btn-list').classList.remove('active');

    select('.items .card').classList.remove('row');


    // select('.card.grid').classList.add('d-none');
    // select('.card.listing').classList.remove('d-none');
  })


  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)




  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
   */
  // new Swiper('.agencies-slider', {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20
  //     },
  //     576: {
  //       slidesPerView: 2,
  //       spaceBetween: 20
  //     },

  //     768: {
  //       slidesPerView: 3,
  //       spaceBetween: 20
  //     },

  //     1200: {
  //       slidesPerView: 6,
  //       spaceBetween: 20
  //     }
  //   }
  // });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });



})()
