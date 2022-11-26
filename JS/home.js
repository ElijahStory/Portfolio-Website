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
            entry.target.childNodes.forEach(
                child => {
                    console.log(child.id)
                    if (child.isIntersecting) {
                        child.target.classList.add("move");
                    } else {
                        child.target.classList.remove("move");
                    }
                }
            )
        }
    )
};

let options = {};
// 4. Fill in the constructor that checks viewport intersection.
let divObserverFade = new IntersectionObserver(fadeDivs, options);
document.querySelectorAll(".fade").forEach(
    divToFade => {
        // 5. Call the function when the divs are observed.
        divObserverFade.observe(divToFade);
    }
);

let divObserverMove = new IntersectionObserver(moveDivs, options);
document.querySelectorAll(".slide-div").forEach(
    divToMove => {
        console.log(divToMove.id)
        divObserverMove.observe(divToMove);
    }
);