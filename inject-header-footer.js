document.addEventListener("DOMContentLoaded", function() {
  // CSS自動読込
  let css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "style.css";
  document.head.appendChild(css);

  // ヘッダー・フッターiframe自動挿入
  ["header","footer"].forEach(id=>{
    let f=document.createElement("iframe");
    f.src=id + ".html";
    f.id="common-" + id;
    f.style.width = "100vw";
    f.style.minWidth = "100%";
    f.style.maxWidth = "100%";
    f.style.border = "none";
    f.style.display = "block";
    f.style.overflow = "hidden";
    f.style.margin = "0";
    f.style.padding = "0";
    // 高さは後で自動調整（ロード時）
    f.onload = function() {
      try {
        f.style.height = f.contentWindow.document.body.scrollHeight + "px";
      } catch(e){}
    };
    if(id == "header") {
      document.body.prepend(f)
    } else {
      document.body.appendChild(f)
    }
  });
});