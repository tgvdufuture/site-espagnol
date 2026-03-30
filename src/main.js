import gsap from 'gsap';

// --- Animation du Cœur ---
const heart = document.querySelector('.hero .text img[alt="heart"]');

if (heart) {
  gsap.to(heart, {
    y: -10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// --- Animation "Premium" du CTA ---
const cta = document.querySelector('.hero .text .text-container button');

if (cta) {
  const accentColor = "#e9e5fe";
  const primaryColor = "#1a1a1a";

  cta.addEventListener('mouseenter', () => {
    gsap.to(cta, {
      backgroundColor: accentColor,
      color: primaryColor,
      duration: 0.4,
      ease: "power3.out",
      boxShadow: `0 0 20px ${accentColor}, 0 10px 30px rgba(0, 0, 0, 0.1)`
    });
  });

  cta.addEventListener('mouseleave', () => {
    gsap.to(cta, {
      backgroundColor: primaryColor,
      color: accentColor,
      duration: 0.4,
      ease: "power3.out",
      boxShadow: "0 0px 0px rgba(0,0,0,0)"
    });
  });

  gsap.to(cta, {
    boxShadow: "0 0 20px rgba(26, 26, 26, 0.15)",
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut"
  });
}

// --- Swipe Animation Logic ---
const card = document.querySelector('.hero .card');
const btnNo = document.querySelector('.buttons .no');
const btnYes = document.querySelector('.buttons .yes');

const cardImage    = document.getElementById('card-img');
const cardVideo    = document.getElementById('card-video');
const videoOverlay = document.getElementById('video-overlay');
const playBtn      = document.getElementById('play-btn');
const cardName     = card ? card.querySelector('.card-info h2') : null;
const cardTag      = card ? card.querySelector('.card-info .tag') : null;
const searchingEl  = document.getElementById('searching');
const searchProgress = document.getElementById('search-progress');

const profiles = [
  { img: './person/Line.jpg',     name: 'Line',     tag: 'Ama la vida' },
  { img: './person/Screenshot_2026-03-30-06-23-53-381_com.miui.gallery.jpg', name:'Lorette' tag:'Le gusta salir de fiesta'
  { img: './person/Melanie.jpg',  name: 'Melanie',  tag: 'Maquillaje pasión' },
  { img: './person/Zara.jpg',     name: 'Zara',     tag: 'Reservada' },
  { img: './person/Loane.png',    name: 'Loane',    tag: 'Muchos amigos' },
  { img: './person/Agathe.jpg',   name: 'Agathe',   tag: 'Muchas relaciones' },
  { img: './person/Manon.jpg',    name: 'Manon',    tag: 'Activista feminista' },
  { img: './person/Faustine.mp4', name: 'Faustine', tag: 'Muy dinámica' },
];

let profileIndex = 0;

// --- Utilitaire : est-ce une vidéo ?
const isVideo = (src) => src.toLowerCase().endsWith('.mp4');

// --- Charge un profil dans la card
function loadProfile(profile) {
  if (!cardVideo.paused) cardVideo.pause();
  videoOverlay.classList.remove('playing');
  playBtn.style.display = 'flex';

  if (isVideo(profile.img)) {
    cardImage.style.display    = 'none';
    cardVideo.style.display    = 'block';
    videoOverlay.style.display = 'flex';
    cardVideo.src = profile.img;
    cardVideo.load();
  } else {
    cardVideo.style.display    = 'none';
    videoOverlay.style.display = 'none';
    cardImage.style.display    = 'block';
    cardImage.src = profile.img;
  }

  if (cardName) cardName.textContent = profile.name;
  if (cardTag)  cardTag.textContent  = profile.tag;
}

// --- Play / Pause au clic sur l'overlay
if (videoOverlay && playBtn) {
  videoOverlay.addEventListener('click', () => {
    if (cardVideo.paused) {
      cardVideo.play();
      videoOverlay.classList.add('playing');
      playBtn.style.display = 'none';
    } else {
      cardVideo.pause();
      videoOverlay.classList.remove('playing');
      playBtn.style.display = 'flex';
    }
  });
}

// --- Écran de recherche
const showSearching = () => {
  card.style.display = 'none';
  searchingEl.style.display = 'flex';

  let progress = 0;
  const interval = setInterval(() => {
    // Ralentit exponentiellement pour ne jamais atteindre 100%
    progress += (95 - progress) * 0.008;
    searchProgress.style.width = progress + '%';
  }, 30);
};

// --- Swipe
if (card && btnNo && btnYes) {
  loadProfile(profiles[profileIndex]);
  profileIndex++;

  const swipeCard = (direction) => {
    if (card.classList.contains('swipe-left') || card.classList.contains('swipe-right')) return;

    // Stop la vidéo si elle joue
    if (!cardVideo.paused) cardVideo.pause();
    videoOverlay.classList.remove('playing');
    playBtn.style.display = 'flex';

    card.classList.add(`swipe-${direction}`);

    setTimeout(() => {
      if (profileIndex >= profiles.length) {
        card.classList.remove(`swipe-${direction}`);
        showSearching();
        return;
      }

      const profile = profiles[profileIndex];
      loadProfile(profile);
      profileIndex++;

      card.classList.remove(`swipe-${direction}`);
      card.classList.add('reset-anim');
      void card.offsetWidth;
      card.classList.remove('reset-anim');
    }, 400);
  };

  btnNo.addEventListener('click',  () => swipeCard('left'));
  btnYes.addEventListener('click', () => swipeCard('right'));
}
