'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainers = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////
/////*********************//////
//////Selecting elements/////////
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); //renvoi une nodeList des element
const allButtons =
  document.getElementsByTagName('button'); /*renvoi une htmlCollection qui
est mieu car si on supprime un truc comme un bouton alors ca se met a jour direct */

///////********************//////
///////Creer et inserver des elements ://///
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for impoved. <button class="btn btn--close--cookie">Got it!!</button>';

header.prepend(message); //le met tout en haut du header
//header.append(message); //le met tout en bas du header
//header.append(message.cloneNode(true)); // cela va cloner le premier et on aura en haut et en bas
//header.before(message);//va mettre le message juste avant le header (en dehors de header)
//header.after(message);//va mettre le message juste apres le header (en dehors de header)

////**********************///////
//Delete elements :///quand on va clicker sur got it du message il va s enlever
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//************* ///
//Styles//
//message.style.backgroundColor = 'yellow';
message.style.width = '120%';
//si on a l epaisseur du message qui est de 43px et qu on veut l aggrandir alors on fera:
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// en gros on parse le 43px en number en base 10 decimal et on ajoute les 40px!

// si on veut changer une couleur qui est dans root de notre css on fait ca:
//document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes: on peut faire des set et get ensuite pour modifier ou recup des caracteristique de la classe logo
const logo = document.querySelector('.nav__logo');

//Data Attributes: si on ajoute dans img de logo sous id date-version-number="3.0"
//console.log(logo.dataset.versionNumber);//renvera 3.0

//Dans le site quand on clique sur learn more ca descend :
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // renvoi les coordonees de la section1
  //scorling:
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //scroling avec un effet sympa:EXCELLENT CA
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // ******* //
  // le meilleur moyen moderne de le faire maintenant c est :
  section1.scrollIntoView({ behavior: 'smooth' });
});

//quand on va passer avec la souris sur l element ca va etre un evenement qu on decidera
//facon1: et meilleure

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('gg1');
// });

//facon2:
// const h1 = document.querySelector('h1');
// h1.onmouseenter = function (e) {
//   alert('gg facon2');
// };

//facon3: permet de supprimer l event apres l alert comme ca ca le fait qu une fois:
// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('gg function');
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// une couleur c est rgb(255,255,255) pour rouge par exemple donc pr une couleur au hasard:
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   //e.stopPropagation(); // si on met pas ca ca changera la couleur des 2 autres car ils ont
//   //la fonction aussi qui change la couleur car lui c est l'element fils !
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

/*
*********PAGE NAVIGATION**********
on peut faire opt1 pour qca passe sur chaque element href de nav__link mais cest pas
l ideal car si il y a 1000 href cela va impacter la performance donc on devra faire opt2
Opt1:
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e, i) {
    e.preventDefault();
    const id = this.getAttribute('href'); // va prendre les href de nav__link donc section1 section2 etc
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/
//Opt2: delegation d evenement (le parent pour tous les enfants pour pas impacter la perf)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //verifier si l element est bien un nav__link et pas un espace entre les click par ex
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // va prendre les href de nav__link donc section1 section2 etc
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
Imaginons que nous ayons un titre dans html h1 avec dedans when banking meets minimalist
pour le selectionner deja on fait const h1=document.querySelector('h1');
et que banking et minimalist soit une classe qui met le mot surligne on peut donc en faisant
h1.firstElementChild.style.color= 'white' mettre le premier mot (banking) ecrit en blanc et
avec  h1.lastElementChild.style.color= 'orange' mettre le dernier mot ecrit en orange

pour faire une sorte de delegation d evenement on peut egalement faire du going upwards:
h1.closest('.header').style.background = 'orange' ou prendre un valeur du css pour la couleur
comme ca h1.closest('.header').style.background = 'var(--gradient-secodary)';
si on fait h1.closest('.h1').style.background = 'var(--gradient-primary)'; alors ca changera
la couleur seulement de l encadrage qui est le parent du h1 
donc en conclustion ca fait effet sur l element parent au dessus de l element selectionner
*/

/*going sideways : pour obtenir les "freres" c est a dire les autres trucs du header par exemple
console.log(h1.previousElementSibling); donnera celui d avant mais ici le h1 est le premier elem du header donc rendra null
console.log(h1.nextElementSibling); donnera celui d apres le h1 c est a dire ici le texte "a simpler banking"
pour prendre tous les elements frere on peut faire h1.parentElement.children qui va en 
gros prendre le parent de h1 grace a parentElement et ensuite tt les enfants grace a .children
*/

/* si on veut modifier les element freres par exemple on doit faire comme ca : 
[...h1.parentElement.children] qui va donc creer un tableau avec tout les element du header
on fait une boucle forEach et on verif avec une condition if et si c est bon on change expl:
[...h1.parentElement.children].forEach(function(el){
  if(el !== h1) el.style.transform = 'scale(0.5)'; ceci transforme la taille de 50% des non h1
  ou on peut modif la couleur aussi en changeant le return du if en el.style.color='blue'
});
*/

//On veut faire activer le tableau avec 01-02-03 de notre site pour qu il change qd ca clik
// on pourrai faire tabs.forEach(t=>t.addEventListener('click',()=>console.log('tab'))); pr
//selectionner chaque bouton mais ce n est pas l ideal comme vu au dessus si on en a 2000.
//on va utiliser un event delegation pour pas perdre en performance :
tabsContainers.addEventListener('click', function (e) {
  e.preventDefault();
  //const clicked = e.target.parentElement; // on ajoute parentElement car ici dans les boutons
  // ya 2 elemnt le span 03 et le txt pr ex instant closing dc on veut prendre le tt ensble
  //mais nous on veut pas selectionner tous les element parents mais seulement le premier au dessus donc:
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return; // pour eviter les null que ca bloque
  //activer le tab qui monte et descend
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // on supprime tout les boutons activer
  clicked.classList.add('operations__tab--active'); // on fait monter le bouton cliquer

  //activer le contenu texte:
  //mais avant on enleve le texte activer avant le nouveau click
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); //dans le css cette classe fait display
  /*petit rappel 
  dans notre tableau le chiffre du texte voulu est stocker dans data-tab et on avait dit 
  pour prendre une valeur dans une variante data on fait dataset.tab ou tab est le nom.*/
});

/*On veut faire un menu fade animation c-a-d quand on selectionne un element les autres perde
en tonalite ils seront moins sombre */
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// //si on enleve la souris du nav on remet en opacite 1
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

//evidement on ne va pas aimer repeter 2 fois le code donc on creer la function:
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
//mtn on appel les 2 mouseover et mouseout:
nav.addEventListener('mouseover', function (e) {
  //on est oblige de faire func callback car
  //addEvent attend une fonction et nous avons besoin de mettre l opacite dedans donc oblige
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// on veut etiquetter la bar de navigation a partir d un moment ou on descend sur le site:
// cette methode n est pas top pour la perf surtt sur tel,apres on verra comment faire mieux
// const initialCoords = section1.getBoundingClientRect(); //pour prendre les coordone de section1
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//on va donc faire cela proprement en faisant intersection observer API:
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {});
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // ca c est pour faire apparaitre la nav pile avant ou on veut de la taille de la nav
});
headerObserver.observe(header);

// on veut ajout un effet sur les sectio1,2,3,4 que quand ca passe dessus ca fait un effet:
const allSections2 = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // une fois plus besoin on arrete l observation
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections2.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading image : pour avoir des images qui pesent moins lourds et donc amelio la perf
const imgTargets = document.querySelectorAll('img[data-src]'); // on veut prendre juste les
//image qui st data-src pr ps prendre tt les imgs,on ve ps bosser ici avec le logo par exp
// avant tout faut mettre dans le html ca <img src="img/digital-lazy.jpg" data-src="img/digital.jpg" alt="Computer" class="features__img lazy-img"/>
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //une fois la photo charger on veut supprimer le blur
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //va servir a charger l img 200px avnt pr pas que l on voit le blur
});

imgTargets.forEach(img => imgObserver.observe(img));

/* ***********SLIDER************** */
const slider = function () {
  //on va vouloir faire un slide que qd on clique sur les fleches ca fasse defiler un truc:
  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length;
  let curSlide = 0;
  //const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots'); // select les pnts en dessous des photo
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  //slider.style.transform = 'scale(0.5) translateX(-500px)'; //reduit la taille des images et le translateX c pour decaler les images sur lhorizotal
  //slider.style.overflow = 'visible'; //ca va mettre les autres images visible a cote
  //slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`)); // meme code que ligne 374 donc fonction

  /* ******** FONCTIONS *********** */
  //fonction des points en dessous de la photo:
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //fonction qui changera la couleur par exemple des rond selectionnes pr changer l image:
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //activer le rond blanc sur l image 0 quand le site est lancer

  //fonction slide:
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //mtn on va creer la fonction du code pour le click gauche et droit
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    // slides.forEach(    // meme code que ligne 366 donc on va creer sa fonction
    //   (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    // );
    //le calcul ds forEach va faire qu en gros on aura de -100,0,100,200 au lieu de 0,100,200,300
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    // slides.forEach(    // meme code que ligne 366 donc on va creer sa fonction
    //   (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    // );
    //le calcul ds forEach va faire qu en gros on aura de -100,0,100,200 au lieu de 0,100,200,300
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // on va faire une fonction init qui appel les fonctions ou elles sont appeles les meme:

  const init = function () {
    goToSlide(0); // au debut au lancement de la page on appel avec 0 le gotoslide
    createDots();
    activateDot(0);
  };
  init();

  /* ********* Event Handler ********** */
  //clique sur les boutons gauche et droite:
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //clavier fleche gauche et droite:
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  //si on clique sur les points ca permet de passer les diapo:
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //= const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
