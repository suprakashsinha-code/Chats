/* ==========================================================================
   index.js — Chat list / home screen
   Renders dummy data for stories + chat list, and wires up navigation.
   Replace STORIES / CHATS with data from the Java backend later; keep the
   render functions (renderStories / renderChatList) untouched so the UI
   structure stays stable.
   ========================================================================== */

// ---- Dummy data (swap for backend data later) --------------------------

const STORIES = [
  { id: "kaja", name: "Kaja", count: 3, avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "imran", name: "Imran", count: 6, avatar: "https://i.pravatar.cc/150?img=51" },
  { id: "stella", name: "Stella", count: 1, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "shee", name: "Shee", count: 3, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "jonas", name: "Jonas", count: 2, avatar: "https://i.pravatar.cc/150?img=14" },
];

const CHATS = [
  {
    id: "visit-denpasar",
    name: "Visit Denpasar",
    avatar: "https://i.pravatar.cc/150?img=68",
    preview: "Khai: Are they still open at sunday?",
    time: "24 mins",
    pinned: true,
    unread: 4,
    online: false,
    category: ["all", "groups"],
  },
  {
    id: "kira-lindegaard",
    name: "Kira Lindegaard",
    avatar: "https://i.pravatar.cc/150?img=25",
    preview: "Got it, thanks Kira!!",
    time: "2 mins",
    read: true,
    online: true,
    category: ["all", "favorites"],
  },
  {
    id: "kaja-kumar",
    name: "Kaja Kumar",
    avatar: "https://i.pravatar.cc/150?img=32",
    preview: "Thanks bro, see you later",
    time: "2 mins",
    read: true,
    online: true,
    category: ["all", "favorites"],
  },
  {
    id: "ayana-izquierdo",
    name: "Ayana Izquierdo",
    avatar: "https://i.pravatar.cc/150?img=45",
    preview: "Sure hahaha",
    time: "5 mins",
    online: true,
    category: ["all"],
  },
  {
    id: "khadija-dubois",
    name: "Khadija Dubois",
    avatar: "https://i.pravatar.cc/150?img=47",
    preview: "No, I think we can start at 8pm, wdyt?",
    time: "12 mins",
    unread: 2,
    online: true,
    category: ["all", "work"],
  },
  {
    id: "cansaas",
    name: "Cansaas",
    avatar: null,
    avatarEmoji: "🍀",
    preview: "You: 📷 Looking good guys!!, btw anyone have differe...",
    time: "18 mins",
    category: ["all", "groups"],
  },
  {
    id: "zoya-ziegler",
    name: "Zoya Ziegler",
    avatar: "https://i.pravatar.cc/150?img=15",
    preview: "See you tomorrow then",
    time: "20 mins",
    category: ["all"],
  },
];

// ---- Rendering -----------------------------------------------------------

function renderStories() {
  const list = document.getElementById("story-list");

  const meStory = `
    <div class="story story--add">
      <div class="story__avatar-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </div>
      <span class="story__name">You</span>
    </div>
  `;

  const otherStories = STORIES.map((story) => `
    <button class="story" data-story-id="${story.id}">
      <div class="story__ring">
        <img class="story__avatar" src="${story.avatar}" alt="${story.name}'s story" />
        <span class="story__count">${story.count}</span>
      </div>
      <span class="story__name">${story.name}</span>
    </button>
  `).join("");

  list.innerHTML = meStory + otherStories;
}

function renderChatList(filter = "all") {
  const list = document.getElementById("chat-list");
  const filtered = CHATS.filter((chat) => chat.category.includes(filter));

  list.innerHTML = filtered.map((chat) => `
    <li>
      <a class="chat-item" href="chat.html?id=${chat.id}" data-chat-id="${chat.id}">
        <div class="chat-item__avatar-wrap">
          ${chat.avatar
            ? `<img class="chat-item__avatar" src="${chat.avatar}" alt="${chat.name}" />`
            : `<div class="chat-item__avatar" style="display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--surface-strong);">${chat.avatarEmoji || "👥"}</div>`
          }
          ${chat.online ? '<span class="chat-item__online"></span>' : ""}
        </div>
        <div class="chat-item__body">
          <div class="chat-item__top">
            <span class="chat-item__name">${chat.name}</span>
            <span class="chat-item__time">${chat.time}</span>
          </div>
          <div class="chat-item__preview">
            ${chat.read ? readIcon() : ""}
            <span class="chat-item__message">${chat.preview}</span>
            <div class="chat-item__meta">
              ${chat.pinned ? pinIcon() : ""}
              ${chat.unread ? `<span class="unread-badge">${chat.unread}</span>` : ""}
            </div>
          </div>
        </div>
      </a>
    </li>
  `).join("");
}

function pinIcon() {
  return `<svg class="pin-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3l5 5-4 2-4 4 1 5-4-4-5 5v-2l5-5-4-4 5-4 2 4z"/></svg>`;
}

function readIcon() {
  return `<svg class="check-icon is-read" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
}

// ---- Interactions ----------------------------------------------------------

function initFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      renderChatList(chip.dataset.filter);
    });
  });
}

function initTopBarActions() {
  document.getElementById("search-btn").addEventListener("click", () => {
    // Placeholder for search UI — hook up to a real search view later.
    console.log("Search tapped");
  });
  document.getElementById("camera-btn").addEventListener("click", () => {
    console.log("Camera tapped");
  });
  document.getElementById("menu-btn").addEventListener("click", () => {
    console.log("Menu tapped");
  });
  document.getElementById("new-chat-btn").addEventListener("click", () => {
    console.log("New chat tapped");
  });
}

// ---- Init ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderChatList();
  initFilters();
  initTopBarActions();
});
