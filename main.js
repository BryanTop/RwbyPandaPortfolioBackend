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

let projects = [
    {"name": 'Weight Converter', 'src': '/images/WeightConverter.png', 'url': '/weightConverter/WeightConverter.html'},
    {"name": 'Parallax Website', 'src': '/images/Parallax.png', 'url': '/parallaxWebsite/index.html'},
    {"name": 'Full Page Landing Page', 'src': '/images/FullpageLanding.png', 'url': '/landingPage/index.html'},
    {"name": 'Three Page Website', 'src': '/images/ThreePageWebsite.png', 'url': '/fullThreePageWebsite/index.html'},
    {"name": 'Calculator', 'src': '/images/calculator.png', 'url': '/calculator/calculator.html'},
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
        let i = document.createElement('img');
        let a = document.createElement('a');
        let div = document.createElement('div');

        h3.innerText = project.name;
        i.src = project.src;
        a.href = project.url;
        
        a.appendChild(h3);
        a.appendChild(i);

        a.style.color = 'white';
        a.style.textDecoration = 'none';
        a.style.background = 'blue'

        div.classList = ['col-md-3', 'm-3', 'col-xs-1'];
        div.style.margin = '10px';
        div.appendChild(a);
        projectArea.appendChild(div);
        
    })

    new TypeWriter(txtElement, words, wait);
}
