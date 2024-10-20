// tab controller
const filter = () => {
  //isotop
  var grid = document.querySelector(".filter-contents");
  if (grid) {
    var iso = new Isotope(grid, {
      // options...
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-item",
      },
    });
    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function (itemElem) {
        var number = itemElem.querySelector(".number").textContent;
        return parseInt(number, 10) > 50;
      },
      // show if name ends with -ium
      ium: function (itemElem) {
        var name = itemElem.querySelector(".name").textContent;
        return name.match(/ium$/);
      },
    };

    // bind filter button click
    var filtersElem = document.querySelector(".filters-button-group");
    filtersElem.addEventListener("click", function (event) {
      // only work with buttons
      if (!matchesSelector(event.target, "button")) {
        return;
      }
      var filterValue = event.target.getAttribute("data-filter");
      // use matching filter function
      filterValue = filterFns[filterValue] || filterValue;
      iso.arrange({ filter: filterValue });
    });

    // change is-checked class on buttons
    var buttonGroups = document.querySelectorAll(".button-group");
    for (var i = 0, len = buttonGroups.length; i < len; i++) {
      var buttonGroup = buttonGroups[i];
      radioButtonGroup(buttonGroup);
    }

    function radioButtonGroup(buttonGroup) {
      buttonGroup.addEventListener("click", function (event) {
        // only work with buttons
        if (!matchesSelector(event.target, "button")) {
          return;
        }
        buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
        event.target.classList.add("is-checked");
      });
    }
  }
};
  // Wait for the DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll(".filter");
    const items = document.querySelectorAll("#Container .mix");

    filters.forEach(filter => {
      filter.addEventListener("click", function() {
        const selectedFilter = this.getAttribute("data-filter");

        // Remove the active class from all filters
        filters.forEach(f => f.classList.remove("active"));
        // Add the active class to the clicked filter
        this.classList.add("active");

        // Show/Hide items based on the selected filter
        items.forEach(item => {
          if (selectedFilter === "all") {
            item.classList.remove("hidden");
          } else {
            if (item.classList.contains(selectedFilter.substring(1))) {
              item.classList.remove("hidden");
            } else {
              item.classList.add("hidden");
            }
          }
        });
      });
    });
  });
