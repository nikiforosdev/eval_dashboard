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
    genscore.textContent = "This response scores adequately for generation but may lack fluency or diversity. It scores poorly for retrieval, so contents might not be accurate.";
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
            });
        } else {
            console.error("gen_container not found.");
        }
    }
});

});