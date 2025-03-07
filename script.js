document.addEventListener("DOMContentLoaded", function() {

var img1 = document.createElement("img");
img1.src = "generate_icon.png";
var src1 = document.getElementById("img-holder");
src1.appendChild(img1);

var img2 = document.createElement("img");
img2.src = "retrieve_icon.png";
var src2 = document.getElementById("img-holder2");
src2.appendChild(img2);
let progress = 0; // Initial progress (0 to 100)

function increaseProgress() {
    if (progress < 100) {
        progress += 10;
        document.getElementById("progress-bar").style.height = progress + "%";
    }
}

function decreaseProgress() {
    if (progress > 0) {
        progress -= 10;
        document.getElementById("progress-bar").style.height = progress + "%";
    }
}

general_score = 0.6
var src2 = document.getElementById("overall-sent-content");
var genscore = document.createElement("div");
if(general_score>=0.8){
    genscore.textContent = "Perfect";
    src2.appendChild(genscore);

}else if(general_score>=0.5){
    //genscore.textContent = "This response scores adequately for generation but may lack fluency or diversity. It scores poorly for retrieval, so contents might not be accurate.";
    genscore.textContent = "This response scores adequately for retrieval, meaning it finds relevant content. However, it may lack accuracy in its generation, and the response might not be very creative or natural."
    src2.appendChild(genscore);
}else{
    genscore.textContent = "";
    src2.appendChild(genscore);
}


document.getElementById("toggle-show").addEventListener("click", function() {
    const container = document.getElementById("hidden-container");
    container.classList.toggle("visible");

    // Now that the container is visible, add the hover event listeners
    if (container.classList.contains("visible")) {
        const ret_container = document.getElementById("retrieval-cont");
        const gen_container = document.getElementById("generation-cont");

        // Ensure gen_container exists before adding event listeners
        if (gen_container && ret_container) {
            gen_container.addEventListener("mouseenter", function() {
                gen_container.classList.add("expanded");
                ret_container.classList.add("minimized");
                var elements = document.getElementsByClassName("text-cont");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.add("hidden");
                }

                var elements = document.getElementsByClassName("progress-container");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.add("hidden");
                }

                var element = document.getElementById("gen_summary");
                element.classList.remove("hidden");

                var element = document.getElementById("ret_summary");
                element.classList.add("hidden");

                var element = document.getElementById("gen_metric_cont");
                element.classList.remove("hidden");

                var element = document.getElementById("ret_metric_cont");
                element.classList.add("hidden");
                
            });

            ret_container.addEventListener("mouseenter", function() {
                ret_container.classList.add("expanded");
                gen_container.classList.add("minimized");

                var elements = document.getElementsByClassName("text-cont");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.add("hidden");
                }

                var elements = document.getElementsByClassName("progress-container");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.add("hidden");
                }

                var element = document.getElementById("gen_summary");
                element.classList.add("hidden");

                var element = document.getElementById("ret_summary");
                element.classList.remove("hidden");

                var element = document.getElementById("gen_metric_cont");
                element.classList.add("hidden");

                var element = document.getElementById("ret_metric_cont");
                element.classList.remove("hidden");
                
            });

            gen_container.addEventListener("mouseleave", function() {
                gen_container.classList.remove("expanded");
                ret_container.classList.remove("minimized");

                var elements = document.getElementsByClassName("text-cont");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("hidden");
                }

                var elements = document.getElementsByClassName("progress-container");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("hidden");
                }

                var element = document.getElementById("gen_summary");
                element.classList.add("hidden");

                var element = document.getElementById("ret_summary");
                element.classList.add("hidden");

                var element = document.getElementById("gen_metric_cont");
                element.classList.add("hidden");

                var element = document.getElementById("ret_metric_cont");
                element.classList.add("hidden");
                
            });

            ret_container.addEventListener("mouseleave", function() {
                ret_container.classList.remove("expanded");
                gen_container.classList.remove("minimized");

                var elements = document.getElementsByClassName("text-cont");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("hidden");
                }

                var elements = document.getElementsByClassName("progress-container");
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("hidden");
                }

                var element = document.getElementById("gen_summary");
                element.classList.add("hidden");

                var element = document.getElementById("ret_summary");
                element.classList.add("hidden");

                var element = document.getElementById("gen_metric_cont");
                element.classList.add("hidden");

                var element = document.getElementById("ret_metric_cont");
                element.classList.add("hidden");
            });
        } else {
            console.error("gen_container not found.");
        }
    }
});


function updateProgressBar(id, value) {
    const bar = document.getElementById(id);
    const valueDisplay = document.getElementById(`metricValue-${id.split('-')[1]}`);

    value = Math.max(0, Math.min(1, value)); // Ensure value is between 0 and 1
    bar.style.width = (value * 100) + "%";
    valueDisplay.textContent = value.toFixed(2);

    // Dynamic Color Mapping (Red → Orange → Yellow → Green)
    let color;
    if (value < 0.3) {
        color = `rgb(${255}, ${value * 255 / 0.3}, 0)`;  // Red to Orange
    } else if (value < 0.6) {
        color = `rgb(${(1 - (value - 0.3) / 0.3) * 255}, 255, 0)`; // Orange to Yellow
    } else {
        color = `rgb(0, 255, ${(value - 0.6) / 0.4 * 255})`;  // Yellow to Green
    }

    bar.style.background = color;
}

// Initialize with example values
updateProgressBar("progress-rouge", 0.32);

updateProgressBar("progress-bleu", 0.20);

updateProgressBar("progress-precision", 0.71);

updateProgressBar("progress-recall", 0.10);

updateProgressBar("progress-relevancy", 0.64);


const progressBars = document.querySelectorAll(".progress-bar-metric");

// Create floating explanation container
const floatingContainer = document.createElement("div");
floatingContainer.classList.add("floating-container");
document.body.appendChild(floatingContainer);

function showFloatingBox(event, explanation) {
    floatingContainer.textContent = explanation;
    floatingContainer.style.display = "block";
    floatingContainer.style.left = `${event.pageX + 15}px`;
    floatingContainer.style.top = `${event.pageY + 15}px`;
}

function hideFloatingBox() {
    floatingContainer.style.display = "none";
}

progressBars.forEach((bar) => {
    const explanation = bar.dataset.explanation; // Get custom explanation from HTML

    bar.addEventListener("mouseenter", (event) => showFloatingBox(event, explanation));
    bar.addEventListener("mousemove", (event) => {
        floatingContainer.style.left = `${event.pageX + 15}px`;
        floatingContainer.style.top = `${event.pageY + 15}px`;
    });
    bar.addEventListener("mouseleave", hideFloatingBox);
});



// Get all the rating option elements
// Get all the rating option containers (e.g., feedback sections)
const ratingContainers = document.querySelectorAll('.feedback-container');

ratingContainers.forEach(container => {
    const ratingOptions = container.querySelectorAll('.rating-option');
    const feedbackText = container.querySelector('#feedback-text');
    const thankYouMessage = container.querySelector('.thank-you-message');

    // Handle when a user clicks on a rating option
    ratingOptions.forEach(option => {
        option.addEventListener('click', function () {
            const ratingValue = this.getAttribute('data-value');
            
            // Hide the feedback text and show the "thank you" message
            feedbackText.style.display = 'none';
            thankYouMessage.style.display = 'block';

            // You can process the rating value here if needed
            console.log(`User rated: ${ratingValue}`);
        });
    });
});









});





