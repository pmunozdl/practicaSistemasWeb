const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeText = body.querySelector(".mode-text"),
        header = body.querySelector(".headerSidebar");
        ;

        toggle.addEventListener("click", () =>{
            sidebar.classList.toggle("close");
            header.classList.toggle("close");
        });
