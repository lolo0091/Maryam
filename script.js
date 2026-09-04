document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  function safeNumber(key, fallback = 0) {
    try {
      const value = Number(localStorage.getItem(key));
      return Number.isFinite(value) ? value : fallback;
    } catch {
      return fallback;
    }
  }

  function safeObject(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      try { localStorage.removeItem(key); } catch {}
      return {};
    }
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  let stars = safeNumber("maryamStars", 0);
  let bows = safeNumber("maryamBowCount", 0);
  let ach = safeObject("maryamAchievements");

  const toast = $("#toast");

  function save() {
    storageSet("maryamStars", String(stars));
    storageSet("maryamBowCount", String(bows));
    storageSet("maryamAchievements", JSON.stringify(ach));
  }

  function note(text) {
    if (!toast) return;
    clearTimeout(note.timer);
    toast.textContent = text;
    toast.classList.add("show");
    note.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function fx(x, y, symbol = "✨") {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = symbol;
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--x", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--y", (Math.random() * -160 - 25) + "px");
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  function updateAchievements() {
    $$("[data-achievement]").forEach(card => {
      card.classList.toggle("unlocked", !!ach[card.dataset.achievement]);
    });

    const count = $("#heroAchievements");
    if (count) count.textContent = Object.values(ach).filter(Boolean).length;
  }

  function unlock(name) {
    if (ach[name]) return;
    ach[name] = true;
    save();
    updateAchievements();
    note("New achievement unlocked! 🏆");
  }

  const bowsList = ["🎀","🎀","🩵","🎀","🦋","🎀","💎","🎀","✨","🎀","👑","🎀"];

  function renderBows() {
    const book = $("#bowBook");
    if (!book) return;

    book.innerHTML = "";
    bowsList.forEach((value, index) => {
      const d = document.createElement("div");
      d.className = "bow-slot" + (index >= bows ? " locked" : "");
      d.textContent = index >= bows ? "🎀" : value;
      book.appendChild(d);
    });
  }

  function progress() {
    const bar = $("#secretProgressBar");
    const text = $("#secretProgressText");
    const bowReq = $("#secretBowRequirement");
    const starReq = $("#secretStarRequirement");

    const p = Math.round(((Math.min(bows / 8, 1) + Math.min(stars / 15, 1)) / 2) * 100);

    if (bar) bar.style.width = p + "%";
    if (text) text.textContent = p >= 100
      ? "The Secret Room is ready to open! 🔐✨"
      : p + "% of the secret journey completed";
    if (bowReq) bowReq.textContent = `${bows} / 8`;
    if (starReq) starReq.textContent = `${stars} / 15`;
  }

  function update() {
    ["topStars", "heroStars"].forEach(id => {
      const el = $("#" + id);
      if (el) el.textContent = stars;
    });

    ["topBows", "heroBows", "bowCount"].forEach(id => {
      const el = $("#" + id);
      if (el) el.textContent = bows;
    });

    updateAchievements();
    renderBows();
    progress();
  }

  function addStars(amount) {
    stars += amount;
    if (stars >= 10) unlock("starCollector");
    save();
    update();
  }

  function addBow() {
    bows++;
    if (bows >= 1) unlock("firstBow");
    if (bows >= 5) unlock("fiveBows");
    save();
    update();
    note("A new bow joined your collection! 🎀");
  }

  function openPopup(id) {
    const popup = $("#" + id);
    if (!popup) return;
    popup.classList.add("open");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePopup(popup) {
    if (!popup) return;
    popup.classList.remove("open");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $$(".popup").forEach(popup => {
    const closeBtn = $(".close", popup);
    const overlay = $(".overlay", popup);

    if (closeBtn) closeBtn.addEventListener("click", () => closePopup(popup));
    if (overlay) overlay.addEventListener("click", () => closePopup(popup));
  });

  const enter = $("#enterWorldBtn");
  if (enter) {
    enter.addEventListener("click", () => {
      const section = $("#activities");
      if (section) section.scrollIntoView({ behavior: "smooth" });
      fx(innerWidth / 2, innerHeight / 2);
    });
  }

  const routes = {
    messages: "messagesPopup",
    song: "songPopup",
    gift: "giftPopup",
    bows: "bowsPopup",
    cupcake: "cupcakePopup",
    friend: "friendPopup",
    dress: "dressPopup",
    cloud: "cloudPopup",
    stars: "starsPopup",
    achievements: "achievementsPopup",
    secret: "secretPopup"
  };

  $$(".card").forEach(card => {
    card.addEventListener("click", () => {
      const section = card.dataset.section;
      if (section === "secret") refreshSecret();
      const id = routes[section];
      if (id) openPopup(id);
    });
  });

  const musicToggle = $("#musicToggle");
  if (musicToggle) musicToggle.addEventListener("click", () => openPopup("songPopup"));

  const msgs = [
    "Your smile makes this little world brighter. 🩵",
    "Never forget how special your little heart is. 🎀",
    "There is always a little bit of magic waiting for you. ✨",
    "Keep dreaming big, little star. ⭐",
    "You make ordinary moments feel a little more magical. 🩵"
  ];

  const newMessageBtn = $("#newMessageBtn");
  if (newMessageBtn) {
    newMessageBtn.addEventListener("click", () => {
      const el = $("#magicMessage");
      if (el) el.textContent = msgs[Math.floor(Math.random() * msgs.length)];
      addStars(1);
    });
  }

  const openGiftBtn = $("#openGiftBtn");
  if (openGiftBtn) {
    openGiftBtn.addEventListener("click", () => {
      const day = new Date().toISOString().split("T")[0];

      if (storageGet("maryamLastGift") === day) {
        const icon = $("#giftIcon");
        const text = $("#giftText");
        if (icon) icon.textContent = "🩵";
        if (text) text.textContent = "Today's gift is already open. Come back tomorrow!";
        note("Today's gift is already yours 🩵");
        return;
      }

      const gifts = [
        { i: "🎀", t: "You found a magical bow!", k: "b" },
        { i: "⭐", t: "You found five sparkling stars!", k: "s" },
        { i: "💎", t: "You found a tiny magical gem!", k: "g" }
      ];

      const g = gifts[Math.floor(Math.random() * gifts.length)];
      const icon = $("#giftIcon");
      const text = $("#giftText");

      if (icon) icon.textContent = g.i;
      if (text) text.textContent = g.t;

      if (g.k === "b") addBow();
      else addStars(g.k === "s" ? 5 : 3);

      storageSet("maryamLastGift", day);
      fx(innerWidth / 2, innerHeight / 2, g.i);
    });
  }

  const collectBowBtn = $("#collectBowBtn");
  if (collectBowBtn) {
    collectBowBtn.addEventListener("click", () => {
      addBow();
      fx(innerWidth / 2, innerHeight / 2, "🎀");
    });
  }

  const hiddenBow = $("#hiddenBow");
  if (hiddenBow) {
    if (storageGet("maryamHiddenBow")) hiddenBow.style.display = "none";

    hiddenBow.addEventListener("click", () => {
      storageSet("maryamHiddenBow", "true");
      hiddenBow.style.display = "none";
      addBow();
      addStars(2);
      note("You found the hidden bow! 🎀✨");
    });
  }

  $$("[data-frost]").forEach(button => {
    button.addEventListener("click", () => {
      const el = $("#cupcakeTop");
      if (el) el.textContent = button.dataset.frost;
    });
  });

  $$("[data-deco]").forEach(button => {
    button.addEventListener("click", () => {
      const el = $("#cupcakeDecoration");
      if (el) el.textContent = button.dataset.deco;
    });
  });

  const finishCupcakeBtn = $("#finishCupcakeBtn");
  if (finishCupcakeBtn) {
    finishCupcakeBtn.addEventListener("click", () => {
      unlock("cupcakeQueen");
      addStars(2);
      note("Your cupcake is ready! 🧁✨");
    });
  }

  $$("[data-bunny]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.bunny;
      const character = $("#bunnyCharacter");
      const mood = $("#bunnyMood");

      if (action === "feed") {
        if (character) character.textContent = "🐰🥕";
        if (mood) mood.textContent = "Yummy! Bunny loved the carrot.";
      }

      if (action === "play") {
        if (character) character.textContent = "🐰🧸";
        if (mood) mood.textContent = "Bunny is having so much fun!";
        unlock("bunnyFriend");
      }

      if (action === "sleep") {
        if (character) character.textContent = "🐰💤";
        if (mood) mood.textContent = "Shhh... Bunny is sleeping.";
      }

      addStars(1);
    });
  });

  $$("[data-outfit]").forEach(button => {
    button.addEventListener("click", () => {
      const el = $("#dressOutfit");
      if (el) el.textContent = button.dataset.outfit;
      addStars(1);
    });
  });

  $$("[data-bow]").forEach(button => {
    button.addEventListener("click", () => {
      const el = $("#dressBow");
      if (el) el.textContent = button.dataset.bow;
    });
  });

  const dreams = [
    "A beautiful surprise is closer than you think. ✨",
    "One tiny dream can grow into something amazing. ☁️",
    "Today is a perfect day for a little adventure. 🎀",
    "Follow the little stars and see where they take you. ⭐"
  ];

  const dreamButton = $("#dreamButton");
  if (dreamButton) {
    dreamButton.addEventListener("click", () => {
      const el = $("#dreamText");
      if (el) el.textContent = dreams[Math.floor(Math.random() * dreams.length)];
      addStars(1);
      fx(innerWidth / 2, innerHeight / 2, "☁️");
    });
  }

  let running = false;
  let score = 0;
  let timer = null;

  const startGame = $("#startStarGame");
  if (startGame) {
    startGame.addEventListener("click", () => {
      if (running) return;

      running = true;
      score = 0;

      const scoreEl = $("#gameScore");
      const startScreen = $("#gameStartScreen");
      if (scoreEl) scoreEl.textContent = "0";
      if (startScreen) startScreen.style.display = "none";

      let spawned = 0;

      timer = setInterval(() => {
        spawnStar();
        spawned++;

        if (spawned >= 18) {
          clearInterval(timer);
          setTimeout(endGame, 1300);
        }
      }, 520);
    });
  }

  function spawnStar() {
    const game = $("#starGame");
    if (!game) return;

    const star = document.createElement("button");
    star.type = "button";
    star.className = "game-star";
    star.textContent = "⭐";
    star.style.left = Math.random() * Math.max(10, game.clientWidth - 50) + "px";
    star.style.top = Math.random() * Math.max(10, game.clientHeight - 50) + "px";

    star.addEventListener("click", () => {
      score++;
      const scoreEl = $("#gameScore");
      if (scoreEl) scoreEl.textContent = score;
      star.remove();
    });

    game.appendChild(star);
    setTimeout(() => star.remove(), 1200);
  }

  function endGame() {
    running = false;
    addStars(score);
    const startScreen = $("#gameStartScreen");
    if (startScreen) startScreen.style.display = "flex";
    note("Great star catching! ⭐");
  }

  function refreshSecret() {
    const locked = $("#secretLocked");
    const unlocked = $("#secretUnlocked");

    if (!locked || !unlocked) return;

    if (bows >= 8 && stars >= 15) {
      locked.classList.add("hidden");
      unlocked.classList.remove("hidden");
      unlock("secretExplorer");
    } else {
      locked.classList.remove("hidden");
      unlocked.classList.add("hidden");
    }
  }

  const photo = $("#secretPhoto");
  const placeholder = $("#secretPhotoPlaceholder");

  if (photo && placeholder) {
    photo.addEventListener("load", () => {
      photo.style.display = "block";
      placeholder.style.display = "none";
    });

    photo.addEventListener("error", () => {
      photo.style.display = "none";
      placeholder.style.display = "flex";
    });
  }

  let opened = storageGet("maryamUltraSecret") === "true";
  const ultra = $("#ultraSecret");

  if (opened && ultra) ultra.classList.remove("hidden");

  const secretBox = $("#secretBox");
  if (secretBox) {
    secretBox.addEventListener("click", () => {
      if (!opened) {
        opened = true;
        storageSet("maryamUltraSecret", "true");
        addStars(5);
      }

      if (ultra) ultra.classList.remove("hidden");
      fx(innerWidth / 2, innerHeight / 2, "💎");
      note("Ultra Secret discovered! 💎");
    });
  }

  update();
  refreshSecret();

  // Confirms the script loaded correctly in the browser console.
  console.log("Maryam V2 ready ✨");
});
