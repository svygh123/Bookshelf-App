
"use strict";
  
let Books = [];

window.addEventListener("load", () => {
  Books = JSON.parse(localStorage.getItem("books")) || [];
  const inputBook = document.getElementById("inputBook");
  inputBook.onclick = () => addBook();
  
  for (var i = 0; i < Books.length; i++) {
    if (Books[i].isComplete === true) {
      readedBook(Books[i].id, Books[i].title, Books[i].author, Books[i].year, Books[i].isComplete)
    } else {
      unreadBook(Books[i].id,Books[i].title, Books[i].author, Books[i].year, Books[i].isComplete)
    }
  }
})


// Tambah Buku
function addBook() {
  const el = {
    Title: document.getElementById("inputBookTitle"),
     Author: document.getElementById("inputBookAuthor"),
     Year: document.getElementById("inputBookYear"),
     Status: document.getElementById("inputBookStatus")
  }
  
  if (el.Title.value !="" && el.Author.value !="" && el.Year.value !="") {
    createBook(el.Title.value, el.Author.value, el.Year.value, el.Status.checked);
    
    el.Title.value ="";
    el.Author.value ="";
    el.Year.value ="";
    el.Status.checked = false;
  } else {
   infoo("alert", "Mohon isi data Buku dengan lengkap!");
  }
}


// Menambahkan Buku kedalam list Books
function createBook(title, author, year, status) {
  let data = {
    id: Math.floor(Math.random() * 1234567890),
    title: title,
    author: author,
    year: year,
    isComplete: status
  }
  infoo("success","Buku berhasil ditambahkan!")
  
  if (status === true) {
    readedBook(data.id, data.title, data.author, data.year, data.status)
    Books.push(data),
    localStorage.setItem("books", JSON.stringify(Books))
  } else {
    unreadBook(data.id, data.title, data.author, data.year, data.status)
    Books.push(data),
    localStorage.setItem("books", JSON.stringify(Books))
  }
}


// Membuat Buku yang sudah dibaca
function readedBook(i,t,a,y,s) {
  let readbookGrid = document.getElementById("readedBook");
  
  let html = `
    <div class="grid_item" id="${i}">
      <h3>${t}</h3>
      <small>Penulis: <b>${a}</b></small>
      <small>Tahun: <b>${y}</b></small>
      <small>Status: <b>Sudah Dibaca</b></small>
      <div class="actions">
        <button class="unread" onclick="return changeStatus('${i}')"><i class="fas fa-times"></i></button>
        <button class="delete" onclick="return deleteBook('${i}'),infoo("alert","Buku berhasil dihapus")"><i class="fas fa-trash"></i></button>
      </div>
    </div> `;
    
    readbookGrid.innerHTML += html;
}


// Membuat Buku yang belum dibaca
function unreadBook(i,t,a,y,s) {
  let unreadbookGrid = document.getElementById("unreadBook");
  
  let html = `
    <div class="grid_item" id="${i}">
      <h3>${t}</h3>
      <small>Penulis: <b>${a}</b></small>
      <small>Tahun: <b>${y}</b></small>
      <small>Status: <b>Belum Dibaca</b></small>
      <div class="actions">
        <button class="read" onclick="return changeStatus('${i}')"><i class="fas fa-check"></i></button>
        <button class="delete" onclick='return deleteBook("${i}"),infoo("alert","Buku berhasil dihapus")'><i class="fas fa-trash"></i></button>
      </div>
    </div> `;
    
  unreadbookGrid.innerHTML += html;
}


// Mencari Buku berdasarkan Judul buku
let seearch = document.getElementById("inputSearchBook");
seearch.onkeyup = () => {
  return searchBook(seearch.value)
}

function searchBook(name) {
  let searchGrid = document.getElementById("searchBook");
  
  Books.filter(e => {
    if (e.title.includes(name)) {
      let html = `
        <div class="grid_item" id="${e.id}">
          <h3>${e.title}</h3>
          <small>Penulis: <b>${e.author}</b></small>
          <small>Tahun: <b>${e.year}</b></small>
          <small>Status: <b>${e.isComplete ? "Sudah Dibaca":" Belum Dibaca"}</b></small><br/>
        </div> `;
      searchGrid.innerHTML = html
    } else {
      searchGrid.innerHTML = "<center><b class='style'>Tidak ada</b></center>"
    }
  })
  
  if (name === "") {
      searchGrid.innerHTML = "";
  }
}


// Mengubah isComplete pada buku
function changeStatus(id) {
  let el = document.getElementById(id);
  Books.filter(e => {
    if (e.id === parseInt(id)) {
      let data = {
        id: Math.floor(Math.random()*1234567890),
        title: e.title,
        author: e.author,
        year: e.year,
        isComplete: !e.isComplete
      };
      
      if (e.isComplete === true) {
        unreadBook(data.id, data.title, data.author, data.year, data.isComplete)
        Books.push(data)
        deleteBook(e.id)
        infoo("success", "Buku berhasil dipindahkan")
      } else {
        readedBook(data.id, data.title, data.author, data.year, data.isComplete)
        Books.push(data)
        deleteBook(e.id);
        infoo("success", "Buku berhasil dipindahkan")
      }
      
    }
  })
}


// Menghapus Buku 
function deleteBook(id) {
  let el = document.getElementById(id)
  Books.filter(e => {
    if (e.id === parseInt(id)) {
      let x = Books.indexOf(e);
      Books.splice(x, 1);
      localStorage.setItem("books", JSON.stringify(Books));
    }
  })
  
  el.hidden = true;
}

function infoo(type, text) {
  let id = Math.floor(Math.random() * 10394848);
  let el = document.createElement("div");
  el.setAttribute("class", "info");
  el.setAttribute("id", parseFloat(id));
  el.innerText = text;
  el.classList.add(type);
  
  document.body.appendChild(el)
  
  setTimeout(() => {
    el.style.opacity = 1;
    el.style.visibility = "visible";
    el.style.transform = "translateX(0px)";
    
    setTimeout(function() {
      el.style.opacity = 0;
      el.style.visibility = "hidden";
      el.style.transform = "translateX(300px)";
    }, 1500);
  }, 10)
}