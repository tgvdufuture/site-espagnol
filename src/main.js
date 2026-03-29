import gsap from 'gsap';

// --- Animation du Cœur ---
const heart = document.querySelector('.hero .text img[alt="heart"]');

if (heart) {
  gsap.to(heart, {
    y: -70,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// --- Animation "Premium" du CTA ---
const cta = document.querySelector('.hero .text .text-container button');

if (cta) {
  const accentColor = "#e9e5fe"; // Mauve clair
  const primaryColor = "#1a1a1a"; // Noir



  // 2. Hover Effect (Couleur)
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

  // 3. Pulse Idle (très subtil sur l'ombre)
  gsap.to(cta, {
    boxShadow: "0 0 20px rgba(26, 26, 26, 0.15)",
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut"
  });
}

// --- Swipe Animation Logic pour swipe.html ---
const card = document.querySelector('.hero .card');
const btnNo = document.querySelector('.buttons .no');
const btnYes = document.querySelector('.buttons .yes');
const cardImage = card ? card.querySelector('img') : null;
const cardName = card ? card.querySelector('.card-info h2') : null;
const cardTag = card ? card.querySelector('.card-info .tag') : null;

// Dummy profiles data
const profiles = [
  { img: './person/Manon.jpg', name: 'Manon', tag: 'Activista feminista' },
  { img: './person/Loane.png', name: 'Loane', tag: 'Muchos amigos' },
  { img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop', name: 'Emma', tag: 'Accro au sport' },
  { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop', name: 'Léa', tag: 'Fan de musique' }
];

let profileIndex = 0;

if (card && btnNo && btnYes) {
  // Initialize first card
  if (cardImage && cardName && cardTag) {
    const defaultProfile = profiles[profileIndex];
    cardImage.src = defaultProfile.img;
    cardName.textContent = defaultProfile.name;
    cardTag.textContent = defaultProfile.tag;
    profileIndex++;
  }

  const swipeCard = (direction) => {
    // Prevent multiple clicks during animation
    if (card.classList.contains('swipe-left') || card.classList.contains('swipe-right')) return;

    // 1. Swipe out
    card.classList.add(`swipe-${direction}`);
    
    // 2. Wait for CSS transition (0.4s)
    setTimeout(() => {
      // 3. Update Content
      const profile = profiles[profileIndex % profiles.length];
      cardImage.src = profile.img;
      cardName.textContent = profile.name;
      cardTag.textContent = profile.tag;
      profileIndex++;
      
      // 4. Reset position without transition (invisible)
      card.classList.remove(`swipe-${direction}`);
      card.classList.add('reset-anim');
      
      // 5. Force reflow to process the removal of transition smoothly
      void card.offsetWidth;
      
      // 6. Remove reset-anim so that standard transitions apply for pop-in
      card.classList.remove('reset-anim');
    }, 400); 
  };

  btnNo.addEventListener('click', () => swipeCard('left'));
  btnYes.addEventListener('click', () => swipeCard('right'));
}
