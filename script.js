document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scrolling (same as before)
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 20, // Offset to avoid the sticky header
        behavior: "smooth"
      });
    });
  });

  // 2. Image Lightbox (Bootstrap Modal)
  const images = document.querySelectorAll('.project img');
  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
  });

  // Bootstrap modal for lightbox
  const modalHTML = `
    <div class="modal fade" id="lightboxModal" tabindex="-1" aria-labelledby="lightboxModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img id="lightboxImage" class="img-fluid" src="" alt="Lightbox Image">
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Append the modal to the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Open lightbox modal
  function openLightbox(img) {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = img.src;
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    lightboxModal.show();
  }

  // 3. Form Validation (same as before)
  const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Simple validation
    if (!name || !email || !message) {
      e.preventDefault();
      alert("All fields are required!");
    } else if (!validateEmail(email)) {
      e.preventDefault();
      alert("Please enter a valid email address.");
    }
  });

  // Email validation regex
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // 4. Animation on Scroll (same as before)
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    observer.observe(section);
  });
});
