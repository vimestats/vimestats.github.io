const burger=document.querySelector("header .burger-menu"),arrowTop=document.querySelector("footer .arrow-top"),userId=Number(document.querySelector("body").dataset.user),currency=document.querySelector("header .currency");let currencyText;if(currencyText="rur"===currency.dataset.currency?"р":"byn"===currency.dataset.currency?"Br":"$",currency.addEventListener("click",(function(e){currency.querySelector(".sub").classList.toggle("show"),e.target.closest("span[data-currency]")&&(setCookie("currency",e.target.dataset.currency),window.location.reload())})),!userId){let e=new SmartForm(document.forms["send-code"]);e.items.tel.is("phone",{matrix:"_____________",code:"+"}),e.items.tel.addEventListener("input",(function(){e.items.tel.value.replaceAll(/\D/g,"").length>11?e.items["send-code"].disabled=!1:e.items["send-code"].disabled=!0}));let t=new SmartForm(document.forms.login);t.items["conf-code"].is("number",{max:4}),t.items["conf-code"].addEventListener("input",(function(){4===t.items["conf-code"].value.length?t.items["submit-tel"].disabled=!1:t.items["submit-tel"].disabled=!0})),e.form.onsubmit=function(o){o.preventDefault();let r="";ajaxQuery(`/resource/site/admin/action/login.php?t=${e.items.tel.value.replaceAll(/\D/g,"")}`,"get","",(function(o){r=Number(o.responseText),document.querySelector(".window-background.login .window-body").classList.add("confirm"),t.items["conf-code"].value="",t.items.t.value=e.items.tel.value.replaceAll(/\D/g,""),t.items["submit-tel"].disabled=!0,t.items["conf-code"].oninput=function(){4===t.items["conf-code"].value.length&&r===Number(t.items["conf-code"].value)?t.items["submit-tel"].disabled=!1:t.items["submit-tel"].disabled=!0}}))}}if(arrowTop.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})})),document.querySelector(".requisites button")){document.querySelector(".requisites button").addEventListener("click",(function(){document.querySelector(".requisites .cont").classList.toggle("show")}))}function theme(){document.querySelector(".switcher-theme").addEventListener("click",(()=>{"dark"!==getCookie("theme")?(document.documentElement.setAttribute("data-theme","dark"),setCookie("theme","dark")):(document.documentElement.removeAttribute("data-theme","dark"),setCookie("theme","light"))}))}function setCookie(e,t){let o=new Date((new Date).getTime()+6048e5);document.cookie=e+"="+t+"; path=/; expires="+o}function getCookie(e){let t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):void 0}if(document.body.addEventListener("click",(()=>{for(let e of document.querySelectorAll(".window-background"))!e.querySelector(".window-body .close:hover")&&e.querySelector(".window-body:hover")||(document.querySelector(".window-background:hover")&&!document.querySelector(".window-background .window-body:hover")||document.querySelector(".window-background .window-body .close:hover"))&&(e.style.display="none",document.querySelector("body").style.overflow="auto")})),document.querySelector("header .profile")&&!userId&&(document.querySelector("header .profile").addEventListener("click",(function(e){e.preventDefault(),document.querySelector(".window-background.login").style.display="flex"})),document.querySelector(".window-background.login .back").addEventListener("click",(function(){document.querySelector(".window-background.login .window-body").classList.remove("confirm")}))),burger.addEventListener("click",(()=>{burger.classList.toggle("active"),document.querySelector("header .menu-box").classList.toggle("show"),setTimeout((function(){document.querySelector("header").style.background="var(--accent)"}),10),document.querySelector("header .logo").style.display="none",document.querySelector("header .menu-box").classList.contains("show")?(document.body.style.overflow="hidden",document.querySelector("header .menu-box.show nav .ws-menu .item:last-child a").addEventListener("click",(()=>{document.body.style.overflow="auto",document.querySelector("header .menu-box").classList.remove("show"),burger.classList.remove("active"),document.querySelector("header").style.background="var(--bg-white)",document.querySelector("header").style.zIndex="10",document.querySelector("header .logo").style.display="flex"}))):(document.body.style.overflow="auto",setTimeout((function(){document.querySelector("header").style.background="var(--bg-white)",document.querySelector("header").style.zIndex="unset"}),250),document.querySelector("header .logo").style.display="flex")})),theme(),document.querySelector(".add-cart")){document.querySelector(".add-cart").addEventListener("click",(()=>{document.querySelector(".window-background.cart-succes").style.display="flex"})),document.querySelector(".window-background.cart-succes .close").addEventListener("click",(()=>{document.querySelector(".window-background.cart-succes").style.display="none"})),document.querySelector(".window-background.cart-succes .window-body .window-content div").addEventListener("click",(()=>{document.querySelector(".window-background.cart-succes").style.display="none"}))}function ajaxQuery(e,t,o,r){let c=new XMLHttpRequest;"post"!==t&&(t="get"),o&&(o=new FormData(o)),c.open(t,e),c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(o),c.onreadystatechange=function(){4===c.readyState&&404===c.status&&ajaxQuery("404","get","",r),4===c.readyState&&200===c.status&&r(c)}}