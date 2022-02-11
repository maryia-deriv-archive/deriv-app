(self.webpackChunk=self.webpackChunk||[]).push([[4287],{40041:(e,n,t)=>{"use strict";t.d(n,{D0:()=>s,XX:()=>u});var r=t(16636),o=(t(90004),t(20374)),i=t(16789),c=t(31508),a=t.n(c),u=(0,o.getLanguage)(),s=function(e,n){var t={set_settings:1,preferred_language:e};i.clear(),"EN"===e&&window.localStorage.setItem("i18n_language",e),r.Z.setSettings(t).then((function(){var t=new URL(window.location.href);"EN"===e?t.searchParams.delete("lang"):t.searchParams.set("lang",e),window.history.pushState({path:t.toString()},"",t.toString()),(0,o.changeLanguage)(e,(function(){n(e),a().closeAndOpenNewConnection(e)}))}))}},58147:(e,n,t)=>{"use strict";t.d(n,{Z:()=>s});var r=t(90004),o=t(86104);function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const c=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.errors={}}var n,t,r;return n=e,(t=[{key:"add",value:function(e,n){this.has(e)||(this.errors[e]=[]),-1===this.errors[e].indexOf(n)&&this.errors[e].push(n)}},{key:"all",value:function(){return this.errors}},{key:"first",value:function(e){return this.has(e)?this.errors[e][0]:null}},{key:"get",value:function(e){return this.has(e)?this.errors[e]:[]}},{key:"has",value:function(e){return Object.prototype.hasOwnProperty.call(this.errors,e)}}])&&i(n.prototype,t),r&&i(n,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function u(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const s=function(){function e(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;a(this,e),this.input=n,this.rules=t,this.store=r,this.errors=new c,this.error_count=0}var n,t,i;return n=e,i=[{key:"getRuleObject",value:function(e){var n="string"==typeof e,t={name:n?e:e[0],options:n?{}:e[1]||{}};return t.validator="custom"===t.name?e[1].func:(0,r.getPreBuildDVRs)()[t.name].func,t}}],(t=[{key:"addFailure",value:function(e,n){var t=n.options.message||(0,r.getPreBuildDVRs)()[n.name].message();"length"===n.name?t=(0,o.template)(t,[n.options.min===n.options.max?n.options.min:"".concat(n.options.min,"-").concat(n.options.max)]):"min"===n.name?t=(0,o.template)(t,[n.options.min]):"not_equal"===n.name&&(t=(0,o.template)(t,[n.options.name1,n.options.name2])),this.errors.add(e,t),this.error_count++}},{key:"check",value:function(){var n=this;return Object.keys(this.input).forEach((function(t){Object.prototype.hasOwnProperty.call(n.rules,t)&&n.rules[t].forEach((function(r){var o=e.getRuleObject(r);(o.validator||"function"==typeof o.validator)&&(o.options.condition&&!o.options.condition(n.store)||""===n.input[t]&&"req"!==o.name||o.validator(n.input[t],o.options,n.store,n.input)||n.addFailure(t,o))}))})),!this.error_count}},{key:"isPassed",value:function(){return this.check()}}])&&u(n.prototype,t),i&&u(n,i),Object.defineProperty(n,"prototype",{writable:!1}),e}()},52397:(e,n,t)=>{"use strict";t.d(n,{Z:()=>a});var r,o=t(90004),i=36e5;function c(){return function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&navigator.serviceWorker.controller&&(console.log("New version is found, refreshing the page..."),clearInterval(r))}}}}function a(){"serviceWorker"in navigator&&window.addEventListener("load",(function(){var e="".concat(window.location.origin).concat((0,o.getUrlBase)("/service-worker.js"));navigator.serviceWorker.register(e).then((function(e){r=setInterval((function(){e.update().then(c).catch((function(e){console.error("Error during service worker update:",e)}))}),i),e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){if("installed"===n.state&&navigator.serviceWorker.controller&&performance.now()>i){var e=new Event("UpdateAvailable");document.dispatchEvent(e)}}}})).catch((function(n){console.error("Error during service worker registration:",n,e)}))}))}},50146:e=>{function n(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var r,o,i=[],c=!0,a=!1;try{for(t=t.call(e);!(c=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==t.return||t.return()}finally{if(a)throw o}}return i}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return o(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return o(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=n,this.debounced_calls={}}var n,t,o;return n=e,(t=[{key:"sendWillBeCalled",value:function(e){var n=r(e.args,1)[0];this.config.wsEvent("send");var t=a(n);if(t in this.debounced_calls)return this.debounced_calls[t]}},{key:"sendIsCalled",value:function(e){var n=this,t=e.response_promise,o=r(e.args,2),i=o[0],c=o[1],u=void 0===c?{}:c,s=function(e){return new Promise((function(n){e.then(n,n)}))}(t),l=a(i);return u.callback&&s.then(u.callback),this.debounced_calls[l]=s,s.then((function(){delete n.debounced_calls[l]})),s}}])&&i(n.prototype,t),o&&i(n,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();function a(e){var r=function(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?n(Object(o),!0).forEach((function(n){t(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}({},e);return delete r.passthrough,delete r.req_id,delete r.subscribe,JSON.stringify(r)}e.exports=c},35313:(e,n,t)=>{function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i=t(20374).localize,c=t(31508),a=function(){var e,n={online:{class:"online",tooltip:i("Online")},offline:{class:"offline",tooltip:i("Offline")},blinking:{class:"blinker",tooltip:i("Connecting to server")}},t=function(){return navigator.onLine},a=null;function u(e){var n=e.timeout;clearTimeout(a),a=setTimeout((function(){a=null,t()&&c.hasReadyState(2,3)?c.openNewConnection():c.send({ping:1})}),n)}var s={init:function(){return e(t()?"blinking":"offline")},open:function(){return e(t()?"online":"offline")},send:function(){},message:function(){return e("online")},close:function(){e(t()?"blinking":"offline"),u({timeout:5e3})}},l=function(e){s[e]&&s[e]()};return{init:function(i,a,s){var f,p;if(e=function(e){var r=t();e===f&&r===p||(f=e,p=r,a(n[e],r))},"onLine"in navigator?(window.addEventListener("online",(function(){e("blinking"),u({timeout:500})})),window.addEventListener("offline",(function(){c.close(),e("offline")}))):navigator.onLine=!0,t()){var d=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({wsEvent:l,isOnline:t},i);c.init({options:d,client:s}),c.openNewConnection()}e(t()?"blinking":"offline")},wsEvent:l}}();e.exports=a},81250:(e,n,t)=>{var r,o,i,c,a,u,s,l,f,p,d=t(53806),y=t(31508),v=t(86104).PromiseClass,b=(u=!1,s=new v,l=function(e){u||(a=e,f(),clearInterval(i),i=setInterval(f,3e4),u=!0)},f=function(){o=performance.now(),y.send({time:1}).then(p)},p=function(e){if(!e.error)if(u){clearInterval(c);var n=e.time,t=performance.now(),i=1e3*n+(t-o),f=function(){var e=performance.now()-t;r=d(i+e).utc(),"function"==typeof a&&a()};f(),s.resolve(),c=setInterval(f,1e3)}else l()},{init:l,get:function(){return r?r.clone():void 0},timePromise:s.promise});e.exports=b},31508:(e,n,t)=>{function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return a(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}var s,l,f,p,d,y,v,b,g,m,h,_,w,O,j,P,k,S,A,E,C=t(68996),x=t(90004).getAppId,D=t(90004).getSocketURL,I=t(90004).cloneObject,R=t(90004).getPropertyValue,T=t(90004).State,L=t(20374).getLanguage,B=t(90004).website_name,N=t(16789),U=t(50146),M=(p={},d=0,y=!1,v=!1,b=!1,m=function(e){return"wss://".concat(D(),"/websockets/v3?app_id=").concat(x(),"&l=").concat(e,"&brand=").concat(B.toLowerCase())},h=function(){return O(1)},_=function(){return!l||O(2,3)},w=function(){l.close()},O=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return l&&n.some((function(e){return l.readyState===e}))},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L();d!==x()&&(b||p.wsEvent("init"),_()&&(y=!1,l=new WebSocket(m(e)),s=new C({connection:l,storage:N,middleware:new U(p)})),s.onOpen().subscribe((function(){if(p.wsEvent("open"),A("website_status"),f.is_logged_in){var e=f.getToken();s.authorize(e)}"function"==typeof p.onOpen&&p.onOpen(h()),"function"==typeof p.onReconnect&&v&&p.onReconnect(),v||(v=!0)})),s.onMessage().subscribe((function(e){var n=e.data,t=n.msg_type;T.set(["response",t],I(n)),p.wsEvent("message"),"InvalidAppID"===R(n,["error","code"])&&(d=x()),"function"==typeof p.onMessage&&p.onMessage(n)})),s.onClose().subscribe((function(){b?b=!1:p.wsEvent("close"),d===x()||"function"!=typeof p.onDisconnect||y||(p.onDisconnect(),y=!0)})))},S=function(e){return!("authorize"===e&&!f.is_logged_in)},A=function(){for(var e,n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return(e=s).expectResponse.apply(e,c(t.filter(S)))},E=function(e,n){return s.subscribe(e).subscribe(n,n)},{init:function(e){var n=e.options,t=e.client;"object"===u(n)&&p!==n&&(p=n),f=t},openNewConnection:j,forgetStream:function(e){return s.forget(e)},wait:A,availability:g={is_up:!0,is_updating:!1,is_down:!1},hasReadyState:O,isSiteDown:k=function(e){return/^down$/i.test(e)},isSiteUpdating:P=function(e){return/^updating$/i.test(e)},clear:function(){},sendBuffered:function(){},getSocket:function(){return l},get:function(){return s},getAvailability:function(){return g},setOnDisconnect:function(e){p.onDisconnect=e},setOnReconnect:function(e){p.onReconnect=e},removeOnReconnect:function(){delete p.onReconnect},removeOnDisconnect:function(){delete p.onDisconnect},cache:W({},(function(){return s.cache})),storage:W({},(function(){return s.storage})),buy:function(e){var n=e.proposal_id,t=e.price;return s.send({buy:n,price:t})},buyAndSubscribe:function(e){return new Promise((function(n){var t=!1,r=E(e,(function(e){t||(t=!0,r.unsubscribe(),n(e))}))}))},sell:function(e,n){return s.send({sell:e,price:n})},cashier:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return s.send(o({cashier:e},n))},cashierPayments:function(e){var n=e.provider,t=e.transaction_type;return s.send({cashier_payments:1,provider:n,transaction_type:t})},subscribeCashierPayments:function(e){return E({cashier_payments:1,provider:"crypto",transaction_type:"all"},e)},cancelCryptoTransaction:function(e){return s.send({cashier_withdrawal_cancel:1,id:e})},cancelContract:function(e){return s.send({cancel:e})},close:w,cryptoWithdraw:function(e){var n=e.address,t=e.amount,r=e.verification_code,o=e.dry_run,i=void 0===o?0:o;return s.send({cashier:"withdraw",provider:"crypto",type:"api",address:n,amount:t,verification_code:r,dry_run:i})},cryptoConfig:function(){return s.send({crypto_config:1})},contractUpdate:function(e,n){return s.send({contract_update:1,contract_id:e,limit_order:n})},contractUpdateHistory:function(e){return s.send({contract_update_history:1,contract_id:e})},getFinancialAssessment:function(){return s.send({get_financial_assessment:1})},mt5NewAccount:function(e){return s.send(o({mt5_new_account:1},e))},newAccountVirtual:function(e,n,t,r,i){return s.send(o({new_account_virtual:1,verification_code:e,client_password:n,residence:t,email_consent:r},i))},newAccountReal:function(e){return s.send(o({new_account_real:1},e))},newAccountRealMaltaInvest:function(e){return s.send(o({new_account_maltainvest:1},e))},p2pAdvertiserInfo:function(){return s.send({p2p_advertiser_info:1})},p2pSubscribe:function(e,n){return E(e,n)},profitTable:function(e,n,t){return s.send(o({profit_table:1,description:1,limit:e,offset:n},t))},statement:function(e,n,t){return s.send(o({statement:1,description:1,limit:e,offset:n},t))},verifyEmail:function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return s.send(o({verify_email:e,type:n},t))},tradingPlatformPasswordChange:function(e){return s.send(o({trading_platform_password_change:1},e))},tradingPlatformPasswordReset:function(e){return s.send(o({trading_platform_password_reset:1},e))},tradingPlatformInvestorPasswordChange:function(e){return s.send(o({trading_platform_investor_password_change:1},e))},tradingPlatformInvestorPasswordReset:function(e){return s.send(o({trading_platform_investor_password_reset:1},e))},activeSymbols:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"brief";return s.activeSymbols(e)},paymentAgentList:function(e,n){return s.send(o({paymentagent_list:e},n&&{currency:n}))},allPaymentAgentList:function(e){return s.send({paymentagent_list:e})},paymentAgentDetails:function(e,n){return s.send({paymentagent_details:1,passthrough:e,req_id:n})},paymentAgentWithdraw:function(e){var n=e.loginid,t=e.currency,r=e.amount,o=e.verification_code,i=e.dry_run,c=void 0===i?0:i;return s.send({amount:r,currency:t,verification_code:o,paymentagent_withdraw:1,dry_run:c,paymentagent_loginid:n})},paymentAgentTransfer:function(e){var n=e.amount,t=e.currency,r=e.description,o=e.transfer_to,i=e.dry_run,c=void 0===i?0:i;return s.send({amount:n,currency:t,description:r,transfer_to:o,paymentagent_transfer:1,dry_run:c})},setAccountCurrency:function(e,n){return s.send(o({set_account_currency:e},n&&{passthrough:n}))},balanceAll:function(){return s.send({balance:1,account:"all"})},setAvailability:function(e){g.is_up=function(e){return/^up$/i.test(e)}(e),g.is_updating=P(e),g.is_down=k(e)},subscribeBalanceAll:function(e){return E({balance:1,account:"all"},e)},subscribeBalanceActiveAccount:function(e,n){return E({balance:1,account:n},e)},subscribeProposal:function(e,n){return E(o({proposal:1},e),n)},subscribeProposalOpenContract:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1?arguments[1]:void 0;return E(o({proposal_open_contract:1},e&&{contract_id:e}),n)},subscribeTicks:function(e,n){return E({ticks:e},n)},subscribeTicksHistory:function(e,n){return E(e,n)},subscribeTransaction:function(e){return E({transaction:1},e)},subscribeWebsiteStatus:function(e){return E({website_status:1},e)},tncApproval:function(){return s.send({tnc_approval:"1"})},transferBetweenAccounts:function(e,n,t,r){return s.send(o({transfer_between_accounts:1,accounts:"all"},e&&{account_from:e,account_to:n,currency:t,amount:r}))},fetchLoginHistory:function(e){return s.send({login_history:1,limit:e})},closeAndOpenNewConnection:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L();w(),b=!0,j(e)},accountStatistics:function(){return s.send({account_statistics:1})},realityCheck:function(){return s.send({reality_check:1})},tradingServers:function(e){return s.send({platform:e,trading_servers:1})},tradingPlatformAccountsList:function(e){return s.send({trading_platform_accounts:1,platform:e})},tradingPlatformNewAccount:function(e){return s.send(o({trading_platform_new_account:1},e))},triggerMt5DryRun:function(e){var n=e.email;return s.send({account_type:"financial",dry_run:1,email:n,leverage:100,mainPassword:"Test1234",mt5_account_type:"financial_stp",mt5_new_account:1,name:"test real labuan financial stp"})}});function W(e,n){return new Proxy(e,{get:function(e,t){if(e[t])return e[t];var r="function"==typeof n?n():n;if(r){var o=r[t];return o?"function"==typeof o?o.bind(r):o:void 0}}})}var q=W(M,(function(){return M.get()}));M.authorized=function e(n){return new Proxy(n,{get:function(n,t){return"function"!=typeof n[t]?e(n[t]):function(){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return M.wait("authorize").then((function(){return n[t].apply(n,r)}))}}})}(q),e.exports=q},16789:(e,n,t)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}var o,i,c,a,u,s,l,f,p,d,y=t(53806),v=t(90004).isEmptyObject,b=t(90004).getPropertyValue,g=t(86104).getStaticHash,m=t(90004).LocalStore,h=(o={payout_currencies:{expire:120},proposal_open_contract:{expire:10},contracts_for:{expire:10},exchange_rates:{expire:60},trading_times:{expire:120}},i="ws_cache",c={},a={history:"ticks_history",candles:"ticks_history"},u=function(e){var n=!1;return Array.isArray(e)?e.length||(n=!0):"object"===("undefined"==typeof response_data?"undefined":r(response_data))&&(Object.keys(e).length||(n=!0)),n},s=function(){v(c)&&(c=m.getObject(i),v(c))||c.static_hash!==g()&&d()},l=function(e){return b(c,e)||{}},{set:function(e,n){var t=a[n.msg_type]||n.msg_type;if((!n.subscription||"proposal_open_contract"===t&&n.proposal_open_contract.is_sold)&&"latest"!==n.echo_req.end&&o[t]){var r=f(n.echo_req)||{},s=r[t],l=n[t],p=n.error,v=s&&u(s)&&!u(l),b=s&&u(l)&&!u(s),h=!u(r)&&!r.error;if((p||v||b)&&h)d();else{var _=y().add(o[t].expire,"m").valueOf();c.static_hash||(c.static_hash=g()),c[e]={value:n,expires:_,msg_type:t},m.setObject(i,c)}}},get:f=function(e){s();var n,t=l(e);return y().isBefore(t.expires)?n=t.value:p(e),n},getByMsgType:function(e){s();var n=Object.keys(c).find((function(n){return l(n).msg_type===e}));if(n){var t,r=l(n);return y().isBefore(r.expires)?t=r.value:p(n),t}},has:function(e){return!!f(e)},remove:p=function(e,n){n?Object.keys(c).forEach((function(n){-1!==n.indexOf(e)&&delete c[n]})):e in c&&delete c[e],m.setObject(i,c)},clear:d=function(){m.remove(i),c={}}});e.exports=h},86104:e=>{function n(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var r,o=t((function e(){var n=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.promise=new Promise((function(e,t){n.reject=t,n.resolve=e}))})),i=["it","de","fr","lu","gr","mf","es","sk","lt","nl","at","bg","si","cy","be","ro","hr","pt","pl","lv","ee","cz","fi","hu","dk","se","ie","im","gb","mt"],c=["sg","de","gr","es","au","it","lu"],a=["au","fr"],u=["de","es","it","lu","gr","au","fr"];e.exports={template:function(e,n){var t=n;return n&&!Array.isArray(n)&&(t=[n]),e.replace(/\[_(\d+)]/g,(function(e,n){return t[+n-1]}))},createElement:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=document.createElement(e);return Object.keys(n).forEach((function(e){var r=n[e];"text"===e?t.textContent=r:"html"===e?t.html(r):t.setAttribute(e,r)})),t},getStaticHash:function(){return r=r||(document.querySelector('script[src*="main"]').getAttribute("src")||"").split(".")[1]},PromiseClass:o,isEuCountry:function(e){return i.includes(e)},isOptionsBlocked:function(e){return a.includes(e)},isSyntheticsUnavailable:function(e){return c.includes(e)},isMultipliersOnly:function(e){return u.includes(e)},copyToClipboard:function(e){var n=document.createElement("textarea");n.innerText=e,document.body.appendChild(n),n.select(),document.execCommand("copy"),n.remove()}}}}]);