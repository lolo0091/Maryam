/* =========================================
   LITTLE MARYAM'S WORLD 🤍🩵
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const enterWorldBtn = document.getElementById("enterWorldBtn");
  const activityCards = document.querySelectorAll(".activity-card");

  const messagesPopup = document.getElementById("messagesPopup");
  const songPopup = document.getElementById("songPopup");
  const giftPopup = document.getElementById("giftPopup");

  const closeButtons = document.querySelectorAll(".close-popup");
  const popupOverlays = document.querySelectorAll(".popup-overlay");

  const messageText = document.getElementById("messageText");
  const nextMessageBtn = document.getElementById("nextMessageBtn");

  const magicGift = document.getElementById("magicGift");
  const giftText = document.getElementById("giftText");

  const bowCountElement = document.getElementById("bowCount");
  const hiddenBow = document.getElementById("hiddenBow");

  const musicToggle = document.getElementById("musicToggle");
  const maryamSong = document.getElementById("maryamSong");


  /* =========================================
     SONG
  ========================================= */

  const songUrl =
    "https://www.youtube.com/embed/LfHm50UJW6U?rel=0";

  if (maryamSong) {
    maryamSong.src = songUrl;
  }


  /* =========================================
     MESSAGES
  ========================================= */

  const messages = [
    "You are one of the sweetest little stars in the whole world. 🤍",
    "Never forget how special you are, Maryam. ✨",
    "Your smile can make even the clouds happy. ☁️🤍",
    "Keep being curious, kind and wonderfully you. 🩵",
    "A little reminder: you are loved more than you know. 🤍",
    "Today is another perfect day to be amazing. ✨",
    "There is only one Maryam in the whole world, and that makes you very special. 🎀",
    "Dream big, little star. The sky is waiting for you. ⭐"
  ];

  let currentMessage = 0;


  /* =========================================
     POPUPS
  ========================================= */

  function openPopup(popup) {
    if (!popup) return;

    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }


  function closePopup(popup) {
    if (!popup) return;

    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }


  /* =========================================
     ENTER WORLD
  ========================================= */

  if (enterWorldBtn) {
    enterWorldBtn.addEventListener("click", () => {

      const worldSection = document.getElementById("world");

      if (worldSection) {
        worldSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      createSparkles(
        window.innerWidth / 2,
        window.innerHeight / 2,
        15
      );
    });
  }


  /* =========================================
     ACTIVITY CARDS
  ========================================= */

  activityCards.forEach((card) => {

    card.addEventListener("click", () => {

      const section = card.dataset.section;

      if (section === "messages") {
        openPopup(messagesPopup);
      }

      else if (section === "song") {
        openPopup(songPopup);
      }

      else if (section === "gift") {
        openPopup(giftPopup);
      }

      else if (section === "bows") {
        showBowCollection();
      }

      else if (section === "cupcake") {
        showComingSoon(
          "🧁",
          "Cupcake Maker",
          "Maryam's cupcake kitchen is getting ready!"
        );
      }

      else if (section === "friend") {
        showComingSoon(
          "🐰",
          "My Little Friend",
          "Maryam's little friend is getting ready to play!"
        );
      }

      else if (section === "dress") {
        showComingSoon(
          "👗",
          "Dress-Up Room",
          "Pretty dresses and bows are coming soon!"
        );
      }

      else if (section === "secret") {
        openSecretRoom();
      }

    });

  });


  /* =========================================
     CLOSE POPUPS
  ========================================= */

  closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const popup = button.closest(".popup");

      closePopup(popup);

    });

  });


  popupOverlays.forEach((overlay) => {

    overlay.addEventListener("click", () => {

      const popup = overlay.closest(".popup");

      closePopup(popup);

    });

  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      document
        .querySelectorAll(".popup.active")
        .forEach((popup) => {
          closePopup(popup);
        });

    }

  });


  /* =========================================
     MESSAGE BUTTON
  ========================================= */

  if (nextMessageBtn) {

    nextMessageBtn.addEventListener("click", () => {

      currentMessage++;

      if (currentMessage >= messages.length) {
        currentMessage = 0;
      }

      if (messageText) {

        messageText.style.opacity = "0";

        setTimeout(() => {

          messageText.textContent =
            messages[currentMessage];

          messageText.style.opacity = "1";

        }, 180);
      }

      createHearts(
        window.innerWidth / 2,
        window.innerHeight / 2,
        6
      );

    });

  }


  /* =========================================
     GIFTS
  ========================================= */

  const gifts = [
    {
      emoji: "⭐",
      text: "You found a little star!"
    },
    {
      emoji: "🤍",
      text: "A tiny heart just for Maryam!"
    },
    {
      emoji: "🦋",
      text: "A magical butterfly appeared!"
    },
    {
      emoji: "👑",
      text: "Princess Maryam found a crown!"
    },
    {
      emoji: "🌈",
      text: "You found a little rainbow!"
    },
    {
      emoji: "🍭",
      text: "A magical candy appeared!"
    },
    {
      emoji: "🧸",
      text: "You found a tiny teddy bear!"
    },
    {
      emoji: "🎀",
      text: "You found a special white bow!",
      bow: true
    }
  ];


  if (magicGift) {

    magicGift.addEventListener("click", () => {

      const randomGift =
        gifts[Math.floor(Math.random() * gifts.length)];

      magicGift.textContent = randomGift.emoji;

      if (giftText) {
        giftText.textContent = randomGift.text;
      }

      if (randomGift.bow) {
        addBow();
      }

      createSparkles(
        window.innerWidth / 2,
        window.innerHeight / 2,
        20
      );

    });

  }


  /* =========================================
     BOW COLLECTION
  ========================================= */

  let bowCount =
    Number(localStorage.getItem("maryamBowCount")) || 0;


  function updateBowCounter() {
    if (bowCountElement) {
      bowCountElement.textContent = bowCount;
    }
  }


  function addBow() {

    bowCount++;

    localStorage.setItem(
      "maryamBowCount",
      bowCount
    );

    updateBowCounter();

    showMiniNotification(
      "🤍",
      "New Bow!",
      "Maryam found a beautiful white bow."
    );

  }


  updateBowCounter();


  function showBowCollection() {

    const requiredBows = 5;

    let message = "";

    if (bowCount === 0) {

      message =
        "You haven't found any bows yet. Look carefully around Maryam's world!";

    }

    else if (bowCount < requiredBows) {

      message =
        `You found ${bowCount} white bow${bowCount === 1 ? "" : "s"}! Find ${requiredBows - bowCount} more to unlock a secret.`;

    }

    else {

      message =
        `Amazing! You collected ${bowCount} white bows and unlocked something special!`;

    }

    showComingSoon(
      "🤍",
      "My Bow Collection",
      message
    );

  }


  /* =========================================
     HIDDEN BOW
  ========================================= */

  let hiddenBowFound =
    localStorage.getItem("maryamHiddenBow") === "true";


  if (hiddenBowFound && hiddenBow) {
    hiddenBow.style.display = "none";
  }


  if (hiddenBow) {

    hiddenBow.addEventListener("click", (event) => {

      event.stopPropagation();

      if (hiddenBowFound) return;

      hiddenBowFound = true;

      localStorage.setItem(
        "maryamHiddenBow",
        "true"
      );

      addBow();

      createSparkles(
        event.clientX,
        event.clientY,
        25
      );

      hiddenBow.style.opacity = "0";

      setTimeout(() => {
        hiddenBow.style.display = "none";
      }, 400);

    });

  }


  /* =========================================
     SECRET ROOM
  ========================================= */

  function openSecretRoom() {

    const requiredBows = 5;

    if (bowCount < requiredBows) {

      const remaining =
        requiredBows - bowCount;

      showComingSoon(
        "🔐",
        "Secret Room",
        `The door is locked! Find ${remaining} more white bow${remaining === 1 ? "" : "s"} to unlock it.`
      );

      return;
    }

    showComingSoon(
      "✨",
      "Secret Room Unlocked!",
      "You found enough bows! Maryam's secret room is now unlocked."
    );

  }


  /* =========================================
     TEMP POPUP
  ========================================= */

  function showComingSoon(icon, title, text) {

    const oldPopup =
      document.querySelector(".temporary-popup");

    if (oldPopup) {
      oldPopup.remove();
    }

    const popup =
      document.createElement("div");

    popup.className =
      "popup active temporary-popup";

    popup.innerHTML = `

      <div class="popup-overlay"></div>

      <div class="popup-card">

        <button
          class="close-popup temp-close"
          type="button"
        >
          ×
        </button>

        <div style="font-size:60px;">
          ${icon}
        </div>

        <h2>
          ${title}
        </h2>

        <div class="letter-card">
          <p>${text}</p>
        </div>

        <button
          class="popup-button okay-button"
          type="button"
        >
          Okay 🤍
        </button>

      </div>

    `;

    document.body.appendChild(popup);

    document.body.style.overflow = "hidden";

    const close =
      popup.querySelector(".temp-close");

    const overlay =
      popup.querySelector(".popup-overlay");

    const okay =
      popup.querySelector(".okay-button");


    function removePopup() {

      popup.remove();

      document.body.style.overflow = "";

    }


    close?.addEventListener(
      "click",
      removePopup
    );

    overlay?.addEventListener(
      "click",
      removePopup
    );

    okay?.addEventListener(
      "click",
      removePopup
    );

  }


  /* =========================================
     TOP MUSIC BUTTON
  ========================================= */

  if (musicToggle) {

    musicToggle.addEventListener("click", () => {

      openPopup(songPopup);

    });

  }


  /* =========================================
     NOTIFICATION
  ========================================= */

  function showMiniNotification(
    icon,
    title,
    text
  ) {

    const oldNotification =
      document.querySelector(".mini-notification");

    if (oldNotification) {
      oldNotification.remove();
    }

    const notification =
      document.createElement("div");

    notification.className =
      "mini-notification";

    notification.innerHTML = `

      <div class="mini-notification-icon">
        ${icon}
      </div>

      <div>
        <strong>${title}</strong>
        <span>${text}</span>
      </div>

    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    setTimeout(() => {

      notification.classList.remove("show");

      setTimeout(() => {
        notification.remove();
      }, 400);

    }, 3000);

  }


  /* =========================================
     SPARKLES
  ========================================= */

  function createSparkles(
    x,
    y,
    amount = 15
  ) {

    for (let i = 0; i < amount; i++) {

      const sparkle =
        document.createElement("span");

      sparkle.className =
        "click-sparkle";

      sparkle.textContent =
        Math.random() > 0.5
          ? "✦"
          : "✨";

      sparkle.style.left =
        `${x}px`;

      sparkle.style.top =
        `${y}px`;

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1100);

    }

  }


  /* =========================================
     HEARTS
  ========================================= */

  function createHearts(
    x,
    y,
    amount = 5
  ) {

    for (let i = 0; i < amount; i++) {

      const heart =
        document.createElement("span");

      heart.className =
        "floating-heart";

      heart.textContent =
        Math.random() > 0.5
          ? "🤍"
          : "🩵";

      heart.style.left =
        `${x + (Math.random() - 0.5) * 120}px`;

      heart.style.top =
        `${y + (Math.random() - 0.5) * 50}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1500);

    }

  }

});
