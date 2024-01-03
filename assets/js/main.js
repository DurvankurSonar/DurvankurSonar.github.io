
(function() {
  "use strict";

 
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  
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

  /* Easy on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /* Navbar links active state on scroll*/
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /* Scrolls to an element with header offset*/
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /* Back to top button*/
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /* Mobile nav toggle*/
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /* Scrool with ofset on links with a class name .scrollto*/
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /* Scroll with ofset on page load with hash links in the url*/
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /* Hero type effect*/
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* Skills animation*/
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /* Porfolio isotope and filter*/
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /* Initiate portfolio lightbox */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /* Portfolio details slider*/
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  
  /* Animation on scroll*/
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /* Initiate Pure Counter */
  new PureCounter();

})()



/* Project Detail */
 function displayProjectDetails(projectName) {
        // You can fetch project details from a database or define them here
        var details;

        // Example details (replace this with your actual data)
        if (projectName === 'project1') {
            details = `
    <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">

		  
		  <video  controls class="col-lg-6 col-md-6 col-md-12" >
			<source src="assets/video/jalsuchna working.mp4" type="video/mp4">
		  </video>
		  
          <div class="col-lg-6">
            <div class="portfolio-info">
              <h3>Project information</h3>
              
			  PROJECT TITLE:<br><strong> JALSUCHNA ( WATER DISTRIBUTIVE SYSTEM )</strong>
                <ul style="list-style-type:square;">
				<br>
				<li>Jalsuchna is an innovative water management project tailored for the citizens of Jalgaon. This platform offers real-time updates on the water situation in the city, providing residents with the latest information regarding water availability, quality, and usage.</li>
				<li>Citizens can use Jalsuchna to stay informed about water-related news, ensuring they are aware of any water supply changes or issues. Moreover, Jalsuchna enables citizens to share their feedback and concerns, fostering a direct connection between the municipal corporation's water department and the people it serves.</li>
				<li>For municipal authorities, this platform serves as a powerful management tool. The water department head can use Jalsuchna to monitor and oversee citizens' feedback and concerns, allowing for more efficient and responsive management of water resources. Additionally, it acts as an essential intermediary between the water department head and valvemen, facilitating clear communication without the need for traditional media channels. Jalsuchna is a two-way solution that empowers both the citizens and the administrative authorities, creating a more connected and informed community.</li>
              </ul>
            </div>
          </div>
      </div>
    </section>
	
	`;
        } else if (projectName === 'project2') {
            details = ` <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">

		  
		  <video  controls class="col-lg-6 col-md-6 col-md-12" >
			<source src="assets/video/music player.mp4" type="video/mp4">
		  </video>
		  
          <div class="col-lg-6">
            <div class="portfolio-info">
              <h3>Project information</h3>
              
			  PROJECT TITLE:<br><strong> MUSIC PLAYER</strong>
                
				<ul style="list-style-type:square;">
				<br>
				<li>A music player project involves the creation of a software application designed to play and manage audio files. The development process encompasses various aspects, from user interface design to backend functionality.</li>
				<li>The music player is equipped with a range of functionalities to cater to user needs. Core features include play, pause, stop, next, and previous track controls. Additionally, the application supports volume control, repeat and shuffle modes.</li>
				<li>The music player can include an offline mode, allowing users to download their favorite tracks for offline playback. This feature is especially useful for users who want to enjoy music without an active internet connection, such as during travel or in areas with limited connectivity.</li>
              </ul>
            </div>
          </div>
      </div>
    </section> 
	
	`;
        }

        // Display details in the projectDetails div
        document.getElementById('projectDetails').innerHTML = details;
    }
