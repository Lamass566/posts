class Card{
    constructor(title,text, id = 1, ) {
        this.title = title;
        this.text = text;
        this.id = id;
      }
}

let users = "https://ajax.test-danit.com/api/json/users";
let posts = "https://ajax.test-danit.com/api/json/posts";


async function getPosts(){
    let response = await fetch(posts);
    let data = await response.json();
    return data;
}

async function addBtn(){
    let btn = document.createElement('button')
    let div = document.createElement('div');
    btn.classList.add("bt");
    btn.textContent = "Add Post"
    document.body.prepend(div)
    let result = btn.querySelectorAll(".bt");
    
    console.log(result)
    btn.onclick=()=>{document.body.firstChild.remove();}
    div.prepend(btn);
}

async function getUsers(){
    let response = await fetch(users);
    let data = await response.json();
    return data;
}

async function deletePost(id){
    let response = await fetch(`https://ajax.test-danit.com/api/json/posts/${id}`, { method: 'DELETE' })
    if(response.status == 2)
    {
    return response;
    }
    else{
        return null
    }
}
//при удалении нового поста будет выводить ошибку так как его нету на сервере

async function addPost()
{
    let data = prompt("title");
    let data2 = prompt("text");
    let post = new Card(data,data2)
    console.log(post)

    let response = await fetch("https://ajax.test-danit.com/api/json/posts", {
        method: "POST",
        body: JSON.stringify({
          id:this.id,
          userId: post.id,
          title: data,
          body: data2
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return response;
}

async function loadAllData(){
    let result = await Promise.all([getPosts(), getUsers()])
    return result;
}

async function addSinglePost(){
    addPost().then(res=>res.json())
    .then((data)=>{
        fetch(`https://ajax.test-danit.com/api/json/users/${data.userId}`)
        .then(res=>res.json())
        .then((data2)=>{
            console.log(data, data2)
            createElement(data,data2)
            addBtn();   
        })
    })
}

async function editSinglePost(id){
    let data1 = prompt("title")
    let data2 = prompt("text")
    let response = await fetch(`http://ajax.test-danit.com/api/json/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        id:id,
        title: data1,
        body: data2
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response;
}

async function createElement(elem, item){
    let div =  document.createElement('div');
    div.setAttribute('id', elem.id);
    div.classList.add("post")

    let div_flex_1 =  document.createElement('div');
    div_flex_1.classList.add("post__flex-block-1")

    let user_img = document.createElement('img');
    user_img.classList.add("user-img");
    user_img.setAttribute('src', "p23069_p_v8_af.jpg");

    let div_flex_img =  document.createElement('div');
    div_flex_img.classList.add("flex-block-img")

    let div_delete =  document.createElement('div');
    div_delete.classList.add("delete")

    let delete_img = document.createElement('img');
    delete_img.setAttribute('src', "delete-svgrepo-com.png");

    let div_edit =  document.createElement('div');
    div_edit.classList.add("edit")

    let edit_img = document.createElement('img');
    edit_img.setAttribute('src', "edit-svgrepo-com.png");


    let div_flex_2 =  document.createElement('div');
    div_flex_2.classList.add("post__flex-block-2")

    let p_data = document.createElement('p');
    p_data.classList.add("flex-block-2__user-data");
    p_data.textContent = item.name;

    let span = document.createElement('span');
    span.textContent = item.email;

    let p_title = document.createElement('p');
    p_title.classList.add("flex-block-2__title");
    p_title.textContent = elem.title;

    let p_content = document.createElement('p');
    p_content.classList.add("flex-block-2__content");
    p_content.textContent = elem.body;


    document.body.prepend(div);
    div.append(div_flex_1);

    div_flex_1.append(user_img);
    div_flex_1.append(div_flex_img);
    div_flex_img.append(div_delete);
    div_delete.append(delete_img);
    div_flex_img.append(div_edit);
    div_edit.append(edit_img);

    div.append(div_flex_2);
    div_flex_2.append(p_data);
    p_data.append(span);
    div_flex_2.append(p_title);
    div_flex_2.append(p_content);
}

async function createPost(){
    loadAllData().then(([posts, users]) => {
        posts.forEach(elem => 
            {
                users.forEach(item => 
                {
                  if(elem.userId == item.id)
                    {
                        createElement(elem,item);
                    }
                }) 
            })
            addBtn()
    })
}

createPost();

let btn = document.querySelector(".delete");
let div = document.querySelector(".post");

$(document).on('click', '.delete', function() {
    console.log($(this).attr('class'));
    let id = Number($(this).closest('.post').attr('id'));
    console.log(deletePost(id));
    $(this).closest('.post').remove();
});

$(document).on('click', '.bt', function() {
   addPost();
    addSinglePost();
    
});

$(document).on('click', '.edit', function() {
    console.log($(this).attr('class'));
    let id = Number($(this).closest('.post').attr('id'));
    editSinglePost(id);
});