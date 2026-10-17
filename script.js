const countdown = document.querySelector("#countdown");
const number = document.querySelector("#number");
const progress = document.querySelector("#progress");
const welcome = document.querySelector("#welcome");
const cakeScreen = document.querySelector("#cake-screen");
const diaryScreen = document.querySelector("#diary-screen");
const finaleScreen = document.querySelector("#finale-screen");
const confetti = document.querySelector("#confetti");
const goButton = document.querySelector("#go-button");
const againButton = document.querySelector("#again-button");
const candle = document.querySelector("#candle");
const blowButton = document.querySelector("#blow-button");
const surpriseNext = document.querySelector("#surprise-next");
const cakeInstruction = document.querySelector("#cake-instruction");
const diaryPage = document.querySelector("#diary-page");
const pageMessage = document.querySelector("#page-message");
const pageNumber = document.querySelector("#page-number");
const pageSticker = document.querySelector("#page-sticker");
const pageTurnHint = document.querySelector("#page-turn-hint");
const pageDots = document.querySelector("#page-dots");

const diaryPages = [
  "Ethukum Feel panitu irukathaaa🫂 Romba sensitive ah irukatha 🤌🏻 en thangam epavumae good hearted person than intha year la irunthuu inum ithae marii irungaa💗",
  "also yaraiyum aadika kudathuu inimel 🫂okkk ...chammathu kutty ah irukanum😽 Amma appa anna patti elaraiyum Unaku pudicha marii nala pathukooo",
  "Additional ah Live la nan soon vaaren angaa🙂‍↔️😉 Aprm sir en mamiyar ta soliralam ahh😎 inaiku unga paiyan ku gift Venum nu😉 ...🤭🤭 Cher cherr funzzz apart🤭...",
  "Thankkk yoouhhhh sooo much forrrr coming into my lifeee🫶🏻 My blooms and glows Because of your presence day by day🤍🤌🏻 really greatfull and truthful for youuuu throughout my lifetime❣️🫂",
  "Ungalaaa nalaa sprrr ah vechuuuu konji konjiiiiii😽😽😽Semmmaaaiyaaa pathukaren enaku therinja marriiii🤌🏻❣️🫂 Begin your another year of your birthday with full of your happiness and cherish for all the Best moments happens in your life🤌🏻❣️😽🥳",
  "Thangaaaaa kunjaeeeeeeeee 💋💋 Loveeeeeeeeee youuuuuuu to theeee coreeeeee diiii paaatttu🌍.."
];
const diaryStickers = ["💌", "🫂", "🤭", "🫶🏻", "🎂", "💋"];
let currentPage = 0;

let remaining = 5;

function tick() {
  remaining -= 1;
  progress.style.transform = `scaleX(${(5 - remaining) / 5})`;

  if (remaining > 0) {
    number.textContent = remaining;
    number.classList.remove("number");
    void number.offsetWidth;
    number.classList.add("number");
    window.setTimeout(tick, 1000);
    return;
  }

  countdown.hidden = true;
  welcome.hidden = false;
  burst(58);
}

function burst(amount = 80) {
  const colors = ["#ff79bb", "#ffd778", "#bd9aff", "#ffffff", "#81e7d3", "#ff9a70"];
  const shapes = ["", "circle", "ribbon"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("i");
    piece.className = `confetti-piece ${shapes[Math.floor(Math.random() * shapes.length)]}`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--duration", `${3.2 + Math.random() * 3.6}s`);
    piece.style.setProperty("--delay", `${Math.random() * 1.2}s`);
    piece.style.setProperty("--drift", `${Math.random() * 240 - 120}px`);
    piece.style.setProperty("--spin", `${Math.random() * 1000 - 500}deg`);
    confetti.append(piece);
    window.setTimeout(() => piece.remove(), 8500);
  }
}

goButton.addEventListener("click", () => {
  welcome.hidden = true;
  cakeScreen.hidden = false;
  burst(65);
});

candle.addEventListener("click", blowOutCandle);
blowButton.addEventListener("click", blowOutCandle);

function blowOutCandle() {
  if (candle.classList.contains("blown-out")) return;
  candle.classList.add("blown-out");
  candle.setAttribute("aria-label", "Candle blown out");
  cakeInstruction.textContent = "Wish pannitengala? Un wish kandippa nadakkum! 🫂✨";
  blowButton.hidden = true;
  surpriseNext.hidden = false;
  burst(85);
}

surpriseNext.addEventListener("click", () => {
  cakeScreen.hidden = true;
  diaryScreen.hidden = false;
  renderDiaryPage();
});

function renderDiaryPage() {
  pageMessage.textContent = diaryPages[currentPage];
  pageNumber.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(diaryPages.length).padStart(2, "0")}`;
  pageSticker.textContent = diaryStickers[currentPage];
  diaryPage.className = `diary-page page-tone-${currentPage % 6}`;
  diaryPage.setAttribute("aria-label", currentPage === diaryPages.length - 1
    ? "Open the final birthday message"
    : `Turn to page ${currentPage + 2} of ${diaryPages.length}`);
  pageTurnHint.innerHTML = currentPage === diaryPages.length - 1
    ? 'Innum oru chinna surprise <b>→</b>'
    : 'Adutha page ku tap pannunga <b>→</b>';
  pageDots.replaceChildren(...diaryPages.map((_, index) => {
    const dot = document.createElement("span");
    if (index === currentPage) dot.className = "active";
    return dot;
  }));
  void diaryPage.offsetWidth;
  diaryPage.classList.add("turning");
}

diaryPage.addEventListener("click", () => {
  if (currentPage < diaryPages.length - 1) {
    currentPage += 1;
    renderDiaryPage();
    return;
  }
  diaryScreen.hidden = true;
  finaleScreen.hidden = false;
  burst(220);
});

againButton.addEventListener("click", () => burst(220));

window.setTimeout(tick, 1000);
