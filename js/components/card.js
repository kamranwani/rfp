export const handleCardFuntions=(e)=>{
    // console.log(e.target);
   if(e.target.closest("[data-id]")){
    window.location.href = `/pages/single-project-dashboard/single-project-dashboard.html?id=${e.target.dataset.index}`;
}
else if(e.target.closest("[data-action]")){
    console.log("documents");
    window.location.href = `/pages/project-documents-view/project-documents.html?id=${e.target.dataset.index}`;
}
}

