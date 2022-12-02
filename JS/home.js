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
            let childrenList = entry.target.children;
            for(child in childrenList){
                if (entry.isIntersecting) {
                    childrenList[child].classList.add("move");
                } else {
                    childrenList[child].classList.remove("move");
                    try {
                        let moreChildren = childrenList[child].children;
                        if(moreChildren.length != 0){
                            for(innerChild in moreChildren){
                                moreChildren[innerChild].classList.remove("move");
                            }
                        }
                    } catch (error) {
                    }
                    
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

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
  }
  
function vw(percent) {
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
return (percent * w) / 100;
}

const scrollPage = (section) => {
    window.scrollTo(0, Math.min(vh(90), vw(90)) * section);



    
    if(section == 0){
        let buttons = document.querySelectorAll(".nav_button");
        let navBar = document.querySelector("#nav_bar");
        navBar.classList.remove("bubble");
        buttons.forEach(
            button => {
                button.classList.remove("bubble");
                let message = document.querySelector(`.${button.id}`).value.split(",");
                button.innerHTML = message[0];
            }
        )
    }
}

window.addEventListener("wheel", function(e) {
    if(e.deltaY < 0){
        updateNavButtons(false);
    } else if(e.deltaY > 0){
        updateNavButtons(true);
    }
});

const updateNavButtons = (direction) => {
    let buttons = document.querySelectorAll(".nav_button");
    let navBar = document.querySelector("#nav_bar");
    if(direction){
        navBar.classList.add("bubble");
        buttons.forEach(
            button => {
                button.classList.add("bubble");
                let message = document.querySelector(`.${button.id}`).value.split(",");
                button.innerHTML = message[1];
            }
        )
    }else{
        navBar.classList.remove("bubble");
        buttons.forEach(
            button => {
                button.classList.remove("bubble");
                let message = document.querySelector(`.${button.id}`).value.split(",");
                button.innerHTML = message[0];
            }
        )
    }
}