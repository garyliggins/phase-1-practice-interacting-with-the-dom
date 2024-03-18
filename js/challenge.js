User
document.addEventListener("DOMContentLoaded", () => {
    const counter = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const likeButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const resumeButton = document.getElementById("resume");
    const likesList = document.querySelector(".likes");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("list");

    let currentCount = parseInt(counter.textContent);
    let likesMap = {};
    let isPaused = false;
    let interval;

    // Function to update the counter
    function updateCounter(value) {
        counter.textContent = value;
        currentCount = parseInt(value);
    }

    // Function to handle like button click
    likeButton.addEventListener("click", () => {
        if (!isPaused) {
            if (!(currentCount in likesMap)) {
                likesMap[currentCount] = 1;
            } else {
                likesMap[currentCount]++;
            }

            // Display the likes in the list
            updateLikesList();
        }
    });

    // Function to update the likes list
    function updateLikesList() {
        likesList.innerHTML = ""; // Clear previous list items
        for (const number in likesMap) {
            const listItem = document.createElement("li");
            listItem.textContent = `${number} has been liked ${likesMap[number]} times`;
            likesList.appendChild(listItem);
        }
    }

    // Function to start the counter
    function startCounter() {
        interval = setInterval(() => {
            if (!isPaused) {
                updateCounter(currentCount + 1);
            }
        }, 1000);
    }

    // Function to stop the counter
    function stopCounter() {
        clearInterval(interval);
    }

    // Function to handle pause button click
    pauseButton.addEventListener("click", () => {
        isPaused = true;
        pauseButton.disabled = true;
        plusButton.disabled = true;
        minusButton.disabled = true;
        likeButton.disabled = true;
        resumeButton.disabled = false;
        pauseButton.textContent = "Paused";
        stopCounter();
    });

    // Function to handle resume button click
    resumeButton.addEventListener("click", () => {
        isPaused = false;
        pauseButton.disabled = false;
        plusButton.disabled = false;
        minusButton.disabled = false;
        likeButton.disabled = false;
        resumeButton.disabled = true;
        pauseButton.textContent = "Pause";
        startCounter();
    });

    // Initial call to start the counter
    startCounter();

    // Event listeners for plus and minus buttons
    plusButton.addEventListener("click", () => {
        if (!isPaused) {
            updateCounter(currentCount + 1);
        }
    });

    minusButton.addEventListener("click", () => {
        if (!isPaused) {
            updateCounter(currentCount - 1);
        }
    });

    // Event listener for comment submission
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
        const comment = commentInput.value.trim();
        if (comment !== "") {
            const commentItem = document.createElement("div");
            commentItem.textContent = comment;
            commentList.appendChild(commentItem);
            commentInput.value = ""; // Clear input field after submission
        }
    });
});