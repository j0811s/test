!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";
/*! npm.im/object-fit-images 3.2.4 */var i="bfred-it:object-fit-images",o=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,r="undefined"==typeof Image?{style:{"object-position":1}}:new Image,s="object-fit"in r.style,a="object-position"in r.style,c="background-size"in r.style,l="string"==typeof r.currentSrc,u=r.getAttribute,d=r.setAttribute,h=!1;function g(t,e,n){var i="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+(e||1)+"' height='"+(n||0)+"'%3E%3C/svg%3E";u.call(t,"src")!==i&&d.call(t,"src",i)}function m(t,e){t.naturalWidth?e(t):setTimeout(m,100,t,e)}function f(t){var e=function(t){for(var e,n=getComputedStyle(t).fontFamily,i={};null!==(e=o.exec(n));)i[e[1]]=e[2];return i}(t),n=t[i];if(e["object-fit"]=e["object-fit"]||"fill",!n.img){if("fill"===e["object-fit"])return;if(!n.skipTest&&s&&!e["object-position"])return}if(!n.img){n.img=new Image(t.width,t.height),n.img.srcset=u.call(t,"data-ofi-srcset")||t.srcset,n.img.src=u.call(t,"data-ofi-src")||t.src,d.call(t,"data-ofi-src",t.src),t.srcset&&d.call(t,"data-ofi-srcset",t.srcset),g(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{!function(t){var e={get:function(e){return t[i].img[e||"src"]},set:function(e,n){return t[i].img[n||"src"]=e,d.call(t,"data-ofi-"+n,e),f(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}!function(t){if(t.srcset&&!l&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}(n.img),t.style.backgroundImage='url("'+(n.img.currentSrc||n.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=e["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(e["object-fit"])?m(n.img,(function(){n.img.naturalWidth>t.width||n.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"})):t.style.backgroundSize=e["object-fit"].replace("none","auto").replace("fill","100% 100%"),m(n.img,(function(e){g(t,e.naturalWidth,e.naturalHeight)}))}function p(t,e){var n=!h&&!t;if(e=e||{},t=t||"img",a&&!e.skipTest||!c)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var o=0;o<t.length;o++)t[o][i]=t[o][i]||{skipTest:e.skipTest},f(t[o]);n&&(document.body.addEventListener("load",(function(t){"IMG"===t.target.tagName&&p(t.target,{skipTest:e.skipTest})}),!0),h=!0,t="img"),e.watchMQ&&window.addEventListener("resize",p.bind(null,t,{skipTest:e.skipTest}))}p.supportsObjectFit=s,p.supportsObjectPosition=a,function(){function t(t,e){return t[i]&&t[i].img&&("src"===e||"srcset"===e)?t[i].img:t}a||(HTMLImageElement.prototype.getAttribute=function(e){return u.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,n){return d.call(t(this,e),e,String(n))})}(),t.exports=p},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){"use strict";if("object"===("undefined"==typeof window?"undefined":n(window)))if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var t=window.document,e=[],i=null,o=null;s.prototype.THROTTLE_TIMEOUT=100,s.prototype.POLL_INTERVAL=null,s.prototype.USE_MUTATION_OBSERVER=!0,s._setupCrossOriginUpdater=function(){return i||(i=function(t,n){o=t&&n?u(t,n):{top:0,bottom:0,left:0,right:0,width:0,height:0},e.forEach((function(t){t._checkForIntersections()}))}),i},s._resetCrossOriginUpdater=function(){i=null,o=null},s.prototype.observe=function(t){if(!this._observationTargets.some((function(e){return e.element==t}))){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(t.ownerDocument),this._checkForIntersections()}},s.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter((function(e){return e.element!=t})),this._unmonitorIntersections(t.ownerDocument),0==this._observationTargets.length&&this._unregisterInstance()},s.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorAllIntersections(),this._unregisterInstance()},s.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},s.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter((function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]}))},s.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map((function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}}));return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},s.prototype._monitorIntersections=function(e){var n=e.defaultView;if(n&&-1==this._monitoringDocuments.indexOf(e)){var i=this._checkForIntersections,o=null,r=null;if(this.POLL_INTERVAL?o=n.setInterval(i,this.POLL_INTERVAL):(a(n,"resize",i,!0),a(e,"scroll",i,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in n&&(r=new n.MutationObserver(i)).observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),this._monitoringDocuments.push(e),this._monitoringUnsubscribes.push((function(){var t=e.defaultView;t&&(o&&t.clearInterval(o),c(t,"resize",i,!0)),c(e,"scroll",i,!0),r&&r.disconnect()})),e!=(this.root&&this.root.ownerDocument||t)){var s=g(e);s&&this._monitorIntersections(s.ownerDocument)}}},s.prototype._unmonitorIntersections=function(e){var n=this._monitoringDocuments.indexOf(e);if(-1!=n){var i=this.root&&this.root.ownerDocument||t;if(!this._observationTargets.some((function(t){var n=t.element.ownerDocument;if(n==e)return!0;for(;n&&n!=i;){var o=g(n);if((n=o&&o.ownerDocument)==e)return!0}return!1}))){var o=this._monitoringUnsubscribes[n];if(this._monitoringDocuments.splice(n,1),this._monitoringUnsubscribes.splice(n,1),o(),e!=i){var r=g(e);r&&this._unmonitorIntersections(r.ownerDocument)}}}},s.prototype._unmonitorAllIntersections=function(){var t=this._monitoringUnsubscribes.slice(0);this._monitoringDocuments.length=0,this._monitoringUnsubscribes.length=0;for(var e=0;e<t.length;e++)t[e]()},s.prototype._checkForIntersections=function(){if(this.root||!i||o){var t=this._rootIsInDom(),e=t?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach((function(n){var o=n.element,s=l(o),a=this._rootContainsTarget(o),c=n.entry,u=t&&a&&this._computeTargetAndRootIntersection(o,s,e),d=n.entry=new r({time:window.performance&&performance.now&&performance.now(),target:o,boundingClientRect:s,rootBounds:i&&!this.root?null:e,intersectionRect:u});c?t&&a?this._hasCrossedThreshold(c,d)&&this._queuedEntries.push(d):c&&c.isIntersecting&&this._queuedEntries.push(d):this._queuedEntries.push(d)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)}},s.prototype._computeTargetAndRootIntersection=function(e,n,r){if("none"!=window.getComputedStyle(e).display){for(var s,a,c,d,g,m,f,p,v=n,y=h(e),b=!1;!b&&y;){var w=null,_=1==y.nodeType?window.getComputedStyle(y):{};if("none"==_.display)return null;if(y==this.root||9==y.nodeType)if(b=!0,y==this.root||y==t)i&&!this.root?!o||0==o.width&&0==o.height?(y=null,w=null,v=null):w=o:w=r;else{var E=h(y),I=E&&l(E),T=E&&this._computeTargetAndRootIntersection(E,I,r);I&&T?(y=E,w=u(I,T)):(y=null,v=null)}else{var j=y.ownerDocument;y!=j.body&&y!=j.documentElement&&"visible"!=_.overflow&&(w=l(y))}if(w&&(s=w,a=v,c=void 0,d=void 0,g=void 0,m=void 0,f=void 0,p=void 0,c=Math.max(s.top,a.top),d=Math.min(s.bottom,a.bottom),g=Math.max(s.left,a.left),m=Math.min(s.right,a.right),p=d-c,v=(f=m-g)>=0&&p>=0&&{top:c,bottom:d,left:g,right:m,width:f,height:p}||null),!v)break;y=y&&h(y)}return v}},s.prototype._getRootRect=function(){var e;if(this.root)e=l(this.root);else{var n=t.documentElement,i=t.body;e={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(e)},s.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map((function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100})),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},s.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var o=0;o<this.thresholds.length;o++){var r=this.thresholds[o];if(r==n||r==i||r<n!=r<i)return!0}},s.prototype._rootIsInDom=function(){return!this.root||d(t,this.root)},s.prototype._rootContainsTarget=function(e){return d(this.root||t,e)&&(!this.root||this.root.ownerDocument==e.ownerDocument)},s.prototype._registerInstance=function(){e.indexOf(this)<0&&e.push(this)},s.prototype._unregisterInstance=function(){var t=e.indexOf(this);-1!=t&&e.splice(t,1)},window.IntersectionObserver=s,window.IntersectionObserverEntry=r}function r(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,o=i.width*i.height;this.intersectionRatio=n?Number((o/n).toFixed(4)):this.isIntersecting?1:0}function s(t,e){var n,i,o,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),i=this.THROTTLE_TIMEOUT,o=null,function(){o||(o=setTimeout((function(){n(),o=null}),i))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map((function(t){return t.value+t.unit})).join(" "),this._monitoringDocuments=[],this._monitoringUnsubscribes=[]}function a(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function c(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function l(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function u(t,e){var n=e.top-t.top,i=e.left-t.left;return{top:n,left:i,height:e.height,width:e.width,bottom:n+e.height,right:i+e.width}}function d(t,e){for(var n=e;n;){if(n==t)return!0;n=h(n)}return!1}function h(e){var n=e.parentNode;return 9==e.nodeType&&e!=t?g(e):n&&11==n.nodeType&&n.host?n.host:n&&n.assignedSlot?n.assignedSlot.parentNode:n}function g(t){try{return t.defaultView&&t.defaultView.frameElement||null}catch(t){return null}}}()},function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i);function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function a(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}n(1),o()(),function(t,e){var n,i,o,s;o=t.querySelectorAll(".js-tab_item"),s=t.querySelectorAll(".js-panel"),n=o,i=function(t,e){t.addEventListener("click",(function(n){for(var i=0;i<o.length;i++)o[i].classList.remove("is-active");t.classList.add("is-active");for(var r=0;r<s.length;r++)s[r].classList.remove("is-active");s[e].classList.add("is-active")}))},[].slice.call(n).forEach(i);var c=function(){function e(n,i,o){r(this,e),this.button=[].slice.call(t.querySelectorAll(n)),this.target=[].slice.call(t.querySelectorAll(i));this.config=o||{transitionDuration:".6s",transitionTimingFunction:"ease"},void 0===this.config.transitionDuration&&(this.config.transitionDuration=".6s"),void 0===this.config.transitionTimingFunction&&(this.config.transitionTimingFunction="ease"),this.process(this.button,this.target,this.config)}return a(e,[{key:"process",value:function(t,e,n){var i=[];e.forEach((function(t){i.push(t.scrollHeight),t.style.overflow="hidden",t.style.maxHeight=0,t.style.transitionProperty="max-height",t.style.transitionDuration=n.transitionDuration,t.style.transitionTimingFunction=n.transitionTimingFunction})),t.forEach((function(t,n){t.addEventListener("click",(function(){t.classList.toggle("is_open"),t.classList.contains("is_open")?e[n].style.maxHeight=i[n]+"px":e[n].style.maxHeight=0}))})),window.addEventListener("resize",(function(){i=[],e.forEach((function(t){i.push(t.scrollHeight)}));for(var n=0;n<t.length;n++)t[n].classList.remove("is_open"),e[n].style.maxHeight=0}))}}]),e}();[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach((function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})}));var l=function(){function t(e,n){r(this,t),this.target=[].slice.call(document.querySelectorAll(e+" [data-modal]")),this.config=n||{type:"image",alt:[""]},this.toggleModal(this.target,this.config)}return a(t,[{key:"toggleModal",value:function(t,e){var n=document.createElement("div");n.setAttribute("id","js_modal"),n.setAttribute("class","modal");var i,o=document.createElement("div");o.setAttribute("id","js_modal_contents"),o.setAttribute("class","modal_contents"),"image"===e.type?i=document.createElement("img"):"video"===e.type?((i=document.createElement("video")).setAttribute("muted",""),i.setAttribute("autoplay",""),i.setAttribute("loop",""),i.setAttribute("controls",""),o.classList.add("hp_video")):"iframe"===e.type&&(i=document.createElement("iframe"),o.classList.add("hp_video"));var r=document.createElement("a");r.setAttribute("id","js_modal_close"),r.setAttribute("class","modal_close"),t.forEach((function(t,s){t.addEventListener("click",(function(){document.body.appendChild(n),n.appendChild(r);var a=document.getElementById("js_modal"),c=document.getElementById("js_modal_close");a.appendChild(o),i.setAttribute("id","js_modal_item"),i.setAttribute("class","modal_item"),i.setAttribute("src",t.dataset.modal),"image"===e.type&&void 0===e.alt[s]&&(e.alt[s]=""),"image"===e.type&&i.setAttribute("alt",e.alt[s]),o.appendChild(i);var l=a||c,u=window.navigator.userAgent.toLowerCase();l.addEventListener("click",(function(){-1!==u.indexOf("trident/7")?document.body.removeChild(a):a.remove()})),document.getElementById("js_modal_contents").addEventListener("click",(function(t){t.stopPropagation()}))}))}))}}]),t}(),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{audioElement:null,audioButton:null,imageElement:{toggleClassTarget:null,toggleClassTargetAll:null,character:[]}};r(this,t),this.audioElement=new Audio(e.audioElement),this.audioButton=e.audioButton,this.imageElement=e.imageElement.toggleClassTarget,this.imageElementAll=e.imageElement.toggleClassTargetAll,this.character=e.imageElement.character,this.init()}return a(t,[{key:"init",value:function(){this.audioElement.muted=!0,document.querySelectorAll(this.audioButton)[0].parentNode.insertBefore(this.audioElement,document.querySelectorAll(this.audioButton)[0].nextSibling),this.handleButton()}},{key:"handleButton",value:function(){var t=this;[].slice.call(document.querySelectorAll(this.audioButton)).forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),t.audioElement.paused?(t.handleStopAll(),t.handlePlay()):t.handleStop()}))}))}},{key:"handlePlay",value:function(){this.audioElement.muted=!1,this.audioElement.play(),this.handleToggleClass(this.imageElement,"add"),this.handleSetImage(),this.handleEnd()}},{key:"handleStop",value:function(){this.audioElement.pause(),this.audioElement.currentTime=0,this.handleToggleClass(this.imageElement,"remove"),this.handleClearImage()}},{key:"handleStopAll",value:function(){this.handleToggleClass(this.imageElementAll,"remove"),[].slice.call(document.querySelectorAll("audio")).forEach((function(t){t.pause(),t.currentTime=0})),this.handleClearImage()}},{key:"handleEnd",value:function(){var t=this;this.audioElement.addEventListener("ended",(function(){t.handleToggleClass(t.imageElement,"remove"),t.handleClearImage()}))}},{key:"handleToggleClass",value:function(t,e){[].slice.call(document.querySelectorAll(t)).forEach((function(t){t.classList[e]("is-toggleAnimation")}))}},{key:"handleSetImage",value:function(){var t=this,e=0;this.timerId=setInterval((function(){document.querySelector(t.imageElement).setAttribute("src","asset/images/".concat(t.character[e])),++e>=t.character.length&&(e=0),t.audioElement.paused&&(clearInterval(t.timerId),document.querySelector(t.imageElement).setAttribute("src","asset/images/".concat(t.character[0])))}),300)}},{key:"handleClearImage",value:function(){clearInterval(this.timerId),document.querySelector(this.imageElement).setAttribute("src","asset/images/".concat(this.character[0]))}}]),t}();e.addEventListener("DOMContentLoaded",(function(){document.uniqueID&&11==document.documentMode&&console.log("is IE11"),function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:600,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"easeInOutCubic",r={linear:function(t,e,n,i){return n*t/i+e},easeInQuad:function(t,e,n,i){return n*(t/=i)*t+e},easeOutQuad:function(t,e,n,i){return-n*(t/=i)*(t-2)+e},easeInOutQuad:function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,i){return n*(t/=i)*t*t+e},easeOutCubic:function(t,e,n,i){return n*((t=t/i-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,i){return(t/=i/2)<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e}},s=".js-noSmooth",a=t.querySelectorAll('a[href^="#"]:not('.concat(s,")"));[].slice.call(a).forEach((function(s){s.addEventListener("click",(function(a){a.preventDefault();var c=s.getAttribute("href"),l=t.querySelector("#"==c?"html":c),u=e.pageYOffset||t.documentElement.scrollTop,d=l.getBoundingClientRect().top-i,h=Date.now();!function t(){var e=Date.now()-h;e<n?(scrollTo(0,r[o](e,u,d,n)),requestAnimationFrame(t)):scrollTo(0,d+u)}()}))}))}(600,t.querySelector(".js-localNav").clientHeight)})),e.addEventListener("load",(function(){new u({audioElement:"/asset/audio/kokoronosora.mp3",audioButton:".js-handleButton.js-one",imageElement:{toggleClassTarget:".js-audioImage.js-one",toggleClassTargetAll:".js-toggleImage",character:["boy_01.png","boy_02.png","boy_03.png"]}}),new u({audioElement:"/asset/audio/present.mp3",audioButton:".js-handleButton.js-two",imageElement:{toggleClassTarget:".js-audioImage.js-two",toggleClassTargetAll:".js-toggleImage",character:["boy_03.png","boy_02.png","boy_01.png"]}}),new c(".js_accordion > .js_accordionButton",".js_accordion > .js_accordionTarget",{transitionDuration:"1s"}),new c(".js_accordion3",".js_accordionTarget3",{transitionTimingFunction:"cubic-bezier(0.175, 0.885, 0.320, 1.275)"}),new l(".js_popUp"),new l(".js_popUpVideo",{type:"video"}),new l(".js_popUpIframe",{type:"iframe"})}));!function(){var e=[].slice.call(t.querySelectorAll(".js-glitchItem")),n=[].slice.call(t.querySelectorAll(".js-glitchItem image")).findIndex((function(t){return[].slice.call(t.classList).includes("add-active")})),i=n;setInterval((function(){e.forEach((function(t){t.querySelectorAll("image")[i].classList.remove("add-active")})),i>=e.length-1?i=0:i+=1,e.forEach((function(t){t.querySelectorAll("image")[i].classList.add("add-active")}))}),3e3);var o=t.getElementById("js-keyvisual"),r=["https://marksman.itembox.design/item/assets/img/top/slide01.jpg","https://marksman.itembox.design/item/assets/img/top/slide02.jpg","https://marksman.itembox.design/item/assets/img/top/slide03.jpg","https://marksman.itembox.design/item/assets/img/top/slide04.jpg"];setInterval((function(){o.setAttribute("src",r[n]),n>=e.length?n=0:n+=1}),3e3)}();var d=function(t){document.querySelectorAll(".js-glitchSVG")[0].classList[t]("is-glitch"),document.querySelectorAll(".js-glitchSVG")[1].classList[t]("is-glitch2"),[].slice.call(document.querySelectorAll(".js-section.active .js-toggleActive")).forEach((function(e){e.classList[t]("is-active")}))};$(document).ready((function(){$("#fullpage").fullpage({sectionSelector:".js-section",navigation:!0,paddingTop:"64px",scrollOverflow:!0,normalScrollElements:".js-normalScroll",onLeave:function(t,e,n){d("remove")},afterLoad:function(t,e){d("add")},afterResize:function(){}})}))}(document,window)}]);