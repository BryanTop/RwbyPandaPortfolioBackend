const TypeWriter = function(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleteing = false;
}

let projectArea = document.querySelector('#projectArea');
let projectNameArea = document.getElementsByClassName('projectName');
let sliderImages;

let projects = [
    {"name": 'Weight Converter', 'src': './mainPage/images/WeightConverter.png', 'url': './weightConverter/index'},
    {"name": 'Parallax Website', 'src': './mainPage/images/Parallax.png', 'url': './parallaxWebsite/index'},
    {"name": 'Full Page Landing Page', 'src': './mainPage/images/FullpageLanding.png', 'url': './landingPage/index'},
    {"name": 'Calculator', 'src': './mainPage/images/calculator.png', 'url': './calculator/index'},
    {"name": 'Three Page Website', 'src': './mainPage/images/ThreePageWebsite.png', 'url': './fullThreePageWebsite/index'},
    {"name": 'Number Wizard', 'src': './mainPage/images/NWUI.png', 'url': './NWUI/index'},
]




TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleteing) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);        
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

    let typeSpeed = 300;

    if(this.isDeleteing) {
        typeSpeed /= 2;
    }

    if (!this.isDeleteing && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleteing = true;
    } else if(this.isDeleteing && this.txt === '') {
        this.isDeleteing = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}


document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.getElementById('anim');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    projects.forEach((project) => {
        let h3 = document.createElement('h3');
        let img = document.createElement('img');
        let a = document.createElement('a');
        let div = document.createElement('div');

        h3.innerText = project.name;
        img.src = project.src;
        a.href = project.url;
        
        a.appendChild(h3);
        a.appendChild(img);

        a.style.color = 'white';
        a.style.textDecoration = 'none';
        a.style.background = 'blue'

        div.classList = ['col-md-3', ' m-3', ' col-xs-1', ' project'];
        div.style.margin = '2rem';
        div.appendChild(a);
        projectArea.appendChild(div);
    })

    new TypeWriter(txtElement, words, wait);

    sliderImages = document.querySelectorAll('.project');
}

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function checkSlide() {
    sliderImages.forEach(sliderImage => {
      // half way through the image
      console.log(sliderImage.height);
      const slideInAt = (window.scrollY + window.innerHeight) - sliderImages[0].children[0].children[1].height / 2;
      // bottom of the image
      const imageBottom = sliderImage.offsetTop + sliderImages[0].children[0].children[1].height;
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', debounce(checkSlide));
