// 蚁人 EGO Art Gallery — 数据驱动渲染 + Lightbox

const artworks = [
  { num: "01", file: "artwork-01.jpg", title: "Self Portrait", artist: "蚁人 EGO" },
  { num: "02", file: "artwork-02.jpg", title: "上十字架", artist: "达芬奇 ·复刻" },
  { num: "03", file: "artwork-03.jpg", title: "犹太新娘 I", artist: "伦勃朗 ·复刻" },
  { num: "04", file: "artwork-04.jpg", title: "犹太新娘 II", artist: "伦勃朗 ·复刻" },
  { num: "05", file: "artwork-05.jpg", title: "乌尔比诺的维纳斯", artist: "提香 ·复刻" },
  { num: "06", file: "artwork-06.jpg", title: "最后的晚餐", artist: "达芬奇 ·复刻" },
  { num: "07", file: "artwork-07.jpg", title: "朱迪斯斩首荷罗孚尼", artist: "卡拉瓦乔 ·复刻" },
  { num: "08", file: "artwork-08.jpg", title: "春", artist: "波提切利 ·复刻" },
  { num: "09", file: "artwork-09.jpg", title: "倒牛奶的女仆", artist: "维米尔 ·复刻" },
  { num: "10", file: "artwork-10.jpg", title: "维纳斯的诞生", artist: "波提切利 ·复刻" },
  { num: "11", file: "artwork-11.jpg", title: "自由引导人民", artist: "德拉克洛瓦 ·复刻" },
  { num: "12", file: "artwork-12.jpg", title: "蒙娜丽莎", artist: "达芬奇 ·复刻" },
  { num: "13", file: "artwork-13.jpg", title: "抱银鼠的女子", artist: "达芬奇 ·复刻" },
  { num: "14", file: "artwork-14.jpg", title: "马拉之死", artist: "大卫 ·复刻" },
  { num: "15", file: "artwork-15.jpg", title: "劫夺留西波斯的女儿", artist: "鲁本斯 ·复刻" }
];

// ========== 渲染画廊 ==========
const grid = document.getElementById("galleryGrid");

artworks.forEach((art, i) => {
  const item = document.createElement("figure");
  item.className = "gallery-item";
  item.dataset.index = i;
  item.innerHTML = `
    <img src="images/${art.file}" alt="${art.title}" loading="lazy" />
    <figcaption class="gallery-item-caption">
      <p class="gallery-item-num">— ${art.num} —</p>
      <p class="gallery-item-title">${art.title}</p>
      <p class="gallery-item-artist">${art.artist}</p>
    </figcaption>
  `;
  grid.appendChild(item);
});

// ========== Lightbox ==========
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxArtist = document.getElementById("lightboxArtist");
const lightboxNum = document.getElementById("lightboxNum");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderLightbox() {
  const art = artworks[currentIndex];
  lightboxImg.src = `images/${art.file}`;
  lightboxImg.alt = art.title;
  lightboxTitle.textContent = art.title;
  lightboxArtist.textContent = art.artist;
  lightboxNum.textContent = `${art.num} / ${String(artworks.length).padStart(2, "0")}`;
}

function prev() {
  currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
  renderLightbox();
}

function next() {
  currentIndex = (currentIndex + 1) % artworks.length;
  renderLightbox();
}

// 事件绑定
grid.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (item) openLightbox(parseInt(item.dataset.index));
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
});

// ========== Smooth scroll for nav links ==========
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
