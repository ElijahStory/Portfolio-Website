const fadeDivs = entries => {
    entries.forEach(
        entry => {
            // 1. Fill in the property that decides if the entry is visible.
            if (entry.isIntersecting) {
                // 2. Add a style when the div is on screen.
                entry.target.style.opacity = 1;
            } else {
                // 3. Add a style when the div is off screen.
                entry.target.style.opacity = 0;
            }
        }
    )
};

const moveDivs = entries => {
    entries.forEach(
        entry => {
            let children = entry.target.children;
            for(child in children){
                if (entry.isIntersecting) {
                    console.log(entry.isIntersecting)
                    children[child].classList.add("move");
                } else {
                    children[child].classList.remove("move");
                }
            }
        }
    )
};

let options = {threshold: 0.0};
// 4. Fill in the constructor that checks viewport intersection.
let divObserverFade = new IntersectionObserver(fadeDivs, options);
document.querySelectorAll(".fade").forEach(
    divToFade => {
        // 5. Call the function when the divs are observed.
        divObserverFade.observe(divToFade);
    }
);

options = {threshold: 0.1};
let divObserverMove = new IntersectionObserver(moveDivs, options);
document.querySelectorAll(".slide-div").forEach(
    divToMove => {
        divObserverMove.observe(divToMove);
    }
);