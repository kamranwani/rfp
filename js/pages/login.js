//  login
import { handleLogIn } from "../services/api.js";

const loginForm=document.querySelector("#login-form");
const formBtnPasswordVisible=document.querySelector(".form-btn-password-visible");
const loginPassword=document.querySelector("#login-password");
const forgetPasswordBtn=document.querySelector("#forget-password-btn");


async function handleLoginSubmit (e){
    e.preventDefault();
    try{
    const formData= new FormData(loginForm);
    const {email,password}= Object.fromEntries(formData);
    const response=await handleLogIn(email,password);
    console.log("res",response);

    const token =localStorage.getItem("login-token");
    const role =localStorage.getItem("login-role");

    console.log(token,role);
        if(token && role === "admin"){
            window.location.href="/pages/projects-dashboard/projects-dashboard.html";
        }
        else if (token && role === "uploader"){
            console.log("add page");
        }   
        else alert("invalid");
    }
    catch(err){
        console.error(err.message);
    }
}

const handlePasswordVisiblity=()=>{
    
    if(loginPassword.value.length <=0)
        return;
     if (loginPassword.type === "text") {
    loginPassword.type = "password";
    formBtnPasswordVisible.innerHTML=`<i class="fa-solid fa-eye"></i>`
  } else {
    loginPassword.type = "text";
    formBtnPasswordVisible.innerHTML=`<i class="fa-solid fa-eye-slash"></i> `
  }
}

const handleForgotPassword=()=>{
    alert("Request To Mr. Suhail");
}

loginForm.addEventListener("submit",handleLoginSubmit);
formBtnPasswordVisible.addEventListener("click",handlePasswordVisiblity);
forgetPasswordBtn.addEventListener("click",handleForgotPassword);