class SrapSlider {
  constructor (speed = 1, interval = 4, timingFunction = 'ease-in-out') {
      this.sliderInit(speed, interval, timingFunction);
      this.indicatorsInit();
      this.addEvent();
  }

  sliderInit(speed, interval, timingFunction) {
      this.srapSlider = document.querySelector('.srap-slider');
      this.prevBtn = document.querySelector('.prevBtn');
      this.nextBtn = document.querySelector('.nextBtn');
      this.slides = document.querySelectorAll('.srap-slider .slide');
      this.imgHeight = document.querySelector('.srap-slider .slide img').clientHeight;
      this.srapSlider.style.height = `${this.imgHeight}px`;

      this.activeIndex = 0;
      this.slideDirection = 'toRight';

      this.slideSpeed = speed; // second
      this.timeoutDuration = speed * 1000 + 100;
      this.interval = interval * 1000; // slide interval

      for(let slide of this.slides) {
          slide.style.transitionDuration = `${this.slideSpeed}s`;
          slide.style.animationDuration = `${this.slideSpeed}s`;
          slide.style.transitionTimingFunction = `${timingFunction}`;
          slide.style.animationTimingFunction = `${timingFunction}`;
      }

      this.sliderAutoSlide();
  }

  sliderAutoSlide() {
      this.autoSlide = setInterval(() => {
          this.toRight();
      }, this.interval);
  }

  restartAutoSlide(eventObject) {
      if(typeof eventObject == 'object') {
          clearInterval(this.autoSlide);
          clearTimeout(this.autoSlideTimout);
          this.autoSlideTimout = setTimeout(() => {
              this.sliderAutoSlide()
          }, this.interval);
      }
  }

  indicatorsInit() {
      this.sliderIndicators = document.querySelector('.slider-indicators');
      let indicatorsHTML = '';
      for(let i = 0; i < this.slides.length; i++) {
          indicatorsHTML += `<li class="indicator" data-indicator-index="${i}"></li>`;
      }
      this.sliderIndicators.innerHTML = indicatorsHTML;
      this.indicators = document.querySelectorAll('.indicator');
      this.indicators[this.activeIndex].classList.add('indicator-active');
  }

  addEvent() {
      this.toRight = this.toRight.bind(this);
      this.toLeft = this.toLeft.bind(this);
      this.indicatorsClick = this.indicatorsClick.bind(this);

      this.nextBtn.addEventListener('click', this.toRight);
      this.prevBtn.addEventListener('click', this.toLeft);
      for(let indicator of this.indicators) {
          indicator.addEventListener('click', this.indicatorsClick);
      }

      window.addEventListener('resize', () => {
          this.imgHeight = document.querySelector('.srap-slider .slide img').clientHeight;
          this.srapSlider.style.height = `${this.imgHeight}px`;
      });
  }

  removeEvent() {
      this.nextBtn.removeEventListener('click', this.toRight);
      this.prevBtn.removeEventListener('click', this.toLeft);
      for(let indicator of this.indicators) {
          indicator.removeEventListener('click', this.indicatorsClick);
      }
  }

  toRight(eventObject) {
      this.slideDirection = 'toRight';
      this.changeIndicator(this.activeIndex);
      this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev', 'active-next');
      this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next', 'active-prev');
      this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');
      this.slides[this.activeIndex].classList.add('active-prev');
      if(this.activeIndex === this.slides.length - 1) this.activeIndex = 0;
      else this.activeIndex++;
      this.slides[this.activeIndex].classList.add('active-from-right');
      this.removeEvent();
      setTimeout(() => {
          this.addEvent();
      }, this.timeoutDuration);
      console.log(typeof eventObject);
      this.restartAutoSlide(eventObject);
  }

  toLeft(eventObject) {
      this.slideDirection = 'toLeft';
      this.changeIndicator(this.activeIndex);
      this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev', 'active-next');
      this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next', 'active-prev');
      this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');
      this.slides[this.activeIndex].classList.add('active-next');
      if(this.activeIndex == 0) this.activeIndex = this.slides.length - 1;
      else this.activeIndex--;
      this.slides[this.activeIndex].classList.add('active-from-left');
      this.removeEvent();
      setTimeout(() => {
          this.addEvent();
      }, this.timeoutDuration);
      this.restartAutoSlide(eventObject);
  }

  indicatorsClick(eventObject) {
      this.changeIndicator(eventObject);
      if(+eventObject.target.dataset.indicatorIndex == this.activeIndex) return false;
      let toLeft = false;
      if(+eventObject.target.dataset.indicatorIndex < this.activeIndex) toLeft = true;
      this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev');
      this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next');
      this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');
      if(!toLeft) {
          this.slides[this.activeIndex].classList.add('active-prev');
          this.activeIndex = +eventObject.target.dataset.indicatorIndex;
          this.slides[this.activeIndex].classList.remove('active-prev', 'active-next');
          this.slides[this.activeIndex].classList.add('active-from-right');
      }
      else {
          this.slides[this.activeIndex].classList.add('active-next');
          this.activeIndex = +eventObject.target.dataset.indicatorIndex;
          this.slides[this.activeIndex].classList.remove('active-prev', 'active-next');
          this.slides[this.activeIndex].classList.add('active-from-left');
      }
      this.removeEvent();
      setTimeout(() => {
          this.addEvent();
      }, this.timeoutDuration);
      this.restartAutoSlide(eventObject);
  }

  changeIndicator(data) {
      if(typeof data == 'object') {
          this.indicators[this.activeIndex].classList.remove('indicator-active');
          this.indicators[data.target.dataset.indicatorIndex].classList.add('indicator-active');
      }
      else if(typeof data == 'number') {
          this.indicators[this.activeIndex].classList.remove('indicator-active');
          (this.slideDirection == 'toRight') ? this.indicators[this.checkIndex(this.activeIndex + 1)].classList.add('indicator-active') : (this.slideDirection == 'toLeft') ? this.indicators[this.checkIndex(this.activeIndex - 1)].classList.add('indicator-active') : this.error = true;
      }
  }

  checkIndex(i) {
      if(i > this.slides.length - 1) return i - this.slides.length;
      else if(i < 0) return i + this.slides.length;
      else return i;
  }
}

new SrapSlider(1, 4, 'ease-in-out');