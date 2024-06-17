document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    const newLogo = document.getElementById("new-logo");
    const paletteDots = document.querySelectorAll(".palette-dot");
    const textContainer = document.querySelector(".text-container");

    const palettes = {
        blue: {
            logo: "images/logo-blue.png",
            backgroundColor: "#f2f1ec",
            textColor: "#365b6d",
        },
        green: {
            logo: "images/logo-lightgreen.png",
            backgroundColor: "#cbddd1",
            textColor: "#272727",
        },
        red: {
            logo: "images/logo-darkgreen.png",
            backgroundColor: "#122620",
            textColor: "#fffef9",
        },
        purple: {
            logo: "images/logo-purple.png",
            backgroundColor: "#2b192e",
            textColor: "#f5e8da",
        },
        orange: {
            logo: "images/logo-orange.png",
            backgroundColor: "#f0dfc8",
            textColor: "#303030",
        },
    };

    paletteDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const palette = dot.getAttribute("data-palette");

            // Set the new logo's source and background color
            newLogo.src = palettes[palette].logo;
            document.body.style.backgroundColor = palettes[palette].backgroundColor;

            // Fade in the new logo
            newLogo.style.opacity = 1;

            // Fade out the old logo
            logo.style.opacity = 0;

            // Change text color
            textContainer.style.color = palettes[palette].textColor;

            // Wait for the fade out to complete
            setTimeout(() => {
                // Switch the new logo to be the old logo
                logo.src = newLogo.src;
                logo.style.opacity = 1;
                newLogo.style.opacity = 0;
            }, 500); // Match the transition duration in CSS
        });
    });
});
