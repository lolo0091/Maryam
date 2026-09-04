/* =========================================
   MARYAM'S LITTLE WORLD V2
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     ELEMENTS
  ----------------------------------------- */

  const activitiesSection =
    document.getElementById("activities");

  const enterWorldBtn =
    document.getElementById("enterWorldBtn");

  const activityCards =
    document.querySelectorAll(".activity-card");

  const popups =
    document.querySelectorAll(".popup");

  const toast =
    document.getElementById("toast");


  /* -----------------------------------------
     SAVE DATA
  ----------------------------------------- */

  let stars =
    Number(
      localStorage.getItem("maryamStars")
    ) || 0;

  let bows =
    Number(
      localStorage.getItem("maryamBowCount")
    ) || 0;

  let achievements =
    JSON.parse(
      localStorage.getItem(
        "maryamAchievements"
      ) || "{}"
    );


  function saveData() {

    localStorage.setItem(
      "maryamStars",
      stars
    );

    localStorage.setItem(
      "maryamBowCount",
      bows
    );

    localStorage.setItem(
      "maryamAchievements",
      JSON.stringify(
        achievements
      )
    );

  }


  /* -----------------------------------------
     COUNTERS
  ----------------------------------------- */

  const topStars =
    document.getElementById("topStars");

  const topBows =
    document.getElementById("topBows");

  const heroStars =
    document.getElementById("heroStars");

  const heroBows =
    document.getElementById("heroBows");

  const heroAchievements =
    document.getElementById(
      "heroAchievements"
    );

  const bowCount =
    document.getElementById("bowCount");


  function updateCounters() {

    topStars.textContent = stars;
    heroStars.textContent = stars;

    topBows.textContent = bows;
    heroBows.textContent = bows;

    bowCount.textContent = bows;

    heroAchievements.textContent =
      Object.values(
        achievements
      ).filter(Boolean).length;

    updateSecretProgress();

    updateAchievements();

  }


  /* -----------------------------------------
     ENTER WORLD
  ----------------------------------------- */

  enterWorldBtn.addEventListener(
    "click",
    () => {

      activitiesSection.scrollIntoView({
        behavior: "smooth"
      });

      createMagic(
        window.innerWidth / 2,
        window.innerHeight / 2,
        "✨"
      );

    }
  );


  /* -----------------------------------------
     POPUPS
  ----------------------------------------- */

  function openPopup(id) {

    const popup =
      document.getElementById(id);

    if (!popup) return;

    popup.classList.add("open");

    popup.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closePopup(popup) {

    popup.classList.remove("open");

    popup.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

  }


  popups.forEach(
    popup => {

      const closeButton =
        popup.querySelector(
          ".close-popup"
        );

      const overlay =
        popup.querySelector(
          ".popup-overlay"
        );

      closeButton?.addEventListener(
        "click",
        () => closePopup(popup)
      );

      overlay?.addEventListener(
        "click",
        () => closePopup(popup)
      );

    }
  );


  /* -----------------------------------------
     ACTIVITY ROUTING
  ----------------------------------------- */

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

    achievements:
      "achievementsPopup",

    secret: "secretPopup"

  };


  activityCards.forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          const section =
            card.dataset.section;

          if (
            section === "secret"
          ) {
            refreshSecretRoom();
          }

          openPopup(
            routes[section]
          );

        }
      );

    }
  );


  /* -----------------------------------------
     MUSIC BUTTON
  ----------------------------------------- */

  document
    .getElementById("musicToggle")
    .addEventListener(
      "click",
      () => {

        openPopup("songPopup");

      }
    );


  /* -----------------------------------------
     MAGIC MESSAGES
  ----------------------------------------- */

  const magicMessages = [

    "Your smile makes this little world brighter. 🩵",

    "Never forget how special your little heart is. 🎀",

    "There is always a little bit of magic waiting for you. ✨",

    "You deserve days filled with smiles, sweets and happy surprises. 🧁",

    "Keep dreaming big, little star. ⭐",

    "The prettiest magic is the happiness you give to other people. ☁️",

    "You make ordinary moments feel a little more magical. 🩵",

    "A tiny bow, a tiny star and one huge smile just for you. 🎀"

  ];


  const magicMessage =
    document.getElementById(
      "magicMessage"
    );


  function newMagicMessage() {

    const random =
      magicMessages[
        Math.floor(
          Math.random() *
          magicMessages.length
        )
      ];

    magicMessage.textContent =
      random;

    addStars(1);

  }


  document
    .getElementById("newMessageBtn")
    .addEventListener(
      "click",
      newMagicMessage
    );


  /* -----------------------------------------
     DAILY GIFT
  ----------------------------------------- */

  const giftIcon =
    document.getElementById("giftIcon");

  const giftText =
    document.getElementById("giftText");

  const openGiftBtn =
    document.getElementById(
      "openGiftBtn"
    );


  function getToday() {

    return new Date()
      .toISOString()
      .split("T")[0];

  }


  openGiftBtn.addEventListener(
    "click",
    () => {

      const today =
        getToday();

      const lastGift =
        localStorage.getItem(
          "maryamLastGift"
        );

      if (
        lastGift === today
      ) {

        giftIcon.textContent = "🩵";

        giftText.textContent =
          "Today's gift is already open. Come back tomorrow for another surprise!";

        showToast(
          "Today's gift is already yours 🩵"
        );

        return;

      }


      const gifts = [
        {
          icon: "🎀",
          text:
            "You found a magical bow!",
          type: "bow"
        },
        {
          icon: "⭐",
          text:
            "You found five sparkling stars!",
          type: "stars"
        },
        {
          icon: "💎",
          text:
            "You found a tiny magical gem!",
          type: "gem"
        }
      ];


      const gift =
        gifts[
          Math.floor(
            Math.random() *
            gifts.length
          )
        ];


      giftIcon.textContent =
        gift.icon;

      giftText.textContent =
        gift.text;


      if (
        gift.type === "bow"
      ) {

        addBow();

      }


      if (
        gift.type === "stars"
      ) {

        addStars(5);

      }


      if (
        gift.type === "gem"
      ) {

        addStars(3);

      }


      localStorage.setItem(
        "maryamLastGift",
        today
      );

      createMagic(
        window.innerWidth / 2,
        window.innerHeight / 2,
        gift.icon
      );

      showToast(
        "Daily surprise unlocked ✨"
      );

    }
  );


  /* -----------------------------------------
     BOW COLLECTION
  ----------------------------------------- */

  const bowBook =
    document.getElementById("bowBook");

  const bowStyles = [
    "🎀",
    "🎀",
    "🩵",
    "🎀",
    "🦋",
    "🎀",
    "💎",
    "🎀",
    "✨",
    "🎀",
    "👑",
    "🎀"
  ];


  function renderBowBook() {

    bowBook.innerHTML = "";

    bowStyles.forEach(
      (bow, index) => {

        const slot =
          document.createElement(
            "div"
          );

        slot.className =
          "bow-slot";

        if (
          index >= bows
        ) {

          slot.classList.add(
            "locked"
          );

          slot.textContent = "🎀";

        } else {

          slot.textContent = bow;

        }

        bowBook.appendChild(slot);

      }
    );

  }


  function addBow() {

    bows++;

    saveData();

    unlockAchievement(
      "firstBow"
    );

    if (
      bows >= 5
    ) {

      unlockAchievement(
        "fiveBows"
      );

    }

    updateCounters();

    renderBowBook();

    showToast(
      "A new bow joined your collection! 🎀"
    );

  }


  document
    .getElementById("collectBowBtn")
    .addEventListener(
      "click",
      () => {

        addBow();

        createMagic(
          window.innerWidth / 2,
          window.innerHeight / 2,
          "🎀"
        );

      }
    );


  /* -----------------------------------------
     HIDDEN BOW
  ----------------------------------------- */

  const hiddenBow =
    document.getElementById(
      "hiddenBow"
    );


  if (
    localStorage.getItem(
      "maryamHiddenBow"
    )
  ) {

    hiddenBow.style.display =
      "none";

  }


  hiddenBow.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        "maryamHiddenBow",
        "true"
      );

      hiddenBow.style.display =
        "none";

      addBow();

      addStars(2);

      showToast(
        "You found the hidden bow! 🎀✨"
      );

    }
  );


  /* -----------------------------------------
     CUPCAKE MAKER
  ----------------------------------------- */

  let frosting = "🩵";

  let decoration = "✨";


  const cupcakeTop =
    document.getElementById(
      "cupcakeTop"
    );

  const cupcakeDecoration =
    document.getElementById(
      "cupcakeDecoration"
    );


  document
    .querySelectorAll(
      ".frosting-choice"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            frosting =
              button.dataset.value;

            cupcakeTop.textContent =
              frosting;

            document
              .querySelectorAll(
                ".frosting-choice"
              )
              .forEach(
                b =>
                  b.classList.remove(
                    "selected"
                  )
              );

            button.classList.add(
              "selected"
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".decoration-choice"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            decoration =
              button.dataset.value;

            cupcakeDecoration.textContent =
              decoration;

            document
              .querySelectorAll(
                ".decoration-choice"
              )
              .forEach(
                b =>
                  b.classList.remove(
                    "selected"
                  )
              );

            button.classList.add(
              "selected"
            );

          }
        );

      }
    );


  document
    .getElementById(
      "finishCupcakeBtn"
    )
    .addEventListener(
      "click",
      () => {

        unlockAchievement(
          "cupcakeQueen"
        );

        addStars(2);

        showToast(
          "Your cupcake is ready! 🧁✨"
        );

      }
    );


  /* -----------------------------------------
     BUNNY
  ----------------------------------------- */

  const bunnyMood =
    document.getElementById(
      "bunnyMood"
    );

  const bunnyCharacter =
    document.getElementById(
      "bunnyCharacter"
    );


  document
    .querySelectorAll(
      "[data-bunny]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const action =
              button.dataset.bunny;


            if (
              action === "feed"
            ) {

              bunnyCharacter.textContent =
                "🐰🥕";

              bunnyMood.textContent =
                "Yummy! Bunny loved the carrot.";

            }


            if (
              action === "play"
            ) {

              bunnyCharacter.textContent =
                "🐰🧸";

              bunnyMood.textContent =
                "Bunny is having so much fun!";

              unlockAchievement(
                "bunnyFriend"
              );

            }


            if (
              action === "sleep"
            ) {

              bunnyCharacter.textContent =
                "🐰💤";

              bunnyMood.textContent =
                "Shhh... Bunny is sleeping.";

            }


            addStars(1);

          }
        );

      }
    );


  /* -----------------------------------------
     DRESS UP
  ----------------------------------------- */

  const dressOutfit =
    document.getElementById(
      "dressOutfit"
    );

  const dressBow =
    document.getElementById(
      "dressBow"
    );


  document
    .querySelectorAll(
      ".outfit-choice"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            dressOutfit.textContent =
              button.dataset.value;

            addStars(1);

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".bow-choice"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            dressBow.textContent =
              button.dataset.value;

          }
        );

      }
    );


  /* -----------------------------------------
     DREAM CLOUD
  ----------------------------------------- */

  const dreams = [

    "A beautiful surprise is closer than you think. ✨",

    "One tiny dream can grow into something amazing. ☁️",

    "Today is a perfect day for a little adventure. 🎀",

    "Something sweet is waiting somewhere in your world. 🧁",

    "Your next happy memory is still waiting to happen. 🩵",

    "Follow the little stars and see where they take you. ⭐"

  ];


  const dreamText =
    document.getElementById(
      "dreamText"
    );


  document
    .getElementById(
      "dreamButton"
    )
    .addEventListener(
      "click",
      () => {

        dreamText.textContent =
          dreams[
            Math.floor(
              Math.random() *
              dreams.length
            )
          ];

        addStars(1);

        createMagic(
          window.innerWidth / 2,
          window.innerHeight / 2,
          "☁️"
        );

      }
    );


  /* -----------------------------------------
     STAR CATCHER
  ----------------------------------------- */

  const starGame =
    document.getElementById(
      "starGame"
    );

  const gameStartScreen =
    document.getElementById(
      "gameStartScreen"
    );

  const gameScoreElement =
    document.getElementById(
      "gameScore"
    );

  let gameScore = 0;

  let gameRunning = false;

  let gameTimer;


  document
    .getElementById(
      "startStarGame"
    )
    .addEventListener(
      "click",
      startStarGame
    );


  function startStarGame() {

    if (
      gameRunning
    ) return;

    gameRunning = true;

    gameScore = 0;

    gameScoreElement.textContent =
      gameScore;

    gameStartScreen.style.display =
      "none";


    let spawned = 0;


    gameTimer =
      setInterval(
        () => {

          spawnGameStar();

          spawned++;


          if (
            spawned >= 18
          ) {

            clearInterval(
              gameTimer
            );

            setTimeout(
              endStarGame,
              1300
            );

          }

        },
        520
      );

  }


  function spawnGameStar() {

    const star =
      document.createElement(
        "button"
      );

    star.className =
      "game-star";

    star.textContent = "⭐";


    const maxX =
      starGame.clientWidth - 50;

    const maxY =
      starGame.clientHeight - 50;


    star.style.left =
      Math.random() *
      maxX +
      "px";

    star.style.top =
      Math.random() *
      maxY +
      "px";


    star.addEventListener(
      "click",
      () => {

        gameScore++;

        gameScoreElement.textContent =
          gameScore;

        star.remove();

      }
    );


    starGame.appendChild(star);


    setTimeout(
      () => star.remove(),
      1200
    );

  }


  function endStarGame() {

    gameRunning = false;

    addStars(gameScore);

    if (
      gameScore >= 5
    ) {

      showToast(
        "Great star catching! ⭐"
      );

    }

    gameStartScreen.style.display =
      "flex";

  }


  /* -----------------------------------------
     STARS
  ----------------------------------------- */

  function addStars(amount) {

    stars += amount;

    if (
      stars >= 10
    ) {

      unlockAchievement(
        "starCollector"
      );

    }

    saveData();

    updateCounters();

  }


  /* -----------------------------------------
     ACHIEVEMENTS
  ----------------------------------------- */

  function unlockAchievement(name) {

    if (
      achievements[name]
    ) return;

    achievements[name] = true;

    saveData();

    updateAchievements();

    showToast(
      "New achievement unlocked! 🏆"
    );

  }


  function updateAchievements() {

    document
      .querySelectorAll(
        ".achievement"
      )
      .forEach(
        card => {

          const name =
            card.dataset.achievement;

          if (
            achievements[name]
          ) {

            card.classList.add(
              "unlocked"
            );

          } else {

            card.classList.remove(
              "unlocked"
            );

          }

        }
      );


    heroAchievements.textContent =
      Object.values(
        achievements
      ).filter(Boolean).length;

  }


  /* -----------------------------------------
     SECRET ROOM
  ----------------------------------------- */

  const secretLocked =
    document.getElementById(
      "secretLocked"
    );

  const secretUnlocked =
    document.getElementById(
      "secretUnlocked"
    );

  const secretBowRequirement =
    document.getElementById(
      "secretBowRequirement"
    );

  const secretStarRequirement =
    document.getElementById(
      "secretStarRequirement"
    );

  const secretProgressBar =
    document.getElementById(
      "secretProgressBar"
    );

  const secretProgressText =
    document.getElementById(
      "secretProgressText"
    );


  function isSecretUnlocked() {

    return (
      bows >= 8 &&
      stars >= 15
    );

  }


  function updateSecretProgress() {

    const bowProgress =
      Math.min(
        bows / 8,
        1
      );

    const starProgress =
      Math.min(
        stars / 15,
        1
      );

    const totalProgress =
      Math.round(
        (
          (
            bowProgress +
            starProgress
          ) /
          2
        ) *
        100
      );


    secretProgressBar.style.width =
      totalProgress + "%";


    secretBowRequirement.textContent =
      `${bows} / 8`;

    secretStarRequirement.textContent =
      `${stars} / 15`;


    if (
      totalProgress >= 100
    ) {

      secretProgressText.textContent =
        "The Secret Room is ready to open! 🔐✨";

    } else {

      secretProgressText.textContent =
        `${totalProgress}% of the secret journey completed`;

    }

  }


  function refreshSecretRoom() {

    if (
      isSecretUnlocked()
    ) {

      secretLocked.classList.add(
        "hidden"
      );

      secretUnlocked.classList.remove(
        "hidden"
      );

      unlockAchievement(
        "secretExplorer"
      );

    } else {

      secretLocked.classList.remove(
        "hidden"
      );

      secretUnlocked.classList.add(
        "hidden"
      );

    }

  }


  /* -----------------------------------------
     SECRET PHOTO
  ----------------------------------------- */

  const secretPhoto =
    document.getElementById(
      "secretPhoto"
    );

  const secretPhotoPlaceholder =
    document.getElementById(
      "secretPhotoPlaceholder"
    );


  secretPhoto.addEventListener(
    "load",
    () => {

      secretPhotoPlaceholder.style.display =
        "none";

    }
  );


  secretPhoto.addEventListener(
    "error",
    () => {

      secretPhoto.style.display =
        "none";

      secretPhotoPlaceholder.style.display =
        "flex";

    }
  );


  /* -----------------------------------------
     ULTRA SECRET
  ----------------------------------------- */

  document
    .getElementById(
      "secretBox"
    )
    .addEventListener(
      "click",
      () => {

        const ultraSecret =
          document.getElementById(
            "ultraSecret"
          );

        ultraSecret.classList.remove(
          "hidden"
        );

        addStars(5);

        createMagic(
          window.innerWidth / 2,
          window.innerHeight / 2,
          "💎"
        );

        showToast(
          "Ultra Secret discovered! 💎"
        );

      }
    );


  /* -----------------------------------------
     TOAST
  ----------------------------------------- */

  let toastTimer;


  function showToast(message) {

    clearTimeout(
      toastTimer
    );

    toast.textContent =
      message;

    toast.classList.add(
      "show"
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        2200
      );

  }


  /* -----------------------------------------
     MAGIC PARTICLES
  ----------------------------------------- */

  function createMagic(
    x,
    y,
    symbol = "✨"
  ) {

    for (
      let i = 0;
      i < 12;
      i++
    ) {

      const particle =
        document.createElement(
          "span"
        );

      particle.className =
        "magic-particle";

      particle.textContent =
        symbol;

      particle.style.left =
        x + "px";

      particle.style.top =
        y + "px";

      particle.style.setProperty(
        "--x",
        (
          Math.random() *
          180 -
          90
        ) + "px"
      );

      particle.style.setProperty(
        "--y",
        (
          Math.random() *
          -180 -
          30
        ) + "px"
      );

      particle.style.fontSize =
        (
          Math.random() *
          12 +
          13
        ) + "px";


      document.body.appendChild(
        particle
      );


      setTimeout(
        () => particle.remove(),
        1200
      );

    }

  }


  /* -----------------------------------------
     INITIAL LOAD
  ----------------------------------------- */

  renderBowBook();

  updateCounters();

  refreshSecretRoom();

});
