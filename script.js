function getId() {
  let id = 0;
  while (true) {
    if (!document.getElementById(`mito-wrapper-id-${id}`)) {
      break;
    }
    id++;
  }
  return id;
}

function mito() {
  const imgURL = chrome.extension.getURL("mito.png");
  // imgタグ対応
  const imgList = document.querySelectorAll('img');
  imgList.forEach((img) => {
    if (!img.classList.contains('mito-background') && !img.classList.contains('mito-image')) {
      img.classList.add('mito-background');
      const id = getId();
      const mitoWrapper = $(`<div id="mito-wrapper-id-${id}" class="mito-wrapper"></div>`);
      $(img).wrap(mitoWrapper);
      $(`#mito-wrapper-id-${id}`).append(`<img class="mito-image" src="${imgURL}">`);
    }
  });

  // http://www.nicovideo.jp/video_top のサムネ対応
  const thumbnailList = document.querySelectorAll('.Thumbnail');
  thumbnailList.forEach((thumbnail) => {
    if (!thumbnail.classList.contains('mito-background') && !thumbnail.classList.contains('mito-image')) {
      thumbnail.classList.add('mito-background');
      const id = getId();
      const mitoWrapper = $(`<div id="mito-wrapper-id-${id}" class="mito-wrapper-niconico"></div>`);
      $(thumbnail).wrap(mitoWrapper);
      $(`#mito-wrapper-id-${id}`).append(`<img class="mito-image" src="${imgURL}">`);
    }
  });
}

function main() {
  mito();
  const target = document.querySelector('body');
  const observer = new MutationObserver(mito);
  const config = { childList: true, subtree: true };
  observer.observe(target, config);
}

main();
