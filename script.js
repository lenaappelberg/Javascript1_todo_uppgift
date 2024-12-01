//posts array

const posts=[
];
const item={
  title:" "
};
const url = "https://js1-todo-api.vercel.app/api/todos?apikey=f7de1d98-94aa-44f6-b7e2-4864002411d8";
//task selector
const task= document.querySelector("#task");
//Hämta todos function
const list= document.getElementById("ordered-list");
async function getData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log(response);
      const json = await response.json();
      console.log(json);
      json.forEach(post=>posts.push(post));
      rendertodo();
    } catch (error) {
      console.error(error.message);
    }
  }
  getData();
//spara todos fetchPOST function
async function saveListitems(message) {
  fetch("https://js1-todo-api.vercel.app/api/todos?apikey=f7de1d98-94aa-44f6-b7e2-4864002411d8",{
  method:'POST',
  headers:{
  'Content-type':'application/json'
  },
  body:JSON.stringify(message)
  })
  .then(response=>response.json())
  .then(data=>addtodo(data._id));
} 
function rendertodo(){
  posts.forEach(post=>{
    addtodo(post._id)
  })
}
//lägg till todos function
//make foreach
function addtodo(id){
  var itemDiv= document.createElement("div");
  const listItem=document.createElement("li");
  const textNode= document.createTextNode(task.value);
  listItem.appendChild(textNode);
  listItem.id=id;
  console.log("add remove button");
  console.log(id);
  var buttonDiv= document.createElement('div');
    let removeBtn=document.createElement('button');
    removeBtn.classList.add('removeBtnClass');
    removeBtn.textContent='remove';
    removeBtn.setAttribute('type','click');
    removeBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      removetodo(id)
      removeBtn.closest(".listcontainer").remove();
      (removeBtn.remove());
      console.log(id)
    })
    buttonDiv.appendChild(removeBtn);
    itemDiv.appendChild(buttonDiv);
    listItem.appendChild(itemDiv);
  listItem.classList.add('listcontainer');
  document.getElementById("ordered-list").appendChild(listItem);
  list.insertBefore(listItem,list.childNodes[0]);
}
//removebutton

//Ta bort todo function
async function removetodo(id) {
     fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=f7de1d98-94aa-44f6-b7e2-4864002411d8`,{
      method:'delete'
    })
}
//eventlistener för formuläret
const inputFormula= document.querySelector('#inputForm');
inputFormula.addEventListener('submit',(e)=>{
  e.preventDefault()
  validateForm(task.value)
  console.log(task.value);
  item.title=task.value;
  //specific post
  console.log(posts);
  if(validateForm(task.value)==false){
    console.log(fail);
  }
  saveListitems(item);
});
//validate form func
//felmeddelande
const parent=task.parentElement;
const validateForm=(form)=>{
  if (form.trim()===''){
    parent.classList.add('invalid');
    parent.querySelector('.error').textContent='please enter a task';
    return false
  }
  parent.classList.remove('invalid');
  return true
}


 


