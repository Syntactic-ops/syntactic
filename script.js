document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    const paletteDots = document.querySelectorAll(".palette-dot");

    const palettes = {
        blue: {
            logo: "images/logo-blue.png",
            backgroundColor: "#f2f1ec",
        },
        green: {
            logo: "images/logo-lightgreen.png",
            backgroundColor: "#cbddd1",
        },
        red: {
            logo: "images/logo-darkgreen.png",
            backgroundColor: "#122620",
        },
        purple: {
            logo: "images/logo-purple.png",
            backgroundColor: "#2b192e",
        },
        orange: {
            logo: "images/logo-orange.png",
            backgroundColor: "#f0dfc8",
        },
    };

    paletteDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const palette = dot.getAttribute("data-palette");
            logo.src = palettes[palette].logo;
            document.body.style.backgroundColor = palettes[palette].backgroundColor;
        });
    });
});
