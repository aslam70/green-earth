const loadCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.categories);
    loadPlants();
  } catch (error) {
    console.log(error);
  }
};
const loadPlants = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCart(data.plants);
  } catch (error) {
    console.log(error);
  }
};
const loadCart = async (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    displayCart(json.plants);
  } catch (error) {
    console.log(error);
  }
};
const displayCart = (trees) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  for (const tree of trees) {
    const createDiv = document.createElement("div");
    createDiv.classList.add("card-wrapper");
    createDiv.innerHTML = `
          <div class="card shadow-sm">
            <figure>
              <img src="${tree.image}" alt="${tree.name}" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${tree.name}</h2>
              <p>${tree.description}</p>
              <div class="flex justify-between items-center">
                <p class="price">৳${tree.price}</p>
                <button class="bg-[#15803D30] name p-1 rounded-2xl">${tree.category}</button>
              </div>
              <div class="card-actions">
                <button class="btn w-full rounded-3xl bg-[#15803D] text-white">Add to cart</button>
              </div>
            </div>
          </div>
    `;
    cartContainer.appendChild(createDiv);
  }
};
const displayCategory = (plants) => {
  const plantsMenu = document.getElementById("plants-menu");
  plantsMenu.innerHTML = "";
  plants.forEach((plant) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button onclick="loadCart('${plant.id}')"
        class="w-auto md:w-full text-left px-4 py-2 rounded-md
               hover:bg-[#15803D] hover:text-white
               text-gray-700 font-medium
               border-b border-gray-200">
        ${plant.category_name}
      </button>
    `;
    plantsMenu.appendChild(li);
  });
};

const bookmarks = [];

const bookMarkHandler = (e) => {
  const cardBody = e.target.closest(".card-body");
  const name = cardBody.querySelector(".card-title").innerText;
  const price = cardBody.querySelector(".price").innerText;

  const exists = bookmarks.find((b) => b.name === name);
  if (exists) {
    exists.quantity += 1;
  } else {
    bookmarks.push({ name, price, quantity: 1 });
  }

  showBookMark();
};

const showBookMark = () => {
  const bookmarkContainer = document.getElementById("bookmarkContainer");
  bookmarkContainer.innerHTML = "";

  bookmarks.forEach((bookmark, index) => {
    bookmarkContainer.innerHTML += `
      <div class="flex justify-between items-start bg-[#15803D10] p-3 rounded-lg">
        <div>
          <p class="font-bold text-sm">${bookmark.name}</p>
          <p class="text-gray-400 text-sm">${bookmark.price} × ${bookmark.quantity}</p>
        </div>
        <button onclick="removeBookmark(${index})" class="text-gray-400 hover:text-red-500 font-bold text-xl leading-none">×</button>
      </div>
    `;
  });

  // Total calculate
  const total = bookmarks.reduce((sum, b) => {
    const price = parseFloat(b.price.replace(/[^\d.]/g, ""));
    return sum + price * b.quantity;
  }, 0);

  bookmarkContainer.innerHTML += `
    <div class="pt-3 border-t border-gray-200 mt-1">
      <p class="font-bold text-sm">Total: ৳${total.toFixed(0)}</p>
    </div>
  `;
};

const removeBookmark = (index) => {
  bookmarks.splice(index, 1);
  showBookMark();
};

document.getElementById("cart-container").addEventListener("click", (e) => {
  if (e.target.innerText.trim() === "Add to cart") {
    bookMarkHandler(e);
  }
});

loadCategory();