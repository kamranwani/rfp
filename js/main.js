import { STATUS } from "./utils/constant.js";
import { handleCardFuntions } from "./components/card.js";
import { loadJsonData } from "./services/api.js";




const pipelinetabs=document.querySelector("#pipeline-tabs");
const projectsGrid=document.querySelector(".projects-grid");
const tabs = document.querySelectorAll(".tab-item"); 

let projectCardStatus = {};

let rpfData=[];
let currentStatus=STATUS.DRAFT;

pipelinetabs.addEventListener("click",handlePipelineTabs);
projectsGrid.addEventListener("click",handleCardFuntions);


// auth guard

const authGuard=()=>{
    console.log("hi");
    const token =localStorage.getItem("login-token");
    const role =localStorage.getItem("login-role");
    if(!token && role != "admin"){
        alert("need to login first");
        window.location.href="http://localhost:5500/index.html"
    }
        
}

authGuard();
// filtering projects based on status

const filterProjects=(status)=>{
    
  return rpfData.filter(proj=>proj.status === status);
   
}

// handles active tab 
 function handlePipelineTabs(e) {

    const elm=e.target.closest("[data-status]");
    
    if(!elm){
        return;
    }
   
    tabs.forEach(elm=>elm.classList.remove("active"));

    elm.classList.add("active");

    if(Object.values(STATUS).includes(elm.dataset.status)) currentStatus = elm.dataset.status;
    else return;

    let filteredProjects=filterProjects(currentStatus);
    renderProjects(filteredProjects);
  
}

// render projects to ui 

const renderProjects=(projects)=>{
    console.log(projects)
    if(projects.length<=0){
        projectsGrid.innerHTML="<div>No Projects To Show</div>"
        return;
    }
   
    projectsGrid.innerHTML="";
    let genrateHtml="";
    projects.forEach(proj=>{
        
        let card=`<div class="project-card" > 
                        <header class="project-card-header">
                            <h3 class="rfp-number">${proj.rfpNumber}</h3> 
                            <p class="rfp-status" index=${proj.id}>
                            ${proj.status}
                           
                            </p>
                        </header>
                        <main class="project-card-main">
                            <h2 class="rfp-name">${proj.projectName}</h2>
                            <p class="rfp-submission-date">${(proj.tenderSubDate).slice(0,proj.tenderSubDate.lastIndexOf("T"))}</p> 
                        </main>
                        <footer class="project-card-footer">
                            <button class="project-card-button" data-action=${proj.rfpNumber} data-index=${proj._id}>Documents</button>
                            <button class="project-card-button" data-id=${proj.rfpNumber} data-index=${proj._id}>Details</button>
                        </footer>
                    </div>`
                    genrateHtml += card;
    })
    projectsGrid.innerHTML=genrateHtml;
   
    console.log(projectCardStatus);
    
}

// count project by status 

const countProjectByStatus=(projects)=>{
    let counts={};
    console.log(projects);
    projects.forEach(proj=>{
        const status=proj.status;
        if(!counts[status]){
            
            counts[status]=0
        }
        
        counts[status]++;
        
    });
    return counts;
}

// update projects count based on status 

const updateTabCounts = (counts) => { 
    
    tabs.forEach(tab => { 
        const status = tab.dataset.status; 
        const countElement = tab.querySelector(".tab-item-number"); 
        countElement.textContent = counts[status] || 0; 
    }); 
};


// loads json data 
const loadData=async()=>{
    const data=await loadJsonData();
    rpfData=data;
    let filteredProjects = filterProjects(currentStatus);

    renderProjects(filteredProjects);
    const counts=countProjectByStatus(rpfData)
    updateTabCounts(counts);
}
loadData();



