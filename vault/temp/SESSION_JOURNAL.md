# SESSION_JOURNAL.md (rotated - earlier entries trimmed)

"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guia de Medidas"}

## 2026-08-26 13:01:21.299Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guia de Medidas"}

## 2026-08-26 13:01:35.575Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-08-26 13:02:27.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:27.238Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:27.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:27.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:30.599Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-26 13:02:31.739Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-08-26 13:02:31.750Z navigate
- url: http://localhost:3000/admin/produtos/k53nt9vabcgojf8/editar
- via: pushState

## 2026-08-26 13:02:32.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:02:40.920Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Google SEO & IATítulo SEOMáx 60 caracteresMeta DescriptionMáx 160 caracteresSinta-se poderosa e confortável, direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica! Gerar Textos e SEO Automaticamente com IA"}

## 2026-08-26 13:02:41.363Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Meta DescriptionMáx 160 caracteres"}

## 2026-08-26 13:02:42.631Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Google SEO & IATítulo SEOMáx 60 caracteresMeta DescriptionMáx 160 caracteresSinta-se poderosa e confortável, direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica! Gerar Textos e SEO Automaticamente com IA"}

## 2026-08-26 13:19:20.883Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.903Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.903Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.906Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.907Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.908Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.909Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.909Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.911Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.913Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.913Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:20.913Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.614Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.614Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.614Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.614Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.614Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.703Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:19:21.704Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:16.169Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:16.190Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:16.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:16.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:23.891Z load
- url: http://localhost:3000/produto/k53nt9vabcgojf8
- title: Avante Lingerie | Oficial

## 2026-08-26 13:33:28.122Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.124Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.175Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:28.176Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:43.395Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:33:55.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:55.524Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:55.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:55.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:56.781Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:33:56.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:33:56.839Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.275Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.788Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.788Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.826Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.827Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.849Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.849Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.867Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.867Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.922Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.979Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:00.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.037Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.059Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.059Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.618Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.618Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.655Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.656Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.671Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.671Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.689Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.689Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.705Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.756Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.788Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.788Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.805Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.805Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.874Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.875Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.893Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.975Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:01.975Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.003Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.003Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.041Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.042Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.054Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.075Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.088Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.140Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.254Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.254Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.657Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.657Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:02.774Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:03.189Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:03.189Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:03.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:34:03.209Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:37:40.685Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:41.668Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:42.356Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:42.968Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:43.566Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:44.201Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:44.803Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:45.455Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:37:46.219Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:03.121Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:05.953Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:08.054Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:10.118Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:16.186Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:18.800Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:20.901Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:22.751Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:24.583Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:27.085Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:28.700Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:30.769Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:34.050Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:38.833Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:41.350Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:44.022Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:46.164Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:48.312Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:50.549Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:52.263Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:53.847Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:56.736Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:38:58.699Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:39:00.299Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:39:09.451Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-26 13:39:09.464Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-26 13:39:17.151Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-26 13:39:17.151Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"C:\\fakepath\\vinho.png","valueLength":21,"text":""}

## 2026-08-26 13:39:23.896Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-26 13:39:23.897Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"C:\\fakepath\\verso_vinho.png","valueLength":27,"text":""}

## 2026-08-26 13:39:51.585Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-26 13:39:51.800Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-26 13:39:53.985Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-26 13:39:53.990Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-26 13:39:54.211Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-26 13:39:55.362Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-26 13:40:17.038Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-26 13:40:25.034Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-26 13:40:26.649Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-26 13:40:26.655Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:40:26.862Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:40:31.238Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"M (38-40)","valueLength":9,"text":""}

## 2026-08-26 13:40:31.240Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"M (38-40)","valueLength":9,"text":""}

## 2026-08-26 13:40:40.956Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"M (38-40)","valueLength":9,"text":""}

## 2026-08-26 13:40:47.436Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"M (38-40)","valueLength":9,"text":""}

## 2026-08-26 13:40:52.463Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), M (38-40)","valueLength":21,"text":""}

## 2026-08-26 13:40:52.466Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), M (38-40)","valueLength":21,"text":""}

## 2026-08-26 13:40:57.715Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), M (38-40)","valueLength":21,"text":""}

## 2026-08-26 13:41:06.814Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), M (38-40)","valueLength":32,"text":""}

## 2026-08-26 13:41:06.843Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), M (38-40)","valueLength":32,"text":""}

## 2026-08-26 13:41:06.908Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:06.952Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:08.751Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-26 13:41:08.752Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-26 13:41:08.757Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:08.960Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:14.537Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"43.89","valueLength":5,"text":""}

## 2026-08-26 13:41:14.538Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"43.89","valueLength":5,"text":""}

## 2026-08-26 13:41:14.538Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:14.760Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:26.032Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"21.90","valueLength":5,"text":""}

## 2026-08-26 13:41:26.033Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"21.90","valueLength":5,"text":""}

## 2026-08-26 13:41:26.035Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:41:26.257Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:01.533Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Vinho, Cinza, Verde-Militar, Preta, Marrom, Branca, Bege, Azul-Militar","valueLength":70,"text":""}

## 2026-08-26 13:42:01.534Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Vinho, Cinza, Verde-Militar, Preta, Marrom, Branca, Bege, Azul-Militar","valueLength":70,"text":""}

## 2026-08-26 13:42:01.757Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-26 13:42:12.750Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:12.971Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:15.771Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-26 13:42:15.772Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-26 13:42:15.772Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:15.989Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:20.259Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-26 13:42:20.259Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-26 13:42:20.260Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:20.472Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:25.203Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-26 13:42:25.204Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza","valueLength":5,"text":""}

## 2026-08-26 13:42:25.204Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:25.420Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:32.076Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-26 13:42:32.076Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-26 13:42:32.076Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:32.306Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:34.744Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-26 13:42:34.745Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-26 13:42:34.745Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:34.955Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:37.988Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-26 13:42:37.990Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Marrom","valueLength":6,"text":""}

## 2026-08-26 13:42:37.990Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:38.204Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:41.292Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-26 13:42:41.292Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Branca","valueLength":6,"text":""}

## 2026-08-26 13:42:41.292Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:41.505Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:43.901Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-26 13:42:43.901Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Bege","valueLength":4,"text":""}

## 2026-08-26 13:42:43.902Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:42:44.118Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-26 13:43:07.560Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Militar","valueLength":12,"text":""}

## 2026-08-26 13:43:07.563Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Militar","valueLength":12,"text":""}

## 2026-08-26 13:43:07.572Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:07.773Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:09.680Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:09.719Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:10.627Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:10.628Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:10.836Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:11.898Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:11.941Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:12.763Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:12.766Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:12.985Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:15.106Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:15.134Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:17.783Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:17.783Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:18.004Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:19.386Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:19.398Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:20.379Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:20.380Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:20.583Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:21.773Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:21.799Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:22.701Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:22.702Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:22.921Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:24.063Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:24.077Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:28.610Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-5","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:28.610Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:28.836Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:32.275Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:32.289Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:33.060Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:33.061Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:33.268Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:34.453Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:34.462Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:35.547Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:35.548Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:35.767Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:37.102Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:37.111Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:38.604Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-4","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:38.605Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:38.818Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:40.152Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:40.163Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:41.109Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:41.110Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:41.334Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:42.534Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:42.542Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:46.932Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:46.933Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:47.152Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:49.284Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:49.303Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:51.187Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-3","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:51.187Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:51.402Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:53.579Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:53.601Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:54.435Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:54.436Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:54.649Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:55.834Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:55.852Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:56.723Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:56.724Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:56.934Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:58.563Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:58.573Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:59.983Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-2","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:43:59.983Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:00.200Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:01.962Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:01.973Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:03.234Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:03.235Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:03.455Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:04.601Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:04.611Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:09.160Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:09.160Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:09.382Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:10.553Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:10.560Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:11.571Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581646-1","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:11.572Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:11.801Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:13.779Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:13.792Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:14.674Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:14.674Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:14.884Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:16.529Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:16.540Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:17.429Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:17.430Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:17.652Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:18.833Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:18.843Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:23.068Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581645-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:23.068Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:23.265Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:24.677Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751560860-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:24.691Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751560860-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:26.231Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751560860-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:28.347Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:28.361Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:29.407Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:29.407Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:29.617Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:30.967Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:30.983Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:31.802Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:31.804Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:32.018Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:33.596Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:33.615Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:43.059Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:48.153Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:49.792Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751555866-0","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Militar"}

## 2026-08-26 13:44:49.793Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:44:50.015Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:44:53.449Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), ","valueLength":12,"text":""}

## 2026-08-26 13:44:53.450Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), ","valueLength":12,"text":""}

## 2026-08-26 13:44:59.240Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), ","valueLength":12,"text":""}

## 2026-08-26 13:45:03.186Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), ","valueLength":23,"text":""}

## 2026-08-26 13:45:03.187Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), ","valueLength":23,"text":""}

## 2026-08-26 13:45:07.760Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), ","valueLength":23,"text":""}

## 2026-08-26 13:45:10.521Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), M (38-40)","valueLength":32,"text":""}

## 2026-08-26 13:45:10.521Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"GG (44-46), G (42-44), M (38-40)","valueLength":32,"text":""}

## 2026-08-26 13:45:10.523Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:45:10.747Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-26 13:45:44.561Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Vinho, Cinza, Verde-Militar, Preta, Marrom, Branca, Bege, Azul-Marinho","valueLength":70,"text":""}

## 2026-08-26 13:45:44.562Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Vinho, Cinza, Verde-Militar, Preta, Marrom, Branca, Bege, Azul-Marinho","valueLength":70,"text":""}

## 2026-08-26 13:45:44.567Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-26 13:45:44.783Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-26 13:45:55.028Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-26 13:45:55.029Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-26 13:45:55.033Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-26 13:45:59.335Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"43.89","valueLength":5,"text":""}

## 2026-08-26 13:45:59.335Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"43.89","valueLength":5,"text":""}

## 2026-08-26 13:45:59.346Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-26 13:46:17.094Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"21.90","valueLength":5,"text":""}

## 2026-08-26 13:46:17.094Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"21.90","valueLength":5,"text":""}

## 2026-08-26 13:46:17.313Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:28.144Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:29.747Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:31.844Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:33.944Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:35.560Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:37.677Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:39.792Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:41.793Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:43.593Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:45.243Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:46.825Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:48.308Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:49.810Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:51.327Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:52.826Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:54.325Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:55.809Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:57.358Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:46:58.873Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:47:00.297Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:47:01.660Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:47:03.042Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:47:04.408Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:47:07.725Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-26 13:47:42.803Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Militar","valueLength":12,"text":""}

## 2026-08-26 13:47:42.977Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Militar","valueLength":12,"text":""}

## 2026-08-26 13:47:55.833Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Marinho","valueLength":12,"text":""}

## 2026-08-26 13:47:55.851Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul-Marinho","valueLength":12,"text":""}

## 2026-08-26 13:47:55.860Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:56.056Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:57.682Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:57.701Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:58.574Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:58.575Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:58.773Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:59.941Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:47:59.951Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:00.933Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:00.933Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:01.155Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:02.354Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:02.365Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:09.166Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:09.413Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:15.079Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"new-1787751581647-6","valueLength":19,"text":"NenhumaVinhoVinhoCinzaVerde-MilitarPretaMarromBrancaBegeAzul-Marinho"}

## 2026-08-26 13:48:15.293Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-26 13:48:15.312Z submit
- action: http://localhost:3000/admin/produtos/k53nt9vabcgojf8/editar
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Cropped Regata Canelada Gola Alta","length":33,"redacted":false},{"label":"Gerado automaticamente pela IA...","type":"text","value":"Cropped Gola Alta Feminino Microfibra - Avante Lingerie","length":55,"redacted":false},{"label":"Gerado automaticamente pela IA com funil de Varejo/Atacado...","type":"textarea","value":"Sinta-se poderosa e confortável, direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!","length":159,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"okqcy3xzr7pff8b","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-CRO-1158","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"43.89","length":5,"redacted":false},{"label":"[number]","type":"number","value":"21.9","length":4,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"25","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"30","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751555866-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751555866-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751555866-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581645-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581645-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581645-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-3","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-3","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581646-3","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-4","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-4","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-4","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-5","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-5","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-5","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-6","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-6","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1787751581647-6","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"43.89","length":5,"redacted":false},{"label":"Usar base","type":"number","value":"21.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Eleve seu estilo diário com o Cropped Regata Canelada Gola Alta da Avante Lingerie. Uma peça-chave que une a sofisticação da gola alta à modernidade do corte cropped, ideal para criar looks versáteis que vão do casual ao elegante com total facilidade.\n🌸 Sinta-se segura, confiante e extremamente bem-vestida em qualquer ocasião com este clássico indispensável no closet feminino.","length":382,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"C:\\fakepath\\cinza.png","length":21,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Vinho","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Vinho","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Cinza","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Verde-Militar","length":13,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preta","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Marrom","length":6,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Branca","length":6,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Bege","length":4,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Azul-Marinho","length":12,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/cropped.mp4","length":47,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-26 13:48:16.690Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"k53nt9vabcgojf8"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 61

## 2026-08-26 13:48:16.691Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-26 13:48:16.706Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-26 13:48:16.919Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:48:16.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:48:16.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:48:16.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:00.203Z load
- url: http://localhost:3000/produto/k53nt9vabcgojf8
- title: Avante Lingerie | Oficial

## 2026-08-26 13:49:01.465Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.514Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:01.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.778Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.779Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.794Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.795Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.826Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.842Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.876Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.876Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.890Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.891Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.908Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.908Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.991Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:09.991Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.091Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:10.091Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.177Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:49:11.185Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.185Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.829Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.842Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.843Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.875Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.875Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:11.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.019Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-08-26 13:49:22.023Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-26 13:49:22.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.768Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 74

## 2026-08-26 13:49:22.769Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 13:49:22.778Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.789Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.789Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:22.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:49:23.759Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:52:03.709Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:52:03.747Z navigate
- url: http://localhost:3000/produto/k53nt9vabcgojf8
- via: pushState

## 2026-08-26 13:52:06.869Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.877Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.877Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.877Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.956Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:06.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.274Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.473Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.474Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.491Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.580Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.580Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.599Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.632Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.632Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.653Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.654Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.703Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:09.704Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:10.582Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 13:52:10.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:10.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.372Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.372Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.387Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.388Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.405Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.405Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:52:11.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:31.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:31.843Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.764Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.775Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.775Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.775Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.776Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.778Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.779Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.779Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.780Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.780Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.780Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.908Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:57.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.425Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.431Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.432Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.432Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.432Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.432Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.432Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.440Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.441Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.572Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:58:58.573Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:59:51.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 13:59:51.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:00:29.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:00:29.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.891Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.893Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.894Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.901Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.902Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.913Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:20.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:21.696Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:21.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.509Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.513Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:01:22.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:24.141Z load
- url: http://localhost:3000/produto/k53nt9vabcgojf8
- title: Avante Lingerie | Oficial

## 2026-08-26 14:04:27.812Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.832Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.951Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:27.952Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:31.540Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:31.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:31.632Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:31.633Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:32.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:32.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.189Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.254Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.254Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.588Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:47.588Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:48.389Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 14:04:48.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:48.402Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.268Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.269Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.291Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.292Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:50.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.889Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.906Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.922Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.923Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.969Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.969Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.986Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:52.986Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.007Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.036Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.036Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.053Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.053Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.070Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.071Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.170Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.170Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.370Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.370Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.790Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.790Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.807Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.836Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.836Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.853Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.853Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.868Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.868Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.886Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.886Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:04:53.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:01.380Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-08-26 14:05:01.397Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-26 14:05:02.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.511Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 108

## 2026-08-26 14:05:03.517Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:05:03.686Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.688Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.688Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.693Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.708Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.708Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:05:03.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:07:38.444Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 14:08:31.821Z click
- element: {"tag":"button","role":null,"ariaLabel":"Favoritar","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 14:08:34.891Z click
- element: {"tag":"button","role":null,"ariaLabel":"Favoritar","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 14:08:56.992Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.005Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.048Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.064Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:08:57.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.238Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.258Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.273Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.273Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.281Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.281Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:16.285Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.042Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.052Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.053Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.059Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.060Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.729Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:18.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:20.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.009Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.011Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.041Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.042Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.075Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.088Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.088Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.093Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:09:21.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:15.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:15.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:15.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.041Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.141Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.142Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.147Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:16.147Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.194Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.212Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.330Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.330Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.347Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.709Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.783Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 67

## 2026-08-26 14:12:17.797Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:12:17.817Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.818Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.818Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.843Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.844Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.894Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:12:17.894Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.889Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.909Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.909Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.925Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.935Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:28.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.237Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.237Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:29.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.274Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.274Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.553Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.562Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.572Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:30.572Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.175Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.175Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.688Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.689Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.690Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.693Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.696Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.696Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:33.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.093Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.293Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.300Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.308Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:16:34.310Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:36.104Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-26 14:17:37.865Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-08-26 14:17:37.881Z navigate
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- via: pushState

## 2026-08-26 14:17:38.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:38.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:41.449Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-26 14:17:41.459Z submit
- action: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Pijama Feminino Longo Suede Light Conjunto Blusa Calça Macio Confortável Inverno Aveludado Confortável Dia a Dia M G GG","length":119,"redacted":false},{"label":"Gerado automaticamente pela IA...","type":"text","value":"Pijama Feminino Suede Conjunto Longo - Avante Lingerie","length":54,"redacted":false},{"label":"Gerado automaticamente pela IA com funil de Varejo/Atacado...","type":"textarea","value":"Noites com máximo aconchego direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!","length":154,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"okqcy3xzr7pff8b","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-PIJ-8689","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"75","length":2,"redacted":false},{"label":"[number]","type":"number","value":"49.89","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"25","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"30","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Desfrute de momentos de puro relaxamento com o Conjunto de Pijama Feminino Longo Avante Lingerie. Desenvolvido para proporcionar elegância e bem-estar em suas noites de inverno e momentos de descanso no dia a dia.\n🌸 Com um toque aveludado irresistível, este conjunto une a sofisticação de uma modelagem impecável ao aconchego necessário para renovar suas energias com muito estilo.","length":384,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/pijama_sueder.mp4","length":53,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-26 14:17:42.055Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"40bnrds09kg7dio"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 313

## 2026-08-26 14:17:42.055Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-26 14:17:42.056Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-26 14:17:42.124Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:42.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:42.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:42.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:48.359Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-26 14:17:49.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:49.703Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:49.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:49.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.206Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.308Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.323Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:51.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:53.758Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 14:17:55.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.541Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 47

## 2026-08-26 14:17:56.542Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:17:56.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.565Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.567Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.586Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.586Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:17:56.590Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.376Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.483Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.483Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:30.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.937Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.938Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.939Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.939Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.948Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:41.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.369Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.370Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.371Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.371Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.917Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.919Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.919Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.923Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.923Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.935Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:43.935Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:48.169Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-26 14:18:49.246Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-08-26 14:18:49.258Z navigate
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- via: pushState

## 2026-08-26 14:18:49.410Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.413Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.413Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.413Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:49.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:18:54.775Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-26 14:18:54.972Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-26 14:19:00.417Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"z7i4vmn1n7io1np","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-26 14:19:00.445Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"z7i4vmn1n7io1np","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-26 14:19:11.277Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"z7i4vmn1n7io1np","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-26 14:19:11.494Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-26 14:19:11.529Z submit
- action: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Pijama Feminino Longo Suede Light Conjunto Blusa Calça Macio Confortável Inverno Aveludado Confortável Dia a Dia M G GG","length":119,"redacted":false},{"label":"Gerado automaticamente pela IA...","type":"text","value":"Pijama Feminino Suede Conjunto Longo - Avante Lingerie","length":54,"redacted":false},{"label":"Gerado automaticamente pela IA com funil de Varejo/Atacado...","type":"textarea","value":"Noites com máximo aconchego direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!","length":154,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"z7i4vmn1n7io1np","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-PIJ-8689","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"75","length":2,"redacted":false},{"label":"[number]","type":"number","value":"49.89","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"25","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"30","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Desfrute de momentos de puro relaxamento com o Conjunto de Pijama Feminino Longo Avante Lingerie. Desenvolvido para proporcionar elegância e bem-estar em suas noites de inverno e momentos de descanso no dia a dia.\n🌸 Com um toque aveludado irresistível, este conjunto une a sofisticação de uma modelagem impecável ao aconchego necessário para renovar suas energias com muito estilo.","length":384,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/pijama_sueder.mp4","length":53,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-26 14:19:11.978Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"40bnrds09kg7dio"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 214

## 2026-08-26 14:19:11.980Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-26 14:19:11.994Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-26 14:19:12.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:12.142Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:12.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:12.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:16.795Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 14:19:20.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.166Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.264Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 72

## 2026-08-26 14:19:20.294Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:19:20.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.307Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.329Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.329Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.335Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.335Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:19:20.339Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:13.741Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 14:25:13.738Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-26 14:25:16.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:16.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:16.408Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:16.408Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:17.908Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:17.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.015Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 89

## 2026-08-26 14:25:18.019Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:25:18.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.026Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.026Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.051Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.052Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.077Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.078Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.087Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:25:18.088Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:32.245Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 14:27:32.241Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-26 14:27:34.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:34.710Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.196Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 290

## 2026-08-26 14:27:35.196Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:27:35.287Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.288Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.288Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.326Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:35.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:37.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:37.616Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:37.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:37.632Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.705Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.712Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.714Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.714Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:45.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.662Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.667Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.668Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.682Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:27:52.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:28:04.672Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 14:44:50.189Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.209Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.287Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.290Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.743Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:50.744Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.502Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.503Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.505Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.505Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.538Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:44:51.539Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:11.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.599Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.667Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.667Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.670Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.670Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.962Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:12.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.756Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.761Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.770Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.771Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.771Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:54:13.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:57:59.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:57:59.901Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:57:59.901Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.482Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.619Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.619Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:00.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.444Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.447Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.449Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.463Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.486Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.486Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.488Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.489Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.815Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.853Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 30

## 2026-08-26 14:58:01.860Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:58:01.869Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.870Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.882Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.883Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.903Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:58:01.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:03.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:03.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:03.913Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.251Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.599Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:04.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.503Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.503Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.503Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.514Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.539Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.539Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.541Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.854Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.855Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.930Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 64

## 2026-08-26 14:59:05.941Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 14:59:05.953Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.965Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.969Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.970Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.988Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.988Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.990Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 14:59:05.991Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:08.945Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-26 15:00:08.946Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 15:00:20.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:20.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:20.797Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:20.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:23.273Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:23.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.222Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 917

## 2026-08-26 15:00:24.235Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 15:00:24.273Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.275Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.318Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.364Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.450Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.452Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:00:24.463Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:01:40.514Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 15:02:03.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.180Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:03.181Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.751Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.770Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:02:19.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:07.163Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 15:03:09.450Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.786Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 326

## 2026-08-26 15:03:09.787Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 15:03:09.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.813Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.813Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.815Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:09.816Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:03:39.966Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 15:23:10.435Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 15:23:13.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.418Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 111

## 2026-08-26 15:23:13.420Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 15:23:13.432Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.435Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.435Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.453Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.454Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.463Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:23:13.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:08.337Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 15:24:24.502Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.529Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.529Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.618Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.619Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.652Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.653Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.937Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:24.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.834Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.834Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.835Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.839Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.839Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.840Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.840Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.849Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.849Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.851Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.852Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.917Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.918Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.918Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.922Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.922Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:24:25.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.541Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.541Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.567Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.568Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.590Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.591Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:04.591Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.152Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:05.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.533Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:17.534Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.532Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.539Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.541Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:21.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.788Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.789Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.790Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.810Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.811Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.811Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.813Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.813Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.814Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.814Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.816Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.816Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.817Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.817Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.834Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.835Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.835Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.839Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.839Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.840Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.851Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.852Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.853Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:29.853Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.046Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.046Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.050Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.051Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:30.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.586Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.594Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.635Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.636Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.637Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.637Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:32.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.939Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:33.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.100Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:37.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.367Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.367Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.370Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.371Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.373Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.374Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.381Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.845Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.855Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.855Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.862Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.862Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.863Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:25:45.864Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.557Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.564Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.564Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.584Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.595Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.596Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.678Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.678Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.682Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:30.682Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.568Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.569Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.765Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.766Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.766Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.766Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.770Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:26:38.770Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.509Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.651Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.738Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.824Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.827Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.830Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.837Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:32:22.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:03.448Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 15:38:06.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.123Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.215Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 88

## 2026-08-26 15:38:06.216Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 15:38:06.249Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.290Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.290Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:06.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.087Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.100Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:23.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.592Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.599Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.599Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.604Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.604Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.615Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:38:31.616Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.523Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.524Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:44:29.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.497Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.513Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.514Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.519Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.529Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.535Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.535Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:45:27.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:31.488Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 15:46:32.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.902Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.902Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.907Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.908Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.915Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.915Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.923Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:32.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.034Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.034Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.036Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.037Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.037Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:46:33.037Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.343Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.454Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.455Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:20.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:21.808Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 15:48:26.213Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.389Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 163

## 2026-08-26 15:48:26.390Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 15:48:26.449Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.458Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.474Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.474Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.714Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.716Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.736Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:26.736Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.113Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.113Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.117Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.117Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.119Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.119Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.133Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:28.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.568Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.568Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.573Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.574Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.582Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.582Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.588Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.588Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.845Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.853Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.854Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.855Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:48:49.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.316Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-26 15:52:10.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.654Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.655Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.657Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.713Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.713Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.713Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.716Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.716Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.716Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:52:10.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.190Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.238Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.238Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.254Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.254Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.256Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:48.256Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.143Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.144Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.144Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.166Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.166Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:49.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.655Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.656Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.656Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.662Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.665Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:50.665Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.310Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.313Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.313Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.639Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.645Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.645Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.646Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.646Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.701Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.701Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.701Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.710Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.717Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.717Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:54:51.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.113Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.318Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.319Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:45.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:51.252Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 15:56:54.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.091Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.274Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 151

## 2026-08-26 15:56:54.275Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 15:56:54.279Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.285Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.285Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.291Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.313Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.313Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:56:54.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.669Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.695Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.704Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.705Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:16.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.422Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.423Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.436Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.437Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.440Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.440Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.452Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.452Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.454Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 15:57:17.455Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.922Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.951Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.953Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:42.953Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.018Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.020Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.028Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.028Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:43.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:44.242Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-26 16:04:46.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.372Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.458Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 80

## 2026-08-26 16:04:46.458Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-26 16:04:46.465Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.473Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.473Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-26 16:04:46.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:12:49.467Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-31 12:12:59.680Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-31 12:13:03.489Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:03.501Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.220Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 714

## 2026-08-31 12:13:04.221Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-31 12:13:04.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:04.799Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Aceitar & Continuar"}

## 2026-08-31 12:13:46.784Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-31 12:13:47.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.034Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.051Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.051Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.058Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.059Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.076Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.076Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.077Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.087Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 12:13:47.087Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:47:55.473Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-31 13:47:57.372Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-31 13:47:57.673Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-31 13:47:58.844Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-31 13:47:59.051Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-31 13:48:14.349Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-31 13:48:14.350Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-31 13:48:14.352Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-31 13:48:14.565Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-31 13:48:19.701Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-31 13:48:19.701Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-31 13:48:19.931Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-31 13:48:19.940Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-31 13:48:20.068Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-31 13:48:26.431Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Coleções"}

## 2026-08-31 13:48:26.432Z navigate
- url: http://localhost:3000/admin/colecoes
- via: pushState

## 2026-08-31 13:48:28.847Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-31 13:48:28.848Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-31 13:48:34.580Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-31 13:48:36.177Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"","valueLength":0,"text":""}

## 2026-08-31 13:48:36.395Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"","valueLength":0,"text":""}

## 2026-08-31 13:48:39.248Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:48:39.249Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:48:39.465Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-31 13:48:43.946Z load
- url: http://localhost:3000/admin/categorias
- title: Avante Lingerie | Oficial

## 2026-08-31 13:48:50.479Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-31 13:48:55.101Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"","valueLength":0,"text":""}

## 2026-08-31 13:48:55.311Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"","valueLength":0,"text":""}

## 2026-08-31 13:49:02.025Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:02.026Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:05.794Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:07.030Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:10.858Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:12.030Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:12.273Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:17.110Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"URL do MP4","label":"URL do MP4","value":"https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4","valueLength":60,"text":""}

## 2026-08-31 13:49:17.313Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-31 13:49:51.851Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-31 13:49:52.355Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-31 13:49:53.408Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.436Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.556Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 114

## 2026-08-31 13:49:53.557Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-31 13:49:53.569Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.574Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.574Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.588Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.590Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 13:49:53.684Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:40.562Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-31 14:34:42.736Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-31 14:34:44.588Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.592Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.745Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 152

## 2026-08-31 14:34:44.746Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-31 14:34:44.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.816Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.816Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.823Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.823Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.826Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:44.826Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-31 14:34:49.686Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-31 14:35:18.151Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-31 14:35:19.369Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-31 14:35:19.951Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-31 14:35:21.328Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-31 14:35:21.478Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-31 14:35:34.211Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-31 14:35:34.212Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-31 14:35:34.213Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-31 14:35:34.425Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-31 14:35:39.295Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-31 14:35:39.295Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-31 14:35:39.509Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-31 14:35:39.512Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-31 14:35:39.664Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-31 14:35:43.162Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-31 14:35:43.164Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-09-02 15:13:42.936Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-09-02 15:13:53.092Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-02 15:13:54.505Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.866Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 347

## 2026-09-02 15:13:54.873Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-02 15:13:54.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.930Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.938Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.939Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.965Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:54.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:13:57.409Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Aceitar & Continuar"}

## 2026-09-02 15:14:09.377Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.409Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.409Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.427Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.427Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.430Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:09.431Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.249Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.249Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.268Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.269Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.270Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:11.270Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:23.925Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:14:23.972Z navigate
- url: http://localhost:3000/produto/40bnrds09kg7dio
- via: pushState

## 2026-09-02 15:14:24.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.239Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:24.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.213Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.597Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.661Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.661Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.678Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:33.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:34.592Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:14:34.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:34.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:36.737Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 3","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:14:36.745Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:36.745Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:37.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:37.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:37.509Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:37.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:37.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:37.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.767Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.768Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:40.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.194Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.451Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.495Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.561Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.665Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.696Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.696Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.744Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.745Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:41.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.026Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.042Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.042Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.077Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.078Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.117Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.117Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.192Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.192Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.275Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.275Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.325Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.325Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.343Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.360Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.377Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.410Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.410Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.427Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.444Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.444Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.525Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.594Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.595Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.661Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.693Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.693Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.743Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.743Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.776Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.808Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.808Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.827Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.827Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.844Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.845Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.860Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.861Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.876Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.876Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.910Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.975Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.975Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.993Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:43.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:44.965Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 1","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:14:44.971Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:44.972Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:14:45.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:25.849Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:15:57.464Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.473Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.725Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.756Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.774Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.774Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.790Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.790Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.842Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.842Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.874Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.890Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.890Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.907Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.907Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:15:57.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:02.097Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 7","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:16:02.103Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:02.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:03.954Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 8","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:16:03.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:03.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.690Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.690Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.775Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.775Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.808Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.809Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.841Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.892Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.906Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.907Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.975Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.975Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.991Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:04.992Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.058Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.058Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.090Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.090Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.107Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.107Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.141Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.141Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.156Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.156Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.176Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.176Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.206Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.223Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.223Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.241Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.374Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.374Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.388Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.388Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.406Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.406Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.443Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.474Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.474Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.491Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.523Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.524Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.539Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.540Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.557Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.574Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.574Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.590Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.590Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.624Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.624Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.973Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:05.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.469Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.469Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.490Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.491Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.538Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.538Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.554Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.606Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.616Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.617Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.650Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.670Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.670Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.704Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.704Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.736Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.755Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.755Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.805Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.805Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.837Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.837Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.904Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.953Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.953Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.971Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.972Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.988Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:22.988Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.005Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.022Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.022Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:23.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:26.814Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 1","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:16:26.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:26.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:27.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:27.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:27.738Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:27.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:27.755Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:16:27.755Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:06.973Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:06.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:08.054Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:08.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:09.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:09.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:17.952Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:17.953Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:19.756Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:19.756Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:17:22.254Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:18:01.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:18:01.454Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:18.985Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-02 15:54:27.140Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.164Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.164Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.164Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.164Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.335Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:54:27.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.340Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.355Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.355Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.355Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.357Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.357Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.357Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.357Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.358Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.358Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.359Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.360Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:01.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.152Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.152Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.152Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:56:02.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:15.407Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-02 15:57:18.538Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.652Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:18.653Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:42.063Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Provador Virtual"}

## 2026-09-02 15:57:42.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:42.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:57:44.246Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:57:44.455Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:57:51.077Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"O que você já usa?Essa é a forma mais precisa de encontrarmos o seu caimento perfeito na Avante.Tamanho de Sutiã (Numeração)Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+Tamanho de Calça JeansSelecione...34/36384042444648+Próximo "}

## 2026-09-02 15:57:56.050Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:57:56.280Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:57:59.341Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:57:59.358Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:58:03.495Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:58:04.411Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:58:05.355Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 15:58:05.355Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:05.579Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:07.050Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:08.589Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:10.835Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Provador Virtual"}

## 2026-09-02 15:58:12.154Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:12.380Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:13.635Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:13.654Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:17.604Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione...34/36384042444648+"}

## 2026-09-02 15:58:17.824Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Próximo "}

## 2026-09-02 15:58:23.631Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"","valueLength":0,"text":""}

## 2026-09-02 15:58:23.833Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"","valueLength":0,"text":""}

## 2026-09-02 15:58:26.330Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"78","valueLength":2,"text":""}

## 2026-09-02 15:58:26.331Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"78","valueLength":2,"text":""}

## 2026-09-02 15:58:26.334Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"","valueLength":0,"text":""}

## 2026-09-02 15:58:26.546Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"","valueLength":0,"text":""}

## 2026-09-02 15:58:41.356Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"164","valueLength":3,"text":""}

## 2026-09-02 15:58:41.357Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"164","valueLength":3,"text":""}

## 2026-09-02 15:58:41.581Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Proporcional"}

## 2026-09-02 15:58:45.513Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Próximo "}

## 2026-09-02 15:58:52.977Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Mais SoltinhoPrioridade total para mobilidade e conforto"}

## 2026-09-02 15:58:54.931Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Descobrir Meu Tamanho"}

## 2026-09-02 15:59:07.082Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 15:59:07.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 15:59:07.147Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:17.001Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-02 16:08:18.882Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.885Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.886Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:18.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:23.325Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Provador Virtual"}

## 2026-09-02 16:08:23.355Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:23.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:08:28.477Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 16:08:28.701Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 16:08:30.891Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 16:08:30.912Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 16:08:33.468Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 16:08:33.471Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 16:08:33.687Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 16:08:36.188Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 16:08:36.206Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 16:08:38.192Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 16:08:38.417Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Próximo Passo"}

## 2026-09-02 16:08:42.938Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"","valueLength":0,"text":""}

## 2026-09-02 16:08:43.155Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"","valueLength":0,"text":""}

## 2026-09-02 16:08:45.629Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"78","valueLength":2,"text":""}

## 2026-09-02 16:08:45.631Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"78","valueLength":2,"text":""}

## 2026-09-02 16:08:45.633Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"","valueLength":0,"text":""}

## 2026-09-02 16:08:45.850Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"","valueLength":0,"text":""}

## 2026-09-02 16:08:51.563Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"165","valueLength":3,"text":""}

## 2026-09-02 16:08:51.563Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"165","valueLength":3,"text":""}

## 2026-09-02 16:08:51.780Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Mais no Quadril"}

## 2026-09-02 16:08:53.652Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Próximo Passo"}

## 2026-09-02 16:08:56.398Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Mais SoltinhoPrioridade para mobilidade e fluidez"}

## 2026-09-02 16:08:57.696Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Descobrir Tamanho"}

## 2026-09-02 16:09:12.670Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 16:09:12.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:09:12.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 16:09:36.635Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Tabela de Medidas"}

## 2026-09-02 16:09:40.229Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-09-02 16:09:42.242Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guia de Medidas"}

## 2026-09-02 16:09:44.992Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-09-02 16:10:28.900Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 16:12:33.743Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-02 17:13:57.566Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-02 17:14:09.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.769Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.771Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.772Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.774Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.775Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.776Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.778Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.778Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.779Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.780Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.780Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.780Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:09.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:10.036Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:14:10.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:16.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:16.824Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.618Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.627Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.638Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.638Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.638Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.765Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:17.766Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.797Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.798Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.798Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.798Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.799Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.800Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:18.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:20.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:20.435Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:22.894Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 17:15:52.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:52.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.519Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.519Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.523Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.523Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.523Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.616Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:15:53.616Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:09.746Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-02 17:18:12.935Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.939Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.941Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.941Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.941Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:12.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:13.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:13.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:18:27.431Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Tabela de Medidas"}

## 2026-09-02 17:18:43.539Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-09-02 17:18:45.968Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-02 17:20:31.522Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Provador Virtual"}

## 2026-09-02 17:20:32.027Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:20:32.052Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:20:38.190Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 17:20:38.557Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 17:20:49.605Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 17:20:50.161Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 17:20:56.341Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"44","valueLength":2,"text":"Selecione a numeração...38 (PP)40 (P)42 (M)44 (G)46 (GG)48 (XG)50+"}

## 2026-09-02 17:20:56.363Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 17:20:56.696Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 17:21:09.332Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"48","valueLength":2,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 17:21:09.371Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"48","valueLength":2,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 17:21:19.979Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"48","valueLength":2,"text":"Selecione a numeração...34/36384042444648+"}

## 2026-09-02 17:21:20.230Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Próximo Passo"}

## 2026-09-02 17:21:22.968Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"","valueLength":0,"text":""}

## 2026-09-02 17:21:23.191Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"","valueLength":0,"text":""}

## 2026-09-02 17:21:37.430Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"78","valueLength":2,"text":""}

## 2026-09-02 17:21:37.432Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65","label":"Ex: 65","value":"78","valueLength":2,"text":""}

## 2026-09-02 17:21:37.438Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"","valueLength":0,"text":""}

## 2026-09-02 17:21:40.721Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"170","valueLength":3,"text":""}

## 2026-09-02 17:21:40.722Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 165","label":"Ex: 165","value":"170","valueLength":3,"text":""}

## 2026-09-02 17:21:51.202Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Mais no Quadril"}

## 2026-09-02 17:21:53.386Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Próximo Passo"}

## 2026-09-02 17:22:02.591Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Mais SoltinhoPrioridade para mobilidade e fluidez"}

## 2026-09-02 17:22:03.859Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Descobrir Tamanho"}

## 2026-09-02 17:22:22.036Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Continuar Comprando"}

## 2026-09-02 17:22:22.108Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:22.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.916Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.921Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.922Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.948Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:30.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.256Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.256Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.258Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.274Z unhandledrejection
- message: The user aborted a request.

## 2026-09-02 17:22:31.473Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:31.474Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:22:37.962Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Tabela de Medidas"}

## 2026-09-02 17:22:55.065Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Close"}

## 2026-09-02 17:23:17.111Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Seu CEP","label":"Seu CEP","value":"","valueLength":0,"text":""}

## 2026-09-02 17:23:17.311Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Seu CEP","label":"Seu CEP","value":"","valueLength":0,"text":""}

## 2026-09-02 17:23:24.302Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Seu CEP","label":"Seu CEP","value":"21921930","valueLength":8,"text":""}

## 2026-09-02 17:23:24.303Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Seu CEP","label":"Seu CEP","value":"21921930","valueLength":8,"text":""}

## 2026-09-02 17:23:24.520Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Calcular"}

## 2026-09-02 17:23:27.637Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Calcular"}

## 2026-09-02 17:23:37.432Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Calcular"}

## 2026-09-02 17:24:20.589Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Calcular"}

## 2026-09-02 17:24:29.252Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:24:29.279Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:24:29.376Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:24:29.377Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:25:24.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:25:24.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:25:27.866Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Calcular"}

## 2026-09-02 17:28:52.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.790Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.827Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.981Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:52.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.023Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.119Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.119Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:28:53.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.458Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.469Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.469Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.469Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.470Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:29.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:30.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:30:30.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.018Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.018Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.018Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.019Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.020Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.020Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.022Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.072Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:26.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:27.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:27.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.289Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.307Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.307Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.308Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.310Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.310Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.729Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.731Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:52.966Z console.error
- text: 
    Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components%s 
        at input
        at div
        at div
        at div
        at section
        at div
        at article
        at ProductPage (http://localhost:3000/src/pages/ProductPage.jsx?t=1788370426277:62:18)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=6a46656c:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=6a46656c:7258:3)
        at main
        at div
        at StoreLayout (http://localhost:3000/src/App.jsx?t=1788369349279:151:24)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=6a46656c:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=6a46656c:7258:3)
        at AppInterceptor (http://localhost:3000/src/App.jsx?t=1788369349279:188:20)
        at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)
        at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=6a46656c:7188:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=6a46656c:10402:3)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at App

## 2026-09-02 17:33:53.869Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.869Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.870Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.870Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.874Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.874Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-02 17:33:53.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

