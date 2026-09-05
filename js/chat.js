/* ==========================================================================
   chat.js — Individual chat screen
   Renders a static dummy conversation. Swap MESSAGES for data streamed in
   from the Java WebSocket backend later; keep renderMessages() as the single
   place that turns message objects into DOM so wiring in live data is a
   drop-in replacement.
   ========================================================================== */

// ---- Dummy data (swap for backend data later) ---------------------------

const CONTACT = {
  name: "Visit Denpasar",
  status: "Akbar, Fawzy, Khai, Kira, Musa, Smi...",
  avatar: "https://i.pravatar.cc/150?img=68",
};

const MESSAGES = [
  {
    id: "m1",
    type: "text",
    sender: "me",
    text: "Do we need to prepare a van?",
    time: "8:16PM",
    showTimestamp: true,
  },
  {
    id: "m2",
    type: "text",
    sender: "Kira Lindegaard",
    avatar: "https://i.pravatar.cc/150?img=25",
    text: "Oh, I think that's a good idea",
  },
  {
    id: "m3",
    type: "text",
    sender: "me",
    text: "Now how we get that? \u{1F914}",
    time: "8:19PM",
    showTimestamp: true,
  },
  {
    id: "m4",
    type: "text",
    sender: "Akbar Lazuardi",
    avatar: "https://i.pravatar.cc/150?img=53",
    text: "We can use my dad van",
  },
  {
    id: "m5",
    type: "media",
    sender: "Akbar Lazuardi",
    avatar: "https://i.pravatar.cc/150?img=53",
    images: [
      "https://picsum.photos/seed/van1/200/220",
      "https://picsum.photos/seed/van2/200/220",
      "https://picsum.photos/seed/van3/200/220",
    ],
    extraCount: 2,
    reactions: [
      { emoji: "\u{1F525}", count: 3 },
      { emoji: "\u2764\uFE0F", count: 2 },
    ],
    time: "8:21PM",
    showTimestamp: true,
  },
  {
    id: "m6",
    type: "text",
    sender: "Khai Azzhara",
    avatar: "https://i.pravatar.cc/150?img=41",
    text: "Oh that's nice Akbar",
  },
  {
    id: "m7",
    type: "text",
    sender: "Khai Azzhara",
    avatar: "https://i.pravatar.cc/150?img=41",
    mentionText: "@Rohmad would be the driver \u{1F60F}",
    time: "8:22PM",
    showTimestamp: true,
  },
];

// ---- Rendering -------------------------------------------------------------

function renderContactHeader() {
  document.getElementById("contact-name").textContent = CONTACT.name;
  document.getElementById("contact-status").textContent = CONTACT.status;
  document.getElementById("contact-avatar").src = CONTACT.avatar;
  document.getElementById("contact-avatar").alt = CONTACT.name;
}

function renderMessages() {
  const list = document.getElementById("message-list");

  list.innerHTML = MESSAGES.map((message) => {
    const isSent = message.sender === "me";
    const rowClass = isSent ? "is-sent" : "is-received";
    const avatar = !isSent
      ? `<img class="message-row__avatar" src="${message.avatar}" alt="${message.sender}" />`
      : "";

    let bubbleContent = "";
    if (message.type === "media") {
      bubbleContent = renderMediaBubble(message);
    } else if (message.mentionText) {
      bubbleContent = `<div class="message-bubble message-bubble--mention">${escapeMention(message.mentionText)}</div>`;
    } else {
      bubbleContent = `<div class="message-bubble">${message.text}</div>`;
    }

    const senderLabel = !isSent
      ? `<div class="message-row__sender">${message.sender}</div>`
      : "";

    const timestamp = message.showTimestamp
      ? `<div class="message-list__timestamp">${message.time}</div>`
      : "";

    return `
      ${timestamp}
      <li class="message-row ${rowClass}" data-message-id="${message.id}">
        ${avatar}
        <div class="message-row__group">
          ${senderLabel}
          ${bubbleContent}
        </div>
      </li>
    `;
  }).join("");

  list.scrollTop = list.scrollHeight;
}

function renderMediaBubble(message) {
  const thumbs = message.images
    .map((src) => `<img src="${src}" alt="Shared photo" />`)
    .join("");

  const reactions = message.reactions
    .map((r) => `<span class="reaction-pill">${r.emoji} ${r.count}</span>`)
    .join("");

  return `
    <div class="message-media">
      ${thumbs}
      <div class="message-media__overlay">+${message.extraCount} photos</div>
    </div>
    <div class="message-reactions">${reactions}</div>
  `;
}

function escapeMention(text) {
  return text.replace(/(@\w+)/g, '<span class="mention">$1</span>');
}

// ---- Interactions ------------------------------------------------------------

function initBackButton() {
  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function initProfileNavigation() {
  document.getElementById("profile-header").addEventListener("click", () => {
    window.location.href = "profile.html";
  });
}

function initComposer() {
  const form = document.getElementById("composer");
  const input = document.getElementById("message-input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    // Visual-only send for now — the Java WebSocket backend will
    // eventually push this out and echo the confirmed message back.
    MESSAGES.push({
      id: `local-${Date.now()}`,
      type: "text",
      sender: "me",
      text,
    });
    renderMessages();
    input.value = "";
  });
}

function initChatMenu() {
  document.getElementById("chat-menu-btn").addEventListener("click", () => {
    console.log("Chat menu tapped");
  });
}

// ---- Init --------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderContactHeader();
  renderMessages();
  initBackButton();
  initProfileNavigation();
  initComposer();
  initChatMenu();
});
