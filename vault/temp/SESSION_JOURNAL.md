# SESSION_JOURNAL.md (rotated - earlier entries trimmed)

08-03 20:47:49.818Z load
- url: http://localhost:3002/
- title: Avante Lingerie | Oficial

## 2026-08-03 20:47:50.645Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 223

## 2026-08-03 20:47:50.646Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:47:50.650Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:48:04.930Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-03 20:48:05.770Z load
- url: http://localhost:3002/admin
- title: Avante Lingerie | Oficial

## 2026-08-03 20:48:07.724Z navigate
- url: http://localhost:3002/admin
- via: replaceState

## 2026-08-03 20:48:10.616Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 1446

## 2026-08-03 20:48:10.618Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:48:10.633Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:48:10.637Z navigate
- url: http://localhost:3002/admin/login
- via: replaceState

## 2026-08-03 20:48:10.734Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin/login","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 53

## 2026-08-03 20:48:10.734Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:48:10.735Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:48:15.431Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-03 20:48:15.581Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-03 20:48:27.257Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-03 20:48:27.259Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-03 20:48:27.262Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-03 20:48:33.065Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-03 20:48:33.065Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-03 20:48:33.280Z click
- element: {"tag":"button","role":null,"ariaLabel":"Mostrar senha","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-03 20:48:34.159Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-03 20:48:34.166Z submit
- action: http://localhost:3002/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"text","value":"Admin@123456","length":12,"redacted":false},{"label":"Ocultar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-03 20:48:34.374Z navigate
- url: http://localhost:3002/admin
- via: pushState

## 2026-08-03 20:48:34.481Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 65

## 2026-08-03 20:48:34.481Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:48:34.482Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:49:01.845Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cérebro da Lia"}

## 2026-08-03 20:49:01.848Z navigate
- url: http://localhost:3002/admin/lia
- via: pushState

## 2026-08-03 20:49:01.935Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin/lia","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 35

## 2026-08-03 20:49:01.936Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:49:01.936Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:49:08.339Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:r3:-trigger-whatsapp","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conexão WhatsApp"}

## 2026-08-03 20:49:10.819Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:r3:-trigger-chats","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Chats Ao Vivo"}

## 2026-08-03 20:49:14.086Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Integrações"}

## 2026-08-03 20:49:14.087Z navigate
- url: http://localhost:3002/admin/integracoes
- via: pushState

## 2026-08-03 20:49:14.120Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin/integracoes","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 17

## 2026-08-03 20:49:14.121Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:49:14.122Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:49:16.426Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-08-03 20:49:16.428Z navigate
- url: http://localhost:3002/admin/analytics
- via: pushState

## 2026-08-03 20:49:16.468Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin/analytics","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 19

## 2026-08-03 20:49:16.469Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:49:16.469Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 20:49:16.547Z network.error
- method: GET
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records?page=1&perPage=500&skipTotal=1&sort=-created
- status: 404
- statusText: Not Found
- response: 
    {"data":{},"message":"Missing collection context.","status":404}
    
- durationMs: 16

## 2026-08-03 20:49:16.547Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records?page=1&perPage=500&skipTotal=1&sort=-created: {"data":{},"message":"Missing collection context.","status":404}
    

## 2026-08-03 20:49:16.550Z console.warn
- text: 
    Tabelas do PocketBase não povoadas, utilizando dados locais. ClientResponseError 404: ClientResponseError
        at http://localhost:3002/node_modules/.vite/deps/pocketbase.js?v=bd935190:948:13
        at async fetchAnalyticsData (http://localhost:3002/src/pages/admin/AnalyticsPage.jsx?t=1785779158436:107:18)

## 2026-08-03 20:50:05.561Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-08-03 20:50:05.577Z navigate
- url: http://localhost:3002/admin
- via: pushState

## 2026-08-03 20:50:05.857Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 208

## 2026-08-03 20:50:05.868Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 20:50:05.895Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:03:56.769Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-03 21:03:56.809Z navigate
- url: http://localhost:3002/
- via: pushState

## 2026-08-03 21:03:57.873Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 376

## 2026-08-03 21:03:57.987Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 21:03:58.013Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:04:02.739Z navigate
- url: http://localhost:3002/admin
- via: popstate

## 2026-08-03 21:04:02.858Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 57

## 2026-08-03 21:04:02.858Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 21:04:02.860Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:04:05.825Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-03 21:04:05.826Z navigate
- url: http://localhost:3002/
- via: pushState

## 2026-08-03 21:04:06.095Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 163

## 2026-08-03 21:04:06.170Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 21:04:06.187Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:04:32.715Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-03 21:04:51.182Z navigate
- url: http://localhost:3002/admin
- via: popstate

## 2026-08-03 21:04:52.265Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 715

## 2026-08-03 21:04:52.266Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 21:04:52.271Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:04:54.210Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-03 21:04:54.236Z navigate
- url: http://localhost:3002/admin/categorias
- via: pushState

## 2026-08-03 21:04:54.304Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/admin/categorias","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 39

## 2026-08-03 21:04:54.304Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 21:04:54.304Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:05:01.299Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-03 21:05:01.301Z navigate
- url: http://localhost:3002/
- via: pushState

## 2026-08-03 21:05:02.139Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_im7cu8djl4fmsdos2x9","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 489

## 2026-08-03 21:05:02.300Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-03 21:05:02.317Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-03 21:08:05.051Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Lia | Consultora AvanteOnline"}

## 2026-08-04 12:08:45.372Z load
- url: http://localhost:3002/
- title: Avante Lingerie | Oficial

## 2026-08-04 12:08:45.949Z navigate
- url: http://localhost:3002/
- via: replaceState

## 2026-08-04 12:08:46.175Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 181

## 2026-08-04 12:08:46.176Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:08:46.179Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:08:49.366Z load
- url: http://localhost:3002/admin
- title: Avante Lingerie | Oficial

## 2026-08-04 12:08:49.825Z navigate
- url: http://localhost:3002/admin
- via: replaceState

## 2026-08-04 12:08:49.859Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 25

## 2026-08-04 12:08:49.860Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:08:49.861Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:08:51.672Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-08-04 12:08:51.674Z navigate
- url: http://localhost:3002/admin/analytics
- via: pushState

## 2026-08-04 12:08:51.707Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/admin/analytics","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 14

## 2026-08-04 12:08:51.707Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:08:51.708Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:08:51.758Z network.error
- method: GET
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records?page=1&perPage=500&skipTotal=1&sort=-created
- status: 404
- statusText: Not Found
- response: 
    {"data":{},"message":"Missing collection context.","status":404}
    
- durationMs: 12

## 2026-08-04 12:08:51.758Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records?page=1&perPage=500&skipTotal=1&sort=-created: {"data":{},"message":"Missing collection context.","status":404}
    

## 2026-08-04 12:08:51.760Z console.warn
- text: 
    Tabelas do PocketBase não povoadas, utilizando dados locais. ClientResponseError 404: ClientResponseError
        at http://localhost:3002/node_modules/.vite/deps/pocketbase.js?v=bd935190:948:13
        at async fetchAnalyticsData (http://localhost:3002/src/pages/admin/AnalyticsPage.jsx?t=1785779158436:107:18)

## 2026-08-04 12:09:21.790Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Demografia (GA4)"}

## 2026-08-04 12:17:56.208Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Desempenho Geral"}

## 2026-08-04 12:23:38.484Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-04 12:23:38.504Z navigate
- url: http://localhost:3002/
- via: pushState

## 2026-08-04 12:23:39.225Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 288

## 2026-08-04 12:23:39.300Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:23:39.324Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:24:00.176Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-04 12:25:41.081Z navigate
- url: http://localhost:3002/admin/analytics
- via: popstate

## 2026-08-04 12:25:41.792Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/admin/analytics","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 360

## 2026-08-04 12:25:41.795Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:25:41.800Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:25:41.938Z network.error
- method: GET
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records?page=1&perPage=500&skipTotal=1&sort=-created
- status: 404
- statusText: Not Found
- response: 
    {"data":{},"message":"Missing collection context.","status":404}
    
- durationMs: 37

## 2026-08-04 12:25:41.941Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records?page=1&perPage=500&skipTotal=1&sort=-created: {"data":{},"message":"Missing collection context.","status":404}
    

## 2026-08-04 12:25:41.945Z console.warn
- text: 
    Tabelas do PocketBase não povoadas, utilizando dados locais. ClientResponseError 404: ClientResponseError
        at http://localhost:3002/node_modules/.vite/deps/pocketbase.js?v=bd935190:948:13
        at async fetchAnalyticsData (http://localhost:3002/src/pages/admin/AnalyticsPage.jsx?t=1785779158436:107:18)

## 2026-08-04 12:25:44.775Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-04 12:25:44.778Z navigate
- url: http://localhost:3002/admin/categorias
- via: pushState

## 2026-08-04 12:25:44.833Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/admin/categorias","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 15

## 2026-08-04 12:25:44.833Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:25:44.834Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:25:52.125Z click
- element: {"tag":"main","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CategoriasOrganize seus produtos por seções. Nova CategoriaNome da CategoriaURL (Slug)NCM (Fiscal)StatusAçõesCamisolacamisola6208.21.00AtivoCinta Modeladoracinta-modeladora6212.20.00AtivoCroppedcropped6109.90.00AtivoBodybody6114.30.00AtivoConjuntoconjunto6212.10.00AtivoCalcinhacalcinha6212.20.00AtivoPijamapijama6208.21.00AtivoPlus Sizeplus-size6109.90.00Ativo"}

## 2026-08-04 12:30:16.957Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-04 12:30:16.977Z navigate
- url: http://localhost:3002/
- via: pushState

## 2026-08-04 12:30:17.631Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 282

## 2026-08-04 12:30:17.723Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:30:17.746Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 12:30:23.800Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Calcinhas"}

## 2026-08-04 12:30:23.800Z navigate
- url: http://localhost:3002/categoria/calcinhas
- via: pushState

## 2026-08-04 12:30:23.914Z network.error
- method: POST
- url: http://localhost:3002/hcgi/platform/api/collections/analytics_events/records
- status: 404
- statusText: Not Found
- requestBody: {"session_id":"sess_015y1esp0xunkmsem74iw","event_type":"page_view","page_path":"/categoria/calcinhas","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- response: 
    {"data":{},"message":"Missing or invalid collection context.","status":404}
    
- durationMs: 38

## 2026-08-04 12:30:23.915Z console.error
- text: 
    Fetch error from http://localhost:3002/hcgi/platform/api/collections/analytics_events/records: {"data":{},"message":"Missing or invalid collection context.","status":404}
    

## 2026-08-04 12:30:23.920Z console.warn
- text: Analytics Tracking Ignore: Missing or invalid collection context.

## 2026-08-04 13:04:23.293Z load
- url: http://localhost:3002/categoria/calcinhas
- title: Avante Lingerie | Oficial

## 2026-08-04 14:54:14.588Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-04 14:54:25.391Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-04 14:54:26.197Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-04 14:54:28.322Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 887

## 2026-08-04 14:54:28.322Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 888

## 2026-08-04 14:54:28.328Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.334Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.349Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 914

## 2026-08-04 14:54:28.349Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.350Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%228nbgczjmayz4g8f%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 915

## 2026-08-04 14:54:28.350Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%228nbgczjmayz4g8f%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.362Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 926

## 2026-08-04 14:54:28.362Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.366Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 930

## 2026-08-04 14:54:28.366Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.376Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 940

## 2026-08-04 14:54:28.377Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:54:28.377Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 940

## 2026-08-04 14:54:28.378Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:05.831Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-04 14:55:06.554Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-04 14:55:07.989Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 231

## 2026-08-04 14:55:07.991Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:07.999Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 242

## 2026-08-04 14:55:07.999Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:08.134Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 375

## 2026-08-04 14:55:08.134Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:08.144Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 385

## 2026-08-04 14:55:08.145Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:08.156Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%228nbgczjmayz4g8f%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 398

## 2026-08-04 14:55:08.156Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%228nbgczjmayz4g8f%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:08.496Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 735

## 2026-08-04 14:55:08.497Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:08.525Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 765

## 2026-08-04 14:55:08.525Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:08.557Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 797

## 2026-08-04 14:55:08.559Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:31.230Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-04 14:55:32.120Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-04 14:55:32.897Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-04 14:55:39.017Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-04 14:55:39.865Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-04 14:55:41.238Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 43

## 2026-08-04 14:55:41.240Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.247Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%228nbgczjmayz4g8f%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 52

## 2026-08-04 14:55:41.249Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%228nbgczjmayz4g8f%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.250Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 55

## 2026-08-04 14:55:41.251Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.258Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 62

## 2026-08-04 14:55:41.259Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.259Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 63

## 2026-08-04 14:55:41.260Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.266Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 70

## 2026-08-04 14:55:41.266Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.287Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 91

## 2026-08-04 14:55:41.288Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:55:41.296Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 100

## 2026-08-04 14:55:41.297Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:57:33.792Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-04 14:57:34.783Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-04 14:57:35.238Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-04 14:57:36.745Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-04 14:57:36.962Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-04 14:57:48.025Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-04 14:57:48.026Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-04 14:57:48.028Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-04 14:57:48.244Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-04 14:57:53.827Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-04 14:57:53.827Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-04 14:57:54.062Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-04 14:57:54.069Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-04 14:57:54.284Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-04 14:57:59.011Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-04 14:57:59.014Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-04 14:58:08.179Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-04 14:59:23.462Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-04 14:59:28.683Z load
- url: http://localhost:3000/admin/categorias
- title: Avante Lingerie | Oficial

## 2026-08-04 14:59:38.603Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-04 14:59:40.398Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 129

## 2026-08-04 14:59:40.399Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 128

## 2026-08-04 14:59:40.410Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:59:40.414Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:59:40.415Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 144

## 2026-08-04 14:59:40.420Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:59:40.423Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 147

## 2026-08-04 14:59:40.423Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 147

## 2026-08-04 14:59:40.425Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:59:40.426Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:59:40.426Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 153

## 2026-08-04 14:59:40.427Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 150

## 2026-08-04 14:59:40.444Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 14:59:40.445Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:05.652Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-04 15:00:29.684Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Nova Categoria"}

## 2026-08-04 15:00:30.811Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lingerie Renda","label":"Ex: Lingerie Renda","value":"","valueLength":0,"text":""}

## 2026-08-04 15:00:31.023Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lingerie Renda","label":"Ex: Lingerie Renda","value":"","valueLength":0,"text":""}

## 2026-08-04 15:00:36.345Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lingerie Renda","label":"Ex: Lingerie Renda","value":"Camisola","valueLength":8,"text":""}

## 2026-08-04 15:00:36.345Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lingerie Renda","label":"Ex: Lingerie Renda","value":"Camisola","valueLength":8,"text":""}

## 2026-08-04 15:00:36.554Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-04 15:00:38.913Z click
- element: {"tag":"main","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CategoriasOrganize seus produtos por seções. Nova CategoriaNome da CategoriaURL (Slug)NCM (Fiscal)StatusAçõesCamisolacamisola6208.21.00AtivoCinta Modeladoracinta-modeladora6212.20.00AtivoCroppedcropped6109.90.00AtivoBodybody6114.30.00AtivoConjuntoconjunto6212.10.00AtivoCalcinhacalcinha6212.20.00AtivoPijamapijama6208.21.00AtivoPlus Sizeplus-size6109.90.00Ativo"}

## 2026-08-04 15:00:40.839Z load
- url: http://localhost:3000/admin/categorias
- title: Avante Lingerie | Oficial

## 2026-08-04 15:00:46.359Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-04 15:00:47.696Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 95

## 2026-08-04 15:00:47.696Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 97

## 2026-08-04 15:00:47.715Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 113

## 2026-08-04 15:00:47.716Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.723Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.731Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 130

## 2026-08-04 15:00:47.731Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.747Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 143

## 2026-08-04 15:00:47.748Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.758Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 153

## 2026-08-04 15:00:47.765Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.765Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 160

## 2026-08-04 15:00:47.766Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 161

## 2026-08-04 15:00:47.787Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.797Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-04 15:00:47.797Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:33:56.059Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-07 17:34:04.057Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-07 17:34:05.266Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 226

## 2026-08-07 17:34:05.266Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 226

## 2026-08-07 17:34:05.267Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.272Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.283Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 243

## 2026-08-07 17:34:05.283Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 243

## 2026-08-07 17:34:05.284Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.285Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.285Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 244

## 2026-08-07 17:34:05.285Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 244

## 2026-08-07 17:34:05.286Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.286Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 244

## 2026-08-07 17:34:05.286Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.286Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:05.297Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 256

## 2026-08-07 17:34:05.298Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 17:34:14.143Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-07 17:34:14.490Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-07 17:34:14.595Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-07 17:34:16.137Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-07 17:34:16.341Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-07 17:34:26.485Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-07 17:34:26.486Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-07 17:34:26.491Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-07 17:34:31.742Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-07 17:34:31.742Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-07 17:34:31.969Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-07 17:34:31.974Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-07 17:34:32.119Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-07 17:34:38.620Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-07 17:34:38.622Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-07 17:34:40.318Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Novo Produto"}

## 2026-08-07 17:34:40.319Z navigate
- url: http://localhost:3000/admin/produtos/novo
- via: pushState

## 2026-08-07 17:34:46.133Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-07 17:34:46.135Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-07 17:34:58.264Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:34:58.468Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:43.409Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-07 17:35:43.426Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-07 17:35:43.427Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:43.631Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:47.971Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-07 17:35:47.971Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-07 17:35:47.975Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:48.182Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:50.684Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-07 17:35:50.685Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-07 17:35:50.685Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:50.900Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:55.719Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Marinho","valueLength":12,"text":""}

## 2026-08-07 17:35:55.719Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Marinho","valueLength":12,"text":""}

## 2026-08-07 17:35:55.720Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:55.931Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:58.138Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-07 17:35:58.138Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-07 17:35:58.138Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:35:58.356Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:36:03.396Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-07 17:36:03.396Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-07 17:36:03.397Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:36:03.613Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:36:06.339Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marron","valueLength":6,"text":""}

## 2026-08-07 17:36:06.355Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marron","valueLength":6,"text":""}

## 2026-08-07 17:36:06.356Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:36:06.548Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 17:36:15.512Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:36:15.513Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:38:55.280Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:38:58.563Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:43:11.158Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:43:20.224Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:43:23.609Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:43:25.011Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:47:25.961Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:47:27.728Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:50:22.099Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:50:23.866Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:50:31.510Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:50:33.424Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 17:50:33.427Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-07 17:50:33.637Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-07 17:50:35.471Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-07 17:50:35.472Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-07 17:50:35.477Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 17:50:35.686Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 17:50:37.343Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 17:50:37.351Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 17:50:43.275Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 17:50:43.278Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-07 17:50:43.489Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-07 17:50:55.034Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-07 17:50:55.034Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-07 17:50:55.035Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 17:50:55.254Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 17:50:56.752Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 17:50:56.756Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 17:50:58.016Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 17:50:58.222Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar Automático"}

## 2026-08-07 17:51:01.805Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 17:51:01.816Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 17:51:02.903Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 17:51:02.909Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 17:51:04.170Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ofertas Exclusivas"}

## 2026-08-07 17:51:05.054Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 17:51:05.061Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 17:51:06.086Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 17:51:06.092Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 17:51:07.143Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:07.385Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:09.184Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-07 17:51:09.184Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-07 17:51:09.186Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:11.333Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-07 17:51:11.333Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-07 17:51:11.360Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:15.023Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-07 17:51:15.023Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-07 17:51:15.031Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:18.030Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-07 17:51:18.031Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-07 17:51:18.032Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:18.747Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-07 17:51:18.747Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-07 17:51:18.748Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:24.099Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-07 17:51:24.099Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-07 17:51:24.101Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:30.265Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-07 17:51:30.265Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-07 17:51:30.469Z click
- element: {"tag":"main","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Novo Produto Cancelar SalvarInformações BásicasNome do Produto *Categoria *Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus SizeReferência / Código Interno * Gerar AutomáticoStatus de ExibiçãoDeixe inativo para esconder o produto na loja.Destaques e Vitrines na HomeLançamentos RecentesOfertas ExclusivasMais Vendidos da AvanteDestaques de OuroPreço e LogísticaPreço de Venda Varejo (R$) *Preço de Atacado B2B (R$)Peso (g)Altura (cm)Largura (cm)Profundidade (cm)Variações do ProdutoInforme os atributos e valores padrões abaixo para gerar todas as variações.Estoque Total: 0 unTamanhos (ex: P, M, G, GG)Cores (ex: Preto, Romance, Chocolate)Estoque PadrãoPreço Varejo Padrão (R$)Preço Atacado Padrão (R$)Gerar VariaçõesCorTamanhoSKUImagem / FotoEstoquePreço Varejo (R$)Preço Atacado (R$)StatusAçõesNenhuma variação adicionada ainda. Digite tamanhos e cores na linha acima para gerar a lista!Descrições Detalhadas em Abas Assistente de Descrições IAGeralTecidoModelagemCuidadosDiferenciaisCompra SeguraDescrição GeralMídias e Fotos Adicionar Fotos/VídeosCapaVersoCapaVersoCapaVersoCapaVersoCapaVersoCapaVersoCapaVersoCapaVersoVídeo Externo (YouTube/Vimeo/MP4)Para evitar lentidão e travamentos, cole o link do seu vídeo hospedado externamente.Exibir no FinalExibir como Primeira"}

## 2026-08-07 17:51:33.363Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:33.583Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-07 17:51:53.375Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:51:53.375Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:51:59.057Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:00.456Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:03.881Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:05.928Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:06.179Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:14.963Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:18.569Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:52:20.171Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:56:50.518Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:57:49.245Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:58:29.828Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar,","valueLength":14,"text":""}

## 2026-08-07 17:58:32.288Z load
- url: http://localhost:3000/admin/produtos/novo
- title: Avante Lingerie | Oficial

## 2026-08-07 17:58:48.375Z load
- url: http://localhost:3000/admin/produtos/novo
- title: Avante Lingerie | Oficial

## 2026-08-07 17:58:50.781Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-07 17:58:50.787Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-07 18:02:17.348Z load
- url: http://localhost:3000/admin/produtos/novo
- title: Avante Lingerie | Oficial

## 2026-08-07 18:02:25.321Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-07 18:02:25.339Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-07 18:02:38.446Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:02:38.652Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:07.766Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:11.202Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:15.951Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-07 18:03:15.952Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-07 18:03:15.953Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:16.169Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:18.544Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-07 18:03:18.544Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-07 18:03:18.544Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:18.764Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:21.216Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-07 18:03:21.216Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-07 18:03:21.216Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:21.431Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:32.266Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Marinho","valueLength":12,"text":""}

## 2026-08-07 18:03:32.266Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Marinho","valueLength":12,"text":""}

## 2026-08-07 18:03:32.267Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:32.497Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:35.541Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-07 18:03:35.542Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-07 18:03:35.542Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:35.765Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:45.008Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-07 18:03:45.009Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-07 18:03:45.247Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-07 18:03:49.136Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-07 18:03:49.138Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:49.349Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:58.352Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-07 18:03:58.353Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-07 18:03:58.353Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:03:58.564Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-07 18:04:13.722Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 18:04:13.723Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 18:04:16.971Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 18:04:17.003Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-07 18:04:17.165Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CapaVersoCapaVersoCapaVersoCapaVersoCapaVersoCapaVersoCapaVersoCapaVerso"}

## 2026-08-07 18:04:23.017Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-07 18:04:23.230Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-07 18:04:24.848Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-07 18:04:24.850Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-07 18:04:24.855Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 18:04:25.059Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 18:04:26.766Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 18:04:26.776Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 18:04:29.290Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-07 18:04:29.499Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:04:29.515Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:04:30.548Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:04:30.570Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:04:31.647Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:04:31.650Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:04:32.492Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:04:32.497Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:04:34.729Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-07 18:04:34.945Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-07 18:04:54.613Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-07 18:04:54.613Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-07 18:04:54.614Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 18:04:54.828Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 18:04:56.227Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 18:04:56.232Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 18:04:57.200Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-07 18:04:57.412Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar Automático"}

## 2026-08-07 18:05:02.474Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:02.697Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:04.314Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-07 18:05:04.315Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-07 18:05:04.317Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:06.128Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-07 18:05:06.128Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-07 18:05:06.133Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:08.600Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-07 18:05:08.601Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-07 18:05:08.612Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:10.295Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-07 18:05:10.296Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-07 18:05:10.297Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:11.776Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-07 18:05:11.776Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-07 18:05:11.778Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:13.143Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-07 18:05:13.143Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-07 18:05:13.148Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:36.952Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-07 18:05:36.952Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-07 18:05:36.953Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:05:37.162Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:06:04.251Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho, Azul-Marinho, Bege, Branca, Marrom, Cinza","valueLength":70,"text":""}

## 2026-08-07 18:06:04.251Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho, Azul-Marinho, Bege, Branca, Marrom, Cinza","valueLength":70,"text":""}

## 2026-08-07 18:06:04.261Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-07 18:06:04.463Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-07 18:06:05.350Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-07 18:06:05.351Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-07 18:06:05.353Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-07 18:06:08.649Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-07 18:06:08.649Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-07 18:06:08.660Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-07 18:06:13.547Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-07 18:06:13.547Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-07 18:06:13.758Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-07 18:06:19.709Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Assistente de Descrições IA"}

## 2026-08-07 18:06:19.775Z console.warn
- text: Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.

## 2026-08-07 18:06:19.821Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-07 18:06:23.025Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-07 18:06:32.249Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-07 18:06:32.262Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-07 18:06:33.577Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-07 18:06:33.578Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-07 18:06:33.790Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-07 18:06:34.887Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-07 18:06:34.903Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-07 18:06:36.337Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-07 18:06:36.338Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:06:36.558Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:06:36.575Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:06:37.393Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-07 18:06:37.607Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar com Gemini AI"}

## 2026-08-07 18:06:52.708Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Compra Segura"}

## 2026-08-07 18:06:53.691Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Diferenciais"}

## 2026-08-07 18:06:55.071Z focus
- element: {"tag":"textarea","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[textarea]","value":"✨ Os detalhes que tornam este cropped uma peça verdadeiramente exclusiva no mercado:\n✓ Forro 100% Algodão Hipoalergênico: proteção de nível superior e suavidade extra para a sua pele.\n✓ Versatilidade Premium: transita perfeitamente entre o conforto da moda íntima e o estilo de um look casual chique.\n✓ Acabamento de Alta Costura: costuras embutidas que eliminam marcas sob a roupa e evitam atritos indesejados.","valueLength":411,"text":"✨ Os detalhes que tornam este cropped uma peça verdadeiramente exclusiva no mercado:\n✓ Forro 100% Algodão Hipoalergênico: proteção de nível superior e suavidade extra para a sua pele.\n✓ Versatilidade Premium: transita perfeitamente entre o conforto da moda íntima e o estilo de um look casual chique.\n✓ Acabamento de Alta Costura: costuras embutidas que eliminam marcas sob a roupa e evitam atritos indesejados."}

## 2026-08-07 18:06:56.738Z blur
- element: {"tag":"textarea","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[textarea]","value":"✨ Os detalhes que tornam este cropped uma peça verdadeiramente exclusiva no mercado:\n✓ Forro 100% Algodão Hipoalergênico: proteção de nível superior e suavidade extra para a sua pele.\n✓ Versatilidade Premium: transita perfeitamente entre o conforto da moda íntima e o estilo de um look casual chique.\n✓ Acabamento de Alta Costura: costuras embutidas que eliminam marcas sob a roupa e evitam atritos indesejados.","valueLength":411,"text":"✨ Os detalhes que tornam este cropped uma peça verdadeiramente exclusiva no mercado:\n✓ Forro 100% Algodão Hipoalergênico: proteção de nível superior e suavidade extra para a sua pele.\n✓ Versatilidade Premium: transita perfeitamente entre o conforto da moda íntima e o estilo de um look casual chique.\n✓ Acabamento de Alta Costura: costuras embutidas que eliminam marcas sob a roupa e evitam atritos indesejados."}

## 2026-08-07 18:06:56.956Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cuidados"}

## 2026-08-07 18:06:58.257Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Modelagem"}

## 2026-08-07 18:07:00.366Z focus
- element: {"tag":"textarea","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[textarea]","value":"👑 Com uma modelagem anatômica impecável, o cropped abraça suas curvas com suavidade, garantindo excelente sustentação e caimento perfeito.\n📏 Sua gola alta valoriza o colo com elegância, sendo ideal para combinar com um conjunto de lingerie confortável ou usar como peça principal.\n✨ Recomendamos consultar nossa tabela de medidas para escolher o tamanho perfeito e garantir o caimento ideal.","valueLength":393,"text":"👑 Com uma modelagem anatômica impecável, o cropped abraça suas curvas com suavidade, garantindo excelente sustentação e caimento perfeito.\n📏 Sua gola alta valoriza o colo com elegância, sendo ideal para combinar com um conjunto de lingerie confortável ou usar como peça principal.\n✨ Recomendamos consultar nossa tabela de medidas para escolher o tamanho perfeito e garantir o caimento ideal."}

## 2026-08-07 18:07:02.314Z blur
- element: {"tag":"textarea","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[textarea]","value":"👑 Com uma modelagem anatômica impecável, o cropped abraça suas curvas com suavidade, garantindo excelente sustentação e caimento perfeito.\n📏 Sua gola alta valoriza o colo com elegância, sendo ideal para combinar com um conjunto de lingerie confortável ou usar como peça principal.\n✨ Recomendamos consultar nossa tabela de medidas para escolher o tamanho perfeito e garantir o caimento ideal.","valueLength":393,"text":"👑 Com uma modelagem anatômica impecável, o cropped abraça suas curvas com suavidade, garantindo excelente sustentação e caimento perfeito.\n📏 Sua gola alta valoriza o colo com elegância, sendo ideal para combinar com um conjunto de lingerie confortável ou usar como peça principal.\n✨ Recomendamos consultar nossa tabela de medidas para escolher o tamanho perfeito e garantir o caimento ideal."}

## 2026-08-07 18:07:02.538Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Geral"}

## 2026-08-07 18:07:03.490Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Tecido"}

## 2026-08-07 18:07:13.272Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-07 18:07:13.286Z submit
- action: http://localhost:3000/admin/produtos/novo
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Cropped Regata Gola Alta","length":24,"redacted":false},{"label":"[select]","type":"select-one","value":"okqcy3xzr7pff8b","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-CRO-1081","length":12,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"29.90","length":5,"redacted":false},{"label":"[number]","type":"number","value":"19.90","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"11","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"20","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756352-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756352-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756352-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756352-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756352-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756352-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-3","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-3","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-3","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-4","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-4","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-4","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-5","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-5","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-5","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-6","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-6","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-6","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-7","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-7","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786125756353-7","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"🌿 Confeccionado em algodão premium de altíssima qualidade, oferece um toque extremamente macio e suave em contato com a pele.\n🪡 Sua fibra natural respirável garante o frescor necessário para o dia a dia, elevando o padrão de conforto da nossa linha de moda íntima premium.","length":274,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"C:\\fakepath\\cropped_verdemilitar(#5D6532).png","length":45,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Verde-Militar","length":13,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preta","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Vinho","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Azul-Marinho","length":12,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Bege","length":4,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Branca","length":6,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Marrom","length":6,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Cinza","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/cropped.mp4","length":47,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-07 18:07:14.256Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"ydjigu1hmfe31nh"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 25

## 2026-08-07 18:07:14.258Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-07 18:07:14.279Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-07 18:07:14.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:14.453Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:41.752Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-07 18:07:42.140Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-07 18:07:42.814Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 56

## 2026-08-07 18:07:42.816Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.827Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 68

## 2026-08-07 18:07:42.827Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.827Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 69

## 2026-08-07 18:07:42.827Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 68

## 2026-08-07 18:07:42.827Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 69

## 2026-08-07 18:07:42.827Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.827Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.828Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.854Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 95

## 2026-08-07 18:07:42.854Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 95

## 2026-08-07 18:07:42.854Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 95

## 2026-08-07 18:07:42.855Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.856Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:42.856Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:07:43.427Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.430Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:43.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.457Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:07:49.463Z navigate
- url: http://localhost:3000/produto/ydjigu1hmfe31nh
- via: pushState

## 2026-08-07 18:07:49.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:49.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:07:56.342Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ativar som","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:07:58.554Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:07:58.765Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:08:27.011Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Boa tarde! estou escolhendo um cropped. Mas se precisar de ajuda eu te pergunto. Obrigado!","valueLength":90,"text":""}

## 2026-08-07 18:08:27.012Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:08:27.020Z submit
- action: http://localhost:3000/produto/ydjigu1hmfe31nh
- fields: [{"label":"Escreva sua dúvida...","type":"text","value":"Boa tarde! estou escolhendo um cropped. Mas se precisar de ajuda eu te pergunto. Obrigado!","length":90,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-07 18:08:27.027Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Boa tarde! estou escolhendo um cropped. Mas se precisar de ajuda eu te pergunto. Obrigado!","valueLength":90,"text":""}

## 2026-08-07 18:08:34.190Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:08:34.403Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:08:36.707Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Roseli","valueLength":6,"text":""}

## 2026-08-07 18:08:36.707Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:08:36.708Z submit
- action: http://localhost:3000/produto/ydjigu1hmfe31nh
- fields: [{"label":"Escreva sua dúvida...","type":"text","value":"Roseli","length":6,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-07 18:08:36.710Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Roseli","valueLength":6,"text":""}

## 2026-08-07 18:08:45.458Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:08:45.671Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-07 18:08:46.814Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Ok","valueLength":2,"text":""}

## 2026-08-07 18:08:46.814Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:08:46.815Z submit
- action: http://localhost:3000/produto/ydjigu1hmfe31nh
- fields: [{"label":"Escreva sua dúvida...","type":"text","value":"Ok","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-07 18:08:46.820Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Ok","valueLength":2,"text":""}

## 2026-08-07 18:08:54.870Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:00.236Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:ri:-trigger-guia","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guia de Medidas"}

## 2026-08-07 18:09:01.265Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:ri:-trigger-compra_segura","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Compra Segura"}

## 2026-08-07 18:09:02.104Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:ri:-trigger-diferenciais","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Diferenciais"}

## 2026-08-07 18:09:03.208Z click
- element: {"tag":"div","role":"tablist","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"GeralTecidoModelagemCuidadosDiferenciaisCompra SeguraGuia de Medidas"}

## 2026-08-07 18:09:03.619Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:ri:-trigger-modelagem","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Modelagem"}

## 2026-08-07 18:09:04.682Z click
- element: {"tag":"div","role":"tablist","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"GeralTecidoModelagemCuidadosDiferenciaisCompra SeguraGuia de Medidas"}

## 2026-08-07 18:09:05.104Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:ri:-trigger-geral","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Geral"}

## 2026-08-07 18:09:26.995Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Verde-Militar","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:27.970Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"P"}

## 2026-08-07 18:09:29.527Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:29.689Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:29.917Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:31.818Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:32.769Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-07 18:09:33.901Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Vinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:35.414Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:35.603Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:35.788Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:36.000Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:37.052Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-07 18:09:39.078Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"COMPRAR AGORA"}

## 2026-08-07 18:09:39.088Z navigate
- url: http://localhost:3000/cart
- via: pushState

## 2026-08-07 18:09:39.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:09:39.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:09:50.250Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:09:50.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:09:50.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:09:50.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:09:50.310Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:09:58.448Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Finalizar Compra"}

## 2026-08-07 18:09:58.449Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-07 18:09:58.509Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_nfaambtdk1fmsj9c9xy","event_type":"begin_checkout","page_path":"/checkout","item_id":"","value":"279.565","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 8

## 2026-08-07 18:09:58.510Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:09:58.545Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_nfaambtdk1fmsj9c9xy","event_type":"page_view","page_path":"/checkout","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 43

## 2026-08-07 18:09:58.546Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:10:02.497Z click
- element: {"tag":"p","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Informe seus dados para prosseguir com o pagamento seguro."}

## 2026-08-07 18:10:03.126Z click
- element: {"tag":"p","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Informe seus dados para prosseguir com o pagamento seguro."}

## 2026-08-07 18:10:07.749Z click
- element: {"tag":"p","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Informe seus dados para prosseguir com o pagamento seguro."}

## 2026-08-07 18:10:08.415Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-nome","placeholder":"Nome e Sobrenome","label":"Nome Completo","value":"","valueLength":0,"text":""}

## 2026-08-07 18:10:08.616Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-nome","placeholder":"Nome e Sobrenome","label":"Nome Completo","value":"","valueLength":0,"text":""}

## 2026-08-07 18:10:18.643Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-nome","placeholder":"Nome e Sobrenome","label":"Nome Completo","value":"Roseli Trajano de Souza Machado","valueLength":31,"text":""}

## 2026-08-07 18:10:18.644Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-nome","placeholder":"Nome e Sobrenome","label":"Nome Completo","value":"Roseli Trajano de Souza Machado","valueLength":31,"text":""}

## 2026-08-07 18:10:22.822Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cérebro da Lia"}

## 2026-08-07 18:10:22.843Z navigate
- url: http://localhost:3000/admin/lia
- via: pushState

## 2026-08-07 18:10:25.947Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:r8:-trigger-whatsapp","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conexão WhatsApp"}

## 2026-08-07 18:10:55.177Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Exibir QR Code"}

## 2026-08-07 18:12:18.359Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-nome","placeholder":"Nome e Sobrenome","label":"Nome Completo","value":"Roseli Trajano de Souza Machado","valueLength":31,"text":""}

## 2026-08-07 18:12:19.925Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-nome","placeholder":"Nome e Sobrenome","label":"Nome Completo","value":"Roseli Trajano de Souza Machado","valueLength":31,"text":""}

## 2026-08-07 18:12:20.134Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:12:21.598Z load
- url: http://localhost:3000/checkout
- title: Avante Lingerie | Oficial

## 2026-08-07 18:12:22.369Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_nfaambtdk1fmsj9c9xy","event_type":"page_view","page_path":"/checkout","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 162

## 2026-08-07 18:12:22.370Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:12:22.421Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_nfaambtdk1fmsj9c9xy","event_type":"begin_checkout","page_path":"/checkout","item_id":"","value":"279.565","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 57

## 2026-08-07 18:12:22.421Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:12:30.141Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"personal-email","placeholder":"exemplo@email.com","label":"E-mail","value":"","valueLength":0,"text":""}

## 2026-08-07 18:12:30.346Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"personal-email","placeholder":"exemplo@email.com","label":"E-mail","value":"","valueLength":0,"text":""}

## 2026-08-07 18:12:39.988Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"personal-email","placeholder":"exemplo@email.com","label":"E-mail","value":"comercial.luizmachado@gmail.com","valueLength":31,"text":""}

## 2026-08-07 18:12:41.144Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"personal-email","placeholder":"exemplo@email.com","label":"E-mail","value":"comercial.luizmachado@gmail.com","valueLength":31,"text":""}

## 2026-08-07 18:12:41.145Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-whatsapp","placeholder":"(00) 00000-0000","label":"WhatsApp / Celular","value":"","valueLength":0,"text":""}

## 2026-08-07 18:12:41.358Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-whatsapp","placeholder":"(00) 00000-0000","label":"WhatsApp / Celular","value":"","valueLength":0,"text":""}

## 2026-08-07 18:12:45.369Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-whatsapp","placeholder":"(00) 00000-0000","label":"WhatsApp / Celular","value":"22981125489","valueLength":11,"text":""}

## 2026-08-07 18:12:45.369Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-whatsapp","placeholder":"(00) 00000-0000","label":"WhatsApp / Celular","value":"22981125489","valueLength":11,"text":""}

## 2026-08-07 18:12:45.371Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-cpf","placeholder":"000.000.000-00","label":"CPF","value":"","valueLength":0,"text":""}

## 2026-08-07 18:12:50.775Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-cpf","placeholder":"000.000.000-00","label":"CPF","value":"082.039.967-19","valueLength":14,"text":""}

## 2026-08-07 18:12:50.776Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":"personal-cpf","placeholder":"000.000.000-00","label":"CPF","value":"082.039.967-19","valueLength":14,"text":""}

## 2026-08-07 18:12:50.795Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"","valueLength":0,"text":""}

## 2026-08-07 18:13:02.294Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:13:02.295Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:13:02.295Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"","valueLength":0,"text":""}

## 2026-08-07 18:13:02.302Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Folly","valueLength":9,"text":""}

## 2026-08-07 18:13:02.302Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Folly","valueLength":9,"text":""}

## 2026-08-07 18:13:02.303Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"","valueLength":0,"text":""}

## 2026-08-07 18:13:02.310Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"69","valueLength":2,"text":""}

## 2026-08-07 18:13:02.310Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"69","valueLength":2,"text":""}

## 2026-08-07 18:13:02.310Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"","valueLength":0,"text":""}

## 2026-08-07 18:13:02.313Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"Olaria","valueLength":6,"text":""}

## 2026-08-07 18:13:02.313Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"Olaria","valueLength":6,"text":""}

## 2026-08-07 18:13:02.313Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cidade","type":null,"id":"billing-cidade","placeholder":null,"label":"cidade","value":"","valueLength":0,"text":""}

## 2026-08-07 18:13:02.316Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cidade","type":null,"id":"billing-cidade","placeholder":null,"label":"cidade","value":"Nova Friburgo","valueLength":13,"text":""}

## 2026-08-07 18:13:02.316Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cidade","type":null,"id":"billing-cidade","placeholder":null,"label":"cidade","value":"Nova Friburgo","valueLength":13,"text":""}

## 2026-08-07 18:13:02.316Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"estado","type":null,"id":"billing-estado","placeholder":"SP","label":"estado","value":"","valueLength":0,"text":""}

## 2026-08-07 18:13:02.319Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"estado","type":null,"id":"billing-estado","placeholder":"SP","label":"estado","value":"RJ","valueLength":2,"text":""}

## 2026-08-07 18:13:02.319Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"estado","type":null,"id":"billing-estado","placeholder":"SP","label":"estado","value":"RJ","valueLength":2,"text":""}

## 2026-08-07 18:13:02.319Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:13:03.081Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:13:03.098Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Folly","valueLength":9,"text":""}

## 2026-08-07 18:13:04.231Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Folly","valueLength":9,"text":""}

## 2026-08-07 18:13:04.232Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"69","valueLength":2,"text":""}

## 2026-08-07 18:13:28.036Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"69","valueLength":2,"text":""}

## 2026-08-07 18:13:28.259Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:13:54.369Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CONCLUIR COMPRA"}

## 2026-08-07 18:15:41.693Z load
- url: http://localhost:3000/order-confirmation/g14auwxsfp2cxdu?session_id=cs_test_a1bxlznvbdfDJoZX840Z1PpRtFH19RoVz3TYTXPbHN28NJdnNTgghvtzrK
- title: Avante Lingerie | Oficial

## 2026-08-07 18:15:42.357Z navigate
- url: http://localhost:3000/order-confirmation/g14auwxsfp2cxdu?session_id=cs_test_a1bxlznvbdfDJoZX840Z1PpRtFH19RoVz3TYTXPbHN28NJdnNTgghvtzrK
- via: replaceState

## 2026-08-07 18:15:43.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:15:43.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:39:58.331Z load
- url: http://localhost:3000/order-confirmation/g14auwxsfp2cxdu?session_id=cs_test_a1bxlznvbdfDJoZX840Z1PpRtFH19RoVz3TYTXPbHN28NJdnNTgghvtzrK
- title: Avante Lingerie | Oficial

## 2026-08-07 18:39:59.886Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:39:59.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:18.856Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-07 18:40:19.325Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-07 18:40:20.261Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 163

## 2026-08-07 18:40:20.263Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 164

## 2026-08-07 18:40:20.264Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:20.268Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 167

## 2026-08-07 18:40:20.269Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:20.271Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:20.275Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 175

## 2026-08-07 18:40:20.275Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:20.295Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 194

## 2026-08-07 18:40:20.295Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 194

## 2026-08-07 18:40:20.296Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:20.297Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:21.277Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 1177

## 2026-08-07 18:40:21.277Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:21.278Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 1177

## 2026-08-07 18:40:21.278Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:40:21.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.379Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:21.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.420Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:25.427Z navigate
- url: http://localhost:3000/produto/ydjigu1hmfe31nh
- via: pushState

## 2026-08-07 18:40:25.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.604Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:25.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:30.648Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Verde-Militar","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:31.514Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"P"}

## 2026-08-07 18:40:32.623Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:32.841Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:33.009Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:33.233Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:34.676Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-07 18:40:35.705Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preta","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:36.931Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:37.129Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:37.327Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:37.543Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:38.952Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-07 18:40:40.137Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 4","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:41.305Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:42.524Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"COMPRAR AGORA"}

## 2026-08-07 18:40:42.530Z navigate
- url: http://localhost:3000/cart
- via: pushState

## 2026-08-07 18:40:42.748Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:42.751Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:50.866Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:40:50.881Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:50.883Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:50.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:50.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:40:52.298Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Finalizar Compra"}

## 2026-08-07 18:40:52.299Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-07 18:40:52.372Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_10pdr02yl01msjai84k","event_type":"begin_checkout","page_path":"/checkout","item_id":"","value":"279.565","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 10

## 2026-08-07 18:40:52.374Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:40:52.406Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_10pdr02yl01msjai84k","event_type":"page_view","page_path":"/checkout","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 42

## 2026-08-07 18:40:52.406Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:40:59.989Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"","valueLength":0,"text":""}

## 2026-08-07 18:41:00.188Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"","valueLength":0,"text":""}

## 2026-08-07 18:41:12.559Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"21921-100","valueLength":9,"text":""}

## 2026-08-07 18:41:12.560Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"21921-100","valueLength":9,"text":""}

## 2026-08-07 18:41:12.566Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"","valueLength":0,"text":""}

## 2026-08-07 18:41:14.767Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Almirante Pestana","valueLength":21,"text":""}

## 2026-08-07 18:41:14.767Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"","valueLength":0,"text":""}

## 2026-08-07 18:41:14.983Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"","valueLength":0,"text":""}

## 2026-08-07 18:41:17.011Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"10","valueLength":2,"text":""}

## 2026-08-07 18:41:17.011Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"10","valueLength":2,"text":""}

## 2026-08-07 18:41:17.013Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"complemento","type":null,"id":"billing-complemento","placeholder":"Apto, Bloco, etc.","label":"complemento","value":"","valueLength":0,"text":""}

## 2026-08-07 18:41:19.300Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"complemento","type":null,"id":"billing-complemento","placeholder":"Apto, Bloco, etc.","label":"complemento","value":"Casa","valueLength":4,"text":""}

## 2026-08-07 18:41:19.301Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"complemento","type":null,"id":"billing-complemento","placeholder":"Apto, Bloco, etc.","label":"complemento","value":"Casa","valueLength":4,"text":""}

## 2026-08-07 18:41:19.320Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"Cacuia","valueLength":6,"text":""}

## 2026-08-07 18:41:26.767Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"Cacuia","valueLength":6,"text":""}

## 2026-08-07 18:41:26.970Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"R$ 20,73"}

## 2026-08-07 18:41:32.390Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CONCLUIR COMPRA"}

## 2026-08-07 18:42:02.974Z load
- url: http://localhost:3000/order-confirmation/vddew45h8noa4qf?session_id=cs_test_a1tx1gvh452opZwpkf0JSqbv14GenWIp6XJvPYhFsipRihPxyHtZj9RqON
- title: Avante Lingerie | Oficial

## 2026-08-07 18:42:03.456Z navigate
- url: http://localhost:3000/order-confirmation/vddew45h8noa4qf?session_id=cs_test_a1tx1gvh452opZwpkf0JSqbv14GenWIp6XJvPYhFsipRihPxyHtZj9RqON
- via: replaceState

## 2026-08-07 18:42:04.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:42:04.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:46:59.456Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Configurações"}

## 2026-08-07 18:47:03.736Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:r8:-trigger-chats","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Chats Ao Vivo"}

## 2026-08-07 18:47:05.502Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"💻 Site (1b58)"}

## 2026-08-07 18:47:10.795Z click
- element: {"tag":"div","role":"tabpanel","ariaLabel":null,"name":null,"type":null,"id":"radix-:r8:-content-chats","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}💻 Site (1b58)HistóricoFico por aqui! Qualquer coisa, é só chamar. 😉💻 Site (f41c)HistóricoA Avante Lingerie fica em **Nova Friburgo — RJ**, a Capital Nacional da Lingerie! 🏙️\n\n📍 **Endereço da Loja Física:**\nRua Folly, 69 — Olaria\nNova Friburgo — RJ | CEP 28623-780\n\n⏰ **Horário de Atendimento:**\n- **Seg a Sex:** 08h às 18h\n- **Sáb:** 09h às 13h\n\nSe você estiver por lá, é um prazer recebê-la pessoalmente no nosso showroom! Mas se preferir comprar **online**, estamos aqui 24/7 pelo site e pelo **WhatsApp (22) 99761-8591** para qualquer dúvida. 💬\n\n**Você gostaria de conhecer nossas peças agora ou tem alguma dúvida específica?** 😊💻 Site (a5e7)HistóricoÓtimo, vou esclarecer isso para você com transparência! 💙\n\nTemos uma **política de higiene e saúde pública** (conforme regulamentação do Procon/CDC) que protege todas as nossas clientes:\n\n**Calcinhas NÃO podem ser trocadas por:**\n- Arrependimento\n- Tamanho errado\n- Qualquer motivo relacionado a preferência pessoal\n\nIsso é uma questão sanitária inegociável — é para o bem de todas nós!\n\n**MAS, se houver DEFEITO DE FÁBRICA** (costuras soltas, tecido rasgado, problema na renda, etc.), aí sim! Você tem **30 dias** para comunicar, e **a Avante arca com o frete de devolução**. 🎁\n\n---\n\n**A calcinha que você comprou tem algum defeito?** Se sim, peço para você chamar nossa equipe pelo **WhatsApp clicando no botão abaixo** — vamos resolver rapidinho!\n\nSe foi só uma questão de tamanho ou preferência, infelizmente não conseguimos fazer a troca, mas fico à disposição se precisar de ajuda para a próx💻 Site (504d)HistóricoÓtima pergunta! 📍\n\nA **Avante Lingerie** fica em **Nova Friburgo — RJ**, a capital nacional da lingerie! \n\n**Nossa Sede e Showroom:**\n🏢 Rua Folly, 69 — Olaria, Nova Friburgo — RJ  \n📮 CEP: 28623-780\n\n**Horário de Funcionamento:**\n- 📅..."}

## 2026-08-07 18:47:19.404Z click
- element: {"tag":"div","role":"tabpanel","ariaLabel":null,"name":null,"type":null,"id":"radix-:r8:-content-chats","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}💻 Site (1b58)HistóricoFico por aqui! Qualquer coisa, é só chamar. 😉💻 Site (f41c)HistóricoA Avante Lingerie fica em **Nova Friburgo — RJ**, a Capital Nacional da Lingerie! 🏙️\n\n📍 **Endereço da Loja Física:**\nRua Folly, 69 — Olaria\nNova Friburgo — RJ | CEP 28623-780\n\n⏰ **Horário de Atendimento:**\n- **Seg a Sex:** 08h às 18h\n- **Sáb:** 09h às 13h\n\nSe você estiver por lá, é um prazer recebê-la pessoalmente no nosso showroom! Mas se preferir comprar **online**, estamos aqui 24/7 pelo site e pelo **WhatsApp (22) 99761-8591** para qualquer dúvida. 💬\n\n**Você gostaria de conhecer nossas peças agora ou tem alguma dúvida específica?** 😊💻 Site (a5e7)HistóricoÓtimo, vou esclarecer isso para você com transparência! 💙\n\nTemos uma **política de higiene e saúde pública** (conforme regulamentação do Procon/CDC) que protege todas as nossas clientes:\n\n**Calcinhas NÃO podem ser trocadas por:**\n- Arrependimento\n- Tamanho errado\n- Qualquer motivo relacionado a preferência pessoal\n\nIsso é uma questão sanitária inegociável — é para o bem de todas nós!\n\n**MAS, se houver DEFEITO DE FÁBRICA** (costuras soltas, tecido rasgado, problema na renda, etc.), aí sim! Você tem **30 dias** para comunicar, e **a Avante arca com o frete de devolução**. 🎁\n\n---\n\n**A calcinha que você comprou tem algum defeito?** Se sim, peço para você chamar nossa equipe pelo **WhatsApp clicando no botão abaixo** — vamos resolver rapidinho!\n\nSe foi só uma questão de tamanho ou preferência, infelizmente não conseguimos fazer a troca, mas fico à disposição se precisar de ajuda para a próx💻 Site (504d)HistóricoÓtima pergunta! 📍\n\nA **Avante Lingerie** fica em **Nova Friburgo — RJ**, a capital nacional da lingerie! \n\n**Nossa Sede e Showroom:**\n🏢 Rua Folly, 69 — Olaria, Nova Friburgo — RJ  \n📮 CEP: 28623-780\n\n**Horário de Funcionamento:**\n- 📅..."}

## 2026-08-07 18:47:27.071Z click
- element: {"tag":"div","role":"tabpanel","ariaLabel":null,"name":null,"type":null,"id":"radix-:r8:-content-chats","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}💻 Site (1b58)HistóricoFico por aqui! Qualquer coisa, é só chamar. 😉💻 Site (f41c)HistóricoA Avante Lingerie fica em **Nova Friburgo — RJ**, a Capital Nacional da Lingerie! 🏙️\n\n📍 **Endereço da Loja Física:**\nRua Folly, 69 — Olaria\nNova Friburgo — RJ | CEP 28623-780\n\n⏰ **Horário de Atendimento:**\n- **Seg a Sex:** 08h às 18h\n- **Sáb:** 09h às 13h\n\nSe você estiver por lá, é um prazer recebê-la pessoalmente no nosso showroom! Mas se preferir comprar **online**, estamos aqui 24/7 pelo site e pelo **WhatsApp (22) 99761-8591** para qualquer dúvida. 💬\n\n**Você gostaria de conhecer nossas peças agora ou tem alguma dúvida específica?** 😊💻 Site (a5e7)HistóricoÓtimo, vou esclarecer isso para você com transparência! 💙\n\nTemos uma **política de higiene e saúde pública** (conforme regulamentação do Procon/CDC) que protege todas as nossas clientes:\n\n**Calcinhas NÃO podem ser trocadas por:**\n- Arrependimento\n- Tamanho errado\n- Qualquer motivo relacionado a preferência pessoal\n\nIsso é uma questão sanitária inegociável — é para o bem de todas nós!\n\n**MAS, se houver DEFEITO DE FÁBRICA** (costuras soltas, tecido rasgado, problema na renda, etc.), aí sim! Você tem **30 dias** para comunicar, e **a Avante arca com o frete de devolução**. 🎁\n\n---\n\n**A calcinha que você comprou tem algum defeito?** Se sim, peço para você chamar nossa equipe pelo **WhatsApp clicando no botão abaixo** — vamos resolver rapidinho!\n\nSe foi só uma questão de tamanho ou preferência, infelizmente não conseguimos fazer a troca, mas fico à disposição se precisar de ajuda para a próx💻 Site (504d)HistóricoÓtima pergunta! 📍\n\nA **Avante Lingerie** fica em **Nova Friburgo — RJ**, a capital nacional da lingerie! \n\n**Nossa Sede e Showroom:**\n🏢 Rua Folly, 69 — Olaria, Nova Friburgo — RJ  \n📮 CEP: 28623-780\n\n**Horário de Funcionamento:**\n- 📅..."}

## 2026-08-07 18:47:28.272Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-07 18:47:29.772Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-07 18:52:23.238Z load
- url: http://localhost:3000/admin/lia
- title: Avante Lingerie | Oficial

## 2026-08-07 18:54:23.304Z load
- url: http://localhost:3000/admin/lia
- title: Avante Lingerie | Oficial

## 2026-08-07 18:54:38.893Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-07 18:54:39.254Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-07 18:54:40.024Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 116

## 2026-08-07 18:54:40.025Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.061Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 151

## 2026-08-07 18:54:40.061Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.068Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 160

## 2026-08-07 18:54:40.069Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 160

## 2026-08-07 18:54:40.069Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.070Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.070Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 160

## 2026-08-07 18:54:40.070Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 159

## 2026-08-07 18:54:40.071Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.071Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.094Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 183

## 2026-08-07 18:54:40.095Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:40.095Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 184

## 2026-08-07 18:54:40.095Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-07 18:54:41.091Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.147Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.175Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:41.176Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:44.891Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:44.907Z navigate
- url: http://localhost:3000/produto/ydjigu1hmfe31nh
- via: pushState

## 2026-08-07 18:54:45.052Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:45.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:49.469Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Verde-Militar","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:50.342Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"P"}

## 2026-08-07 18:54:51.473Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:51.665Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:51.823Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:52.041Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:53.379Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-07 18:54:54.392Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Vinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:55.718Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:55.931Z click
- element: {"tag":"button","role":null,"ariaLabel":"Aumentar quantidade","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-07 18:54:56.729Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-07 18:54:59.583Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"COMPRAR AGORA"}

## 2026-08-07 18:54:59.584Z navigate
- url: http://localhost:3000/cart
- via: pushState

## 2026-08-07 18:54:59.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:54:59.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:55:03.392Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Finalizar Compra"}

## 2026-08-07 18:55:03.394Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-07 18:55:03.457Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_37wgvhv7petmsjb0nn3","event_type":"begin_checkout","page_path":"/checkout","item_id":"","value":"239.2","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 5

## 2026-08-07 18:55:03.458Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:55:03.498Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_37wgvhv7petmsjb0nn3","event_type":"page_view","page_path":"/checkout","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 45

## 2026-08-07 18:55:03.499Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-07 18:55:08.259Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:08.473Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:10.863Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:55:10.864Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:55:10.864Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:10.872Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Folly","valueLength":9,"text":""}

## 2026-08-07 18:55:10.872Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"rua","type":null,"id":"billing-rua","placeholder":"Ex: Av. Paulista","label":"rua","value":"Rua Folly","valueLength":9,"text":""}

## 2026-08-07 18:55:10.872Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:10.877Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"69","valueLength":2,"text":""}

## 2026-08-07 18:55:10.877Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"numero","type":null,"id":"billing-numero","placeholder":"Ex: 1000","label":"numero","value":"69","valueLength":2,"text":""}

## 2026-08-07 18:55:10.877Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:10.883Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"Olaria","valueLength":6,"text":""}

## 2026-08-07 18:55:10.884Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"bairro","type":null,"id":"billing-bairro","placeholder":null,"label":"bairro","value":"Olaria","valueLength":6,"text":""}

## 2026-08-07 18:55:10.884Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cidade","type":null,"id":"billing-cidade","placeholder":null,"label":"cidade","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:10.887Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cidade","type":null,"id":"billing-cidade","placeholder":null,"label":"cidade","value":"Nova Friburgo","valueLength":13,"text":""}

## 2026-08-07 18:55:10.887Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cidade","type":null,"id":"billing-cidade","placeholder":null,"label":"cidade","value":"Nova Friburgo","valueLength":13,"text":""}

## 2026-08-07 18:55:10.887Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"estado","type":null,"id":"billing-estado","placeholder":"SP","label":"estado","value":"","valueLength":0,"text":""}

## 2026-08-07 18:55:10.901Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"estado","type":null,"id":"billing-estado","placeholder":"SP","label":"estado","value":"RJ","valueLength":2,"text":""}

## 2026-08-07 18:55:10.901Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"estado","type":null,"id":"billing-estado","placeholder":"SP","label":"estado","value":"RJ","valueLength":2,"text":""}

## 2026-08-07 18:55:10.901Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:55:17.922Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":"cep","type":null,"id":"billing-cep","placeholder":"00000-000","label":"cep","value":"28623-780","valueLength":9,"text":""}

## 2026-08-07 18:55:18.150Z click
- element: {"tag":"main","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CarrinhoPagamento SeguroFinalização SeguraAmbiente de segurança máxima com criptografia SSL ativa. Seus dados estão 100% protegidos.Dados PessoaisInforme seus dados para prosseguir com o pagamento seguro.Já tenho cadastroNome CompletoE-mailWhatsApp / CelularCPFEndereço de FaturamentoCEP *Rua / Avenida *Número *Complemento (Opcional)Bairro *Cidade *UF *Endereço de EntregaO pedido será entregue no mesmo endereço de faturamento?Opções de FreteCalculando opções de envio via Melhor Envio...Forma de PagamentoCartão de CréditoAté 6x sem jurosPIX5% OFFBoletoVencimento em 3 diasFormulário de pagamento seguro integrado com a plataforma de pagamentos Stripe.Resumo do PedidoCropped Regata Gola AltaTam: P | Cor: Verde-MilitarQtd: 5R$ 149,50Cropped Regata Gola AltaTam: P | Cor: VinhoQtd: 3R$ 89,70SubtotalR$ 239,20FreteR$ 19,61Total a pagarR$ 258,81Finalização segura e criptografadaCONCLUIR COMPRAPagamento processado com criptografia e segurança de nível bancário pela Stripe. Seus dados de cartão estão 100% protegidos. 100% Seguro Criptografia SSL"}

## 2026-08-07 18:55:24.482Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CONCLUIR COMPRA"}

## 2026-08-07 18:55:57.133Z load
- url: http://localhost:3000/order-confirmation/p5emlr0r02f5m4z?session_id=cs_test_a1QVk97Iy2qNMcjD4J0I2ZwwayDcj0QPZvuvcruLmdRrHGO9Bwy7GEXaz5
- title: Avante Lingerie | Oficial

## 2026-08-07 18:55:57.997Z navigate
- url: http://localhost:3000/order-confirmation/p5emlr0r02f5m4z?session_id=cs_test_a1QVk97Iy2qNMcjD4J0I2ZwwayDcj0QPZvuvcruLmdRrHGO9Bwy7GEXaz5
- via: replaceState

## 2026-08-07 18:55:58.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 18:55:58.703Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-07 19:26:53.184Z load
- url: http://localhost:3000/admin/lia
- title: Avante Lingerie | Oficial

## 2026-08-07 19:44:20.965Z load
- url: http://localhost:3000/admin/lia
- title: Avante Lingerie | Oficial

## 2026-08-07 20:04:53.752Z load
- url: http://localhost:3000/admin/lia
- title: Avante Lingerie | Oficial

## 2026-08-07 20:04:57.526Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:r3:-trigger-whatsapp","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conexão WhatsApp"}

## 2026-08-07 20:10:13.803Z load
- url: http://localhost:3000/admin/lia
- title: Avante Lingerie | Oficial

## 2026-08-11 12:06:23.790Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-11 12:06:36.293Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 12:06:38.045Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 155

## 2026-08-11 12:06:38.047Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.141Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 250

## 2026-08-11 12:06:38.141Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 249

## 2026-08-11 12:06:38.141Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.142Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.200Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 308

## 2026-08-11 12:06:38.201Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.218Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 326

## 2026-08-11 12:06:38.219Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.220Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 326

## 2026-08-11 12:06:38.220Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.264Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 371

## 2026-08-11 12:06:38.264Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 371

## 2026-08-11 12:06:38.264Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.265Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 12:06:38.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.562Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:06:38.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:11:36.458Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-11 12:11:37.108Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 12:11:41.925Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-11 12:11:41.927Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 12:11:42.007Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:11:42.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 12:11:45.579Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-11 12:11:45.581Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-11 12:11:48.543Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-08-11 12:11:48.544Z navigate
- url: http://localhost:3000/admin/analytics
- via: pushState

## 2026-08-11 12:12:06.510Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 12:12:06.511Z navigate
- url: http://localhost:3000/admin/pedidos
- via: pushState

## 2026-08-11 12:12:17.080Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-08-11 12:12:17.081Z navigate
- url: http://localhost:3000/admin/analytics
- via: pushState

## 2026-08-11 12:12:34.763Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cérebro da Lia"}

## 2026-08-11 12:12:34.764Z navigate
- url: http://localhost:3000/admin/lia
- via: pushState

## 2026-08-11 12:12:37.029Z click
- element: {"tag":"button","role":"tab","ariaLabel":null,"name":null,"type":"button","id":"radix-:rf:-trigger-treinamento","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Treinamento"}

## 2026-08-11 12:12:45.898Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Estoque"}

## 2026-08-11 12:12:45.899Z navigate
- url: http://localhost:3000/admin/estoque
- via: pushState

## 2026-08-11 12:12:55.130Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-08-11 12:12:55.131Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-11 12:12:57.027Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 12:13:01.863Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-11 12:13:05.737Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 12:13:28.919Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-11 12:23:22.482Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-08-11 12:23:22.522Z navigate
- url: http://localhost:3000/admin/analytics
- via: pushState

## 2026-08-11 12:23:26.191Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"7 Dias"}

## 2026-08-11 12:23:27.816Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-11 12:23:29.274Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-11 12:23:30.382Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-11 12:23:33.282Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Jornadas ao Vivo"}

## 2026-08-11 12:24:23.859Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Tracking & Pixels"}

## 2026-08-11 12:24:47.178Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Desempenho Geral"}

## 2026-08-11 12:30:04.194Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Tracking & Pixels"}

## 2026-08-11 14:52:25.296Z load
- url: http://localhost:3000/admin/analytics
- title: Avante Lingerie | Oficial

## 2026-08-11 14:52:30.485Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-11 14:52:30.487Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 14:52:31.138Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 132

## 2026-08-11 14:52:31.138Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 133

## 2026-08-11 14:52:31.140Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.150Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.164Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 158

## 2026-08-11 14:52:31.165Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 158

## 2026-08-11 14:52:31.165Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.179Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.187Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 180

## 2026-08-11 14:52:31.187Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 180

## 2026-08-11 14:52:31.187Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.193Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.196Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 189

## 2026-08-11 14:52:31.197Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.208Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 202

## 2026-08-11 14:52:31.209Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 14:52:31.379Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.405Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.405Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:31.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.628Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:52:39.633Z navigate
- url: http://localhost:3000/produto/ydjigu1hmfe31nh
- via: pushState

## 2026-08-11 14:52:39.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:39.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:52:56.978Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guia de Medidas"}

## 2026-08-11 14:53:01.938Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-11 14:53:14.307Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ativar som","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:54:16.191Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-11 14:54:16.376Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-11 14:54:27.633Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Estou apenas viajando nesta loja linda","valueLength":38,"text":""}

## 2026-08-11 14:54:27.636Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:54:27.643Z submit
- action: http://localhost:3000/produto/ydjigu1hmfe31nh
- fields: [{"label":"Escreva sua dúvida...","type":"text","value":"Estou apenas viajando nesta loja linda","length":38,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-11 14:54:27.659Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Estou apenas viajando nesta loja linda","valueLength":38,"text":""}

## 2026-08-11 14:54:34.266Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-11 14:54:34.489Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-11 14:54:38.217Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Luiz","valueLength":4,"text":""}

## 2026-08-11 14:54:38.217Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:54:38.219Z submit
- action: http://localhost:3000/produto/ydjigu1hmfe31nh
- fields: [{"label":"Escreva sua dúvida...","type":"text","value":"Luiz","length":4,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-11 14:54:38.222Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Luiz","valueLength":4,"text":""}

## 2026-08-11 14:54:43.312Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-11 14:54:43.523Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"","valueLength":0,"text":""}

## 2026-08-11 14:54:50.983Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Estou analisando e te falo","valueLength":26,"text":""}

## 2026-08-11 14:54:50.983Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:54:50.985Z submit
- action: http://localhost:3000/produto/ydjigu1hmfe31nh
- fields: [{"label":"Escreva sua dúvida...","type":"text","value":"Estou analisando e te falo","length":26,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-11 14:54:50.992Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Escreva sua dúvida...","label":"Escreva sua dúvida...","value":"Estou analisando e te falo","valueLength":26,"text":""}

## 2026-08-11 14:54:57.240Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:55:25.337Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Vinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 14:55:28.818Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"G"}

## 2026-08-11 14:55:30.835Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-11 14:55:32.054Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"COMPRAR AGORA"}

## 2026-08-11 14:55:32.058Z navigate
- url: http://localhost:3000/cart
- via: pushState

## 2026-08-11 14:55:32.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 14:55:32.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 15:35:26.779Z load
- url: http://localhost:3000/cart
- title: Avante Lingerie | Oficial

## 2026-08-11 15:35:30.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 15:35:30.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:42.784Z load
- url: http://localhost:3000/cart
- title: Avante Lingerie | Oficial

## 2026-08-11 16:02:44.837Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:44.840Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:50.648Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-11 16:02:51.310Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 16:02:52.462Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 151

## 2026-08-11 16:02:52.463Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 151

## 2026-08-11 16:02:52.463Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 152

## 2026-08-11 16:02:52.463Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 152

## 2026-08-11 16:02:52.464Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.468Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.468Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 158

## 2026-08-11 16:02:52.468Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.469Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.471Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.478Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 165

## 2026-08-11 16:02:52.478Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.481Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 169

## 2026-08-11 16:02:52.495Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.502Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 191

## 2026-08-11 16:02:52.502Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:02:52.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.634Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.729Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:52.753Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:02:57.451Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-11 16:02:57.823Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 16:03:17.323Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-11 16:03:17.347Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 16:03:17.668Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:03:17.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:03:20.116Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-11 16:03:21.534Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Excluir"}

## 2026-08-11 16:17:55.001Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-11 16:17:55.449Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 16:17:59.112Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-11 16:17:59.114Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 16:18:00.226Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-11 16:18:00.228Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-11 16:18:01.329Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Estoque"}

## 2026-08-11 16:18:01.329Z navigate
- url: http://localhost:3000/admin/estoque
- via: pushState

## 2026-08-11 16:18:02.745Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 16:18:02.747Z navigate
- url: http://localhost:3000/admin/pedidos
- via: pushState

## 2026-08-11 16:18:04.046Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Clientes"}

## 2026-08-11 16:18:04.047Z navigate
- url: http://localhost:3000/admin/clientes
- via: pushState

## 2026-08-11 16:18:05.796Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Integrações"}

## 2026-08-11 16:18:05.797Z navigate
- url: http://localhost:3000/admin/integracoes
- via: pushState

## 2026-08-11 16:18:07.061Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-08-11 16:18:07.062Z navigate
- url: http://localhost:3000/admin/analytics
- via: pushState

## 2026-08-11 16:18:08.862Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cérebro da Lia"}

## 2026-08-11 16:18:08.863Z navigate
- url: http://localhost:3000/admin/lia
- via: pushState

## 2026-08-11 16:18:16.845Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-11 16:18:16.845Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 16:18:20.413Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Novo Produto"}

## 2026-08-11 16:18:20.414Z navigate
- url: http://localhost:3000/admin/produtos/novo
- via: pushState

## 2026-08-11 16:18:23.447Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-11 16:18:23.663Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-11 16:18:34.208Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-11 16:18:34.213Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-11 16:18:34.214Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:18:34.424Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:18:35.919Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:18:35.926Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:18:37.110Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:18:37.327Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar Automático"}

## 2026-08-11 16:18:41.063Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Nenhum (Venda isolada)"}

## 2026-08-11 16:18:41.280Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Nenhum (Venda isolada)"}

## 2026-08-11 16:18:47.383Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Complete o Look (Cross-sell)"}

## 2026-08-11 16:18:53.827Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:53.835Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:18:55.477Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:55.480Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:18:56.574Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:56.577Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:18:57.592Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:57.594Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:18:59.211Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-11 16:18:59.217Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:16.325Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:16.542Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:21.335Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-11 16:19:21.337Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-11 16:19:21.338Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:21.543Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:25.031Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-11 16:19:25.031Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-11 16:19:25.031Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:25.257Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:19:32.062Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:19:32.063Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:20:11.217Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:20:13.634Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:28:19.978Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:28:22.390Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:28:43.623Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:28:46.185Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-11 16:28:46.187Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-11 16:28:46.399Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-11 16:28:47.893Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-11 16:28:47.893Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-11 16:28:47.897Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:28:48.111Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:28:49.133Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:28:49.138Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:28:52.935Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:28:52.937Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:28:53.147Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:28:55.873Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:28:55.873Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:28:55.875Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:28:58.370Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:28:58.370Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:28:58.373Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:01.409Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-11 16:29:01.409Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-11 16:29:01.411Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:03.278Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-11 16:29:03.279Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-11 16:29:03.280Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:04.796Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-11 16:29:04.796Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-11 16:29:04.798Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:12.196Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:29:12.196Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:29:12.199Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:12.414Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:16.154Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-11 16:29:16.154Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-11 16:29:16.156Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:16.363Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:26.376Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho","valueLength":27,"text":""}

## 2026-08-11 16:29:26.377Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho","valueLength":27,"text":""}

## 2026-08-11 16:29:26.378Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:26.594Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:27.825Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-11 16:29:27.825Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-11 16:29:27.831Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:29.937Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:29:29.937Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:29:29.942Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-11 16:29:32.897Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:29:32.897Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:29:33.113Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-11 16:29:41.428Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Assistente de Descrições IA"}

## 2026-08-11 16:29:41.470Z console.warn
- text: Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.

## 2026-08-11 16:29:41.507Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:29:43.118Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:29:44.965Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:29:44.980Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:29:46.211Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:29:46.211Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:29:46.429Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:29:47.675Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:29:47.686Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:29:49.228Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:29:49.236Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:29:49.446Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:29:49.457Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:29:51.362Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:29:51.579Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar com Gemini AI"}

## 2026-08-11 16:30:12.384Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-11 16:30:12.415Z submit
- action: http://localhost:3000/admin/produtos/novo
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Cropped Regata Gola Alta","length":24,"redacted":false},{"label":"[select]","type":"select-one","value":"hya9h8gimmcygbn","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-CRO-6747","length":12,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"29.90","length":5,"redacted":false},{"label":"[number]","type":"number","value":"19.90","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"11","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"20","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154933-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154933-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154933-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154934-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154934-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154934-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154934-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154934-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786465154934-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Eleve seu estilo com o Cropped Regata Gola Alta da Avante Lingerie, a união perfeita entre a sofisticação da moda íntima premium e a versatilidade do casual chic.\n💖 Desenvolvido com design minimalista, este cropped gola alta desenha a silhueta com extrema elegância, transitando perfeitamente do look urbano à lingerie sensual para momentos especiais.","length":354,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"C:\\fakepath\\cropped_verdemilitar(#5D6532).png","length":45,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Verde-Militar","length":13,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preta","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Vinho","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/cropped.mp4","length":47,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-11 16:30:13.089Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"tcu4tw7wb58ogzv"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 91

## 2026-08-11 16:30:13.094Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-11 16:30:13.117Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 16:30:13.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:30:13.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:30:16.392Z click
- element: {"tag":"main","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProdutosGerencie o catálogo de produtos da loja. Novo ProdutoTodas CategoriasBodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus SizeProdutoCategoriaPreçoEstoqueStatusAçõesCropped Regata Gola AltaAVL-CRO-6747BodyR$ 29,90R$ 19,90900 unAbrir menu"}

## 2026-08-11 16:30:22.775Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Novo Produto"}

## 2026-08-11 16:30:22.776Z navigate
- url: http://localhost:3000/admin/produtos/novo
- via: pushState

## 2026-08-11 16:30:26.241Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-11 16:30:26.242Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-11 16:31:48.724Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:31:53.300Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-11 16:31:53.304Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"C:\\fakepath\\VIDEO2_ORIGINAL_kit_calcinha_.mp4","valueLength":45,"text":""}

## 2026-08-11 16:34:54.711Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-11 16:34:54.722Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"C:\\fakepath\\VIDEO2_ORIGINAL_kit_calcinha_.mp4","valueLength":45,"text":""}

## 2026-08-11 16:35:27.045Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:27.240Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:29.575Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-11 16:35:29.575Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-11 16:35:29.576Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:29.786Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:32.504Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-11 16:35:32.505Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-11 16:35:32.505Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:32.731Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:45.554Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-11 16:35:45.555Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-11 16:35:47.937Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-11 16:35:48.843Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-11 16:35:48.844Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:49.060Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:50.483Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-11 16:35:50.483Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-11 16:35:50.488Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:35:50.695Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:35:53.709Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:35:58.076Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-11 16:35:58.078Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-11 16:35:58.293Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:13.203Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Blusa Regata","valueLength":12,"text":""}

## 2026-08-11 16:36:13.204Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Blusa Regata","valueLength":12,"text":""}

## 2026-08-11 16:36:13.205Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:36:13.410Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:36:18.946Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:36:18.951Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:36:20.452Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-11 16:36:20.676Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar Automático"}

## 2026-08-11 16:36:22.062Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:22.276Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:25.421Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"tcu4tw7wb58ogzv","valueLength":15,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:25.449Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"tcu4tw7wb58ogzv","valueLength":15,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:29.290Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"tcu4tw7wb58ogzv","valueLength":15,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:31.871Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"tcu4tw7wb58ogzv","valueLength":15,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:34.466Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"tcu4tw7wb58ogzv","valueLength":15,"text":"Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747"}

## 2026-08-11 16:36:34.674Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:36:34.680Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:36:38.194Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:38.407Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:39.934Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:36:39.934Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:36:39.935Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:45.794Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:36:45.794Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:36:45.796Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:46.008Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:47.448Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-11 16:36:47.449Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-11 16:36:47.454Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:50.659Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-11 16:36:50.659Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-11 16:36:50.661Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:51.517Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-11 16:36:51.517Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-11 16:36:51.523Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:53.916Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:36:53.916Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:36:53.919Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:54.122Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:58.759Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-11 16:36:58.760Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-11 16:36:58.761Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:36:58.974Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-11 16:37:07.939Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Bege, Branca, Marrom","valueLength":20,"text":""}

## 2026-08-11 16:37:07.939Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Bege, Branca, Marrom","valueLength":20,"text":""}

## 2026-08-11 16:37:07.940Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-11 16:37:08.157Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-11 16:37:08.888Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-11 16:37:08.889Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-11 16:37:08.892Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-11 16:37:13.178Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:37:13.178Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-11 16:37:13.180Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-11 16:37:16.976Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:37:16.977Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-11 16:37:17.190Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-11 16:37:21.839Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Assistente de Descrições IA"}

## 2026-08-11 16:37:21.879Z console.warn
- text: Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.

## 2026-08-11 16:37:21.902Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:37:23.422Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:37:25.206Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:37:25.217Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:37:26.302Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-11 16:37:26.302Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:37:27.231Z click
- element: {"tag":"div","role":"dialog","ariaLabel":null,"name":null,"type":null,"id":"radix-:r1i:","placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Assistente de Descrições IAEstilo PrincipalConforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / CintaTecido PrincipalMicrofibraRendaAlgodãoTuleCetimVeludoDiferenciais e Destaques (Selecione quantos desejar)Sem costuraAlças reguláveisBojo removívelDuplo forro no bustoSustentação reforçadaForro 100% Algodão HipoalergênicoCancelar Gerar com Gemini AIClose"}

## 2026-08-11 16:37:27.651Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:37:27.665Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:37:29.004Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-11 16:37:29.005Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:37:29.223Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:37:29.233Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:37:30.237Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-11 16:37:30.454Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar com Gemini AI"}

## 2026-08-11 16:37:51.354Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-11 16:37:51.379Z submit
- action: http://localhost:3000/admin/produtos/novo
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Blusa Regata","length":12,"redacted":false},{"label":"[select]","type":"select-one","value":"okqcy3xzr7pff8b","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-BLU-3075","length":12,"redacted":false},{"label":"[select]","type":"select-one","value":"tcu4tw7wb58ogzv","length":15,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"29.90","length":5,"redacted":false},{"label":"[number]","type":"number","value":"19.90","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"11","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"20","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786466125308-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ A Blusa Regata Cropped da Avante Lingerie redefine o conceito de moda íntima premium, sendo ideal para compor um conjunto de lingerie confortável e sofisticado.\\n💖 Combine-a com uma elegante lingerie de renda para criar um visual moderno ou use-a sob um cropped gola alta para expressar sua versatilidade e estilo.\\n👑 Sinta o poder de uma silhueta valorizada com o toque suave e o caimento perfeito que só a nossa alta costura proporciona.","length":443,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"C:\\fakepath\\cropped_bege.png","length":28,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Bege","length":4,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Branca","length":6,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Marrom","length":6,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/cropped.mp4","length":47,"redacted":false},{"label":"[select]","type":"select-one","value":"last","length":4,"redacted":false}]

## 2026-08-11 16:37:52.116Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"05utgzpnb5dk0go"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 56

## 2026-08-11 16:37:52.116Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-11 16:37:52.125Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 16:37:52.415Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:52.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:52.423Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:52.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:55.908Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/notificacoes
- message: Failed to fetch
- durationMs: 122

## 2026-08-11 16:37:55.909Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/admin:500:23)
        at Object.fetch (http://localhost:3000/src/lib/apiServerClient.js:5:29)
        at fetchNotificacoes (http://localhost:3000/src/components/admin/NotificacoesPanel.jsx:21:41)
        at http://localhost:3000/src/components/admin/NotificacoesPanel.jsx:48:7

## 2026-08-11 16:37:55.911Z console.error
- text: 
    Erro ao buscar notificações: TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/admin:500:23)
        at Object.fetch (http://localhost:3000/src/lib/apiServerClient.js:5:29)
        at fetchNotificacoes (http://localhost:3000/src/components/admin/NotificacoesPanel.jsx:21:41)
        at http://localhost:3000/src/components/admin/NotificacoesPanel.jsx:48:7

## 2026-08-11 16:37:56.144Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-11 16:37:57.483Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:57.486Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:57.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:37:57.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:01.524Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Estoque"}

## 2026-08-11 16:38:01.530Z navigate
- url: http://localhost:3000/admin/estoque
- via: pushState

## 2026-08-11 16:38:09.487Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ajustar"}

## 2026-08-11 16:38:20.572Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-11 16:38:22.153Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:38:25.804Z click
- element: {"tag":"div","role":"dialog","ariaLabel":null,"name":null,"type":null,"id":"radix-:r9:","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"CloseHistórico de MovimentaçãoSKU: BLUSA-REGA-MARROM-GData InicialData FinalDataTipoQtdEstoque (Ant → Novo)MotivoAdmin / BlingNenhuma movimentação encontrada neste período."}

## 2026-08-11 16:38:27.103Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-11 16:38:28.967Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:38:30.594Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-11 16:38:33.800Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-11 16:38:33.802Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-11 16:38:33.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:33.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:33.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:33.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:50.613Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-11 16:38:51.226Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 16:38:52.057Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 61

## 2026-08-11 16:38:52.058Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.063Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 67

## 2026-08-11 16:38:52.064Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.064Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 69

## 2026-08-11 16:38:52.064Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 70

## 2026-08-11 16:38:52.065Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.065Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 69

## 2026-08-11 16:38:52.065Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.066Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.069Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 73

## 2026-08-11 16:38:52.070Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.077Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 81

## 2026-08-11 16:38:52.077Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.078Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 82

## 2026-08-11 16:38:52.079Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:38:52.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.353Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.353Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.370Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.371Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.373Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:52.373Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:55.411Z click
- element: {"tag":"button","role":null,"ariaLabel":"Cart","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"1R$ 29,90"}

## 2026-08-11 16:38:55.420Z navigate
- url: http://localhost:3000/cart
- via: pushState

## 2026-08-11 16:38:55.672Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:55.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:55.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:38:55.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:12.055Z click
- element: {"tag":"button","role":null,"ariaLabel":"Remover item","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:39:15.837Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:39:16.978Z load
- url: http://localhost:3000/cart
- title: Avante Lingerie | Oficial

## 2026-08-11 16:39:21.068Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-08-11 16:39:21.072Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 16:39:21.428Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 65

## 2026-08-11 16:39:21.429Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 65

## 2026-08-11 16:39:21.429Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 67

## 2026-08-11 16:39:21.430Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.434Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 71

## 2026-08-11 16:39:21.434Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.435Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.438Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.438Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 74

## 2026-08-11 16:39:21.445Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.506Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 143

## 2026-08-11 16:39:21.506Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 143

## 2026-08-11 16:39:21.506Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 143

## 2026-08-11 16:39:21.508Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.509Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.509Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-11 16:39:21.565Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.565Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.584Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.585Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:21.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:48.939Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:39:48.951Z navigate
- url: http://localhost:3000/produto/tcu4tw7wb58ogzv
- via: pushState

## 2026-08-11 16:39:49.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.237Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:39:49.238Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:40:15.546Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:40:42.222Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:40:42.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:40:42.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:40:42.590Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:17.554Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-11 16:41:20.248Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"M"}

## 2026-08-11 16:41:20.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:20.308Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:21.279Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-11 16:41:24.857Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Vinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:41:24.867Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:24.867Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:24.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:24.902Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:28.279Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Adicionar"}

## 2026-08-11 16:41:28.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:28.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:33.614Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"COMPRAR AGORA"}

## 2026-08-11 16:41:33.623Z navigate
- url: http://localhost:3000/cart
- via: pushState

## 2026-08-11 16:41:33.823Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:33.823Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:33.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:33.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:41:42.977Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Finalizar Compra"}

## 2026-08-11 16:41:42.980Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-11 16:41:43.066Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_dynxkn8zodomsovxfaa","event_type":"begin_checkout","page_path":"/checkout","item_id":"","value":"29.9","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 5

## 2026-08-11 16:41:43.067Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-11 16:41:43.102Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_dynxkn8zodomsovxfaa","event_type":"page_view","page_path":"/checkout","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 40

## 2026-08-11 16:41:43.102Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-08-11 16:42:25.000Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:44:41.781Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-11 16:44:45.445Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-08-11 16:44:45.456Z navigate
- url: http://localhost:3000/admin/produtos/05utgzpnb5dk0go/editar
- via: pushState

## 2026-08-11 16:44:45.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:44:45.731Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:44:45.731Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-11 16:45:36.788Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Informações BásicasNome do Produto *Categoria *Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus SizeReferência / Código Interno * Gerar AutomáticoComplete o Look (Cross-sell)Nenhum (Venda isolada)Cropped Regata Gola Alta - AVL-CRO-6747Selecione uma peça que combina perfeitamente para incentivar a compra do conjunto (Ex: calcinha para combinar com este sutiã).Status de ExibiçãoDeixe inativo para esconder o produto na loja.Destaques e Vitrines na HomeLançamentos RecentesOfertas ExclusivasMais Vendidos da AvanteDestaques de Ouro"}

