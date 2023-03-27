// JavaScript Document 

// Create a functional “Save for later” page for your website, where users can earmark articles, images, recipes, etc. in a personal folder to be able to go back and see them later.
// ○ Each item/recipe/image, etc. must have the option to “Save for later”.
// ○ When an item is added, an alert should tell the user how many items
// are in their “Save for later” folder.
// ○ Create a new HTML page for the “Save for later” section, which allows
// the user to see what is in their folder.
// ○ Create a form which allows a user to leave comments.
// ○ Create forms to allow a user to “like” an item/article/etc.
// ○ Create forms for if a person would like to contact you.

let savedList = [];

let section = document.querySelector("section") //selects tag section and creates a variable 
let savedCount = document.querySelector("#saved-count") //selects id saved-count and creates a variable 
let dLetter = document.querySelector('#d-letter') //selects id d-letter and creates a variable 
let saveBtn = document.querySelector(".save-btn") //selects class save-btn and creates a variable 


//section addEventListeners listenes particular click  
section.addEventListener("click", (event) => {
    if (event.target.className == 'save-btn') { //if click target is save-btn class element  
        let itemToSave = event.target.parentElement.previousElementSibling.textContent; //gets textContent with DOM manipulation and creates variable 
        savedList.push(itemToSave); //pushes item to the savedList array
        if (savedList.length < 2) {
            alert(`There is ${savedList.length} items in the "Saved for Later"`); //alerts how many items are in the saved for later array
        } else {
            alert(`There are ${savedList.length} items in the "Saved for Later"`);  //alerts if it is only one item in the saved for later array
        }
        sessionStorage.setItem("SavedForLater", JSON.stringify(savedList));
        displayCount() //calls displayCount function 
    }

     //Like functionality
    if (event.target.tagName == 'path') {        //if click target is path tag element  
        event.target.classList.toggle('like-btn-toggle'); //toggles new class to style element  
    }
})


let savedForLaterList = document.getElementById("savedForLaterList"); //gets elements by id savedForLaterList and creates a variable 


// the following function prints saved for later items from the array 
function displaySaved() {
    savedForLaterList.innerHTML = "";
    savedList = JSON.parse(sessionStorage.getItem("SavedForLater"));
    for (i = 0; i < savedList.length; i++) {
        let div = document.createElement('div')
        div.className = 'saved-for-later-card'
        div.innerHTML = savedList[i]
        savedForLaterList.appendChild(div)
    }
    displayCount() //calls displayCount function
}

//displays number of items in the savedList at the header menu 
//adds letter 'd' after 'Save' in the header menu 
function displayCount() {
    if(sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("SavedForLater", JSON.stringify(savedList));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        savedList = JSON.parse(sessionStorage.getItem("SavedForLater"));
        savedCount.innerHTML = savedList.length
        if (0 < savedList.length) {
            dLetter.innerHTML = "d"
        }
    }
}

// comments functionality  

let submitCommentBtn = document.querySelector("#submit-comment-btn"); //selects id submit-comment-btn and creates a variable 
let textarea = document.querySelector("#commentTextarea"); //selects id commentTextarea and creates a variable 
let commentsList = document.querySelector("#comments-list");//selects id comments-list and creates a variable 
let commentsArray = [];


//the following function gets value from the textarea input  
//creates variable and push it to the commentArray
//Uses sesionStorage to storage the commentArray
//calles back displayComments() function
function addComment() {
    let newComment = textarea.value
    commentsArray.push(newComment);
    textarea.value = ""
    sessionStorage.setItem("commentsArray", JSON.stringify(commentsArray));
    displayComments() //calls displayComments function
}

//the following function gets comments from the commnents array and displays them to the page 
function displayComments() {
    commentsList.innerHTML = ""
    let commentsArrayOut = JSON.parse(sessionStorage.getItem("commentsArray"))
    for (i = 0; i < commentsArrayOut.length; i++) {
        let div = document.createElement('div')
        div.textContent = commentsArrayOut[i]
        div.className = 'comments-card'
        commentsList.appendChild(div)
    }
    displayCount() //calls displayCount function
}


//contact form functionality 
let messagesArray = []


let contactName = document.querySelector('#contactName') //selects id contactName and creates a variable 
let contactEmail = document.querySelector('#contactEmail') //selects id contactEmail and creates a variable 
let contactTextarea = document.querySelector('#contactTextarea') //selects id contactTextarea and creates a variable 

// Message object constructor 
function Message(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
}

//the following function gets values from the inputs 
//creates Message object  and push it to the messagesArray
function sendMessage() {
    let newMessage = new Message(
        contactName.value,
        contactEmail.value,
        contactTextarea.value
    )
    messagesArray.push(newMessage)
    contactName.value = "";
    contactEmail.value = "";
    contactTextarea.value = "";

}




