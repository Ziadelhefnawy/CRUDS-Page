
let mode = 'create'
let tmp;
//get total
function getTotal(){
    if(price.value != ''){
let result = (+price.value + +taxes.value + +ads.value) - +discount.value
total.innerHTML = result
total.style.background = '#040';
}else{
    total.innerHTM = '';
    total.style.background = '#a00d02'
}
}
//create product
let dataPro;
if(localStorage.product != null){
dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(mode === 'create'){ if(newPro.count > 1){
for(let i =0; i<newPro.count; i++){
    dataPro.push(newPro)
}
    }else{
        dataPro.push(newPro)
    }}else{
dataPro[tmp] = newPro
mode = 'create';
submit.innerHTML = 'Create'
count.style.display = 'block'
    }

    //save localstorage
    localStorage.setItem('product' , JSON.stringify(dataPro))
    clearData()
    showData()
}

//clear inputs
function clearData(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';

}
//read
function showData(){
    getTotal()
let table = '';
for(let i =0; i < dataPro.length; i++){
table += `<tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td> 
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                                <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                            </tr>`;
}
document.getElementById('tbody').innerHTML = table;
let btnDelete = document.getElementById('deleteAll')
if(dataPro.length > 0 ){
btnDelete.innerHTML = `
<button onclick ="deleteAll()" >Delete All (${dataPro.length })</button>
`
}else{
    btnDelete.innerHTML ='';
}
}
showData()
//count
//delete
function deleteData(i){
dataPro.splice(i,1)
localStorage.product = JSON.stringify(dataPro)
showData()
}
function deleteAll(){
localStorage.clear()
dataPro.splice(0)
showData()
}
//update
function updateData(i){
    console.log(i)
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update'
    mode = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
//search
let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search')
if(id == 'searchTitle'){
    searchMode = 'title';
    search.placeholder = 'Search By Title';
}else{
    searchMode = 'category';
    search.placeholder = 'Search By Category';
}
search.focus()
}
function searchData(value){
    let table = '';
    if(searchMode == 'title'){
for(let i =0;i<dataPro.length;i++){
    if(dataPro[i].title.includes(value)){
table += `<tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td> 
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                                <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                            </tr>`;
    }else{

    }

}
    }else{

    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data