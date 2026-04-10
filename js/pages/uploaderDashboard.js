const projectGrid= document.querySelector(".project-grid")

const authGuard=()=>{
    console.log("hi");
    const token =localStorage.getItem("login-token");
    const role =localStorage.getItem("login-role");
    if(!token && (role != "admin" || role != "uploader")){
        alert("need to login first");
        window.location.href="https://rfp-track.netlify.app/index.html"
    }

    authGuard();
console.log("dashboard");}

const loadData=async()=>{
    console.log("fetching");
    const data=await loadJsonData();
    const rpfData=data.data;
    console.log("rfp data",rpfData);
    renderProjects(rpfData);

}
loadData();

const renderProjects=(projects)=>{
    console.log("here",projects)
    if(projects.length<=0){
        projectGrid.innerHTML="<div>No Projects To Show</div>"
        return;
    }
   
    projectGrid.innerHTML="";
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
                            <p class="rfp-submission-date">Submission Date: ${(proj.tenderSubDate).slice(0,proj.tenderSubDate.lastIndexOf("T"))}</p> 

                        </main>
                        <footer class="project-card-footer">
                            <button class="project-card-button documents" data-action="documents" data-id=${proj._id}>Documents</button>
                            <button class="project-card-button details" data-action= "details" data-id=${proj._id}>Details</button>
                            <button class="project-card-button note" data-action= "note"  data-id=${proj._id}>Note</button>
                        </footer>
                    </div>`
                    genrateHtml += card;
    })
    projectGrid.innerHTML=genrateHtml;
   
   
}

function handleGridEvents(e){
    if(!e.target.dataset.action){
        return;
    }else
    if(e.target.dataset.action === "documents"){
        console.log("doc");
        window.location.href=`uploader-single-project.html?id=${e.target.dataset.id}`;
        return;
    }
     if(e.target.dataset.action === "details"){
        console.log("det");
        return;
    }
     if(e.target.dataset.action === "note"){
        console.log("note");
        return;
    }
}
const user = localStorage.getItem("login-user");

document.getElementById("loggedUser").innerText = 
    user ? `👤 ${user}` : "Unknown";

document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("login-token");
    localStorage.removeItem("login-user");
    localStorage.removeItem("login-role");

    window.location.href = "https://rfp-track.netlify.app/index.html";
};
projectGrid.addEventListener("click",handleGridEvents);