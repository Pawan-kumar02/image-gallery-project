// --- 1. CONNECT TO SUPABASE ---
// Replace with your own URL and Key
const SUPABASE_URL = "https://kctspmqwsizmskwbtuxv.supabase.co"; // This is your URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdHNwbXF3c2l6bXNrd2J0dXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTU2MjMsImV4cCI6MjA3ODU3MTYyM30.Tc6MdQqGwIXusselAenFMFtWLIheNuWEbVKIkN79mrI"; // This is your anon key

// Create the Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
console.log("Supabase client created:", supabase);

// --- 2. GET REFERENCES TO HTML ELEMENTS ---
const homeSection = document.getElementById("home-section");
const picturesSection = document.getElementById("pictures-section");
const homeBtn = document.getElementById("home-btn");
const picturesBtn = document.getElementById("pictures-btn");
const imageGrid = document.getElementById("image-grid");

// --- 3. CREATE FUNCTIONS ---

/**
 * This function fetches all image data from the 'gallery_images' table
 */
async function fetchImages() {
    console.log("Fetching images...");
    
    // 'from' selects the table
    // 'select' specifies what columns to get ('*' means all columns)
    // 'order' sorts them by the 'id'
    let { data: images, error } = await supabaseClient
        .from('gallery_images')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error("Error fetching images:", error);
        return;
    }

    console.log("Images fetched successfully:", images);
    
    // Now, display them
    displayImages(images);
}

/**
 * This function takes the list of images and adds them to the HTML
 * @param {Array} images - An array of image objects from Supabase
 */
function displayImages(images) {
    // Clear the grid first (in case we load them more than once)
    imageGrid.innerHTML = ""; 

    // Loop through each image object in the array
    images.forEach(image => {
        // 1. Create a new <img> element
        const imgElement = document.createElement("img");
        
        // 2. Set its 'src' attribute to the image_url from the database
        imgElement.src = image.image_url;
        
        // 3. Set its 'alt' attribute (good for accessibility)
        imgElement.alt = image.image_name;
        
        // 4. Add the new <img> element to our grid
        imageGrid.appendChild(imgElement);
    });
}

// --- 4. ADD EVENT LISTENERS (BUTTON CLICKS) ---

// Show Home page, hide Pictures page
homeBtn.addEventListener("click", () => {
    homeSection.style.display = "block";  // 'block' means show
    picturesSection.style.display = "none"; // 'none' means hide
});

// Show Pictures page, hide Home page
picturesBtn.addEventListener("click", () => {
    homeSection.style.display = "none";
    picturesSection.style.display = "block";
    
    // Also, fetch the images when this button is clicked
    // We only fetch when needed, not on page load
    fetchImages(); 
});