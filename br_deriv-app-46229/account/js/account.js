!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("@deriv/components"),require("@deriv/shared"),require("@deriv/translations"),require("mobx"),require("mobx-react"),require("react"),require("react-dom"),require("react-router"),require("react-router-dom")):"function"==typeof define&&define.amd?define(["@deriv/components","@deriv/shared","@deriv/translations","mobx","mobx-react","react","react-dom","react-router","react-router-dom"],r):"object"==typeof exports?exports["@deriv/account"]=r(require("@deriv/components"),require("@deriv/shared"),require("@deriv/translations"),require("mobx"),require("mobx-react"),require("react"),require("react-dom"),require("react-router"),require("react-router-dom")):e["@deriv/account"]=r(e["@deriv/components"],e["@deriv/shared"],e["@deriv/translations"],e.mobx,e["mobx-react"],e.react,e["react-dom"],e["react-router"],e["react-router-dom"])}(self,(function(e,r,t,o,n,a,i,d,u){return(()=>{"use strict";var c,s,l,p,m={"@deriv/components":r=>{r.exports=e},"@deriv/shared":e=>{e.exports=r},"@deriv/translations":e=>{e.exports=t},mobx:e=>{e.exports=o},"mobx-react":e=>{e.exports=n},react:e=>{e.exports=a},"react-dom":e=>{e.exports=i},"react-router":e=>{e.exports=d},"react-router-dom":e=>{e.exports=u}},f={};function v(e){var r=f[e];if(void 0!==r)return r.exports;var t=f[e]={id:e,loaded:!1,exports:{}};return m[e].call(t.exports,t,t.exports,v),t.loaded=!0,t.exports}v.m=m,v.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return v.d(r,{a:r}),r},v.d=(e,r)=>{for(var t in r)v.o(r,t)&&!v.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},v.f={},v.e=e=>Promise.all(Object.keys(v.f).reduce(((r,t)=>(v.f[t](e,r),r)),[])),v.u=e=>"account/js/account."+e+"."+{404:"54dcccd15e9c3898f812","vendors-node_modules_binary-com_binary-document-uploader_DocumentUploader_js-node_modules_bow-78804b":"a432909315f371843906","account-app":"74de03f6a687fa290669"}[e]+".js",v.miniCssF=e=>"account/css/"+e+".7f9f270b5494984ae9bc.css",v.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),v.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),v.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),c={},s="@deriv/account:",v.l=(e,r,t,o)=>{if(c[e])c[e].push(r);else{var n,a;if(void 0!==t)for(var i=document.getElementsByTagName("script"),d=0;d<i.length;d++){var u=i[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==s+t){n=u;break}}n||(a=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,v.nc&&n.setAttribute("nonce",v.nc),n.setAttribute("data-webpack",s+t),n.src=e),c[e]=[r];var l=(r,t)=>{n.onerror=n.onload=null,clearTimeout(p);var o=c[e];if(delete c[e],n.parentNode&&n.parentNode.removeChild(n),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=l.bind(null,n.onerror),n.onload=l.bind(null,n.onload),a&&document.head.appendChild(n)}},v.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},v.p="/",l=e=>new Promise(((r,t)=>{var o=v.miniCssF(e),n=v.p+o;if(((e,r)=>{for(var t=document.getElementsByTagName("link"),o=0;o<t.length;o++){var n=(i=t[o]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(n===e||n===r))return i}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){var i;if((n=(i=a[o]).getAttribute("data-href"))===e||n===r)return i}})(o,n))return r();((e,r,t,o)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.onerror=n.onload=a=>{if(n.onerror=n.onload=null,"load"===a.type)t();else{var i=a&&("load"===a.type?"missing":a.type),d=a&&a.target&&a.target.href||r,u=new Error("Loading CSS chunk "+e+" failed.\n("+d+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=i,u.request=d,n.parentNode.removeChild(n),o(u)}},n.href=r,document.head.appendChild(n)})(e,n,r,t)})),p={account:0},v.f.miniCss=(e,r)=>{p[e]?r.push(p[e]):0!==p[e]&&{"account-app":1}[e]&&r.push(p[e]=l(e).then((()=>{p[e]=0}),(r=>{throw delete p[e],r})))},(()=>{var e={account:0};v.f.j=(r,t)=>{var o=v.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else{var n=new Promise(((t,n)=>o=e[r]=[t,n]));t.push(o[2]=n);var a=v.p+v.u(r),i=new Error;v.l(a,(t=>{if(v.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+n+": "+a+")",i.name="ChunkLoadError",i.type=n,i.request=a,o[1](i)}}),"chunk-"+r,r)}};var r=(r,t)=>{var o,n,[a,i,d]=t,u=0;for(o in i)v.o(i,o)&&(v.m[o]=i[o]);for(d&&d(v),r&&r(t);u<a.length;u++)n=a[u],v.o(e,n)&&e[n]&&e[n][0](),e[a[u]]=0},t=self.webpackChunk_deriv_account=self.webpackChunk_deriv_account||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var b={};return(()=>{v.d(b,{default:()=>n});var e=v("react"),r=v.n(e),t=v("@deriv/shared"),o=v("@deriv/components");const n=(0,t.makeLazyLoader)((function(){return Promise.all([v.e("vendors-node_modules_binary-com_binary-document-uploader_DocumentUploader_js-node_modules_bow-78804b"),v.e("account-app")]).then(v.bind(v,"./App.jsx"))}),(function(){return r().createElement(o.Loading,null)}))()})(),b.default})()}));