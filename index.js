const posts = [];

const TITLE_VALIDATION_LINIT = 10;
const TEXT_VALIDATION_LINIT = 50;


const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');


newPostBtnNode.addEventListener('click', function() {
    //получить данные из поля ввода
    const postFromUser = getPostFromUser();
    // сохранить данные
    addPost(postFromUser)    
    // отображение поста
    renderPosts();   
});
// обработчик событий по вводу на поле input c вызовом функции валидации
postTitleInputNode.addEventListener('input', function () {
    validation();
})
// обработчик событий по вводу на поле textarea c вызовом функции валидации
postTextInputNode.addEventListener('input', function () {
    validation();
})

function validation(){
    //вычисление длины введенных значений
    const titleLength = postTitleInputNode.value.length;
    const textLength = postTextInputNode.value.length;
    // пограничные условия
    if (titleLength > TITLE_VALIDATION_LINIT){
        validationMessage.innerText = `Длина заголовка не должна превышеть ${TITLE_VALIDATION_LINIT} символов`;
        validationMessage.classList.remove ("validationMessage_hidden"); // удалить класс(validationMessage_hidden со свойством display:none 
        newPostBtnNode.setAttribute("disabled", "true");    // добавляем атрибут disabled (не активный) к кнопке
        return
    }

    if (titleLength == 0){
        validationMessage.innerText = `заголовок не должнен быть пустым`;
        validationMessage.classList.remove ("validationMessage_hidden");
        newPostBtnNode.setAttribute("disabled", "true");
        return
    }

    if (textLength > TEXT_VALIDATION_LINIT){
        validationMessage.innerText = `Длина текста не должна превышеть ${TEXT_VALIDATION_LINIT} символов`;
        validationMessage.classList.remove ("validationMessage_hidden");
        newPostBtnNode.setAttribute("disabled", "true");
        return
    }
    
    if (textLength == 0){
        validationMessage.innerText = `текст не должнен быть пустым`;
        validationMessage.classList.remove ("validationMessage_hidden");
        newPostBtnNode.setAttribute("disabled", "true"); 
        return
    }

    validationMessage.classList.add ("validationMessage_hidden"); // добавляем класс validationMessage_hidden (скрываем надпись)
    newPostBtnNode.removeAttribute("disabled"); // удаляем атрибут disabled 
} 

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    const currentdata = new Date();
    const data = `${currentdata.getDate()}.${currentdata.getMonth()}.${currentdata.getFullYear()} ${currentdata.getHours()}:${currentdata.getMinutes()}`;    
    return {
        title: title,
        text: text,
        data: data,
    };
}

function addPost({title, text, data}){
    posts.push({
        title: title,
        text: text,
        data: data,
    });    
}

function getPost(){
    return posts;
}

function renderPosts() {
    const posts = getPost();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML = `
            <div class='post'>
                <p class='post__title'>${post.title}</p>
                <p class='post__text'>${post.text}</p>
                <p class='post__data'>${post.data}</p>
            </div>
        ` 
        + postsHTML;
    });

    postsNode.innerHTML = postsHTML;
    postTitleInputNode.value = '';
    postTextInputNode.value = '';
    validationMessage.innerText = `заголовок или текст не должны быть пустыми`;
    validationMessage.classList.remove ("validationMessage_hidden"); // добавляем класс validationMessage_hidden (скрываем надпись)
    newPostBtnNode.setAttribute("disabled", "true"); 
}
