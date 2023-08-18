const chatInput = document.querySelector(".chat-input textarea"); // grab the textarea tag
const sendChatBtn = document.querySelector(".chat-input span"); // grab the send button
const chatbox = document.querySelector(".chatbox"); 
let userMessage;

// create a function to add the user input to the chat box
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li"); // create li element and save it in a variable
    chatLi.classList.add("chat", className); // adding the nesseccery classes to the creted element
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span>` // setting the chat content depending on the class if it's outgoing or sopmething else
    chatLi.innerHTML = chatContent;
    return chatLi
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Getting entered message and removing extra whitespace
    if(!userMessage) return // Return if the message is empty

    chatbox.appendChild(createChatLi(userMessage, "outgoing")); // append the user message to the chat box
    chatInput.value = ""

    setTimeout(() => {
        // display "Thinking..." after a few seconds 
        chatbox.appendChild(createChatLi("Thinking...", "incoming")); // append the user message to the chat box

    }, 600)
}

sendChatBtn.addEventListener("click", handleChat);