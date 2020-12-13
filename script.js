const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// helper Function to set Attributes
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Unsplash API
const count = 10;
const apiKey = 'VeOSjEBrKJ6AeD1IfqD_XHct1klf0mnFM0jLZBeOglo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// chek if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready);
    }
    ready = true;
}

// Creat Elements for link and photos
function displayPhotos(){
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //Run function for each object in photoArray
    photosArray.forEach((photo) => {
        // Creat <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });


        // Creat <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // chek when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a> then both in imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error here
    }
}

//Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


// document.getElementById('image-container').addEventListener('click', () => {
//     alert(photo.alt_description)
// } )




// On Load
getPhotos();