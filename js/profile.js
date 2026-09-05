/* ==========================================================================
   profile.js — Contact profile / chat details screen
   Renders dummy media thumbnails and wires up the toggle + navigation.
   Swap MEDIA_ITEMS and the profile fields for backend data later.
   ========================================================================== */

// ---- Dummy data (swap for backend data later) ---------------------------

const MEDIA_ITEMS = [
  "https://picsum.photos/seed/media1/160/190",
  "https://picsum.photos/seed/media2/160/190",
  "https://picsum.photos/seed/media3/160/190",
  "https://picsum.photos/seed/media4/160/190",
];

const MEDIA_EXTRA_COUNT = 42;

// ---- Rendering -------------------------------------------------------------

function renderMediaGrid() {
  const grid = document.getElementById("media-grid");

  grid.innerHTML = MEDIA_ITEMS.map((src, index) => {
    const isLast = index === MEDIA_ITEMS.length - 1;
    const overlay = isLast
      ? `<div class="media-grid__more">+${MEDIA_EXTRA_COUNT}</div>`
      : "";
    return `
      <div class="media-grid__item">
        <img src="${src}" alt="Shared media" />
        ${overlay}
      </div>
    `;
  }).join("");
}

// ---- Interactions ------------------------------------------------------------

function initBackButton() {
  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "chat.html";
  });
}

function initProfileMenu() {
  document.getElementById("profile-menu-btn").addEventListener("click", () => {
    console.log("Profile menu tapped");
  });
}

function initToggle() {
  const toggle = document.getElementById("lock-chat-toggle");
  toggle.addEventListener("click", () => {
    const isOn = toggle.classList.toggle("is-on");
    toggle.setAttribute("aria-checked", String(isOn));
  });
}

function initOptionItems() {
  document.querySelectorAll(".option-item[data-option]").forEach((item) => {
    if (item.tagName === "BUTTON") {
      item.addEventListener("click", () => {
        console.log(`Option tapped: ${item.dataset.option}`);
      });
    }
  });
}

// ---- Init --------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderMediaGrid();
  initBackButton();
  initProfileMenu();
  initToggle();
  initOptionItems();
});
