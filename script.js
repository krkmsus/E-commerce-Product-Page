// burger 
const burger = document.getElementById("burger");
const closeBurger = document.getElementById("close-burger");
const linksUl = document.querySelector("header nav ul");
const linksUlDiv = document.querySelector("header nav ul");

let overlay = document.createElement("div");

overlay.style.cssText = `
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #000000d4;
`;

burger.onclick = () => {
  document.body.appendChild(overlay);
  linksUl.style.display = "flex";
  linksUl.style.animation = "burger-in 500ms forwards"
  setTimeout(() => {
    linksUl.style.left = "-40px";
  }, 500);
};

closeBurger.onclick = () => {
  linksUl.style.animation = "burger-out 500ms forwards"
  setTimeout(() => {
    linksUl.style.display = "none";
    linksUl.style.left = "calc(-40px + -100%)";
    overlay.remove();
  }, 500);
};


// product carting 

// product adding
const addButton = document.getElementById("add-btn");
const productCount = document.getElementById("product-count");
const plusProduct = document.getElementById("plus");
const minusProduct = document.getElementById("minus");

// product count changing

let actualCount = 0;

plusProduct.onclick = () => {
  if (actualCount !== 10) {
    actualCount++;
  };
  productCount.innerText = `${actualCount}`;
};

minusProduct.onclick = () => {
  if (actualCount !== 0) {
    actualCount--;
  };
  productCount.innerText = `${actualCount}`;
};

// cart open and close

const cartIcon = document.getElementById("cart-icon");
const cartMenu = document.getElementById("cart");
let checkOutBtn = document.getElementById("checkout-btn");

cartIcon.onclick = () => {
  let cartActive = cartMenu.classList.contains("active");
  if (cartActive === false) {
    cartMenu.classList.add("active");
  }
  else if (cartActive === true) {
    cartMenu.classList.remove("active");
  }
};

// adding the actual count

addButton.onclick = () => {
  // stuff added to cart notification 

  if (actualCount !== 0) {
    // create notification element
    let notificationDiv = document.createElement("div");
    notificationDiv.id = "notify";
    notificationDiv.innerHTML = `<p>${actualCount} items added to cart.</p>`
    document.body.appendChild(notificationDiv);
    setTimeout(() => {
      notificationDiv.remove();
    }, 4000);
  };


  // create product order element
  const emptyP = document.getElementById("empty");
  checkOutBtn = document.getElementById("checkout-btn");
  let orderParent = document.createElement("div");
  let orderChild = document.createElement("div");
  let orderText = document.createElement("div");
  let imageWrapper = document.createElement("div");
  let deleteWrapper = document.createElement("div");
  // style it
  orderChild.style.cssText = `
      margin: 5px 20px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 20px;
    `


  orderText.innerHTML = `   
  <p style="color: var(--Dark-grayish-blue);" class="product-name">Fall Limited Edition Sneakers</p> 
  <p style="display: flex;" class="product-price"><span style="font-size: 0.75rem;">$125.00 x ${actualCount}</span><span style="margin-left: 10px; font-weight: 700; font-size: 0.75rem">$${actualCount * 125}.00</span></p>
  `


  let productThumb = document.createElement("img");
  productThumb.src = "images/image-product-1-thumbnail.jpg"
  productThumb.style.cssText = `
      grid-area: image;
      width: 40px;
      border-radius: 4px;
    `;

  let deleteIcon = document.createElement("img");
  deleteIcon.id = "delete-icon"
  deleteIcon.src = "images/icon-delete.svg"

  if (actualCount !== 0) {
    try {
      if (cartMenu.contains(emptyP) === true) {
        emptyP.remove();
        checkOutBtn.style.display = "block";
        // add it after deleting the empty p
        imageWrapper.style.width = "40px"
        imageWrapper.append(productThumb);
        deleteWrapper.append(deleteIcon);
        orderChild.append(imageWrapper, orderText, deleteWrapper);
        orderParent.appendChild(orderChild);
        cartMenu.querySelector("div").prepend(orderParent);
      }
      // only update the existing one
      else {
        cartMenu.querySelector(".product-price").innerHTML = `
          <span>$125.00 x ${actualCount}</span><span style="margin-left: 10px; font-weight: 700;">$${actualCount * 125}.00</span>
        `;
      }
    } catch (error) {
      return;
    }

  };


};


// delete icon trigger removes all in cart

cartMenu.addEventListener("click", (e) => {
  if (e.target.id === "delete-icon") {
    cartMenu.innerHTML = `
      <h2>Cart</h2>
      <div class="original-div">
      <p id="empty">Your cart is empty.</p>
      <button class="clickable" id="checkout-btn">Checkout</button>
  `;
    checkOutBtn.style.display = "none";
  }
});

// image slider 💀
// get images and thumbnail images and next/prev buttons 
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const imagesArray = Array.from(document.querySelectorAll(".main .product-gallery .active-image-wrapper>img"));
const thumbsArray = Array.from(document.querySelectorAll(".main .product-gallery .thumbs-wrapper img"));
let currentImage = 0;

// stuff that appear for active thumbnail

let thumbOverlay = document.createElement("div");
thumbOverlay.id = "#active-thumb-overlay";
thumbOverlay.style.cssText = `position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.6;
  border-radius: 12px;
  border: 2px solid var(--Orange);`
let thumbBack = document.createElement("div");
thumbBack.id = "#active-thumb-back";
imagesArray[currentImage].classList.add("active")
thumbsArray[currentImage].after(thumbOverlay);
thumbsArray[currentImage].before(thumbBack);

// thumbnail sliding

thumbsArray.forEach((e) => {
  e.addEventListener("click", () => {
    thumbsArray.forEach((e) => {
      e.classList.add("clickable")
    });
    currentImage = thumbsArray.indexOf(e);
    e.classList.remove("clickable");
    e.after(thumbOverlay);
    e.before(thumbBack);


    // put active to the corressponding image
    imagesArray.forEach((el) => {
      el.classList.remove("active")
      if (currentImage === imagesArray.indexOf(el)) {
        el.classList.add("active");
      }
    });
  });
});

// next and prev for phones

nextButton.onclick = nextImage;
previousButton.onclick = previousImage;

function nextImage() {
  if (currentImage !== imagesArray.length - 1) {
    currentImage++;
    imagesArray.forEach((el) => {
      el.classList.remove("active")
      if (currentImage === imagesArray.indexOf(el)) {
        el.classList.add("active");
      }
    });
  };
};

function previousImage() {
  if (currentImage !== 0) {
    currentImage--;
    imagesArray.forEach((el) => {
      el.classList.remove("active")
      if (currentImage === imagesArray.indexOf(el)) {
        el.classList.add("active");
      }
    });
  };
};



// lightbox
const activeImageWrapper = document.querySelector(".main .product-gallery .active-image-wrapper");

activeImageWrapper.addEventListener("click", () => {
  if (window.innerWidth < 992) return;
  openLightbox(currentImage);
});

function openLightbox(startIndex) {
  let lbIndex = startIndex;

  // overlay
  let lbOverlay = document.createElement("div");
  lbOverlay.id = "lb-overlay";
  lbOverlay.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
    padding: 50px 0;
  `;

  // close button
  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.cssText = `
    position: absolute; top: 20px; right: 20px;
    background: none; border: none;
    color: white; font-size: 2rem;
    cursor: pointer; line-height: 1;
  `;

  // wrapper that holds everything
  let lbWrapper = document.createElement("div");
  lbWrapper.style.cssText = `
    width: min(550px, 90vw);
    scale: 0.9;
    display: flex; flex-direction: column; gap: 20px;
  `;

  // main image
  let lbImg = document.createElement("img");
  lbImg.src = imagesArray[lbIndex].src;
  lbImg.style.cssText = `
    width: 100%; border-radius: 16px; display: block;
  `;

  // prev/next row
  let navRow = document.createElement("div");
  navRow.style.cssText = `position: relative;`;

  let lbPrev = document.createElement("button");
  let lbNext = document.createElement("button");

  [lbPrev, lbNext].forEach(btn => {
    btn.style.cssText = `
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 40px; height: 40px; border-radius: 50%;
      background: white; border: none; cursor: pointer;
      display: grid; place-items: center;
    `;
  });

  lbPrev.innerHTML = `<img src="images/icon-previous.svg">`;
  lbNext.innerHTML = `<img src="images/icon-next.svg">`;
  lbPrev.style.left = "-20px";
  lbNext.style.right = "-20px";

  // thumbnails
  let lbThumbs = document.createElement("div");
  lbThumbs.style.cssText = `
    display: flex; gap: 16px; justify-content: center;
  `;

  function buildThumbs() {
    lbThumbs.innerHTML = "";
    thumbsArray.forEach((t, i) => {
      let wrap = document.createElement("div");
      wrap.style.cssText = `position: relative; width: 80px; cursor: pointer;`;

      let img = document.createElement("img");
      img.src = t.src;
      img.style.cssText = `width: 100%; border-radius: 8px; display: block;`;

      if (i === lbIndex) {
        wrap.style.outline = "2px solid hsl(26,100%,55%)";
        wrap.style.borderRadius = "8px";
        let overlay = document.createElement("div");
        overlay.style.cssText = `
          position: absolute; inset: 0;
          background: white; opacity: 0.5; border-radius: 8px;
        `;
        wrap.appendChild(overlay);
      }

      wrap.appendChild(img);
      wrap.addEventListener("click", () => { lbIndex = i; update(); });
      lbThumbs.appendChild(wrap);
    });
  }

  function update() {
    lbImg.src = imagesArray[lbIndex].src;
    buildThumbs();
  }

  lbPrev.onclick = () => {
    if (lbIndex > 0) { lbIndex--; update(); }
  };
  lbNext.onclick = () => {
    if (lbIndex < imagesArray.length - 1) { lbIndex++; update(); }
  };

  closeBtn.onclick = () => lbOverlay.remove();
  lbOverlay.addEventListener("click", (e) => {
    if (e.target === lbOverlay) lbOverlay.remove();
  });

  buildThumbs();
  navRow.append(lbPrev, lbImg, lbNext);
  lbWrapper.append(navRow, lbThumbs);
  lbOverlay.append(closeBtn, lbWrapper);
  document.body.appendChild(lbOverlay);
}

// done, too lazy to animate stuff