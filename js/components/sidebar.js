
    const appAside=document.querySelector(".app-aside");
    const asideLogoImg=document.querySelector(".aside-logo-img");
    const asideLogoText=document.querySelector(".aside-logo-text");
    const asideNavigation=document.querySelector(".aside-navigation");
    const logout=document.querySelector("#logout");
    const asideNavItems=document.querySelectorAll(".aside-nav-item");

    const projectsDashboard=document.querySelector("#pipeline");
    const documentView=document.querySelector("#document");
    const vendors=document.querySelector("#vendors");
    const calender=document.querySelector("#calender");
    const reports=document.querySelector("#reports");






    // console.log(projectsDashboard,documentView);


    asideLogoImg.src="/assets/logo-img.jpeg";
    asideLogoText.innerHTML="RFP Manager";

    const currentPath=window.location.pathname;
    console.log(currentPath);

    const view=currentPath.slice(currentPath.lastIndexOf("/")+1,currentPath.lastIndexOf("."));
        console.log(view)

    const handleView=()=>{
        switch (view) {
            case "projects-dashboard":
                console.log("project");
                projectsDashboard.classList.add("active-nav");
                break;


            case "vendors":
                console.log("vendors-tap"); 
                vendors.classList.add("active-nav");

                break;

            case "reports":
                console.log("reports");

                reports.classList.add("active-nav");

                break;

            case "calender":
                console.log("calender");

                calender.classList.add("active-nav");

                break;

            case "document":
                console.log("hey");
                documentView.classList.add("active-nav");

                break;

            default:
                return;
        }
    }
    handleView();   

    const handleAsideNavigation=(e)=>{
        asideNavItems.forEach(nav=>nav.classList.remove("active-nav"));
        let elm=e.target.closest("[data-status]")
    
        
        if (!elm) return; 
        
        switch (elm.dataset.status) {
            case "login":
                handleAsideLogin(elm);
                break;

            case "pipeline":
                handlePipeline(elm);
                break;

            case "vendors":
                handleVendors(elm);
                break;

            case "reports":
                handleReports(elm);
                break;

            case "calender":
                handleCalender(elm);
                break;

            case "document":
                handleDocument(elm);
                break;

            default:
                return;
        }
    }

    const handleAsideLogin=(elm)=>{
        window.location.href="http://localhost:5500/index.html";
        elm.classList.add("active-nav");
        console.log("login",elm);
    }

    const handlePipeline=(elm)=>{
        console.log("pipeline",elm);
        elm.classList.add("active-nav");
        window.location.href="/pages/projects-dashboard/projects-dashboard.html";
        
    }

    const handleVendors=(elm)=>{
        console.log("vendors");
        console.log("here",elm);
        elm.classList.add("active-nav");
        window.location.href="/pages/vendors/vendors.html";

    }

    const handleReports=(elm)=>{
        console.log("reports");
        elm.classList.add("active-nav");
        window.location.href="/pages/reports/reports.html";


    }

    const handleCalender=(elm)=>{
        console.log("calender");
        elm.classList.add("active-nav");
        window.location.href="/pages/calender/calender.html";


    }

    const handleDocument=(elm)=>{
        console.log("document");
        elm.classList.add("active-nav");
        window.location.href="/pages/document/document.html";


    }

    const handleLogout=()=>{
        localStorage.clear("login-token");
        localStorage.clear("login-role");
        window.location.href="http://localhost:5500/index.html";


    }

    asideNavigation.addEventListener("click",handleAsideNavigation);
    logout.addEventListener("click",handleLogout);