if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(r[c])return;let d={};const b=e=>s(e,c),p={module:{uri:c},exports:d,require:b};r[c]=Promise.all(i.map((e=>p[e]||b(e)))).then((e=>(a(...e),d)))}}define(["./workbox-b89f6981"],(function(e){"use strict";importScripts("https://cdn.pushwoosh.com/webpush/v3/pushwoosh-service-worker.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/br_deriv-app-9test/appstore/js/appstore.appstore.63ed7fe906f1ccf6dc95.js",revision:"50675958b542fbc3e3afd8553e0dc882"},{url:"/br_deriv-app-9test/appstore/js/appstore.appstore.63ed7fe906f1ccf6dc95.js.LICENSE.txt",revision:"e3580f81b7f102288b6fed3407702b15"},{url:"/br_deriv-app-9test/appstore/js/appstore.vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_cssW-9a2d27.6471bb0a1f7d6a37d7d9.js",revision:"486558ef97c9ae94ece994dde5ad5072"},{url:"/br_deriv-app-9test/appstore/js/appstore.vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_cssW-9a2d27.6471bb0a1f7d6a37d7d9.js.LICENSE.txt",revision:"08dc8025bcb7bb7d5a063bd66143407d"},{url:"/br_deriv-app-9test/appstore/js/index.js",revision:"77f754975a9d5e65b4443e1077001107"},{url:"/br_deriv-app-9test/appstore/js/index.js.LICENSE.txt",revision:"39fdee89fff9128221072b66d6bc56e0"},{url:"/br_deriv-app-9test/css/core.8119.f4f29e06420747395cf2.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.chunk.account-signup-modal.5eeb5a3142b39e302eda.css",revision:null},{url:"/br_deriv-app-9test/css/core.chunk.complaints-policy.f7da2a996b45a3de793e.css",revision:null},{url:"/br_deriv-app-9test/css/core.chunk.set-residence-modal.de8efe679a545c1074fa.css",revision:null},{url:"/br_deriv-app-9test/css/core.chunk.trader~bde52cb3.2cc3c23bb16434c2ac95.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~07ff1e00.40a3a0f532ce2405300e.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~182f79bf.547483a072b4d1907c29.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~352d95fa.31d6cfe0d16ae931b73c.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~703a1da7.d1a9fedf2738112cbfad.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~7e76c2e1.c641eb4b5b8601ce1d24.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~9a8b795a.91b482e186f8b398c0a4.main.css",revision:null},{url:"/br_deriv-app-9test/css/core.main~d5ef20ee.e48b11e678b45a1cc54f.main.css",revision:null},{url:"/br_deriv-app-9test/favicon.ico",revision:"0cb8c9c65c9adde7eec4f6f79e2f4076"},{url:"/br_deriv-app-9test/js/core.16.be1a2f951bfac8fd5f2f.js",revision:null},{url:"/br_deriv-app-9test/js/core.16.be1a2f951bfac8fd5f2f.js.LICENSE.txt",revision:"7ec01595672f75e83fd81b41f132f4c1"},{url:"/br_deriv-app-9test/js/core.1783.e023898d7ba116fa6097.js",revision:null},{url:"/br_deriv-app-9test/js/core.2846.a930acc8357821bdd516.js",revision:null},{url:"/br_deriv-app-9test/js/core.3190.7d76931ac4455b1d416d.js",revision:null},{url:"/br_deriv-app-9test/js/core.374.f3705aac7154d71569b2.js",revision:null},{url:"/br_deriv-app-9test/js/core.374.f3705aac7154d71569b2.js.LICENSE.txt",revision:"c47fb89f944fc413937f1d857df6495a"},{url:"/br_deriv-app-9test/js/core.3806.aba0ee5d03c3ed222dc5.js",revision:null},{url:"/br_deriv-app-9test/js/core.3806.aba0ee5d03c3ed222dc5.js.LICENSE.txt",revision:"8e7fa176b006150306288bd092a696c0"},{url:"/br_deriv-app-9test/js/core.4400.ea643b0dd464d605a540.js",revision:null},{url:"/br_deriv-app-9test/js/core.4551.b82b26a758264e52f437.js",revision:null},{url:"/br_deriv-app-9test/js/core.4551.b82b26a758264e52f437.js.LICENSE.txt",revision:"411548f347b07fd9b880024b1215db1d"},{url:"/br_deriv-app-9test/js/core.516.4c2adb747200c150748d.js",revision:null},{url:"/br_deriv-app-9test/js/core.516.4c2adb747200c150748d.js.LICENSE.txt",revision:"caa639c0a9c790606af088aa1f8f5c26"},{url:"/br_deriv-app-9test/js/core.6279.c810857f6e779d76f375.js",revision:null},{url:"/br_deriv-app-9test/js/core.6579.cf8f29cdbffe41b9f8c7.js",revision:null},{url:"/br_deriv-app-9test/js/core.6808.5eacedc1c0b342951c85.js",revision:null},{url:"/br_deriv-app-9test/js/core.6808.5eacedc1c0b342951c85.js.LICENSE.txt",revision:"05efa0f2ef59b13b6cb1cae8031f1c52"},{url:"/br_deriv-app-9test/js/core.6931.117a55d888a279e6ced1.js",revision:null},{url:"/br_deriv-app-9test/js/core.6931.117a55d888a279e6ced1.js.LICENSE.txt",revision:"c74e4063dd4a8c60ce82963c023a070e"},{url:"/br_deriv-app-9test/js/core.7598.1745d73e5dba619a23d9.js",revision:null},{url:"/br_deriv-app-9test/js/core.7598.1745d73e5dba619a23d9.js.LICENSE.txt",revision:"9048b1757255eadd33395e6e79746ece"},{url:"/br_deriv-app-9test/js/core.8119.91945507c347b1f5a7fa.js",revision:null},{url:"/br_deriv-app-9test/js/core.8119.91945507c347b1f5a7fa.js.LICENSE.txt",revision:"81896c98bac7b5b16ab1d3790da5b937"},{url:"/br_deriv-app-9test/js/core.8605.6d14e83077a53d8790f5.js",revision:null},{url:"/br_deriv-app-9test/js/core.8605.6d14e83077a53d8790f5.js.LICENSE.txt",revision:"0348e5b85f572617cbb6a9a093918ea6"},{url:"/br_deriv-app-9test/js/core.8996.743ad60090347c108e6c.js",revision:null},{url:"/br_deriv-app-9test/js/core.8996.743ad60090347c108e6c.js.LICENSE.txt",revision:"a16bc6da978d0d0e93239b2ef9f7d540"},{url:"/br_deriv-app-9test/js/core.9268.ce412e5723694f42d93c.js",revision:null},{url:"/br_deriv-app-9test/js/core.9268.ce412e5723694f42d93c.js.LICENSE.txt",revision:"b15682cdbb7bf0792ab845871bbf3ba5"},{url:"/br_deriv-app-9test/js/core.9273.6e1e75be95f81432c9b6.js",revision:null},{url:"/br_deriv-app-9test/js/core.9514.4ac7951f856cb52ac113.js",revision:null},{url:"/br_deriv-app-9test/js/core.9514.4ac7951f856cb52ac113.js.LICENSE.txt",revision:"e81688a9cf3aa8a7481b976f81916512"},{url:"/br_deriv-app-9test/js/core.978.9c0af6803752168922fc.js",revision:null},{url:"/br_deriv-app-9test/js/core.978.9c0af6803752168922fc.js.LICENSE.txt",revision:"6fce53c7c7713ebf61712cc2929746fa"},{url:"/br_deriv-app-9test/js/core.account-info.4bea15b880e3830722b0.js",revision:null},{url:"/br_deriv-app-9test/js/core.account-signup-modal.d626d32b7b76818c62bd.js",revision:null},{url:"/br_deriv-app-9test/js/core.account.f4ef6b3e6fcb0a5662a8.js",revision:null},{url:"/br_deriv-app-9test/js/core.appstore.53297461ed82ba7bf1b6.js",revision:null},{url:"/br_deriv-app-9test/js/core.appstore.53297461ed82ba7bf1b6.js.LICENSE.txt",revision:"39fdee89fff9128221072b66d6bc56e0"},{url:"/br_deriv-app-9test/js/core.bot.25c323ffbfc557c45c1a.js",revision:null},{url:"/br_deriv-app-9test/js/core.cashier.6ccba9860e29e3268cf4.js",revision:null},{url:"/br_deriv-app-9test/js/core.close-mx-mlt-account-modal.e427838c7494a0d0f524.js",revision:null},{url:"/br_deriv-app-9test/js/core.complaints-policy.4a4ece4feaedd49451b9.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~07ff1e00.1983e863e987b7fec676.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~182f79bf.4dc548837a0eed690a97.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~1a408eaf.f0f9d2949391531f15ab.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~352d95fa.39d9466dd1ddf864ca09.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~4e43d1b7.8df62d71028e316ea27a.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~66104539.6e0fc5be200812116c54.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~6b4cb1b5.c933badbf06664ece19e.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~703a1da7.0f4aaa24e8e63881603e.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~7e76c2e1.a046f2a2efa2053f4d2e.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~85fa0c87.fc63f82ffd1be9e2e947.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~9a79028c.a99ae692c712ea58fcf0.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~9a8b795a.c9c906e141e992b52ea7.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~a8149675.6b8d7646ef1d8eb8d6e1.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~ba165128.fb356a03d73424a0cec6.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~cb888b8a.35c0165f7a937f7bb242.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~cf448228.ac1fd46de6af16c68931.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~fc854bfa.11c1d0894ab3f3b1340f.js",revision:null},{url:"/br_deriv-app-9test/js/core.main~fd2ee733.bf04403ee43646d59937.js",revision:null},{url:"/br_deriv-app-9test/js/core.reality-check-modal.fbd8fcc5951d4e78e04d.js",revision:null},{url:"/br_deriv-app-9test/js/core.reset-or-unlink-password-modal.b1200aafa6fa45ada20a.js",revision:null},{url:"/br_deriv-app-9test/js/core.reset-password-modal.927f730c2aa095ee7abd.js",revision:null},{url:"/br_deriv-app-9test/js/core.set-residence-modal.640db7b9c641ce5dfa9a.js",revision:null},{url:"/br_deriv-app-9test/js/core.settings-language.d9324e8b4714b34bcff1.js",revision:null},{url:"/br_deriv-app-9test/js/core.settings-theme.473c7218b4abfef19789.js",revision:null},{url:"/br_deriv-app-9test/js/core.trader~3b8e11e6.97e8153a43666cab10e5.js",revision:null},{url:"/br_deriv-app-9test/js/core.trader~bde52cb3.b546607e8166db62082d.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~5c04ba06.ca50fecc03c715c86154.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~734a261b.ab0264b6122796cc2d45.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~7a15df7a.1148c07d5ef559dcade5.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~9624755f.c5cd908fbddcce3a59f3.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~b407d6a8.376d98c6063f53246128.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~e0489f8e.beb71cdec2e3a2f2dee1.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~f0b1ccd8.bf549a7a37a47847801b.js",revision:null},{url:"/br_deriv-app-9test/js/core.welcome-modal~f53eb8c1.76bbf476adad99f13916.js",revision:null},{url:"/br_deriv-app-9test/public/images/app/header/dbot-logo.svg",revision:"74dd603772623201c277552d07db9dea"},{url:"/br_deriv-app-9test/public/images/app/header/dmt5-logo.svg",revision:"bb9d72a69387257a410f35d42763287d"},{url:"/br_deriv-app-9test/public/images/app/header/dtrader-logo.svg",revision:"e0d36a7365f13540be65f2ba83781f83"},{url:"/br_deriv-app-9test/public/images/common/404.png",revision:"b2fd89fd64d75b5b75bb7e75f2bb9029"},{url:"/br_deriv-app-9test/public/images/common/close_account_banner.png",revision:"47457964f57828ac882a49dcd4009a1d"},{url:"/br_deriv-app-9test/public/images/common/derivgo_banner.png",revision:"cfa6bac9d229ecf1a60adcf0f9c283f9"},{url:"/br_deriv-app-9test/public/images/common/dp2p_banner.png",revision:"efbd723ab548be783bb6411d18cf168a"},{url:"/br_deriv-app-9test/public/images/common/ke_alien_card.png",revision:"8fc3d3345db92d1333e59a72ba5be769"},{url:"/br_deriv-app-9test/public/images/common/ke_national_identity_card.png",revision:"3d54bcbb6a019c272e28b15601774a2a"},{url:"/br_deriv-app-9test/public/images/common/ke_passport.png",revision:"d111da0604e97583feb278a206c8c5c3"},{url:"/br_deriv-app-9test/public/images/common/logos/platform_logos/ic_platform_deriv_192x192.png",revision:"8b90a2d122bd63b19b2987d8fca2c75d"},{url:"/br_deriv-app-9test/public/images/common/logos/platform_logos/ic_platform_deriv_512x512.png",revision:"cc6cdd9391b053108005c72f5dcc3a57"},{url:"/br_deriv-app-9test/public/images/common/ng_drivers_license.png",revision:"ad0c31da5da08e640308d2ea3447b681"},{url:"/br_deriv-app-9test/public/images/common/ng_nin_slip.png",revision:"d743586bddc5ddd91e0bb820f0718597"},{url:"/br_deriv-app-9test/public/images/common/ng_voter_id.png",revision:"47f0de9fd4bf1da1b9bda784889d7fd0"},{url:"/br_deriv-app-9test/public/images/common/trustpilot_banner.png",revision:"1561d90dfa4e20595ff9a3c4b3b8e239"},{url:"/br_deriv-app-9test/public/images/common/welcome-bg-blue.b45a36e7985e837390d4dbec26bf1dce.svg",revision:null},{url:"/br_deriv-app-9test/public/images/common/welcome-bg-red.439aaf362ccc377e019dedcb7ddc34e0.svg",revision:null},{url:"/br_deriv-app-9test/public/images/common/za_national_identity_card.png",revision:"48c0447163401fe1d2705072a7f1c9e8"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-114.png",revision:"effff3cb7c7aa7890a0f613252d40b8c"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-120.png",revision:"30ea8aae4db71e707571a615a1207462"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-144.png",revision:"1fbf7ddfba9aa060af026c6856ffec44"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-152.png",revision:"816388a881453a30d4c2b2711fa05e64"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-180.png",revision:"a8db9d4eb2e09a4357ecd6a87a1dd6d9"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-57.png",revision:"535f09e679b29d21c3c5b9d6447d2585"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-60.png",revision:"56a21b5a2b088cbcf26912c17061b612"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-72.png",revision:"6786ed4ef1e2e96e3d4edebc3be12fd5"},{url:"/br_deriv-app-9test/public/images/favicons/apple-touch-icon-76.png",revision:"796a1bbc9a1a6ebdf0a002af495f9233"},{url:"/br_deriv-app-9test/public/images/favicons/favicon-16.png",revision:"8cf977893d6011fc63021bb7ce461544"},{url:"/br_deriv-app-9test/public/images/favicons/favicon-160.png",revision:"45fe97d84d1923f3e05626ea79971262"},{url:"/br_deriv-app-9test/public/images/favicons/favicon-192.png",revision:"3975b58ec899147249328917c81a90f4"},{url:"/br_deriv-app-9test/public/images/favicons/favicon-32.png",revision:"5bf792f88750e72e5e5ed56fc96c6efb"},{url:"/br_deriv-app-9test/public/images/favicons/favicon-96.png",revision:"bbaa020b9ae1944f52a684c311edda66"},{url:"/br_deriv-app-9test/public/images/favicons/favicon.ico",revision:"0cb8c9c65c9adde7eec4f6f79e2f4076"},{url:"/br_deriv-app-9test/public/sprites/brand.b3f15ed36d0d2db95a0646380655b7a2.svg",revision:"20ad1e2992e66ccbba6c61f2e9079be0"},{url:"/br_deriv-app-9test/public/sprites/cashier.b5226ef15b8e336be02e934751407c05.svg",revision:"b2a0489285f8c5265f87024f6b7983fe"},{url:"/br_deriv-app-9test/public/sprites/common.9156656266985d789c31b4e6e7246117.svg",revision:"db989c8e386539b9b1ed3f1612e5268f"},{url:"/br_deriv-app-9test/public/sprites/contract.1ca5743a5b5f7fd7201608c9301cc540.svg",revision:"b505df6ba2e73a30257f3ccb7e1af7e1"},{url:"/br_deriv-app-9test/public/sprites/currency.bb01e214db4460f58372ecb28c62765e.svg",revision:"3955f98d0403f371acffa892627a39c6"},{url:"/br_deriv-app-9test/public/sprites/dxtrade.3a8eee97254a48a1ca9cff7ba17491c8.svg",revision:"177fb07c55e16c9e2f392e73fca70a89"},{url:"/br_deriv-app-9test/public/sprites/flag.2679f4a3231842793a9c71fec07e0f8b.svg",revision:"0b6be63adf18362585e1f439d7d20bae"},{url:"/br_deriv-app-9test/public/sprites/mt5.9eefdebfceac37a07bc45349dfcb533f.svg",revision:"c7c45ecc8d96bafbcd71b31389e3d078"},{url:"/br_deriv-app-9test/public/sprites/option.3971bb040600e58a1e30dc008551a163.svg",revision:"be90e5e9d25a16c5ebabf8c6b698dd57"},{url:"/br_deriv-app-9test/public/sprites/stock.1a672b1203ae2066f107a58ffb137c9c.svg",revision:"d8505022d6f871323ddb92c18208246a"},{url:"/br_deriv-app-9test/public/sprites/tradetype.b9ed31953cc8da3d84bafb6f5e62ee3b.svg",revision:"04d969ea5b62d0ad45915b5ace954021"},{url:"/br_deriv-app-9test/public/sprites/underlying.2c20ddec26f1393de401939ec8967e1c.svg",revision:"5d71ad1dad2983330f5f2e0202f27c14"},{url:"/br_deriv-app-9test/public/sprites/wallet.04e5a96d8a64d80ba390218d17c0a487.svg",revision:"a385d07b496daa519f7d61ca8cda77df"}],{}),e.cleanupOutdatedCaches()}));
