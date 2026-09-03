# SESSION_JOURNAL.md (rotated - earlier entries trimmed)

e replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:03.048Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:03.187Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:03.189Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:16.972Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:28:22.720Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-09-03 16:28:23.219Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/notificacoes
- status: 500
- statusText: Internal Server Error
- durationMs: 244

## 2026-09-03 16:28:23.222Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/notificacoes: 

## 2026-09-03 16:28:23.962Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-09-03 16:28:23.974Z navigate
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- via: pushState

## 2026-09-03 16:28:24.575Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.580Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.580Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.580Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:28:24.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:29:03.805Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:29:06.572Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:29:08.819Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:29:10.941Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:29:18.100Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:29:18.257Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:29:18.445Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:29:18.665Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:29:20.622Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:29:20.628Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-09-03 16:29:20.846Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-09-03 16:29:27.585Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, ","valueLength":19,"text":""}

## 2026-09-03 16:29:27.585Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, ","valueLength":19,"text":""}

## 2026-09-03 16:29:27.598Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:27.922Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:28.018Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:28.684Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:28.945Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:29.165Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:31.263Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:29:31.265Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, ","valueLength":19,"text":""}

## 2026-09-03 16:29:31.478Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, ","valueLength":19,"text":""}

## 2026-09-03 16:29:35.692Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, ","valueLength":42,"text":""}

## 2026-09-03 16:29:35.692Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, ","valueLength":42,"text":""}

## 2026-09-03 16:29:35.692Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:29:35.903Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:29:36.102Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:29:36.316Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:29:38.382Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:29:38.383Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, ","valueLength":42,"text":""}

## 2026-09-03 16:29:38.605Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, ","valueLength":42,"text":""}

## 2026-09-03 16:29:41.867Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, ","valueLength":42,"text":""}

## 2026-09-03 16:29:52.047Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações ","valueLength":63,"text":""}

## 2026-09-03 16:29:52.047Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações ","valueLength":63,"text":""}

## 2026-09-03 16:29:52.048Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:29:52.258Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:29:52.441Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:29:52.659Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:29:55.104Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:29:55.111Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações ","valueLength":63,"text":""}

## 2026-09-03 16:29:55.329Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações ","valueLength":63,"text":""}

## 2026-09-03 16:30:20.709Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, ","valueLength":89,"text":""}

## 2026-09-03 16:30:20.710Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, ","valueLength":89,"text":""}

## 2026-09-03 16:30:20.712Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:30:20.919Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:30:21.124Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:30:21.348Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:30:23.799Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:30:23.801Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, ","valueLength":89,"text":""}

## 2026-09-03 16:30:24.019Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, ","valueLength":89,"text":""}

## 2026-09-03 16:30:32.200Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, Cinza Estrelas","valueLength":103,"text":""}

## 2026-09-03 16:30:32.201Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, Cinza Estrelas","valueLength":103,"text":""}

## 2026-09-03 16:30:34.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.621Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.621Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:34.774Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:41.012Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"-64% OFFPijama0.0AVL-PIJ-8689Pijama Feminino Suede Conjunto Longo - Avante LingerieNoites com máximo aconchego direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!R$ 83,33Baixou 10%R$ 75,00em até 12x de R$ 6,25 sem juros no cartão de crédito.Boutique de Descontos ProgressivosLeve mais, pague menosTotal Parcial:R$ 0,00Adicione peças e desbloqueie até 20% OFF Progressivo de alta costura!15% OFFR$ 300,0020% OFFR$ 900,00Tabela de MedidasProvador VirtualCorSelecione uma opçãoTamanhoSelecione uma opçãoG (44–46)GG (46–48)M (42–44)P (38–40)Quantidade1AdicionarCOMPRAR AGORACalcular o frete e prazo de entregaCalcularComprando agora, o envio é realizado em até 24 horas úteis.Compra SeguraCriptografia SSL de ponta a pontaTroca FácilArrependimento em 7 dias, ou defeitos em 30 dias.Envio RápidoDiscreto e perfumado para todo o BR"}

## 2026-09-03 16:30:42.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.619Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.620Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.633Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.633Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.648Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.713Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.713Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.733Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.748Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.748Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.763Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.763Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.804Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:42.804Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:30:44.798Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, Cinza Estrelas","valueLength":103,"text":""}

## 2026-09-03 16:30:46.700Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Preto Mini Flores, Preto Escuro Morangos, Lilás Claro Corações, Azul Marinho Margaridas, Cinza Estrelas","valueLength":103,"text":""}

## 2026-09-03 16:30:46.706Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-09-03 16:30:46.924Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-09-03 16:30:51.036Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:30:51.333Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"Cinza ECinza EstrelasGstrelas","valueLength":29,"text":""}

## 2026-09-03 16:30:53.298Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Variações do ProdutoInforme os atributos e valores padrões abaixo para gerar todas as variações.Estoque Total: 0 unTamanhos (ex: P, M, G, GG)Cores (ex: Preto, Romance, Chocolate)Estoque PadrãoPreço Varejo Padrão (R$)Preço Atacado Padrão (R$)Gerar VariaçõesCorTamanhoSKUImagem / FotoEstoquePreço Varejo (R$)Preço Atacado (R$)StatusAçõesNenhuma variação adicionada ainda. Digite tamanhos e cores na linha acima para gerar a lista!"}

## 2026-09-03 16:31:03.563Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), ","valueLength":11,"text":""}

## 2026-09-03 16:31:03.564Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), ","valueLength":11,"text":""}

## 2026-09-03 16:31:07.253Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), ","valueLength":11,"text":""}

## 2026-09-03 16:31:22.228Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), ","valueLength":23,"text":""}

## 2026-09-03 16:31:22.228Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), ","valueLength":23,"text":""}

## 2026-09-03 16:31:25.747Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), ","valueLength":23,"text":""}

## 2026-09-03 16:31:35.520Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), M (42-44), ","valueLength":34,"text":""}

## 2026-09-03 16:31:35.520Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), M (42-44), ","valueLength":34,"text":""}

## 2026-09-03 16:31:39.753Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), M (42-44), ","valueLength":34,"text":""}

## 2026-09-03 16:31:49.478Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), M (42-44), P (38-40)","valueLength":43,"text":""}

## 2026-09-03 16:31:49.479Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"G (44-46), GG (46-48), M (42-44), P (38-40)","valueLength":43,"text":""}

## 2026-09-03 16:31:49.484Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-09-03 16:31:49.692Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-09-03 16:31:57.486Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-09-03 16:31:57.487Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-09-03 16:31:57.490Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"75","valueLength":2,"text":""}

## 2026-09-03 16:31:57.714Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"75","valueLength":2,"text":""}

## 2026-09-03 16:32:01.571Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"75.00","valueLength":5,"text":""}

## 2026-09-03 16:32:01.571Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"75.00","valueLength":5,"text":""}

## 2026-09-03 16:32:01.574Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-09-03 16:32:01.796Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-09-03 16:32:06.038Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"75.00","valueLength":5,"text":""}

## 2026-09-03 16:32:06.038Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"75.00","valueLength":5,"text":""}

## 2026-09-03 16:32:06.039Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:06.212Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:06.388Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:06.612Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:08.712Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:08.713Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-09-03 16:32:08.937Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-09-03 16:32:14.616Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:14.616Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"49.89","valueLength":5,"text":""}

## 2026-09-03 16:32:14.824Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:32:14.837Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-09-03 16:32:16.182Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:32:16.191Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-09-03 16:32:22.997Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-09-03 16:32:35.481Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-09-03 16:32:35.713Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-09-03 16:32:36.752Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-09-03 16:32:39.344Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-09-03 16:32:39.563Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-09-03 16:32:39.585Z submit
- action: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Pijama Feminino Longo Suede Light Conjunto Blusa Calça Macio Confortável Inverno Aveludado Confortável Dia a Dia M G GG","length":119,"redacted":false},{"label":"Gerado automaticamente pela IA...","type":"text","value":"Pijama Feminino Suede Conjunto Longo - Avante Lingerie","length":54,"redacted":false},{"label":"Gerado automaticamente pela IA com funil de Varejo/Atacado...","type":"textarea","value":"Noites com máximo aconchego direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!","length":154,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"z7i4vmn1n7io1np","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-PIJ-8689","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"75.00","length":5,"redacted":false},{"label":"[number]","type":"number","value":"49.89","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"25","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"30","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Desfrute de momentos de puro relaxamento com o Conjunto de Pijama Feminino Longo Avante Lingerie. Desenvolvido para proporcionar elegância e bem-estar em suas noites de inverno e momentos de descanso no dia a dia.\n🌸 Com um toque aveludado irresistível, este conjunto une a sofisticação de uma modelagem impecável ao aconchego necessário para renovar suas energias com muito estilo.","length":384,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Mini Flores","length":17,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Mini Flores","length":17,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Escuro Morangos","length":21,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Escuro Morangos","length":21,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Lilás Claro Corações","length":20,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Lilás Claro Corações","length":20,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Azul Marinho Margaridas","length":23,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Cinza Estrelas","length":14,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Cinza Estrelas","length":14,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/pijama_sueder.mp4","length":53,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-09-03 16:32:40.905Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"40bnrds09kg7dio"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 404

## 2026-09-03 16:32:40.910Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-09-03 16:32:40.922Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-09-03 16:32:41.272Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:41.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:41.288Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:41.289Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:48.824Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-09-03 16:32:58.044Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 16:32:59.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:59.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:59.670Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:32:59.672Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:00.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:25.992Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-09-03 16:33:26.053Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-09-03 16:33:30.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:31.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.582Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 708

## 2026-09-03 16:33:32.588Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 16:33:32.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.702Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.718Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.718Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.735Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.748Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:32.749Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:37.747Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:33:37.762Z navigate
- url: http://localhost:3000/produto/40bnrds09kg7dio
- via: pushState

## 2026-09-03 16:33:38.175Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.192Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.192Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.194Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.194Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.194Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.413Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:33:38.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:00.764Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:34:26.241Z navigate
- url: http://localhost:3000/
- via: popstate

## 2026-09-03 16:34:29.898Z navigate
- url: http://localhost:3000/admin/produtos
- via: popstate

## 2026-09-03 16:34:30.593Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- requestBody: {"session_id":"sess_pukixpxwd9mmtlpkfs3","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- message: signal is aborted without reason
- durationMs: 2035

## 2026-09-03 16:34:30.625Z console.warn
- text: Analytics Tracking Ignore: The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.

## 2026-09-03 16:34:31.175Z unhandledrejection
- message: signal is aborted without reason
- stack: 
    AbortError: signal is aborted without reason
        at Client.cancelRequest (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=6a46656c:892:70)
        at Client.initSendOptions (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=6a46656c:968:34)
        at Client.send (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=6a46656c:928:15)
        at RecordService.create (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=6a46656c:448:78)
        at RecordService.create (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=6a46656c:508:18)
        at trackEvent (http://localhost:3000/src/hooks/useMarketingTracker.js:20:39)
        at http://localhost:3000/src/hooks/useMarketingTracker.js:63:7
        at commitHookEffectListMount (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=6a46656c:16963:34)
        at commitPassiveMountOnFiber (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=6a46656c:18206:19)
        at commitPassiveMountEffects_complete (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=6a46656c:18179:17)

## 2026-09-03 16:34:31.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:31.550Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:31.553Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:31.553Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:31.573Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:31.574Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:31.679Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 47

## 2026-09-03 16:34:31.679Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 16:34:34.139Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Sinta-se linda, confortável e confiante\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"..."}

## 2026-09-03 16:34:35.247Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-09-03 16:34:35.258Z navigate
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- via: pushState

## 2026-09-03 16:34:35.319Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.319Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.319Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.319Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.320Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.320Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.320Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.320Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:34:35.320Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:36:14.609Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:14.736Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:14.924Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:15.141Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:17.225Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:21.387Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:22.657Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Mini Flores","valueLength":17,"text":""}

## 2026-09-03 16:36:22.657Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:22.887Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:23.210Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:23.433Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:25.553Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:30.644Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:33.143Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preto Escuro Morangos","valueLength":21,"text":""}

## 2026-09-03 16:36:33.146Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:33.340Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:33.514Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:33.733Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:35.372Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:40.031Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:41.337Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Lilás Claro Corações","valueLength":20,"text":""}

## 2026-09-03 16:36:41.338Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:41.518Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:41.701Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:41.917Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:43.502Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:47.217Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:48.800Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Azul Marinho Margaridas","valueLength":23,"text":""}

## 2026-09-03 16:36:48.801Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:36:48.987Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:36:49.164Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:36:49.386Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:36:52.499Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Cinza Estrelas","valueLength":14,"text":""}

## 2026-09-03 16:48:25.624Z load
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- title: Avante Lingerie | Oficial

## 2026-09-03 16:48:31.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:48:31.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:09.256Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-09-03 16:52:10.481Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-03 16:52:14.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:14.624Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.038Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 1361

## 2026-09-03 16:52:16.046Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 16:52:16.076Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.093Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.208Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.222Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.222Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:16.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:20.353Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:52:20.426Z navigate
- url: http://localhost:3000/produto/40bnrds09kg7dio
- via: pushState

## 2026-09-03 16:52:21.189Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.206Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.206Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:21.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:32.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:32.940Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.032Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.032Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.054Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.054Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.071Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:33.071Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:35.664Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:52:53.225Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-09-03 16:52:55.669Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-09-03 16:52:59.552Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-09-03 16:52:59.558Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-09-03 16:52:59.701Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:59.709Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:59.710Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:52:59.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:01.639Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-09-03 16:53:02.623Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-09-03 16:53:02.624Z navigate
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- via: pushState

## 2026-09-03 16:53:02.857Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.858Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:02.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:33.150Z load
- url: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- title: Avante Lingerie | Oficial

## 2026-09-03 16:53:35.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:35.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:38.087Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-09-03 16:53:38.113Z submit
- action: http://localhost:3000/admin/produtos/40bnrds09kg7dio/editar
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Pijama Feminino Longo Suede Light Conjunto Blusa Calça Macio Confortável Inverno Aveludado Confortável Dia a Dia M G GG","length":119,"redacted":false},{"label":"Gerado automaticamente pela IA...","type":"text","value":"Pijama Feminino Suede Conjunto Longo - Avante Lingerie","length":54,"redacted":false},{"label":"Gerado automaticamente pela IA com funil de Varejo/Atacado...","type":"textarea","value":"Noites com máximo aconchego direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!","length":154,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"z7i4vmn1n7io1np","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-PIJ-8689","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"75","length":2,"redacted":false},{"label":"[number]","type":"number","value":"49.89","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"25","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"30","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_9kotjav1ze.de202611_25_10.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_qa5j6hb7xk.de202611_29_11.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_km5jnwtjda.de202611_32_19.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_de_ago_61pj4tgjy8.de202611_27_46.png","length":54,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"chat_gpt_image_25_08_2026_11_15_02_rpz1fkdcxf.png","length":49,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"75","length":2,"redacted":false},{"label":"Usar base","type":"number","value":"49.89","length":5,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Desfrute de momentos de puro relaxamento com o Conjunto de Pijama Feminino Longo Avante Lingerie. Desenvolvido para proporcionar elegância e bem-estar em suas noites de inverno e momentos de descanso no dia a dia.\n🌸 Com um toque aveludado irresistível, este conjunto une a sofisticação de uma modelagem impecável ao aconchego necessário para renovar suas energias com muito estilo.","length":384,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Mini Flores","length":17,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Mini Flores","length":17,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Escuro Morangos","length":21,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preto Escuro Morangos","length":21,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Lilás Claro Corações","length":20,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Lilás Claro Corações","length":20,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Azul Marinho Margaridas","length":23,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Cinza Estrelas","length":14,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Cinza Estrelas","length":14,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/pijama_sueder.mp4","length":53,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-09-03 16:53:38.578Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"40bnrds09kg7dio"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 74

## 2026-09-03 16:53:38.580Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-09-03 16:53:38.587Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-09-03 16:53:38.716Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:38.716Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:38.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:38.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.271Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-09-03 16:53:41.273Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-09-03 16:53:41.738Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.794Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.851Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 55

## 2026-09-03 16:53:41.852Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 16:53:41.854Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.854Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.854Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.857Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.857Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.862Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.862Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.869Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.870Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.872Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.873Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.875Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.876Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.881Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:41.882Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.642Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:53:47.655Z navigate
- url: http://localhost:3000/produto/40bnrds09kg7dio
- via: pushState

## 2026-09-03 16:53:47.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:47.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:53:48.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:03.401Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 16:55:18.061Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 16:55:23.023Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.528Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:23.529Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:30.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 16:55:30.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:14.449Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 17:55:39.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.690Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.690Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.695Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.696Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:55:39.874Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:25.715Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 17:56:36.822Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 17:56:39.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.646Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 17:56:39.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.105Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.106Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.106Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.106Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.106Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.107Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.107Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.108Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.108Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.109Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.109Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.109Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:27.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.156Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:00:34.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:03.946Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 18:03:07.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:03:07.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:52.953Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:09:56.036Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Mini Flores","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:09:56.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.286Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.287Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.287Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.288Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:56.289Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:57.648Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Mini Flores","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:09:58.897Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Escuro Morangos","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:09:58.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:58.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:58.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:58.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:58.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:58.909Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:09:58.909Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.158Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"GG (46-48)"}

## 2026-09-03 18:10:00.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.220Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.220Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.221Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:00.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.725Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Lilás Claro Corações","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:01.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.736Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.748Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.748Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.749Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.749Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.749Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:01.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.170Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Azul Marinho Margaridas","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:03.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.184Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:03.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.943Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Cinza Estrelas","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:04.948Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.981Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.981Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.990Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:04.991Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.843Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Mini Flores","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:08.845Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.859Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.877Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.889Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:08.889Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.339Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.339Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.358Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.359Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.359Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.360Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.368Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.369Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.406Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.407Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.408Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.408Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.409Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:12.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.646Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.648Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.654Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.654Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.672Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.680Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.686Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.686Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.709Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.709Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.715Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.724Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.738Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.746Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.746Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.747Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.747Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.747Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.753Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.776Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.777Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.813Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.814Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.814Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.815Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.815Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.830Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.830Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.835Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.835Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.835Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.837Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.837Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.845Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.850Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.851Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.851Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.851Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.851Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.868Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.869Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.883Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.883Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.901Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.901Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.917Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.917Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.965Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.965Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.984Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.984Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:13.997Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.009Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.028Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.028Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.034Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.034Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.044Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.044Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.050Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.050Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.970Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.971Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:14.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.000Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.028Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.030Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.038Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.050Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.067Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.067Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.076Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.076Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.077Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.077Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.077Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.096Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.109Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.131Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.133Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.166Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.166Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.176Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.184Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.643Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.644Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.645Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.652Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.652Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.664Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.664Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.668Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:15.669Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:24.397Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cropped"}

## 2026-09-03 18:10:24.412Z navigate
- url: http://localhost:3000/categoria/cropped
- via: pushState

## 2026-09-03 18:10:25.234Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:25.234Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.577Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:29.578Z navigate
- url: http://localhost:3000/produto/k53nt9vabcgojf8
- via: pushState

## 2026-09-03 18:10:29.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.979Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.980Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:29.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.068Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Vinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:46.072Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:46.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.697Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Cinza","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:47.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.700Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:47.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.279Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.279Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.280Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.280Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.281Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.307Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.316Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.318Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.324Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.325Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.335Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.337Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.351Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.352Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.354Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.359Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.360Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.366Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.367Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.367Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.367Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.367Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.375Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.375Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.391Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.392Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.402Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.402Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.402Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.403Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.404Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.405Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.405Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.414Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.425Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.425Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.450Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.450Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.483Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.483Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.494Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.524Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.525Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.525Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.525Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.561Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.561Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.561Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.566Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.566Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.584Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.584Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.594Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.594Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.595Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.595Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.595Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.596Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.596Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.596Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.617Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.617Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.624Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.642Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.664Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.664Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.676Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.677Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.682Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:48.682Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.168Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.169Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.201Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.226Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.227Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.242Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.247Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.259Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.275Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.276Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.304Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.318Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.319Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.320Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.330Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.340Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.340Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.341Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.342Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.342Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.342Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.342Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.343Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.364Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.370Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.371Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.409Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.409Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.445Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.446Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.458Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.458Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.459Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.459Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.464Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.465Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.480Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.480Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.480Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.507Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:49.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.215Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:50.218Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.220Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.221Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.221Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.222Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.222Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.222Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.237Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.611Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.612Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.621Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.622Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.628Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.628Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.628Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.628Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.629Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.634Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.634Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.648Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.648Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.649Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.650Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.650Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.665Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.665Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.676Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.676Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.682Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.683Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.685Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.699Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.708Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.708Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.708Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.712Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.712Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.723Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:50.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.060Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"GG (44-46)"}

## 2026-09-03 18:10:53.060Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.061Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.067Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.091Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.092Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.093Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.093Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:53.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.123Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Verde-Militar","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:55.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:55.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.790Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preta","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:56.791Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.794Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.794Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.807Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.818Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.823Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.832Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:56.833Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.639Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Vinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.641Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.647Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.648Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.657Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.657Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.658Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.664Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:10:59.664Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.955Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Branca","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:11:01.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.965Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.966Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.988Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:01.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.441Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.441Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.441Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.442Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.447Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.447Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.475Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.486Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.486Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.498Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.498Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.498Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.509Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.525Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.525Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.527Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.527Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.527Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.535Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.550Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.550Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.564Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.564Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.571Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.586Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.586Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.594Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.595Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.610Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.630Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.631Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.632Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.659Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.660Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.673Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.674Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.681Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.690Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.691Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.692Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.705Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.711Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.718Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.736Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.743Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.744Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.751Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.751Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.752Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.763Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:06.763Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:07.823Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-09-03 18:11:07.840Z navigate
- url: http://localhost:3000/categoria/todas
- via: pushState

## 2026-09-03 18:11:08.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:08.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:08.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:08.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:10.982Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pijama"}

## 2026-09-03 18:11:10.983Z navigate
- url: http://localhost:3000/categoria/pijama
- via: pushState

## 2026-09-03 18:11:11.004Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.004Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.007Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.008Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.143Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:11.143Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.053Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:11:16.055Z navigate
- url: http://localhost:3000/produto/40bnrds09kg7dio
- via: pushState

## 2026-09-03 18:11:16.133Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.609Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.615Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:16.615Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.572Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Cinza Estrelas","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:11:28.575Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.575Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.576Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.576Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.576Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:28.598Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:31.991Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"GG (46-48)"}

## 2026-09-03 18:11:31.993Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:31.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:31.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:31.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:31.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.005Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.005Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.023Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:11:32.023Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:51.945Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Escuro Morangos","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:12:52.027Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:12:52.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.704Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.730Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.731Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.732Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.733Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.733Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.868Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:10.870Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.159Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.298Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:11.298Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.093Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.103Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.103Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.103Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.119Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.135Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.135Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.135Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.141Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.141Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.147Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.153Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.164Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.168Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.168Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.177Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.185Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.185Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.202Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.202Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.227Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.227Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.227Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.243Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.281Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.281Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.293Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.310Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.332Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.332Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:22.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.278Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 1","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:31:23.281Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:23.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.863Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.864Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.865Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.878Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.879Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.882Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.882Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.900Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.911Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.916Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.917Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.930Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.930Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.962Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.962Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.962Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:24.996Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.114Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.122Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.124Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.133Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.133Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.134Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.139Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.148Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.152Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.152Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.165Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.182Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.182Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.195Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.271Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.271Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.285Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.285Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.312Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.317Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.332Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.332Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.363Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.363Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.368Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.368Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.378Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.399Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.399Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.415Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.415Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.930Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.930Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.930Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.951Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.951Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:25.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.018Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.027Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.027Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.027Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.027Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.028Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.032Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.050Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.051Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.062Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.067Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.067Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.078Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.079Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.079Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.079Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.079Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.094Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.095Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.111Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.117Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.196Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.212Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.212Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.212Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.227Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.246Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.251Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.279Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.282Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.299Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.327Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.328Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.332Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.332Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.365Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.393Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.397Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.397Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.476Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.556Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:26.557Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.111Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.111Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.113Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.129Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.129Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.129Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.133Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.145Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.146Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:27.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:28.846Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:28.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:28.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:28.847Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:28.848Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.817Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.821Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.822Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.828Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.829Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.948Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.948Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:32.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:33.007Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:33.007Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:41.195Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 18:31:43.257Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.308Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.309Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:43.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:47.603Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 18:31:48.454Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.456Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.457Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.497Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:48.498Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.345Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:31:52.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.350Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:52.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.469Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.480Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.480Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.486Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.495Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.496Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.496Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.496Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.496Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.502Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.502Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.512Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:53.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:55.177Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:31:56.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:56.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:56.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:56.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:31:56.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:12.037Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 18:33:13.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.929Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.970Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.971Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.971Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.971Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.972Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:13.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.819Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.820Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.825Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.831Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.832Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.832Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.832Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.832Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.838Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.843Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.844Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.844Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.844Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.844Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.849Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.849Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.856Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.857Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.857Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.857Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.861Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.862Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.886Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.888Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.920Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.925Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.925Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.932Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.938Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.938Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.949Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.962Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.989Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.990Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.993Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:20.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.010Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.029Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.043Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.044Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.930Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:33:21.933Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.935Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:21.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.591Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.592Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.592Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.592Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.593Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.600Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.607Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.608Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.613Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.621Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.621Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.622Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.622Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.622Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.625Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.639Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.640Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.645Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:24.646Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:26.299Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:33:27.993Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:27.993Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:27.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:27.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:33:27.995Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.542Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.575Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.576Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.578Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.580Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.581Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.582Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.582Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.582Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.584Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.585Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.585Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.585Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.634Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.637Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.637Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.639Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.639Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.742Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:23.744Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.081Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.081Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.081Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.085Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.119Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:24.225Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.377Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.379Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.380Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.382Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.388Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.389Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.399Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.401Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.403Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.439Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.440Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.550Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.552Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.552Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.557Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.558Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.560Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.561Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.565Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.565Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.565Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.603Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.675Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:37:48.679Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:13.859Z load
- url: http://localhost:3000/produto/40bnrds09kg7dio
- title: Avante Lingerie | Oficial

## 2026-09-03 18:40:15.291Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.294Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.361Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.362Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.396Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:15.399Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.446Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:40:37.460Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.464Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.464Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.464Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.464Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:37.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.720Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.721Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.734Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.741Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.766Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.766Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.773Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.774Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.779Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.781Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.802Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.807Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:45.807Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:47.486Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:40:48.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:48.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:48.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:48.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:40:48.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.381Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Cinza Estrelas","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:11.383Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.384Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.385Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.398Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.411Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.412Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.415Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:11.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.155Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Mini Flores","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:13.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.157Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.158Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:13.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.070Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Escuro Morangos","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:15.072Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.072Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:15.086Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.489Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"G (44-46)"}

## 2026-09-03 18:41:16.491Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.492Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.493Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.522Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.529Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:16.529Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.781Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Lilás Claro Corações","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:17.782Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.792Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.793Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.805Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.806Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.815Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:17.816Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.043Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Azul Marinho Margaridas","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:20.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.046Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.046Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.047Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.057Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.058Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:20.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.226Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Cinza Estrelas","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:21.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.246Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.247Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.247Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.248Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.258Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:21.258Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:22.998Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:22.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:22.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:22.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:22.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.006Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.034Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.048Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.049Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.056Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.066Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.073Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.088Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:23.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:24.281Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-09-03 18:41:24.293Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-09-03 18:41:25.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.206Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.557Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 348

## 2026-09-03 18:41:25.558Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 18:41:25.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.738Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.738Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.742Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.743Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.746Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.746Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.754Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.754Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.755Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.755Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.757Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.759Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:25.759Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.002Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:30.004Z navigate
- url: http://localhost:3000/produto/k53nt9vabcgojf8
- via: pushState

## 2026-09-03 18:41:30.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.124Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.124Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.124Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.125Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.128Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.129Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.129Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.129Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.161Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.162Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.163Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.174Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.466Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.467Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.471Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.484Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.485Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.489Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.489Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.504Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.516Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.516Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.521Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.538Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.555Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.556Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.556Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.556Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.556Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.556Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.566Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:30.567Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.956Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Branca","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:35.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.970Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.970Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.981Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:35.982Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.199Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"M (38-40)"}

## 2026-09-03 18:41:38.201Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.202Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.202Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.202Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.203Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.204Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.227Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:38.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.415Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Azul-Marinho","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:39.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.418Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.433Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.434Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:39.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.212Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preta","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:41.213Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.232Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:41.237Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.067Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.068Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.078Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.079Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.084Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.097Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.098Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.102Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.114Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.115Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.120Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.131Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.136Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.149Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.150Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.154Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.155Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.166Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.167Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.168Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.168Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.168Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.172Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.185Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.185Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.186Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.186Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.186Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.186Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.186Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.186Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.190Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.190Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.201Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.201Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.217Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.217Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.217Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.217Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.217Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.221Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.221Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.234Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.236Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.240Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.249Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.249Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.255Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.255Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.265Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.266Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.269Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.270Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.288Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.289Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.302Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.302Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.302Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.302Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.305Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.323Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.323Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.323Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.333Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:42.333Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:43.877Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-09-03 18:41:43.879Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-09-03 18:41:44.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.205Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.274Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 47

## 2026-09-03 18:41:44.274Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 18:41:44.295Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.297Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.302Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.303Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.306Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.318Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.318Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.322Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:44.323Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.816Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:48.818Z navigate
- url: http://localhost:3000/produto/40bnrds09kg7dio
- via: pushState

## 2026-09-03 18:41:48.956Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.956Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:48.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.002Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.002Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.002Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.002Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.002Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.314Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.333Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.333Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.334Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.334Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.334Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.339Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.348Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.348Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.348Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.356Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.357Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.368Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.369Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.369Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.369Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.369Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.373Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:49.374Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.332Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Mini Flores","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:41:58.338Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.344Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.345Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.346Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.355Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.355Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.381Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.381Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.381Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.381Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:41:58.381Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.329Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Preto Escuro Morangos","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:42:02.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.331Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.336Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:02.336Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.257Z click
- element: {"tag":"button","role":null,"ariaLabel":"Selecionar cor Lilás Claro Corações","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:42:04.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.263Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.264Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.274Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:04.274Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:06.181Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:06.182Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:06.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:06.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:06.183Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.063Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.064Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.064Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.064Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.065Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.069Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.070Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.082Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.083Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.089Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.099Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.100Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.100Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.103Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.112Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.116Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.461Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.462Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.468Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.478Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.479Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.482Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.483Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.498Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.499Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.515Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.523Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.524Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.530Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.531Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.534Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.534Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.549Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.562Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.562Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.562Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.562Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.566Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.566Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.579Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:23.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:27.761Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:27.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:27.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:27.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:27.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.927Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.928Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.934Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.943Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.944Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.950Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.961Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.962Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.983Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.983Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.994Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:30.999Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.011Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.011Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.011Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.011Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.012Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:31.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.307Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 2","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:42:32.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.311Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:32.315Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.573Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 3","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:42:38.576Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.576Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:38.583Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.893Z click
- element: {"tag":"button","role":null,"ariaLabel":"Ver imagem 8","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-03 18:42:42.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.896Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.902Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:42.903Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.210Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.211Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.212Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.235Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.244Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.245Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.246Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.247Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.253Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.260Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.261Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.262Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.267Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.277Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:45.284Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:46.862Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:46.863Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:46.863Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:46.864Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:42:46.864Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:26.882Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-09-03 18:44:26.912Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-09-03 18:44:27.722Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:27.726Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:27.770Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 41

## 2026-09-03 18:44:27.771Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-09-03 18:44:28.197Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.198Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.200Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.206Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.207Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.213Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.213Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.216Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.220Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-09-03 18:44:28.220Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

