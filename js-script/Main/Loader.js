const loader = document.querySelector('.loader');

// Here is the loadIn function that is triggered by the onLoad div in the top of the index.thml document
// When 1.5 s has passed by, the showPage function will be triggered which will then show the page.

const loadIn = () => {
    setTimeout(showPage, 1500);
};

const showPage = () => {
    main.style.display = `block`;
    header.style.display = `block`;
    footer.style.display = `block`;
    loader.style.display = `none`;
};

loadIn();