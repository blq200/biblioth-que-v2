 var title = document.getElementById('title');
var author = document.getElementById('author');
var price = document.getElementById('price');
var date = document.getElementById('pub');
var language = document.getElementById('lang');
var types = document.querySelectorAll('input[name="Selectionner"]');
var formulaire = document.getElementById('form');
var errors = document.getElementsByClassName("error");

const roman = document.getElementById('Roman');
const essai = document.getElementById('Essai');
const bande = document.getElementById('Bande-Dessinée');
const test = document.querySelector('.test');

var tableau = document.getElementsByTagName('table')[0];
var ChangerBtn = document.getElementById('changerBtn');
var AjouterBtn = document.getElementById('ajouterBtn');
var selectedValue;
var validation_ok = true;
var parag = document.getElementById('h1');

var storage = JSON.parse(localStorage.getItem("tableau")) ?? [];
//get item local storage 
const markup = ` ${storage.map((s)=>{
  return `<tr>
                      <td>${s.title}</td>
                      <td>${s.author}</td>
                      <td>${s.price}</td>
                      <td>${s.language}</td>
                      <td>${s.date}</td>
                      <td>${s.types}</td>
                      <td><button onclick="btnEdit(this)"class="btn">Editer</button><button onclick="btnSupr(this)"  class="btn"  id="btn2">Supprimer</button> </td>
                      
                      
  </tr>
  `
}).join('')
 
}
`
test.insertAdjacentHTML('beforeend', markup);


var allBookNames = [];

formulaire.addEventListener('submit', function eVent(e) {
  e.preventDefault();
  var validation_ok = true;
  // title validation
  if (title.value.length > 30) {
    validation_ok = false;
    errors[0].innerHTML = "it should be less than 30 characters";
    errors[0].style.color = 'red'

  }
  else if (title.value == "") {
    validation_ok = false;
    errors[0].innerHTML = "fill this blank please";
    errors[0].style.color = 'red'
    title.style.borderColor = "red"
  }

  else {
    title.style.borderColor = "#1a7fe9"
    errors[0].innerHTML = "";
  };



  


  if (author.value.length > 30) {
    validation_ok = false;
    errors[1].innerHTML = "it should be less than 30 characters";
    errors[1].style.color = 'red'
  }
  else if (author.value == "") {
    validation_ok = false;
    errors[1].innerHTML = "fill this feild ";
    errors[1].style.color = 'red';
    author.style.borderColor = "red"
  }
  else {
    author.style.borderColor = "#1a7fe9"
    errors[1].innerHTML = "";
  };

  // price validation

  if (isNaN(price.value)) {
    validation_ok = false;
    errors[2].innerHTML = "fill this feild ";
    errors[2].style.color = 'red';
    price.style.borderColor = "red"
  }
  else if (price.value == "") {
    validation_ok = false;
    errors[2].innerHTML = " you must fill this feild please";
    errors[2].style.color = 'red';
    price.style.borderColor = "red"
  }
  else if (price.value < 0) {
    validation_ok = false;
    errors[2].innerHTML = "the value of the price should be positive";
    errors[2].style.color = 'red';
    price.style.borderColor = "red"
  }

  else {
    errors[2].style.color = '#1a7fe9';
    price.style.borderColor = "#1a7fe9"
    errors[2].innerHTML = "";

  };



  if (date.value == "") {
    validation_ok = false;
    errors[3].innerHTML = "fill this feild please";
    errors[3].style.color = 'red';
    date.style.borderColor = "red"
  }
  else {
    date.style.borderColor = "#1a7fe9"
    errors[3].innerHTML = "";

  };

 

  if (language.value == "") {
    validation_ok = false;
    errors[4].innerHTML = "select the language";
    errors[4].style.color = 'red';
    language.style.borderColor = "red"
  }
  else {
    errors[4].innerHTML = "";
    language.style.borderColor = "#1a7fe9"
  }
 

  if (!(roman.checked || essai.checked || bande.checked)) {
    validation_ok = false;
    errors[5].innerHTML = "select the type of your book";
    errors[5].style.color = 'red';
  }
  else {
    errors[5].innerHTML = "";
  }

  for (var type of types) {
    if (type.checked) {
      selectedValue = type.value;
      break;
    }
  }


 
  class book {
    constructor(title, author, price, date, language, types, email) {
      this.title = title.value;
      this.author = author.value;
      this.price = price.value;
      this.date = date.value;
      this.language = language.value;
      this.types = types.value;
      this.email = email.value;
    }
  };





  if (validation_ok == true) {


    parag.textContent = `this book ${title.value},is a  ${type.value}
          in ${language.value},written by ${author.value}
        published in ${date.value} its price is ${price.value} Dhs.`;


    //sort book Names
    allBookNames.push(title.value);
    allBookNames.sort();
    let index = 1;
    index += allBookNames.indexOf(title.value);
    



    tableau.style.display = "block";
    var ligne = tableau.insertRow(index);
    ligne.insertCell(0).innerHTML = title.value;
    ligne.insertCell(1).innerHTML = author.value;
    ligne.insertCell(2).innerHTML = price.value;
    ligne.insertCell(3).innerHTML = date.value;
    ligne.insertCell(4).innerHTML = language.options[language.selectedIndex].value;
    ligne.insertCell(5).innerHTML = type.value;
    ligne.insertCell(6).innerHTML = '<button onclick="btnEdit(this)"class="btn">Editer</button>' + '<button onclick="btnSupr(this)"  class="btn"  id="btn2">Supprimer</button>';
    
    
    
    function localstorage(){

        storage.push({
        title : title.value,
        author : author.value,
        price : price.value,
        date : date.value,
        language: language.value,
        types:type.value,
        email: email.value

      })
      localStorage.setItem("tableau",JSON.stringify(storage));
     
    }
    localstorage()
    sortTable();
    
    }

  
  resetForm();
});


// fonction de vider les Inputs apres validation
function resetForm() {

  title.value = "";
  author.value = "";
  price.value = "";
  date.value = "";
  language.value = "";
}

//  fonction de supprimer un ligne dans le tableau

function btnSupr(r) {
  alert("are you sure you want to delete this line")
  var i = r.parentNode.parentNode.rowIndex;
  tableau.deleteRow(i);
}


function btnEdit(td) {

  selectedRow = td.parentElement.parentElement;

  title.value = selectedRow.cells[0].innerHTML;
  author.value = selectedRow.cells[1].innerHTML;
  price.value = selectedRow.cells[2].innerHTML;
  date.value = selectedRow.cells[3].innerHTML;
  language.value = selectedRow.cells[4].innerHTML;

  for (var i = 0; i < 3; i++) {
    if (types[i].value == selectedRow.cells[5].innerHTML) {
      types[i].checked = true;
    }
  }

  selectedValue = selectedRow.cells[5].innerHTML;

  ChangerBtn.style.display = "block";
  AjouterBtn.style.display = "none";


}



function btnChanger() {
  selectedRow.cells[0].innerHTML = title.value;
  selectedRow.cells[1].innerHTML = author.value;
  selectedRow.cells[2].innerHTML = price.value;
  selectedRow.cells[3].innerHTML = date.value;
  selectedRow.cells[4].innerHTML = language.options[language.selectedIndex].value;

  for (var type of types) {
    if (type.checked) {
      selectedValue = type.value;
    }
  }

  selectedRow.cells[5].innerHTML = selectedValue;


  ChangerBtn.style.display = "none";
  sortTable()
  resetForm();

}
var myApp = new function () {
  sortTable();
 this.printTable = function () {
        
          var tab = document.getElementById('table');
          var win = window.open('', '', 'height=1000,width=1000');
          win.document.write(tab.outerHTML);
          win.document.close();
          win.print();
 }
 

  }

function sortTable() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.querySelector("#table");
switching = true;

while (switching) {
   switching = false;
  rows = table.rows;

  for (i = 1; i < (rows.length - 1); i++) {

    shouldSwitch = false;

    x = rows[i].getElementsByTagName("td")[0];
    y = rows[i + 1].getElementsByTagName("td")[0];
   
    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

      shouldSwitch = true;
      break;
    }
  }
  if (shouldSwitch) {
    
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
  }
}
}