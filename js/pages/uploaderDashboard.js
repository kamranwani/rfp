// auth guard

const authGuard=()=>{
    console.log("hi");
    const token =localStorage.getItem("login-token");
    const role =localStorage.getItem("login-role");
    if(!token && (role != "admin" || role != "uploader")){
        alert("need to login first");
        window.location.href="http://localhost:5500/index.html"
    }
        
}

authGuard();