(() => {

  // ----- VARIABLES -----

  const projectsProgressBar = document.querySelector('.projects__progress-bar');
  const mainProjectsContainer = document.querySelector('.main__section-projects');
  const mainContactContainer = document.querySelector('.main__section-contact');
  const projectImages = [...document.querySelectorAll('.project-image')];
  const projectWrapper = [...document.querySelectorAll('.projects__wrapper')][0];
  const projectHeadingWrapper = document.querySelector('.section-projects__text-wrapper');
  const contactEmail = document.querySelector('.contact__email');
  const timeline = document.querySelector('.timeline');
  const menuOpenButton = document.querySelector('.nav__menu-button');
  const navMenu = document.querySelector('.nav__list');
  
  // ----- METHODS -----

  // toggle navigation
  function toggleNav() {
    const display = window.getComputedStyle(menuOpenButton).getPropertyValue('display');
    if (display === 'flex') {
      menuOpenButton.classList.add('close');
      menuOpenButton.classList.remove('open');
    } else {
      menuOpenButton.classList.add('open');
      menuOpenButton.classList.remove('close');
    }
    navMenu.classList.add('open');
    navMenu.classList.remove('close');
  }

  function showmenuButton(e) {
    if (
      (document.body.clientWidth < 800 && e.target.tagName === 'UL') || 
      (document.body.clientWidth < 800 && e.type === 'resize') ||
      e.type === 'click'
      ) {
      menuOpenButton.classList.add('open');
      menuOpenButton.classList.remove('close');
      navMenu.classList.add('close');
      navMenu.classList.remove('open');
    } else if (document.body.clientWidth > 800) {
      menuOpenButton.classList.add('close');
      menuOpenButton.classList.remove('open');
      navMenu.classList.add('open');
      navMenu.classList.remove('close');
      console.log('click');
      
    }
  }

  // determine zoom
  const getPagezoom = () => (1903 / document.body.clientWidth).toFixed(2);

  // Big h1 Project heading, not letting it get positioned too high or low -> proper alignment with project section
  const placeProjectHeading = {
    placetop: () => {
      if (document.body.clientWidth < 800) return;
      const margin = projectHeadingWrapper.style.marginTop;
      const topImageOffset = projectImages[0].offsetTop +15;
      
      if (margin < topImageOffset) {
        projectHeadingWrapper.style.marginTop = `clamp(${topImageOffset}px, ${topImageOffset}px, ${topImageOffset}px)`;
      }
    },
    placebottom: (hoverin = false) => {
      if (document.body.clientWidth < 800) return;
      const wrapperHeight = 494 / projectWrapper.clientHeight;
      // console.log('resize ' + document.body.clientWidth);
      
      if (hoverin) {
        projectHeadingWrapper.style.marginBottom = `${24.6 / getPagezoom() * wrapperHeight}rem`;
      } else if (!hoverin) {
        projectHeadingWrapper.style.marginBottom = `${11.25}rem`;
      }
      setTimeout(() => timelineLength(), 500);
    }
  };
  
  // determine left timeline length depending on last container breakpoint -> dynamic height, no overflow
  function timelineLength() {
    const endpoint = mainContactContainer.offsetTop;
    timeline.style.height = `${endpoint + 40}px`;
  }
  timelineLength();
  
  // like above, determine when sections are passed by so the number in the timeline coutnts accurately
  function timelineCount() {
    const containerStops = [mainProjectsContainer.offsetTop, mainContactContainer.offsetTop];
    const bodyHeight = Math.abs(document.body.getBoundingClientRect().y) +300;
    // console.log(containerStops[1]);
    // console.log(bodyHeight);
    if (bodyHeight > containerStops[0] && bodyHeight < containerStops[1]) {
      timeline.firstElementChild.textContent = '02';
    } else if (bodyHeight > containerStops[1]) {
      // console.log('now');
      timeline.firstElementChild.textContent = '03';
    } else {
      timeline.firstElementChild.textContent = '01';
    }
  }
  
  // calculate red progress bar height for project section
  function changeProjectProgress() {
    if (document.body.clientWidth < 801) {
      projectsProgressBar.style.height = `110%`;
      return;
    }
    const rect = mainProjectsContainer.getBoundingClientRect();
    const calcValues = [rect.y -250, rect.height];
    if ( calcValues[0] < 0 && calcValues[0] > - (rect.height -100) ) {
      const newHeight = ( Math.abs(calcValues[0]) / calcValues[1] ) * 150;
      projectsProgressBar.style.height = `${newHeight}%`;
    } else if (rect.y > 0) {
      projectsProgressBar.style.height = `0%`;
    }
  }

  // quick click to copy email to clipboard, switch text of popup
  function emailToClipboard() {
    navigator.clipboard.writeText('Fabian.wollmer@gmail.com');
    contactEmail.firstElementChild.textContent = 'copied!';
    setTimeout(() => contactEmail.firstElementChild.textContent = 'click to copy', 2000);
  }
  
  // ----- INITIALIZERS/LISTENERS -----

  // window.addEventListener('wheel', (e) => {
  //   window.scroll({
  //     behavior: "smooth",
  //     top: window.pageYOffset + e.deltaY
  //   });
  // }, { passive: false });

  menuOpenButton.addEventListener('click', toggleNav);

  window.addEventListener('resize', showmenuButton);

  window.addEventListener('scroll', (e) => {
    changeProjectProgress();
    placeProjectHeading.placetop();
    timelineCount();
    timelineLength();
  });

  projectImages[2].addEventListener('pointerover', () => {
    placeProjectHeading.placebottom(true);
  });
  projectImages[2].addEventListener('pointerout', () => {
    placeProjectHeading.placebottom(false);
    timelineLength();
  });

  contactEmail.addEventListener('click', emailToClipboard);

  navMenu.addEventListener("pointerout", showmenuButton);
  [...navMenu.children].forEach(el => {
    el.addEventListener('click', showmenuButton);
  });

})();