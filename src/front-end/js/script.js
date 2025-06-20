    const scrollContainer = document.getElementById("main-section");
    const scrollLeftBtn = document.getElementById("right-button");
    const scrollRightBtn = document.getElementById("left-button");

    // Scroll amount per click (adjust as needed)
    const scrollAmount = 120;

    scrollLeftBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    scrollRightBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
    