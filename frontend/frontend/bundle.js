/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/api.js":
/*!*********************!*\
  !*** ./dist/api.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getStreak: () => (/* binding */ getStreak),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   logout: () => (/* binding */ logout),\n/* harmony export */   resetStreak: () => (/* binding */ resetStreak),\n/* harmony export */   signup: () => (/* binding */ signup),\n/* harmony export */   updateStreak: () => (/* binding */ updateStreak)\n/* harmony export */ });\nconst API_URL = 'http://localhost:3000/';\nasync function login(username, password) {\n    const response = await fetch(`${API_URL}/login`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ username, password }),\n    });\n    return response.json();\n}\nasync function signup(username, password) {\n    const response = await fetch(`${API_URL}/signup`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ username, password }),\n    });\n    return response.json();\n}\nasync function getStreak() {\n    const response = await fetch(`${API_URL}/streak`, {\n        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },\n    });\n    return response.json();\n}\nasync function updateStreak() {\n    const response = await fetch(`${API_URL}/streak`, {\n        method: 'PUT',\n        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },\n    });\n    return response.json();\n}\nasync function resetStreak() {\n    const response = await fetch(`${API_URL}/streak/reset`, {\n        method: 'POST',\n        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },\n    });\n    return response.json();\n}\nasync function logout() {\n    localStorage.removeItem('token');\n}\n\n\n//# sourceURL=webpack://frontend/./dist/api.js?");

/***/ }),

/***/ "./dist/components/dashboard.js":
/*!**************************************!*\
  !*** ./dist/components/dashboard.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderDashboard: () => (/* binding */ renderDashboard)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ \"./dist/api.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main */ \"./dist/main.js\");\n/* harmony import */ var _streak__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./streak */ \"./dist/components/streak.js\");\n\n\n\nfunction renderDashboard(container) {\n    if (!container)\n        return;\n    container.innerHTML = `\n        <h2>Dashboard</h2>\n        <div id=\"streak-container\"></div>\n        <button id=\"update-streak\">Update Streak</button>\n        <button id=\"reset-streak\">Reset Streak</button>\n        <button id=\"logout\">Logout</button>\n    `;\n    const streakContainer = document.getElementById('streak-container');\n    const updateStreakBtn = document.getElementById('update-streak');\n    const resetStreakBtn = document.getElementById('reset-streak');\n    const logoutBtn = document.getElementById('logout');\n    (0,_streak__WEBPACK_IMPORTED_MODULE_2__.renderStreak)(streakContainer);\n    updateStreakBtn?.addEventListener('click', async () => {\n        try {\n            await (0,_api__WEBPACK_IMPORTED_MODULE_0__.updateStreak)();\n            (0,_streak__WEBPACK_IMPORTED_MODULE_2__.renderStreak)(streakContainer);\n        }\n        catch (error) {\n            console.error('Update streak error:', error);\n            alert('Failed to update streak. Please try again.');\n        }\n    });\n    resetStreakBtn?.addEventListener('click', async () => {\n        if (confirm('Are you sure you want to reset your streak?')) {\n            try {\n                await (0,_api__WEBPACK_IMPORTED_MODULE_0__.resetStreak)();\n                (0,_streak__WEBPACK_IMPORTED_MODULE_2__.renderStreak)(streakContainer);\n            }\n            catch (error) {\n                console.error('Reset streak error:', error);\n                alert('Failed to reset streak. Please try again.');\n            }\n        }\n    });\n    logoutBtn?.addEventListener('click', () => {\n        (0,_api__WEBPACK_IMPORTED_MODULE_0__.logout)();\n        (0,_main__WEBPACK_IMPORTED_MODULE_1__.navigate)('login');\n    });\n}\n\n\n//# sourceURL=webpack://frontend/./dist/components/dashboard.js?");

/***/ }),

/***/ "./dist/components/login.js":
/*!**********************************!*\
  !*** ./dist/components/login.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ \"./dist/api.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main */ \"./dist/main.js\");\n\n\nfunction renderLogin(container) {\n    if (!container)\n        return;\n    container.innerHTML = `\n        <h2>Login</h2>\n        <form id=\"login-form\">\n            <input type=\"text\" id=\"username\" placeholder=\"Username\" required>\n            <input type=\"password\" id=\"password\" placeholder=\"Password\" required>\n            <button type=\"submit\">Login</button>\n        </form>\n        <p>Don't have an account? <a href=\"#\" id=\"signup-link\">Sign up</a></p>\n    `;\n    const form = document.getElementById('login-form');\n    const signupLink = document.getElementById('signup-link');\n    form.addEventListener('submit', async (e) => {\n        e.preventDefault();\n        const username = document.getElementById('username').value;\n        const password = document.getElementById('password').value;\n        try {\n            const result = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.login)(username, password);\n            if (result.token) {\n                localStorage.setItem('token', result.token);\n                (0,_main__WEBPACK_IMPORTED_MODULE_1__.navigate)('dashboard');\n            }\n            else {\n                alert('Login failed. Please try again.');\n            }\n        }\n        catch (error) {\n            console.error('Login error:', error);\n            alert('An error occurred. Please try again.');\n        }\n    });\n    signupLink?.addEventListener('click', (e) => {\n        e.preventDefault();\n        (0,_main__WEBPACK_IMPORTED_MODULE_1__.navigate)('signup');\n    });\n}\n\n\n//# sourceURL=webpack://frontend/./dist/components/login.js?");

/***/ }),

/***/ "./dist/components/signup.js":
/*!***********************************!*\
  !*** ./dist/components/signup.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderSignup: () => (/* binding */ renderSignup)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ \"./dist/api.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main */ \"./dist/main.js\");\n\n\nfunction renderSignup(container) {\n    if (!container)\n        return;\n    container.innerHTML = `\n        <h2>Sign Up</h2>\n        <form id=\"signup-form\">\n            <input type=\"text\" id=\"username\" placeholder=\"Username\" required>\n            <input type=\"password\" id=\"password\" placeholder=\"Password\" required>\n            <button type=\"submit\">Sign Up</button>\n        </form>\n        <p>Already have an account? <a href=\"#\" id=\"login-link\">Login</a></p>\n    `;\n    const form = document.getElementById('signup-form');\n    const loginLink = document.getElementById('login-link');\n    form.addEventListener('submit', async (e) => {\n        e.preventDefault();\n        const username = document.getElementById('username').value;\n        const password = document.getElementById('password').value;\n        try {\n            const result = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.signup)(username, password);\n            if (result.token) {\n                localStorage.setItem('token', result.token);\n                (0,_main__WEBPACK_IMPORTED_MODULE_1__.navigate)('dashboard');\n            }\n            else {\n                alert('Signup failed. Please try again.');\n            }\n        }\n        catch (error) {\n            console.error('Signup error:', error);\n            alert('An error occurred. Please try again.');\n        }\n    });\n    loginLink?.addEventListener('click', (e) => {\n        e.preventDefault();\n        (0,_main__WEBPACK_IMPORTED_MODULE_1__.navigate)('login');\n    });\n}\n\n\n//# sourceURL=webpack://frontend/./dist/components/signup.js?");

/***/ }),

/***/ "./dist/components/streak.js":
/*!***********************************!*\
  !*** ./dist/components/streak.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderStreak: () => (/* binding */ renderStreak)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ \"./dist/api.js\");\n\nasync function renderStreak(container) {\n    if (!container)\n        return;\n    try {\n        const streak = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getStreak)();\n        container.innerHTML = `<h3>Current Streak: ${streak.count} days</h3>`;\n    }\n    catch (error) {\n        console.error('Get streak error:', error);\n        container.innerHTML = '<p>Failed to load streak. Please try again.</p>';\n    }\n}\n\n\n//# sourceURL=webpack://frontend/./dist/components/streak.js?");

/***/ }),

/***/ "./dist/main.js":
/*!**********************!*\
  !*** ./dist/main.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   navigate: () => (/* binding */ navigate)\n/* harmony export */ });\n/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/login */ \"./dist/components/login.js\");\n/* harmony import */ var _components_signup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/signup */ \"./dist/components/signup.js\");\n/* harmony import */ var _components_dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/dashboard */ \"./dist/components/dashboard.js\");\n\n\n\nconst app = document.getElementById('app');\nfunction navigate(page) {\n    switch (page) {\n        case 'login':\n            (0,_components_login__WEBPACK_IMPORTED_MODULE_0__.renderLogin)(app);\n            break;\n        case 'signup':\n            (0,_components_signup__WEBPACK_IMPORTED_MODULE_1__.renderSignup)(app);\n            break;\n        case 'dashboard':\n            (0,_components_dashboard__WEBPACK_IMPORTED_MODULE_2__.renderDashboard)(app);\n            break;\n        default:\n            (0,_components_login__WEBPACK_IMPORTED_MODULE_0__.renderLogin)(app);\n    }\n}\nnavigate('login');\n\n\n//# sourceURL=webpack://frontend/./dist/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/main.js");
/******/ 	
/******/ })()
;