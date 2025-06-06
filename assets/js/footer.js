// メニュー開閉とバツ制御
let menuOpen = false;
window.addEventListener("message", function(e){
  if(e.data.type === "burgerClick") {
    // 縦長の時だけ
    if(window.innerHeight > window.innerWidth) {
      menuOpen = !menuOpen;
      const menu = document.getElementById("sideMenu");
      const headerFrame = document.getElementById("headerFrame").contentWindow;
      if(menuOpen) {
        menu.classList.add("open");
        headerFrame.postMessage({type:"setBurgerActive"},"*");
      } else {
        menu.classList.remove("open");
        headerFrame.postMessage({type:"setBurgerInactive"},"*");
      }
    }
  }
});
document.getElementById("sideMenu").addEventListener("click", function(e){
  if(e.target.tagName === "A") {
    menuOpen = false;
    this.classList.remove("open");
    document.getElementById("headerFrame").contentWindow.postMessage({type:"setBurgerInactive"},"*");
  }
});

// 縦長だけハンバーガー出す
function updateHamburgerMode() {
  const isPortrait = window.innerHeight > window.innerWidth;
  document.body.classList.toggle("hide-hamburger", !isPortrait);
  // メニュー閉じる
  if(!isPortrait && menuOpen) {
    menuOpen = false;
    document.getElementById("sideMenu").classList.remove("open");
    document.getElementById("headerFrame").contentWindow.postMessage({type:"setBurgerInactive"},"*");
  }
}
window.addEventListener("resize", updateHamburgerMode);
window.addEventListener("orientationchange", updateHamburgerMode);
updateHamburgerMode(); // 初期判定

// iframe高さ自動調整（headerのみ）
window.addEventListener("message", function(event) {
  if(event.data.type === "headerHeight") {
    document.getElementById("headerFrame").style.height = event.data.height + "px";
  }
}, false);