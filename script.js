const cropList = document.getElementById("cropList");
const accessoryList = document.getElementById("accessoryList");
const machineList = document.getElementById("machineList");
const form = document.getElementById("addForm");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

let items = JSON.parse(localStorage.getItem("items")) || [];

function render(){
  cropList.innerHTML = accessoryList.innerHTML = machineList.innerHTML = "";
  items.forEach((item,i)=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${item.img}">
      <div class="content">
        <span class="tag">${item.type}</span>
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
        <p class="location">${item.location}</p>
        <button class="btn" onclick="view(${i})">View</button>
        <button class="btn" style="background:#e53935" onclick="removeItem(${i})">Delete</button>
      </div>
    `;
    if(item.type==="crop") cropList.appendChild(card);
    if(item.type==="accessory") accessoryList.appendChild(card);
    if(item.type==="machine") machineList.appendChild(card);
  });
}

form.addEventListener("submit",e=>{
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = ()=>{
    items.push({
      type:type.value,
      name:name.value,
      price:price.value,
      location:location.value,
      img:reader.result
    });
    localStorage.setItem("items",JSON.stringify(items));
    form.reset();
    render();
  };
  reader.readAsDataURL(image.files[0]);
});

function view(i){
  const x=items[i];
  modalContent.innerHTML=`
    <h3>${x.name}</h3>
    <img src="${x.img}" style="width:100%;border-radius:10px">
    <p><b>Price:</b> ₹${x.price}</p>
    <p><b>Location:</b> ${x.location}</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;
  modal.style.display="flex";
}

function closeModal(){modal.style.display="none";}

function removeItem(i){
  if(confirm("Delete this item?")){
    items.splice(i,1);
    localStorage.setItem("items",JSON.stringify(items));
    render();
  }
}

render();