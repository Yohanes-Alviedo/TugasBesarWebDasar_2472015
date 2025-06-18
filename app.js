// Helper DOM selectors
const dropdownToggles = document.querySelectorAll('.btn-dropdown');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

// Toggle dropdown menus
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    dropdownMenus.forEach(menu => menu.classList.remove('show'));
    dropdownToggles.forEach(btn => btn.setAttribute('aria-expanded', 'false'));

    if (!expanded) {
      const nextMenu = toggle.nextElementSibling;
      if (nextMenu && nextMenu.classList.contains('dropdown-menu')) {
        nextMenu.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
      }
    } else {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close dropdowns clicking outside
document.addEventListener('click', (e) => {
  if (![...dropdownToggles].some(btn => btn.contains(e.target))) {
    dropdownMenus.forEach(menu => menu.classList.remove('show'));
    dropdownToggles.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  }
});

// ------- index.html dish list population -------

const dishes = [
  {
    id: 'adobo',
    name: 'Chicken Adobo',
    description: 'Savory, tangy chicken stew simmered in vinegar, soy sauce, garlic, and black peppercorns.',
    image: 'IMG/Chicken_adobo.jpg',
    category: 'main'
  },
  {
    id: 'halo-halo',
    name: 'Halo-Halo',
    description: 'Mixed dessert with crushed ice, sweet beans, fruits, jellies, topped with leche flan and ube ice cream.',
    image: 'IMG/halohalo.jpeg',
    category: 'dessert'
  },
  {
    id: 'porksisig',
    name: 'Pork Sisig',
    description: 'Chopped pig head and liver, seasoned with calamansi and chili, served sizzling.',
    image: 'IMG/porksisig.jpg',
    category: 'main'
  },
  {
    id: 'balut',
    name: 'Balut',
    description: 'Boiled fertilized duck egg delicacy often enjoyed as a street snack.',
    image: 'IMG/balut.webp',
    category: 'snack'
  },
  {
    id: 'buko-pandan',
    name: 'Buko Pandan',
    description: 'Young coconut and pandan jelly dessert in creamy sweetened milk.',
    image: 'IMG/buko.webp',
    category: 'dessert'
  },
  {
    id: 'sago-’t-gulaman',
    name: 'Sago’t Gulaman',
    description: 'Sweet drink made from tapioca pearls and jelly in brown sugar syrup.',
    image: 'IMG/sago.jpg',
    category: 'drink'
  }
];

const dishListEl = document.getElementById('dishList');
const categoryButtons = document.querySelectorAll('#categoryDropdown .dropdown-item');

function renderDishes(filterCategory = 'all') {
  if (!dishListEl) return;
  dishListEl.innerHTML = '';
  const filtered = filterCategory === 'all' ? dishes : dishes.filter(d => d.category === filterCategory);

  for (const dish of filtered) {
    const li = document.createElement('li');
    li.className = 'dish-card';
    li.innerHTML = `
      <img class="dish-image" src="${dish.image}" alt="${dish.name} image representing filipino dish" loading="lazy" />
      <div class="dish-info">
        <h3 class="dish-name">${dish.name}</h3>
        <p class="dish-description">${dish.description}</p>
        <span class="dish-category">${dish.category.charAt(0).toUpperCase() + dish.category.slice(1)}</span>
      </div>
    `;
    dishListEl.appendChild(li);
  }
}

if (dishListEl) renderDishes(); // Only if element exists on page

// Filter dishes by dropdown category
categoryButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const cat = btn.dataset.category;
    renderDishes(cat);

    // Update dropdown button text
    const dropdownBtn = document.getElementById('categoryDropdownBtn');
    dropdownBtn.textContent = `Categories: ${btn.textContent} `;
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-icons';
    iconSpan.textContent = 'arrow_drop_down';
    dropdownBtn.appendChild(iconSpan);

    // Close dropdown menu
    document.querySelector('#categoryDropdown').classList.remove('show');
    dropdownBtn.setAttribute('aria-expanded', 'false');
  });
});

// --------- contacts.html Form validation and submission -----------

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value;
    const message = contactForm.message.value.trim();

    let errors = [];

    // Simple validation
    if (!name) errors.push('Please enter your name.');
    if (!email || !validateEmail(email)) errors.push('Please enter a valid email.');
    if (!subject) errors.push('Please select a subject.');
    if (!message) errors.push('Please enter a message.');

    if (errors.length) {
      formMessage.textContent = errors.join(' ');
      formMessage.style.color = 'red';
      return;
    }

    // Simulate form submission
    formMessage.style.color = '#10b981';
    formMessage.textContent = 'Sending message...';

    setTimeout(() => {
      formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
      contactForm.reset();
    }, 1500);
  });
}

function validateEmail(email){
  // Basic email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// --------- groups.html group list with filtering -----------

const foodGroups = [
  {
    id: 'luzonAdobo',
    name: 'Luzon Adobo',
    region: 'luzon',
    description: 'Classic chicken adobo variant from Luzon.',
    image: 'IMG/luzon.jpg'
  },{
    id: 'visayanCangcua',
    name: 'Cangcua (Crab) Specialty',
    region: 'visayas',
    description: 'Delicious crab dishes popular in Visayas.',
    image: 'IMG/cangcua.webp'
  },{
    id: 'mindanaoPancit',
    name: 'Mindanao Pancit',
    region: 'mindanao',
    description: 'Distinct pancit noodles variant from Mindanao.',
    image: 'IMG/pancit.jpg'
  },{
    id: 'luzonKakanin',
    name: 'Kakanin Delicacies',
    region: 'luzon',
    description: 'Rice-based sweets from Luzon.',
    image: 'IMG/kakanin.jpg'
  },{
    id: 'visayanLechon',
    name: 'Lechon from Visayas',
    region: 'visayas',
    description: 'Crispy roasted pig popular in Visayas.',
    image: 'IMG/cebuslechon.jpg'
  },{
    id: 'mindanaoDurian',
    name: 'Durian Treats',
    region: 'mindanao',
    description: 'Famous durian fruit desserts in Mindanao.',
    image: 'IMG/durian.png'
  }
];

const regionDropdownBtn = document.getElementById('regionDropdownBtn');
const regionDropdown = document.getElementById('regionDropdown');
const groupListEl = document.getElementById('groupList');

function renderGroups(filterRegion = 'all') {
  if (!groupListEl) return;
  groupListEl.innerHTML = '';
  const filteredGroups = filterRegion === 'all' ? foodGroups : foodGroups.filter(g => g.region === filterRegion);
  
  for (const group of filteredGroups) {
    const li = document.createElement('li');
    li.className = 'dish-card';
    li.innerHTML = `
      <img class="dish-image" src="${group.image}" alt="${group.name} image" loading="lazy" />
      <div class="dish-info">
        <h3 class="dish-name">${group.name}</h3>
        <p class="dish-description">${group.description}</p>
        <span class="dish-category">${capitalize(group.region)}</span>
      </div>
    `;
    groupListEl.appendChild(li);
  }
}

function capitalize(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

if (regionDropdownBtn && regionDropdown && groupListEl){
  renderGroups();

  regionDropdown.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', e => {
      const region = btn.dataset.region;
      renderGroups(region);

      regionDropdownBtn.textContent = `Filter Regions: ${btn.textContent} `;
      const iconSpan = document.createElement('span');
      iconSpan.className = 'material-icons';
      iconSpan.textContent = 'arrow_drop_down';
      regionDropdownBtn.appendChild(iconSpan);

      regionDropdown.classList.remove('show');
      regionDropdownBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// --------- media.html populate media gallery -----------

const mediaGridEl = document.getElementById('mediaGrid');

const mediaItems = [
  {
    id: 'img1',
    type: 'image',
    url: 'IMG/lechon.jpg',
    alt: 'Crispy roasted Lechon ready to serve, golden brown skin and juicy meat'
  }, {
    id: 'img2',
    type: 'image',
    url: 'IMG/halohalo.jpeg',
    alt: 'Halo-Halo dessert with shaved ice, colorful ingredients and ice cream on top'
  },{
    id: 'img3',
    type: 'image',
    url: 'IMG/porksisig.jpg',
    alt: 'Plate of sizzling Pork Sisig served on hot plate with onions and chili'
  },{
    id: 'img4',
    type: 'image',
    url: 'IMG/balut.webp',
    alt: 'Boiled Balut duck egg, a Filipino delicacy, cracked open to show contents'
  }
];

function renderMedia(){
  if (!mediaGridEl) return;
  mediaGridEl.innerHTML = '';
  for (const media of mediaItems){
    const mediaEl = document.createElement('figure');
    mediaEl.className = 'media-item';

    if(media.type === 'image'){
      mediaEl.innerHTML = `<img src="${media.url}" alt="${media.alt}" loading="lazy" />`;
    }else if(media.type === 'video'){
      mediaEl.innerHTML = `<video controls preload="metadata" aria-label="${media.alt}">
        <source src="${media.url}" type="video/mp4" />
        Your browser does not support the video element.
      </video>`;
    }

    mediaGridEl.appendChild(mediaEl);
  }
}

if(mediaGridEl) renderMedia();



document.getElementById('mobileMenu').addEventListener('click', function() {
    const navList = document.getElementById('navList');
    navList.classList.toggle('show'); // Toggle the display of the nav list
});