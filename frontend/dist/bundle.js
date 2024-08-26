(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{o:()=>s});var t=function(e,t,n,o){return new(n||(n=Promise))((function(r,a){function i(e){try{c(o.next(e))}catch(e){a(e)}}function s(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((o=o.apply(e,t||[])).next())}))};const n="http://localhost:3000";var o=function(e,t,n,o){return new(n||(n=Promise))((function(r,a){function i(e){try{c(o.next(e))}catch(e){a(e)}}function s(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((o=o.apply(e,t||[])).next())}))};let r=[];const a=function(e){let t=null;return(...n)=>new Promise((o=>{t&&clearTimeout(t),t=setTimeout((()=>{o(e(...n))}),300)}))}((e=>o(void 0,void 0,void 0,(function*(){if(e)try{console.log("Rendering streaks..."),r=yield function(){return t(this,void 0,void 0,(function*(){try{const e=localStorage.getItem("token");if(!e)throw new Error("No token found");console.log("Token being sent:",e),console.log("Fetching streaks data...");const t=yield fetch(`${n}/api/streaks`,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok){const e=yield t.text();throw new Error(`HTTP error! status: ${t.status}, message: ${e}`)}const o=yield t.json();return console.log("Streaks data received:",o),o}catch(e){throw console.error("Get streaks error:",e),e}}))}(),console.log("Streaks data received:",r),function(){const e=document.getElementById("streaks-list");e&&Array.isArray(r)?(e.innerHTML="",r.forEach((t=>{if(t&&t.name&&void 0!==t.count&&void 0!==t.lastReset){const n=document.createElement("div");n.innerHTML=`\n                    <h3>${t.name}</h3>\n                    <p>Current streak: ${t.count} days</p>\n                    <p>Last reset: ${new Date(t.lastReset).toLocaleDateString()}</p>\n                    <button class="update-streak" data-id="${t.id}">Increment Streak</button>\n                    <button class="reset-streak" data-id="${t.id}">Reset Streak</button>\n                    <button class="delete-streak" data-id="${t.id}">Delete Streak</button>\n                `,e.appendChild(n)}else console.error("Invalid streak format:",t)}))):console.error("Invalid streaks data format")}()}catch(t){console.error("Render streak error:",t),e.innerHTML=`<p>Failed to load streak data. Error: ${t instanceof Error?t.message:"Unknown error"}</p>`}else console.error("Streak container not found")}))));const i={home:function(e){var t,n;e.innerHTML='\n        <div class="home-container">\n            <h1>Welcome to StreaksApp</h1>\n            <h3>Here you can track your daily habits <br> and build streaks to stay motivated!</h3>\n            <p>Please login or sign up to continue.</p>\n            <button id="login-btn">Login</button>\n            <button id="signup-btn">Sign Up</button>\n        </div>\n    ',null===(t=document.getElementById("login-btn"))||void 0===t||t.addEventListener("click",(()=>s("login"))),null===(n=document.getElementById("signup-btn"))||void 0===n||n.addEventListener("click",(()=>s("signup")))},login:function(e){if(!e)return;e.innerHTML='\n        <h2>Login</h2>\n        <form id="login-form">\n            <input type="email" id="email" placeholder="Email" required>\n            <input type="password" id="password" placeholder="Password" required>\n            <button type="submit">Login</button>\n        </form>\n        <p>Don\'t have an account? <a href="#" id="signup-link">Sign up</a></p>\n        <p>Forgot your password? <a href="#" id="reset-password-link">Reset password</a></p>\n    ';const o=document.getElementById("login-form"),r=document.getElementById("signup-link"),a=document.getElementById("reset-password-link");o.addEventListener("submit",(e=>{return o=this,r=void 0,i=function*(){e.preventDefault();const o=document.getElementById("email").value,r=document.getElementById("password").value;try{const e=yield function(e,o){return t(this,void 0,void 0,(function*(){try{const t=yield fetch(`${n}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:o})});if(!t.ok){const e=yield t.text();throw new Error(`HTTP error! status: ${t.status}, message: ${e}`)}const r=yield t.json();return localStorage.setItem("token",r.token),localStorage.setItem("userId",r.userId),r}catch(e){throw console.error("Login error:",e),e}}))}(o,r);e&&e.token?(localStorage.setItem("token",e.token),s("dashboard")):alert("Login failed. Please check your credentials and try again.")}catch(e){console.error("Login error:",e),e instanceof Error?alert(`Login failed: ${e.message}`):alert("An unexpected error occurred. Please try again.")}},new((a=void 0)||(a=Promise))((function(e,t){function n(e){try{c(i.next(e))}catch(e){t(e)}}function s(e){try{c(i.throw(e))}catch(e){t(e)}}function c(t){var o;t.done?e(t.value):(o=t.value,o instanceof a?o:new a((function(e){e(o)}))).then(n,s)}c((i=i.apply(o,r||[])).next())}));var o,r,a,i})),null==r||r.addEventListener("click",(e=>{e.preventDefault(),s("signup")})),null==a||a.addEventListener("click",(e=>{e.preventDefault(),s("passwordReset")}))},dashboard:function(e){if(!e)return void console.error("Dashboard container not found");console.log("Rendering dashboard..."),e.innerHTML='\n        <h1>Dashboard</h1>\n        <div id="streak-container"></div>\n        <button id="logout-button">Logout</button>\n    ';const r=document.getElementById("streak-container");r?(console.log("Calling renderStreak..."),function(e){o(this,void 0,void 0,(function*(){if(!e)return void console.error("Streak container not found");e.innerHTML='\n        <h2>Your Streaks</h2>\n        <div id="streaks-list"></div>\n        <h3>Create New Streak</h3>\n        <form id="create-streak-form">\n            <input type="text" id="streak-name" placeholder="Streak Name" required>\n            <button type="submit">Create Streak</button>\n        </form>\n    ';const r=document.getElementById("create-streak-form");null==r||r.addEventListener("submit",(r=>o(this,void 0,void 0,(function*(){r.preventDefault();const o=document.getElementById("streak-name").value;try{yield function(e){return t(this,void 0,void 0,(function*(){try{const t=localStorage.getItem("token");if(!t)throw new Error("No token found");const o=yield fetch(`${n}/api/streaks`,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({name:e})});if(!o.ok){const e=yield o.text();throw new Error(`HTTP error! status: ${o.status}, message: ${e}`)}return o.json()}catch(e){throw console.error("Create streak error:",e),e}}))}(o),a(e)}catch(e){console.error("Create streak error:",e),alert("Failed to create streak")}})))),e.addEventListener("click",(r=>o(this,void 0,void 0,(function*(){if(r.target instanceof HTMLElement){const o=r.target.getAttribute("data-id");if(o)try{r.target.classList.contains("update-streak")?yield function(e){return t(this,void 0,void 0,(function*(){try{const t=localStorage.getItem("token"),o=localStorage.getItem("userId");if(!t||!o)throw new Error("No token or userId found");const r=yield fetch(`${n}/api/streaks/${o}/streaks/${e}/increase`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok){const e=yield r.text();throw new Error(`HTTP error! status: ${r.status}, message: ${e}`)}return r.json()}catch(e){throw console.error("Update streak count error:",e),e}}))}(o):r.target.classList.contains("reset-streak")?yield function(e){return t(this,void 0,void 0,(function*(){try{const t=localStorage.getItem("token");if(!t)throw new Error("No token found");const o=yield fetch(`${n}/api/streaks/${e}/reset`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!o.ok){const e=yield o.text();throw new Error(`HTTP error! status: ${o.status}, message: ${e}`)}return o.json()}catch(e){throw console.error("Reset streak error:",e),e}}))}(o):r.target.classList.contains("delete-streak")&&(yield function(e){return t(this,void 0,void 0,(function*(){try{const t=localStorage.getItem("token");if(!t)throw new Error("No token found");const o=yield fetch(`${n}/api/streaks/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const e=yield o.text();throw new Error(`HTTP error! status: ${o.status}, message: ${e}`)}return o.json()}catch(e){throw console.error("Delete streak error:",e),e}}))}(o)),a(e)}catch(e){console.error("Streak action error:",e),alert("Failed to perform action on streak")}}})))),a(e)}))}(r)):console.error("Streak container not found in dashboard");const i=document.getElementById("logout-button");null==i||i.addEventListener("click",(()=>{return e=this,t=void 0,o=function*(){try{yield(localStorage.removeItem("token"),void localStorage.removeItem("userId")),s("home")}catch(e){console.error("Logout error:",e),alert("Failed to logout. Please try again.")}},new((n=void 0)||(n=Promise))((function(r,a){function i(e){try{c(o.next(e))}catch(e){a(e)}}function s(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((o=o.apply(e,t||[])).next())}));var e,t,n,o}))},signup:function(e){if(!e)return;e.innerHTML='\n        <h2>Sign Up</h2>\n        <form id="signup-form">\n            <input type="email" id="email" placeholder="Email" required>\n            <input type="password" id="password" placeholder="Password" required>\n            <button type="submit">Sign Up</button>\n        </form>\n        <p id="message"></p>\n        <p>Already have an account? <a href="#" id="login-link">Login</a></p>\n    ';const o=document.getElementById("signup-form"),r=document.getElementById("login-link"),a=document.getElementById("message");o.addEventListener("submit",(e=>{return r=this,i=void 0,d=function*(){e.preventDefault();const r=document.getElementById("email").value,i=document.getElementById("password").value;try{const e=yield function(e,o){return t(this,void 0,void 0,(function*(){try{const t=yield fetch(`${n}/api/auth/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:o})}),r=yield t.json();if(!t.ok)throw new Error(r.message||"Signup failed");return{success:!0,message:"Signup successful"}}catch(e){throw console.error("Signup error:",e),e}}))}(r,i);e.success?(a&&(a.textContent="Signup successful! Redirecting to login...",a.style.color="green"),o.reset(),setTimeout((()=>{s("login")}),2e3)):a&&(a.textContent="Signup failed. Please try again.",a.style.color="red")}catch(e){console.error("Signup error:",e),a&&(a.textContent=e instanceof Error?e.message:"An error occurred. Please try again.",a.style.color="red")}},new((c=void 0)||(c=Promise))((function(e,t){function n(e){try{a(d.next(e))}catch(e){t(e)}}function o(e){try{a(d.throw(e))}catch(e){t(e)}}function a(t){var r;t.done?e(t.value):(r=t.value,r instanceof c?r:new c((function(e){e(r)}))).then(n,o)}a((d=d.apply(r,i||[])).next())}));var r,i,c,d})),null==r||r.addEventListener("click",(e=>{e.preventDefault(),s("login")}))},passwordReset:function(e){e.innerHTML='\n        <h2>Reset Password</h2>\n        <form id="password-reset-form">\n            <input type="email" id="email" placeholder="Enter your email" required>\n            <button type="submit">Request Password Reset</button>\n        </form>\n        <p><a href="#" id="back-to-login">Back to Login</a></p>\n    ';const o=document.getElementById("password-reset-form"),r=document.getElementById("back-to-login");o.addEventListener("submit",(e=>{return o=this,r=void 0,i=function*(){e.preventDefault();const o=document.getElementById("email").value;try{yield function(e){return t(this,void 0,void 0,(function*(){const t=yield fetch(`${n}/api/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(!t.ok){const e=yield t.json().catch((()=>({})));throw new Error(e.message||`Failed to request password reset: ${t.statusText}`)}}))}(o),alert("Password reset instructions have been sent to your email."),s("login")}catch(e){console.error("Password reset error:",e),e instanceof Error?alert(`Password reset failed: ${e.message}`):alert("An unexpected error occurred. Please try again.")}},new((a=void 0)||(a=Promise))((function(e,t){function n(e){try{c(i.next(e))}catch(e){t(e)}}function s(e){try{c(i.throw(e))}catch(e){t(e)}}function c(t){var o;t.done?e(t.value):(o=t.value,o instanceof a?o:new a((function(e){e(o)}))).then(n,s)}c((i=i.apply(o,r||[])).next())}));var o,r,a,i})),null==r||r.addEventListener("click",(e=>{e.preventDefault(),s("login")}))}};function s(e){const t=document.getElementById("app");t&&e in i?(t.innerHTML="",i[e](t),window.history.pushState(null,"",`#${e}`)):console.error("Invalid route or container not found")}function c(){localStorage.removeItem("token"),localStorage.removeItem("userId"),s("home")}function d(){const e=window.location.hash.slice(1);s(e in i?e:"home")}document.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("hashchange",d),d();const e=document.getElementById("logout-button");e&&e.addEventListener("click",c)}))})();