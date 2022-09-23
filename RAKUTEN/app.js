  // //slide-wrap
  // const slideWrapper = document.getElementById('slider-wrap');

  // //current slideIndexition
  // let slideIndex = 0;
  // //items
  // const slides = document.querySelectorAll('#slider-wrap ul li');
  // //number of slides
  // let totalSlides = slides.length;
  // //get the slide width
  // let sliderWidth = slideWrapper.clientWidth;
  // //set width of items
  // slides.forEach(function (element) {
  //     element.style.width = sliderWidth + 'px';
  // });
  // //set width to be 'x' times the number of slides
  // const slider = document.querySelector('#slider-wrap ul#slider');
  // slider.style.width = sliderWidth * totalSlides + 'px';

  // const pageNav = document.getElementById('slider-pagination-wrap');
  // // console.log(pageNav);
  
  // // next, prev
  // const nextBtn = document.getElementById('next');
  // const prevBtn = document.getElementById('previous');

  // nextBtn.addEventListener('click', function () {
  //   // console.log(nextBtn);
  //     plusSlides(1);
  //   });
  //   prevBtn.addEventListener('click', function () {
  //   // console.log(prevBtn);
  //     plusSlides(-1);
  // });
  
  // // hover
  // slideWrapper.addEventListener('mouseover', function () {
  //     this.classList.add('active');
  //     clearInterval(autoSlider);
  // });
  // slideWrapper.addEventListener('mouseleave', function () {
  //     this.classList.remove('active');
  //     autoSlider = setInterval(function () {
  //         plusSlides(1);
  //     }, 5000);
  // });
  
  
  // function plusSlides(n) {
  //     showSlides(slideIndex += n);
  // }
  
  // function currentSlides(n) {
  //     showSlides(slideIndex = n);
  // }
  
  // function showSlides(n) {
  //     slideIndex = n;
  //     if (slideIndex == -1) {
  //         slideIndex = totalSlides - 1;
  //     } else if (slideIndex === totalSlides) {
  //         slideIndex = 0;
  //     }
  
  //     slider.style.left = -(sliderWidth * slideIndex) + 'px';
  //     pagination();
  // }
  
  // //pagination
  // slides.forEach(function () {
  //     let li = document.createElement('li');
  //     document.querySelector('#slider-pagination-wrap ul').appendChild(li);
  // })
  
  // function pagination() {
  //     let dots = document.querySelectorAll('#slider-pagination-wrap ul li');
  //     dots.forEach(function (element) {
  //         element.classList.remove('active');
  //     });
  //     dots[slideIndex].classList.add('active');
  // }
  
  // pagination();
  // let autoSlider = setInterval(function () {
  //     plusSlides(1);
  // }, 3000);

  // console.dir(window);
  // console.log(innerWidth);


  const carousel = document.querySelector(".carousel");
  const sections = [...document.querySelectorAll(".carousel li")];
  
  const options = { threshold: 0.4 };
  
  const itemsCallback = (entries) => {
    entries.forEach((entry, index) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  };
  
  const firstItemCallback = (entries) => {
    entries.forEach((entry, index) => {
      carousel.classList.toggle("is-start", entry.isIntersecting);
    });
  };
  
  const lastItemCallback = (entries) => {
    entries.forEach((entry, index) => {
      carousel.classList.toggle("is-end", entry.isIntersecting);
    });
  };
  
  const itemsObserver = new IntersectionObserver(itemsCallback, options);
  const firstItemsObserver = new IntersectionObserver(firstItemCallback, options);
  const lastItemObserver = new IntersectionObserver(lastItemCallback, options);
  
  sections.forEach((section, index) => {
    itemsObserver.observe(section);
  });
  firstItemsObserver.observe(sections[0]);
  lastItemObserver.observe(sections[sections.length - 1]);
  
  document.querySelector("#prev-button").addEventListener('click', evt => {
    const firstVisibleItem = carousel.querySelector('.is-visible');
    const prevItemIndex = sections.indexOf(firstVisibleItem) - 1;
    const prevItem = sections[prevItemIndex];
    if (prevItem){
      prevItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  })
  
  document.querySelector("#next-button").addEventListener('click', evt => {
    const nextItem = carousel.querySelector('.is-visible+li:not(.is-visible)');
    if (nextItem){
      nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
    }
  })
  

