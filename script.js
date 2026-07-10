const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .16 });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('reveal');
  revealObserver.observe(section);
});

const updateActiveLink = () => {
  const headerOffset = header.offsetHeight + 24;
  let activeSection = sections[0];

  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= headerOffset) activeSection = section;
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeSection.id}`);
  });

  header.classList.toggle('scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('resize', updateActiveLink);
updateActiveLink();

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalRoute = document.querySelector('#modal-route');
const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
  modalTitle.textContent = button.dataset.project;
  modalRoute.textContent = button.dataset.route;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}));

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
