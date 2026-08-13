# SESSION_JOURNAL.md (rotated - earlier entries trimmed)

onseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 17:57:38.544Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 17:57:38.544Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 17:57:38.545Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 17:57:42.200Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 17:57:42.557Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_e8t7psxldqlmsrtme50","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 20

## 2026-08-13 17:57:42.557Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 22

## 2026-08-13 17:57:42.559Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 21

## 2026-08-13 17:57:42.560Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 17:57:42.560Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 17:57:42.561Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 17:57:42.561Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 17:57:42.563Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 17:57:42.563Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 17:57:42.578Z window.error
- message: Uncaught ReferenceError: FactoryMarquee is not defined
- source: http://localhost:3000/src/pages/HomePage.jsx
- line: 394
- col: 28
- stack: 
    ReferenceError: FactoryMarquee is not defined
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:394:28)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19190:13)

## 2026-08-13 17:57:42.588Z window.error
- message: Uncaught ReferenceError: FactoryMarquee is not defined
- source: http://localhost:3000/src/pages/HomePage.jsx
- line: 394
- col: 28
- stack: 
    ReferenceError: FactoryMarquee is not defined
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:394:28)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19190:13)

## 2026-08-13 17:57:42.593Z console.error
- text: 
    The above error occurred in the <HomePage> component:
    
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:32:33)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at main
        at div
        at StoreLayout (http://localhost:3000/src/App.jsx:151:24)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at AppInterceptor (http://localhost:3000/src/App.jsx:188:20)
        at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)
        at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7188:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:10402:3)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at App
    
    React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.

## 2026-08-13 17:57:42.593Z console.error
- text: 
    🔴 ErrorBoundary caught an error: ReferenceError: FactoryMarquee is not defined
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:394:28)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:15962:22)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19806:22)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19190:13)
        at renderRootSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19169:15)
        at recoverFromConcurrentError (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:18786:28)
        at performConcurrentWorkOnRoot (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:18734:30)

## 2026-08-13 17:57:42.593Z console.error
- text: 🔴 Error details: {"componentStack":"\n    at HomePage (http://localhost:3000/src/pages/HomePage.jsx:32:33)\n    at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)\n    at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)\n    at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)\n    at main\n    at div\n    at StoreLayout (http://localhost:3000/src/App.jsx:151:24)\n    at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)\n    at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)\n    at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)\n    at AppInterceptor (http://localhost:3000/src/App.jsx:188:20)\n    at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)\n    at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)\n    at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7188:13)\n    at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:10402:3)\n    at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)\n    at App"}

## 2026-08-13 17:57:42.594Z console.error
- text: 
    🔴 Component stack: 
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:32:33)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at main
        at div
        at StoreLayout (http://localhost:3000/src/App.jsx:151:24)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at AppInterceptor (http://localhost:3000/src/App.jsx:188:20)
        at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)
        at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7188:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:10402:3)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at App

## 2026-08-13 17:57:42.612Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1
- status: 500
- statusText: Internal Server Error
- durationMs: 18

## 2026-08-13 17:57:42.613Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 18

## 2026-08-13 17:57:42.613Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1: 

## 2026-08-13 17:57:42.614Z console.error
- text: 
    [descontosService] Erro ao buscar configurações de descontos ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 17:57:42.614Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 17:57:42.614Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 17:57:42.615Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 17:57:51.298Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 17:57:51.551Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_e8t7psxldqlmsrtme50","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 27

## 2026-08-13 17:57:51.552Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 31

## 2026-08-13 17:57:51.553Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 29

## 2026-08-13 17:57:51.558Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 17:57:51.558Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 17:57:51.559Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 17:57:51.559Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 17:57:51.559Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 17:57:51.560Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 17:57:51.580Z window.error
- message: Uncaught ReferenceError: FactoryMarquee is not defined
- source: http://localhost:3000/src/pages/HomePage.jsx
- line: 394
- col: 28
- stack: 
    ReferenceError: FactoryMarquee is not defined
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:394:28)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19190:13)

## 2026-08-13 17:57:51.592Z window.error
- message: Uncaught ReferenceError: FactoryMarquee is not defined
- source: http://localhost:3000/src/pages/HomePage.jsx
- line: 394
- col: 28
- stack: 
    ReferenceError: FactoryMarquee is not defined
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:394:28)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19190:13)

## 2026-08-13 17:57:51.596Z console.error
- text: 
    The above error occurred in the <HomePage> component:
    
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:32:33)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at main
        at div
        at StoreLayout (http://localhost:3000/src/App.jsx:151:24)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at AppInterceptor (http://localhost:3000/src/App.jsx:188:20)
        at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)
        at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7188:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:10402:3)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at App
    
    React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.

## 2026-08-13 17:57:51.596Z console.error
- text: 
    🔴 ErrorBoundary caught an error: ReferenceError: FactoryMarquee is not defined
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:394:28)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:15962:22)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19806:22)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19190:13)
        at renderRootSync (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:19169:15)
        at recoverFromConcurrentError (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:18786:28)
        at performConcurrentWorkOnRoot (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:18734:30)

## 2026-08-13 17:57:51.596Z console.error
- text: 🔴 Error details: {"componentStack":"\n    at HomePage (http://localhost:3000/src/pages/HomePage.jsx:32:33)\n    at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)\n    at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)\n    at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)\n    at main\n    at div\n    at StoreLayout (http://localhost:3000/src/App.jsx:151:24)\n    at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)\n    at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)\n    at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)\n    at AppInterceptor (http://localhost:3000/src/App.jsx:188:20)\n    at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)\n    at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)\n    at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7188:13)\n    at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:10402:3)\n    at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)\n    at App"}

## 2026-08-13 17:57:51.596Z console.error
- text: 
    🔴 Component stack: 
        at HomePage (http://localhost:3000/src/pages/HomePage.jsx:32:33)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at main
        at div
        at StoreLayout (http://localhost:3000/src/App.jsx:151:24)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:6397:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7258:3)
        at AppInterceptor (http://localhost:3000/src/App.jsx:188:20)
        at AdminAuthProvider (http://localhost:3000/src/context/AdminAuthContext.jsx:8:37)
        at AuthProvider (http://localhost:3000/src/context/AuthContext.jsx:7:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:7188:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=3ea3aab4:10402:3)
        at ErrorBoundary (http://localhost:3000/src/components/ErrorBoundary.jsx:7:5)
        at App

## 2026-08-13 17:57:51.615Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1
- status: 500
- statusText: Internal Server Error
- durationMs: 18

## 2026-08-13 17:57:51.615Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 18

## 2026-08-13 17:57:51.616Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1: 

## 2026-08-13 17:57:51.616Z console.error
- text: 
    [descontosService] Erro ao buscar configurações de descontos ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 17:57:51.616Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 17:57:51.616Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 17:57:51.616Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 17:58:25.080Z click
- element: {"tag":"summary","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Detalhes Técnicos (clique para expandir)"}

## 2026-08-13 17:58:27.112Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 18:05:32.558Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 18:05:33.655Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 230

## 2026-08-13 18:05:33.655Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_e8t7psxldqlmsrtme50","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 228

## 2026-08-13 18:05:33.656Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 226

## 2026-08-13 18:05:33.656Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 18:05:33.660Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 18:05:33.661Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:05:33.661Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:05:33.661Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 18:05:33.662Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 18:05:34.161Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1
- status: 500
- statusText: Internal Server Error
- durationMs: 207

## 2026-08-13 18:05:34.164Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 210

## 2026-08-13 18:05:34.164Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 205

## 2026-08-13 18:05:34.167Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1: 

## 2026-08-13 18:05:34.168Z console.error
- text: 
    [descontosService] Erro ao buscar configurações de descontos ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:05:34.168Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:05:34.168Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:05:34.168Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 18:05:34.168Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:05:36.343Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 2175

## 2026-08-13 18:05:36.344Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:05:36.346Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 2177

## 2026-08-13 18:05:36.346Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:05:36.347Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 2178

## 2026-08-13 18:05:36.347Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:05:36.361Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 2191

## 2026-08-13 18:05:36.361Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 2191

## 2026-08-13 18:05:36.361Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:05:36.362Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id: 

## 2026-08-13 18:05:36.366Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 2197

## 2026-08-13 18:05:36.376Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created: 

## 2026-08-13 18:05:36.394Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 2224

## 2026-08-13 18:05:36.394Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created: 

## 2026-08-13 18:05:37.180Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Aceitar & Continuar"}

## 2026-08-13 18:06:19.108Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 18:08:41.097Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 18:08:41.983Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 18

## 2026-08-13 18:08:41.984Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 18:08:41.986Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 18:08:41.987Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_e8t7psxldqlmsrtme50","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 20

## 2026-08-13 18:08:41.987Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 19

## 2026-08-13 18:08:41.987Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:08:41.987Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:08:41.988Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 18:08:41.988Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 18:08:42.296Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1
- status: 500
- statusText: Internal Server Error
- durationMs: 202

## 2026-08-13 18:08:42.297Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 200

## 2026-08-13 18:08:42.297Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 196

## 2026-08-13 18:08:42.318Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1: 

## 2026-08-13 18:08:42.319Z console.error
- text: 
    [descontosService] Erro ao buscar configurações de descontos ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:08:42.319Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:08:42.319Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:08:42.319Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 18:08:42.319Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:08:42.372Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 52

## 2026-08-13 18:08:42.373Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 53

## 2026-08-13 18:08:42.388Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:08:42.390Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:08:42.390Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 70

## 2026-08-13 18:08:42.397Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 76

## 2026-08-13 18:08:42.398Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 77

## 2026-08-13 18:08:42.399Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:08:42.401Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:08:42.407Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id: 

## 2026-08-13 18:08:42.408Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 87

## 2026-08-13 18:08:42.409Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 87

## 2026-08-13 18:08:42.421Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created: 

## 2026-08-13 18:08:42.422Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created: 

## 2026-08-13 18:08:44.612Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 18:26:04.858Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"O Closet de LuxoNossas CategoriasToque no tecido, escolha o caimento ideal e explore o melhor de Avante."}

## 2026-08-13 18:29:07.996Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 376

## 2026-08-13 18:29:07.998Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:29:08.027Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 20

## 2026-08-13 18:29:08.027Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 20

## 2026-08-13 18:29:08.028Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 21

## 2026-08-13 18:29:08.028Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 21

## 2026-08-13 18:29:08.030Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:29:08.032Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:29:08.034Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 25

## 2026-08-13 18:29:08.034Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:29:08.034Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 24

## 2026-08-13 18:29:08.035Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:29:08.036Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 25

## 2026-08-13 18:29:08.036Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id: 

## 2026-08-13 18:29:08.036Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created: 

## 2026-08-13 18:29:08.036Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created: 

## 2026-08-13 18:32:13.480Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 18:32:14.331Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-13 18:32:14.339Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 79

## 2026-08-13 18:32:14.339Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_e8t7psxldqlmsrtme50","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 78

## 2026-08-13 18:32:14.339Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 77

## 2026-08-13 18:32:14.340Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 18:32:14.342Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 18:32:14.343Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:32:14.343Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:32:14.343Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 18:32:14.343Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 18:32:14.629Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1
- status: 500
- statusText: Internal Server Error
- durationMs: 165

## 2026-08-13 18:32:14.629Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 165

## 2026-08-13 18:32:14.629Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 161

## 2026-08-13 18:32:14.649Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1: 

## 2026-08-13 18:32:14.649Z console.error
- text: 
    [descontosService] Erro ao buscar configurações de descontos ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:32:14.650Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:32:14.650Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:32:14.650Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 18:32:14.651Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:32:14.722Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 70

## 2026-08-13 18:32:14.730Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 78

## 2026-08-13 18:32:14.730Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 78

## 2026-08-13 18:32:14.730Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 78

## 2026-08-13 18:32:14.731Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:14.734Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:14.741Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:14.741Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:14.742Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 89

## 2026-08-13 18:32:14.746Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 94

## 2026-08-13 18:32:14.754Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:14.761Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created: 

## 2026-08-13 18:32:14.860Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 207

## 2026-08-13 18:32:14.880Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created: 

## 2026-08-13 18:32:41.720Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 18:32:42.046Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_e8t7psxldqlmsrtme50","event_type":"page_view","page_path":"/","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 16

## 2026-08-13 18:32:42.047Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 17

## 2026-08-13 18:32:42.048Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 17

## 2026-08-13 18:32:42.049Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:32:42.050Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:32:42.050Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 18:32:42.051Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 18:32:42.051Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 18:32:42.051Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 18:32:42.225Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1
- status: 500
- statusText: Internal Server Error
- durationMs: 101

## 2026-08-13 18:32:42.225Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 101

## 2026-08-13 18:32:42.225Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 98

## 2026-08-13 18:32:42.235Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/configuracoes_estoque/records?page=1&perPage=500&skipTotal=1: 

## 2026-08-13 18:32:42.237Z console.error
- text: 
    [descontosService] Erro ao buscar configurações de descontos ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:32:42.238Z console.error
- text: 
    [useCart] Erro ao carregar configurações de desconto ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async Object.getConfiguracoes (http://localhost:3000/src/services/descontosService.js:7:23)

## 2026-08-13 18:32:42.240Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:32:42.241Z console.error
- text: 
    Erro ao buscar categorias para o Header: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchCategorias (http://localhost:3000/src/components/Header.jsx:39:25)

## 2026-08-13 18:32:42.241Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:32:42.280Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 37

## 2026-08-13 18:32:42.282Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 37

## 2026-08-13 18:32:42.282Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:42.283Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 38

## 2026-08-13 18:32:42.284Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 38

## 2026-08-13 18:32:42.285Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:42.285Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:42.285Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:42.300Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 54

## 2026-08-13 18:32:42.302Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 55

## 2026-08-13 18:32:42.302Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id: 

## 2026-08-13 18:32:42.307Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created: 

## 2026-08-13 18:32:42.340Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 93

## 2026-08-13 18:32:42.344Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created: 

## 2026-08-13 18:33:23.074Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 18:33:50.310Z load
- url: http://localhost:3000/admin
- title: Avante Lingerie | Oficial

## 2026-08-13 18:33:50.694Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-13 18:33:50.746Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 26

## 2026-08-13 18:33:50.746Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 18:33:50.748Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 18:33:50.752Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_if59jcuatqhmsrux08x","event_type":"page_view","page_path":"/admin","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 30

## 2026-08-13 18:33:50.752Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 29

## 2026-08-13 18:33:50.752Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:33:50.752Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:33:50.753Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 18:33:50.753Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 18:33:50.758Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-13 18:33:50.806Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_if59jcuatqhmsrux08x","event_type":"page_view","page_path":"/admin/login","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 28

## 2026-08-13 18:33:50.806Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:33:50.806Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:33:52.019Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 18:33:52.235Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 18:33:53.256Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"avantelingerie@gmail.com","valueLength":24,"text":""}

## 2026-08-13 18:33:54.400Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"avantelingerie@gmail.com","valueLength":24,"text":""}

## 2026-08-13 18:33:55.953Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Área RestritaAcesso exclusivo para administradoresE-mailSenhaACESSAR PAINEL"}

## 2026-08-13 18:34:09.428Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 18:34:09.429Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 18:34:09.430Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-13 18:34:09.650Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-13 18:34:14.986Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 18:34:14.986Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 18:34:15.200Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-13 18:34:15.206Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-13 18:34:15.243Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/usuarios/auth-with-password
- status: 500
- statusText: Internal Server Error
- requestBody: {"identity":"admin@avantelingerie.com.br","password":"[redacted:length=12]"}
- durationMs: 36

## 2026-08-13 18:34:15.244Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/usuarios/auth-with-password: 

## 2026-08-13 18:34:15.244Z console.error
- text: 
    [AdminAuthContext] Login failed: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async RecordService.authWithPassword (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:532:14)
        at async loginAdmin (http://localhost:3000/src/context/AdminAuthContext.jsx:61:24)
        at async handleLogin (http://localhost:3000/src/pages/admin/AdminLogin.jsx:24:24)

## 2026-08-13 18:34:15.244Z console.error
- text: 
    [AdminLogin] Erro na autenticação: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async RecordService.authWithPassword (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:532:14)
        at async loginAdmin (http://localhost:3000/src/context/AdminAuthContext.jsx:61:24)
        at async handleLogin (http://localhost:3000/src/pages/admin/AdminLogin.jsx:24:24)

## 2026-08-13 18:34:23.966Z click
- element: {"tag":"button","role":null,"ariaLabel":"Mostrar senha","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 18:34:27.133Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-13 18:34:27.134Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"text","value":"Admin@123456","length":12,"redacted":false},{"label":"Ocultar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-13 18:34:27.152Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/usuarios/auth-with-password
- status: 500
- statusText: Internal Server Error
- requestBody: {"identity":"admin@avantelingerie.com.br","password":"[redacted:length=12]"}
- durationMs: 17

## 2026-08-13 18:34:27.152Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/usuarios/auth-with-password: 

## 2026-08-13 18:34:27.152Z console.error
- text: 
    [AdminAuthContext] Login failed: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async RecordService.authWithPassword (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:532:14)
        at async loginAdmin (http://localhost:3000/src/context/AdminAuthContext.jsx:61:24)
        at async handleLogin (http://localhost:3000/src/pages/admin/AdminLogin.jsx:24:24)

## 2026-08-13 18:34:27.153Z console.error
- text: 
    [AdminLogin] Erro na autenticação: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async RecordService.authWithPassword (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:532:14)
        at async loginAdmin (http://localhost:3000/src/context/AdminAuthContext.jsx:61:24)
        at async handleLogin (http://localhost:3000/src/pages/admin/AdminLogin.jsx:24:24)

## 2026-08-13 18:42:26.881Z load
- url: http://localhost:3000/admin/login
- title: Avante Lingerie | Oficial

## 2026-08-13 18:42:27.530Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true
- status: 500
- statusText: Internal Server Error
- durationMs: 21

## 2026-08-13 18:42:27.530Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/integracoes_config/records?page=1&perPage=500&skipTotal=1&filter=servico%20%3D%20%22marketing%22%20%26%26%20ativo%20%3D%20true: 

## 2026-08-13 18:42:27.533Z console.warn
- text: 
    AnalyticsTracker: No foi possvel carregar as configuraes de marketing. ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async fetchAnalyticsConfigs (http://localhost:3000/src/components/AnalyticsTracker.jsx:14:25)

## 2026-08-13 18:42:27.535Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/analytics_events/records
- status: 500
- statusText: Internal Server Error
- requestBody: {"session_id":"sess_if59jcuatqhmsrux08x","event_type":"page_view","page_path":"/admin/login","item_id":"","value":"0","utm_source":"","utm_medium":"","utm_campaign":""}
- durationMs: 22

## 2026-08-13 18:42:27.535Z network.error
- method: GET
- url: http://localhost:3000/hcgi/api/configuracoes/modo-em-breve
- status: 500
- statusText: Internal Server Error
- durationMs: 21

## 2026-08-13 18:42:27.535Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/analytics_events/records: 

## 2026-08-13 18:42:27.535Z console.warn
- text: Analytics Tracking Ignore: Something went wrong while processing your request.

## 2026-08-13 18:42:27.535Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/configuracoes/modo-em-breve: 

## 2026-08-13 18:42:27.535Z console.warn
- text: Coming Soon API returned non-OK status - defaulting to normal mode

## 2026-08-13 18:42:28.740Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 18:42:28.960Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 18:42:47.943Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 18:42:47.944Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 18:42:47.945Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-13 18:42:48.140Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-13 18:42:54.341Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 18:42:54.342Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 18:42:54.560Z click
- element: {"tag":"button","role":null,"ariaLabel":"Mostrar senha","name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 18:42:56.076Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-13 18:42:56.089Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"text","value":"Admin@123456","length":12,"redacted":false},{"label":"Ocultar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-13 18:42:56.107Z network.error
- method: POST
- url: http://localhost:3000/hcgi/platform/api/collections/usuarios/auth-with-password
- status: 500
- statusText: Internal Server Error
- requestBody: {"identity":"admin@avantelingerie.com.br","password":"[redacted:length=12]"}
- durationMs: 15

## 2026-08-13 18:42:56.107Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/usuarios/auth-with-password: 

## 2026-08-13 18:42:56.109Z console.error
- text: 
    [AdminAuthContext] Login failed: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async RecordService.authWithPassword (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:532:14)
        at async loginAdmin (http://localhost:3000/src/context/AdminAuthContext.jsx:61:24)
        at async handleLogin (http://localhost:3000/src/pages/admin/AdminLogin.jsx:24:24)

## 2026-08-13 18:42:56.109Z console.error
- text: 
    [AdminLogin] Erro na autenticação: ClientResponseError 500: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async RecordService.authWithPassword (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:532:14)
        at async loginAdmin (http://localhost:3000/src/context/AdminAuthContext.jsx:61:24)
        at async handleLogin (http://localhost:3000/src/pages/admin/AdminLogin.jsx:24:24)

## 2026-08-13 18:51:43.228Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome
- status: 500
- statusText: Internal Server Error
- durationMs: 263

## 2026-08-13 18:51:43.233Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/categorias/records?page=1&perPage=500&skipTotal=1&filter=ativo%20%3D%20true&sort=nome: 

## 2026-08-13 18:51:43.273Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 30

## 2026-08-13 18:51:43.274Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 31

## 2026-08-13 18:51:43.274Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 31

## 2026-08-13 18:51:43.275Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 30

## 2026-08-13 18:51:43.275Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_mais_vendido%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:51:43.278Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_favorito%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:51:43.278Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_promocao%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:51:43.279Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20is_novidade%20%3D%20true&sort=-created&expand=categoria_id: 

## 2026-08-13 18:51:43.282Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id
- status: 500
- statusText: Internal Server Error
- durationMs: 37

## 2026-08-13 18:51:43.283Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 34

## 2026-08-13 18:51:43.283Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created
- status: 500
- statusText: Internal Server Error
- durationMs: 27

## 2026-08-13 18:51:43.284Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=4&filter=status%20%3D%20true%20%26%26%20(categoria%20%3D%20%22Kits%22%20%7C%7C%20is_combo%20%3D%20true)&sort=-created&expand=categoria_id: 

## 2026-08-13 18:51:43.284Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=6&sort=-created: 

## 2026-08-13 18:51:43.290Z console.error
- text: Fetch error from http://localhost:3000/hcgi/platform/api/collections/colecoes/records?page=1&perPage=4&filter=ativo%20%3D%20true&sort=-created: 

## 2026-08-13 19:06:06.289Z load
- url: http://localhost:3000/admin/login
- title: Avante Lingerie | Oficial

## 2026-08-13 19:06:16.285Z load
- url: http://localhost:3000/admin/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:06:16.591Z navigate
- url: http://localhost:3000/admin/
- via: replaceState

## 2026-08-13 19:06:16.653Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-13 19:06:17.803Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 19:06:18.011Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 19:06:28.250Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 19:06:28.251Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 19:06:28.253Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-13 19:06:34.911Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 19:06:34.912Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 19:06:35.139Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-13 19:06:35.146Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-13 19:06:35.315Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-13 19:06:39.818Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-13 19:06:39.819Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-13 19:06:45.804Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Coleções"}

## 2026-08-13 19:06:45.805Z navigate
- url: http://localhost:3000/admin/colecoes
- via: pushState

## 2026-08-13 19:07:00.696Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:07:02.096Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 126

## 2026-08-13 19:07:02.099Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.108Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 139

## 2026-08-13 19:07:02.112Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.119Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 151

## 2026-08-13 19:07:02.120Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 149

## 2026-08-13 19:07:02.120Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.131Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.142Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 171

## 2026-08-13 19:07:02.178Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.179Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 206

## 2026-08-13 19:07:02.205Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.245Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 268

## 2026-08-13 19:07:02.247Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 268

## 2026-08-13 19:07:02.283Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.292Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:07:02.520Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.526Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.528Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.544Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.563Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.569Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.570Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.587Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:02.589Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.694Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.695Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.695Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.707Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.709Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.710Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.718Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:08.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.697Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.706Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.712Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.712Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.714Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.714Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:07:11.719Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:08:02.472Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Nova Colecao"}

## 2026-08-13 19:08:04.043Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"","valueLength":0,"text":""}

## 2026-08-13 19:08:04.252Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"","valueLength":0,"text":""}

## 2026-08-13 19:08:15.401Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"Coleção Dia dos Namorados","valueLength":25,"text":""}

## 2026-08-13 19:08:15.402Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"Coleção Dia dos Namorados","valueLength":25,"text":""}

## 2026-08-13 19:08:15.402Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:08:15.632Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:08:58.241Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:09:06.470Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"C:\\fakepath\\Camisola Sensual  Feminina Noite Com Renda Bicolor Sem Bojo com Forro -Confortável é Sexy.jpg","valueLength":105,"text":""}

## 2026-08-13 19:09:06.679Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar Coleção"}

## 2026-08-13 19:09:12.377Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:09:13.762Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 109

## 2026-08-13 19:09:13.763Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 109

## 2026-08-13 19:09:13.763Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.766Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 113

## 2026-08-13 19:09:13.767Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.770Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.785Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 130

## 2026-08-13 19:09:13.785Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.788Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 134

## 2026-08-13 19:09:13.789Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.860Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 206

## 2026-08-13 19:09:13.860Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 205

## 2026-08-13 19:09:13.872Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.873Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:13.952Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 297

## 2026-08-13 19:09:13.966Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:09:14.100Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.101Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.104Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.121Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.126Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:14.132Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:09:57.694Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:10:08.132Z load
- url: http://localhost:3000/admin/colecoes
- title: Avante Lingerie | Oficial

## 2026-08-13 19:10:11.389Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:10:12.456Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 107

## 2026-08-13 19:10:12.456Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 107

## 2026-08-13 19:10:12.458Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 110

## 2026-08-13 19:10:12.460Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.468Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.468Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 119

## 2026-08-13 19:10:12.468Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.469Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 119

## 2026-08-13 19:10:12.472Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.472Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 123

## 2026-08-13 19:10:12.473Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 123

## 2026-08-13 19:10:12.475Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.475Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 125

## 2026-08-13 19:10:12.478Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.478Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.479Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:10:12.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.601Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.602Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.604Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.605Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.618Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.618Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.619Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.620Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.622Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:12.622Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:10:29.230Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Nova Colecao"}

## 2026-08-13 19:10:30.548Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"","valueLength":0,"text":""}

## 2026-08-13 19:10:30.758Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"","valueLength":0,"text":""}

## 2026-08-13 19:10:50.412Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"Coleção Black frid","valueLength":18,"text":""}

## 2026-08-13 19:10:50.414Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"Coleção Black frid","valueLength":18,"text":""}

## 2026-08-13 19:10:50.415Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:10:50.641Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:11:03.572Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:11:05.165Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"C:\\fakepath\\3.webp","valueLength":18,"text":""}

## 2026-08-13 19:11:05.388Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar Coleção"}

## 2026-08-13 19:11:10.707Z load
- url: http://localhost:3000/admin/colecoes
- title: Avante Lingerie | Oficial

## 2026-08-13 19:11:14.401Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:11:15.610Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 91

## 2026-08-13 19:11:15.623Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.631Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 111

## 2026-08-13 19:11:15.631Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 112

## 2026-08-13 19:11:15.631Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 111

## 2026-08-13 19:11:15.634Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.634Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.635Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.651Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 130

## 2026-08-13 19:11:15.657Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 137

## 2026-08-13 19:11:15.658Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 137

## 2026-08-13 19:11:15.658Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.659Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.666Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.774Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 253

## 2026-08-13 19:11:15.786Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:11:15.954Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.955Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.955Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.955Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.974Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.978Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.985Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:15.985Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:11:50.643Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:11:54.006Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:11:59.874Z load
- url: http://localhost:3000/admin/colecoes
- title: Avante Lingerie | Oficial

## 2026-08-13 19:12:04.825Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:12:05.826Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 86

## 2026-08-13 19:12:05.828Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 89

## 2026-08-13 19:12:05.828Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 88

## 2026-08-13 19:12:05.829Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.832Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 92

## 2026-08-13 19:12:05.834Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.834Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.835Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 94

## 2026-08-13 19:12:05.845Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.846Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 105

## 2026-08-13 19:12:05.846Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 105

## 2026-08-13 19:12:05.847Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.849Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.850Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.850Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 109

## 2026-08-13 19:12:05.852Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:12:05.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.926Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.931Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.969Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.969Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.972Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.973Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:05.976Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:12:18.580Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:12:34.120Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:12:41.634Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-13 19:12:41.644Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-13 19:12:43.402Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Coleções"}

## 2026-08-13 19:12:43.402Z navigate
- url: http://localhost:3000/admin/colecoes
- via: pushState

## 2026-08-13 19:12:47.820Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Nova Colecao"}

## 2026-08-13 19:12:55.219Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"","valueLength":0,"text":""}

## 2026-08-13 19:12:55.418Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"","valueLength":0,"text":""}

## 2026-08-13 19:13:09.629Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"Dia do Namorado","valueLength":15,"text":""}

## 2026-08-13 19:13:09.646Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Lançamentos de Inverno","label":"Ex: Lançamentos de Inverno","value":"Dia do Namorado","valueLength":15,"text":""}

## 2026-08-13 19:13:09.647Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:13:09.852Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:13:22.803Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:13:24.098Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"C:\\fakepath\\dreamina-2026-03-28-3895-Change the clothing to a sophisticated r....jpeg","valueLength":85,"text":""}

## 2026-08-13 19:13:24.313Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar Coleção"}

## 2026-08-13 19:13:26.686Z load
- url: http://localhost:3000/admin/colecoes
- title: Avante Lingerie | Oficial

## 2026-08-13 19:13:30.074Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:13:31.593Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 70

## 2026-08-13 19:13:31.593Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 72

## 2026-08-13 19:13:31.594Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 72

## 2026-08-13 19:13:31.594Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 71

## 2026-08-13 19:13:31.594Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 72

## 2026-08-13 19:13:31.595Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 72

## 2026-08-13 19:13:31.595Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.598Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.600Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.601Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.601Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.602Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.610Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 87

## 2026-08-13 19:13:31.611Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 88

## 2026-08-13 19:13:31.611Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.612Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:13:31.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.737Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.739Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.740Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.758Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.759Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.762Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.770Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:31.770Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.500Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.500Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.501Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.503Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.503Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.510Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.511Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.513Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.514Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.517Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:56.518Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.957Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.959Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.963Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.967Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.968Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:13:58.969Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:10.836Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-13 19:14:10.844Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-13 19:14:10.942Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:10.945Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:13.192Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-13 19:14:15.098Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-08-13 19:14:15.099Z navigate
- url: http://localhost:3000/admin/produtos/qgwevudqxue8gg7/editar
- via: pushState

## 2026-08-13 19:14:15.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:15.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:15.173Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:21.611Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:21.849Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:21.862Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:27.231Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:36.983Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:41.793Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:42.060Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:43.105Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:45.352Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:49.631Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:14:49.851Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ver Loja"}

## 2026-08-13 19:14:53.449Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-13 19:14:53.479Z submit
- action: http://localhost:3000/admin/produtos/qgwevudqxue8gg7/editar
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Cropped Regata Gola Alta","length":24,"redacted":false},{"label":"[select]","type":"select-one","value":"okqcy3xzr7pff8b","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-CRO-7900","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"29.9","length":4,"redacted":false},{"label":"[number]","type":"number","value":"19.9","length":4,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"11","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"20","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_verdemilitar_5_d6532_zrsbonqbuj.png","length":43,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_verdemilitar_5_d6532_zrsbonqbuj.png","length":43,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_verdemilitar_5_d6532_zrsbonqbuj.png","length":43,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_preta_j5zirh32cs.png","length":28,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_preta_j5zirh32cs.png","length":28,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_preta_j5zirh32cs.png","length":28,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_vinho_fhk91imayx.png","length":28,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_vinho_fhk91imayx.png","length":28,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"cropped_vinho_fhk91imayx.png","length":28,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Eleve seu estilo com o Cropped Regata Gola Alta da Avante Lingerie, a união perfeita entre a sofisticação da moda íntima premium e a versatilidade do casual chic.\n💖 Desenvolvido para mulheres que não abrem mão de um conjunto de lingerie confortável, ele transita facilmente entre a sensualidade sutil e o visual urbano.\n👑 Uma peça coringa e indispensável que valoriza sua beleza natural com máxima elegância.","length":412,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Verde-Militar","length":13,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preta","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Vinho","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/cropped.mp4","length":47,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-13 19:14:54.816Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"qgwevudqxue8gg7"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 1112

## 2026-08-13 19:14:54.817Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-13 19:14:54.833Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-13 19:14:55.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:55.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:58.038Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-13 19:14:58.958Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:14:58.960Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:03.021Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:15:04.399Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 123

## 2026-08-13 19:15:04.401Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 124

## 2026-08-13 19:15:04.401Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 129

## 2026-08-13 19:15:04.408Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.411Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 133

## 2026-08-13 19:15:04.413Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.414Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.423Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.424Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 146

## 2026-08-13 19:15:04.436Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.519Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 240

## 2026-08-13 19:15:04.544Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.545Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 266

## 2026-08-13 19:15:04.545Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 270

## 2026-08-13 19:15:04.560Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.560Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:15:04.905Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.906Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.906Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.914Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.914Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.924Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.935Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.936Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.941Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:04.941Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.550Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:15:21.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.787Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.789Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.789Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.795Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.798Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.798Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.801Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:21.802Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.020Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.020Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.021Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.023Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:22.023Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.015Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.017Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.024Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.025Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.036Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.037Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.039Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.040Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:32.045Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.214Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.215Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.218Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.219Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.224Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.228Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.229Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.230Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:35.231Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.428Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.429Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.429Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.439Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.472Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.473Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.475Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.477Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.481Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.481Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.527Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.527Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.528Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.533Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.533Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.543Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.545Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.550Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:15:39.550Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:16:05.978Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dia do NamoradoVer coleção"}

## 2026-08-13 19:16:06.003Z navigate
- url: http://localhost:3000/categoria/dia-do-namorado
- via: pushState

## 2026-08-13 19:16:07.214Z load
- url: http://localhost:3000/categoria/dia-do-namorado
- title: Avante Lingerie | Oficial

## 2026-08-13 19:16:33.110Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-13 19:16:35.038Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Excluir"}

## 2026-08-13 19:16:41.272Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Categorias"}

## 2026-08-13 19:16:41.352Z navigate
- url: http://localhost:3000/admin/categorias
- via: pushState

## 2026-08-13 19:16:44.105Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Coleções"}

## 2026-08-13 19:16:44.106Z navigate
- url: http://localhost:3000/admin/colecoes
- via: pushState

## 2026-08-13 19:16:48.591Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Estoque"}

## 2026-08-13 19:16:48.593Z navigate
- url: http://localhost:3000/admin/estoque
- via: pushState

## 2026-08-13 19:16:50.624Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Clientes"}

## 2026-08-13 19:16:50.625Z navigate
- url: http://localhost:3000/admin/clientes
- via: pushState

## 2026-08-13 19:16:53.059Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-13 19:16:53.060Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-13 19:17:10.373Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-13 19:17:11.946Z load
- url: http://localhost:3000/categoria/dia-do-namorado
- title: Avante Lingerie | Oficial

## 2026-08-13 19:17:12.011Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-13 19:17:14.241Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 19:17:14.459Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"","valueLength":0,"text":""}

## 2026-08-13 19:17:25.584Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 19:17:25.585Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@avantelingerie.com.br","label":"admin@avantelingerie.com.br","value":"admin@avantelingerie.com.br","valueLength":27,"text":""}

## 2026-08-13 19:17:25.588Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-13 19:17:32.087Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 19:17:32.087Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":null,"placeholder":"••••••••","label":"••••••••","value":"[redacted:length=12]","valueLength":12,"text":""}

## 2026-08-13 19:17:32.306Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ACESSAR PAINEL"}

## 2026-08-13 19:17:32.312Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"admin@avantelingerie.com.br","type":"email","value":"admin@avantelingerie.com.br","length":27,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=12]","length":12,"redacted":true},{"label":"Mostrar senha","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-13 19:17:32.448Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-13 19:17:36.737Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Produtos"}

## 2026-08-13 19:17:36.738Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-13 19:17:38.788Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Novo Produto"}

## 2026-08-13 19:17:38.789Z navigate
- url: http://localhost:3000/admin/produtos/novo
- via: pushState

## 2026-08-13 19:17:43.451Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Adicionar Fotos/Vídeos"}

## 2026-08-13 19:17:43.452Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"Adicionar Fotos/Vídeos","value":"","valueLength":0,"text":""}

## 2026-08-13 19:18:03.900Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-13 19:18:04.120Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"","valueLength":0,"text":""}

## 2026-08-13 19:18:34.496Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-13 19:18:34.681Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-13 19:18:34.896Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-13 19:18:35.251Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-13 19:18:37.776Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-13 19:18:37.777Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"Ex: https://youtube.com/shorts/... ou link .mp4","label":"Ex: https://youtube.com/shorts/... ou link .mp4","value":"https://avantelingerie.com.br/video/cropped.mp4","valueLength":47,"text":""}

## 2026-08-13 19:18:37.787Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:37.988Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"last","valueLength":4,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:39.391Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:39.395Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:41.188Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:45.134Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:49.514Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"first","valueLength":5,"text":"Exibir no FinalExibir como Primeira"}

## 2026-08-13 19:18:49.515Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-13 19:18:49.719Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"","valueLength":0,"text":""}

## 2026-08-13 19:18:58.016Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-13 19:18:58.016Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Ex: Conjunto Rendado Paris","label":"Ex: Conjunto Rendado Paris","value":"Cropped Regata Gola Alta","valueLength":24,"text":""}

## 2026-08-13 19:18:58.017Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:18:58.234Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"","valueLength":0,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:19:00.817Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:19:00.820Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:19:05.063Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:20:02.918Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:20:10.114Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"hya9h8gimmcygbn","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:20:11.868Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:20:11.885Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:20:13.022Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"okqcy3xzr7pff8b","valueLength":15,"text":"Selecionar Categoria...BodyCalcinhaCamisolaCinta ModeladoraConjuntoCroppedPijamaPlus Size"}

## 2026-08-13 19:20:13.231Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar Automático"}

## 2026-08-13 19:20:19.614Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:19.829Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:19.840Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:29.326Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Dia do Namorado","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:29.531Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:20:29.551Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:30.712Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:20:30.717Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:31.913Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:20:31.919Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:33.009Z click
- element: {"tag":"button","role":"switch","ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:20:33.015Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"[checkbox]","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:20:35.863Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:36.080Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:37.541Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-13 19:20:37.541Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"29.90","valueLength":5,"text":""}

## 2026-08-13 19:20:37.543Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:39.764Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-13 19:20:39.764Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"19.90","valueLength":5,"text":""}

## 2026-08-13 19:20:39.766Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:42.480Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-13 19:20:42.481Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 150","label":"Ex: 150","value":"150","valueLength":3,"text":""}

## 2026-08-13 19:20:42.482Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:44.814Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-13 19:20:44.814Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 5","label":"Ex: 5","value":"5","valueLength":1,"text":""}

## 2026-08-13 19:20:44.822Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:45.875Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-13 19:20:45.876Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 11","label":"Ex: 11","value":"11","valueLength":2,"text":""}

## 2026-08-13 19:20:45.878Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:51.046Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-13 19:20:51.046Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 20","label":"Ex: 20","value":"20","valueLength":2,"text":""}

## 2026-08-13 19:20:51.048Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:51.262Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:54.602Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-13 19:20:54.602Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-13 19:20:54.603Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:20:54.828Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:21:06.502Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho","valueLength":27,"text":""}

## 2026-08-13 19:21:06.503Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho","valueLength":27,"text":""}

## 2026-08-13 19:21:06.504Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-13 19:21:06.729Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-13 19:21:07.576Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-13 19:21:07.577Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-13 19:21:07.579Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-13 19:21:10.970Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-13 19:21:10.971Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-13 19:21:10.972Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-13 19:21:14.470Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-13 19:21:14.470Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-13 19:21:14.693Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-13 19:21:42.275Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:45.094Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:47.143Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:49.209Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:51.240Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:53.406Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:55.390Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:57.441Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:21:59.824Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:22:06.600Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:06.805Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:11.366Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-13 19:22:11.367Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Verde-Militar","valueLength":13,"text":""}

## 2026-08-13 19:22:11.367Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:11.592Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:13.981Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-13 19:22:13.981Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Preta","valueLength":5,"text":""}

## 2026-08-13 19:22:13.983Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:14.207Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:18.817Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-13 19:22:18.818Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"text","id":null,"placeholder":"Nome / Cor da Mídia","label":"Nome / Cor da Mídia","value":"Vinho","valueLength":5,"text":""}

## 2026-08-13 19:22:18.824Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:19.042Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:22.283Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-13 19:22:22.284Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite os tamanhos separados por vírgula...","label":"Digite os tamanhos separados por vírgula...","value":"P, M, G","valueLength":7,"text":""}

## 2026-08-13 19:22:22.285Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:22.492Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:33.733Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho","valueLength":27,"text":""}

## 2026-08-13 19:22:33.734Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"Digite as cores separadas por vírgula...","label":"Digite as cores separadas por vírgula...","value":"Verde-Militar, Preta, Vinho","valueLength":27,"text":""}

## 2026-08-13 19:22:33.736Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:33.954Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:35.338Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-13 19:22:35.340Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 25","label":"Ex: 25","value":"100","valueLength":3,"text":""}

## 2026-08-13 19:22:35.342Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:37.990Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-13 19:22:37.990Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 79.90","label":"Ex: 79.90","value":"29.90","valueLength":5,"text":""}

## 2026-08-13 19:22:37.991Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"","valueLength":0,"text":""}

## 2026-08-13 19:22:41.000Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-13 19:22:41.000Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":"Ex: 65.00","label":"Ex: 65.00","value":"19.90","valueLength":5,"text":""}

## 2026-08-13 19:22:41.206Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Gerar Variações"}

## 2026-08-13 19:22:45.021Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Assistente de Descrições IA"}

## 2026-08-13 19:22:45.082Z console.warn
- text: Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.

## 2026-08-13 19:22:45.132Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:46.539Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"conforto","valueLength":8,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:49.921Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:49.932Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:53.146Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:56.099Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:58.915Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"cropped","valueLength":7,"text":"Conforto / Dia a DiaSensual / OusadoRomântico / DelicadoLuxo / SofisticadoFitness / EsportivoPijama / LoungewearCropped / OutwearModelador / Cinta"}

## 2026-08-13 19:22:58.916Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-13 19:22:59.124Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"microfibra","valueLength":10,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-13 19:23:00.439Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-13 19:23:00.449Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-13 19:23:01.428Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"algodao","valueLength":7,"text":"MicrofibraRendaAlgodãoTuleCetimVeludo"}

## 2026-08-13 19:23:01.429Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:23:01.656Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:23:01.667Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:23:02.408Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Forro 100% Algodão Hipoalergênico","value":"on","valueLength":2,"text":""}

## 2026-08-13 19:23:02.635Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Gerar com Gemini AI"}

## 2026-08-13 19:23:24.041Z load
- url: http://localhost:3000/categoria/dia-do-namorado
- title: Avante Lingerie | Oficial

## 2026-08-13 19:23:26.490Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-08-13 19:23:26.494Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-13 19:23:26.911Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 94

## 2026-08-13 19:23:26.912Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 96

## 2026-08-13 19:23:26.912Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 96

## 2026-08-13 19:23:26.913Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.920Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.920Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.935Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 117

## 2026-08-13 19:23:26.936Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 118

## 2026-08-13 19:23:26.936Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 118

## 2026-08-13 19:23:26.936Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.937Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.937Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.937Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 119

## 2026-08-13 19:23:26.937Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:26.941Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 122

## 2026-08-13 19:23:26.941Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:27.052Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:27.054Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:27.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:43.126Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Salvar"}

## 2026-08-13 19:23:43.149Z submit
- action: http://localhost:3000/admin/produtos/novo
- fields: [{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"Ex: Conjunto Rendado Paris","type":"text","value":"Cropped Regata Gola Alta","length":24,"redacted":false},{"label":"[select]","type":"select-one","value":"okqcy3xzr7pff8b","length":15,"redacted":false},{"label":"Referência / Código Interno * Gerar Automático","type":"button","value":"","length":0,"redacted":false},{"label":"[input]","type":"text","value":"AVL-CRO-2664","length":12,"redacted":false},{"label":"Dia do Namorado","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Fitness","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"Moda Sexy","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[select]","type":"select-one","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[number]","type":"number","value":"29.90","length":5,"redacted":false},{"label":"[number]","type":"number","value":"19.90","length":5,"redacted":false},{"label":"Ex: 150","type":"number","value":"150","length":3,"redacted":false},{"label":"Ex: 5","type":"number","value":"5","length":1,"redacted":false},{"label":"Ex: 11","type":"number","value":"11","length":2,"redacted":false},{"label":"Ex: 20","type":"number","value":"20","length":2,"redacted":false},{"label":"Digite os tamanhos separados por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Digite as cores separadas por vírgula...","type":"text","value":"","length":0,"redacted":false},{"label":"Ex: 25","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 79.90","type":"number","value":"","length":0,"redacted":false},{"label":"Ex: 65.00","type":"number","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680842-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680842-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680842-0","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680842-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680842-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680842-1","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680843-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680843-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"new-1786648680843-2","length":19,"redacted":false},{"label":"[number]","type":"number","value":"100","length":3,"redacted":false},{"label":"Usar base","type":"number","value":"29.9","length":4,"redacted":false},{"label":"Usar base","type":"number","value":"19.9","length":4,"redacted":false},{"label":"[button]","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"✨ Eleve seu estilo com o **Cropped Regata Gola Alta** da Avante Lingerie, a fusão perfeita entre a sofisticação da moda íntima premium e a versatilidade do casual chic.\n💖 Desenvolvido para mulheres que não abrem mão de um conjunto de lingerie confortável e moderno, ele transita perfeitamente entre looks casuais e momentos de intimidade com toque sensual.\n👑 Sinta a autoconfiança de vestir uma peça que abraça seu corpo com elegância minimalista e design de alto padrão.","length":473,"redacted":false},{"label":"Adicionar Fotos/Vídeos","type":"file","value":"C:\\fakepath\\cropped_verdemilitar(#5D6532).png","length":45,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Verde-Militar","length":13,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Preta","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Nome / Cor da Mídia","type":"text","value":"Vinho","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"Ex: https://youtube.com/shorts/... ou link .mp4","type":"url","value":"https://avantelingerie.com.br/video/cropped.mp4","length":47,"redacted":false},{"label":"[select]","type":"select-one","value":"first","length":5,"redacted":false}]

## 2026-08-13 19:23:44.031Z network.error
- method: POST
- url: http://localhost:3000/hcgi/api/bling/produtos/sincronizar
- status: 400
- statusText: Bad Request
- requestBody: {"produto_id":"36n5jukwjsew8z7"}
- response: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}
- durationMs: 159

## 2026-08-13 19:23:44.034Z console.error
- text: Fetch error from http://localhost:3000/hcgi/api/bling/produtos/sincronizar: {"sucesso":false,"erro":"Erro de autenticação com o Bling: Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.. Recadastre suas credenciais."}

## 2026-08-13 19:23:44.057Z navigate
- url: http://localhost:3000/admin/produtos
- via: pushState

## 2026-08-13 19:23:44.296Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:44.298Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:50.980Z load
- url: http://localhost:3000/admin/produtos
- title: Avante Lingerie | Oficial

## 2026-08-13 19:23:51.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:51.552Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:53.770Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:23:55.207Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 76

## 2026-08-13 19:23:55.208Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 77

## 2026-08-13 19:23:55.208Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 77

## 2026-08-13 19:23:55.208Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 77

## 2026-08-13 19:23:55.209Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 77

## 2026-08-13 19:23:55.210Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.212Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.213Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.213Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.214Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.219Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 87

## 2026-08-13 19:23:55.221Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 89

## 2026-08-13 19:23:55.221Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.224Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.225Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 93

## 2026-08-13 19:23:55.227Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:23:55.412Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.412Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.412Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.416Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.423Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.424Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.429Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:23:55.429Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:24:31.699Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:24:47.323Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tAvante Lingerie | Oficial\n\t\t\n\t\t\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer','GTM-XXXXXXX');\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#roo..."}

## 2026-08-13 19:24:48.630Z click
- element: {"tag":"div","role":"menuitem","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Editar"}

## 2026-08-13 19:24:48.642Z navigate
- url: http://localhost:3000/admin/produtos/36n5jukwjsew8z7/editar
- via: pushState

## 2026-08-13 19:24:48.794Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:24:48.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:24:48.796Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:25:20.501Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dia do NamoradoVer coleção"}

## 2026-08-13 19:25:20.524Z navigate
- url: http://localhost:3000/categoria/dia-do-namorado
- via: pushState

## 2026-08-13 19:25:21.812Z load
- url: http://localhost:3000/categoria/dia-do-namorado
- title: Avante Lingerie | Oficial

## 2026-08-13 19:25:34.119Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-13 19:26:00.154Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-08-13 19:26:00.166Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-13 19:26:00.762Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 137

## 2026-08-13 19:26:00.763Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%220tioxaa5mvtikb6%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.769Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 145

## 2026-08-13 19:26:00.769Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22hya9h8gimmcygbn%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.769Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 145

## 2026-08-13 19:26:00.769Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 145

## 2026-08-13 19:26:00.769Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22219neq337ly8hpm%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.769Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22sz933rrdjx4j62w%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.770Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 145

## 2026-08-13 19:26:00.770Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22vi937hhuvzg154r%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.784Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 160

## 2026-08-13 19:26:00.784Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22okqcy3xzr7pff8b%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.790Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 165

## 2026-08-13 19:26:00.790Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22z7i4vmn1n7io1np%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:00.826Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 202

## 2026-08-13 19:26:00.828Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=1&filter=status%20%3D%20true%20%26%26%20categoria_id%20%3D%20%22km2hb4iq8cyaqut%22%20%26%26%20imagem_produto%20!%3D%20%22%22&skipTotal=1&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 19:26:01.091Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.107Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.108Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.137Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.138Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.142Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.144Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.156Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:01.156Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.708Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.727Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.728Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.749Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.750Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.783Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.784Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.785Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:45.786Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.054Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.055Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.064Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.064Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.074Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.075Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.078Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.078Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.080Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.081Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.871Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.876Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.877Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.889Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.890Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.894Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.895Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:46.899Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.389Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.390Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.400Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.402Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.402Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.403Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:26:47.403Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:29:41.019Z click
- element: {"tag":"h2","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Explore Nossas Coleções"}

## 2026-08-13 19:49:16.666Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.698Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.712Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.754Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.756Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.880Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.881Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.886Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.887Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.897Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:16.898Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:17.906Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:17.912Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:17.913Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:17.946Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:17.947Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.036Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.037Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.044Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.044Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.051Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.052Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.199Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.249Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.250Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.256Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.256Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.278Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.279Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.283Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.290Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:49:18.291Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:21.398Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:52:21.434Z load
- url: http://localhost:3000/admin/produtos/36n5jukwjsew8z7/editar
- title: Avante Lingerie | Oficial

## 2026-08-13 19:52:24.546Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:24.551Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:24.553Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:25.911Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.107Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.110Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.111Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.127Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.170Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.171Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.178Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.179Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.192Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:26.193Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:53.943Z load
- url: http://localhost:3000/admin/produtos/36n5jukwjsew8z7/editar
- title: Avante Lingerie | Oficial

## 2026-08-13 19:52:53.943Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:52:56.031Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:56.032Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:56.033Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.130Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.487Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.488Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.488Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.498Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.500Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.536Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.537Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.547Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.548Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.559Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:52:57.561Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:01.962Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 19:53:01.979Z load
- url: http://localhost:3000/admin/produtos/36n5jukwjsew8z7/editar
- title: Avante Lingerie | Oficial

## 2026-08-13 19:53:04.506Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:04.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:04.508Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.160Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.292Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.293Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.293Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.301Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.321Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.329Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.330Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.348Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 19:53:05.349Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:19.074Z load
- url: http://localhost:3000/
- title: Avante Lingerie | Oficial

## 2026-08-13 20:10:20.144Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.392Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.394Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.395Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.398Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.399Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.417Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.420Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.420Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:20.426Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.001Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.003Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.003Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.013Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.014Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.016Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.977Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.979Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.979Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.983Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.983Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.984Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.984Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.985Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:29.985Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:42.453Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dia do NamoradoVer coleção"}

## 2026-08-13 20:10:42.461Z navigate
- url: http://localhost:3000/categoria/dia-do-namorado
- via: pushState

## 2026-08-13 20:10:42.824Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/products/records?page=1&perPage=24&filter=status%20%3D%20true&sort=-vendidos_semana&expand=categoria_id
- message: Failed to fetch
- durationMs: 147

## 2026-08-13 20:10:42.828Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/:500:23)
        at Client.send (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:939:31)
        at RecordService.getList (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:435:128)
        at RecordService.getList (http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:499:18)
        at http://localhost:3000/src/pages/CategoryPage.jsx?t=1786650564838:121:54
        at http://localhost:3000/src/pages/CategoryPage.jsx?t=1786650564838:150:5
        at commitHookEffectListMount (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:16963:34)
        at commitPassiveMountOnFiber (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:18206:19)
        at commitPassiveMountEffects_complete (http://localhost:3000/node_modules/.vite/deps/chunk-POVVOG4E.js?v=3ea3aab4:18179:17)

## 2026-08-13 20:10:42.829Z console.error
- text: 
    Error fetching products: ClientResponseError 0: ClientResponseError
        at http://localhost:3000/node_modules/.vite/deps/pocketbase.js?v=3ea3aab4:948:13
        at async http://localhost:3000/src/pages/CategoryPage.jsx?t=1786650564838:121:22

## 2026-08-13 20:10:42.973Z load
- url: http://localhost:3000/categoria/dia-do-namorado
- title: Avante Lingerie | Oficial

## 2026-08-13 20:10:43.575Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:10:43.577Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:26:59.187Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-08-13 20:26:59.213Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-13 20:27:00.438Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.620Z network.error
- method: GET
- url: http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created
- status: 400
- statusText: Bad Request
- response: 
    {"data":{},"message":"Something went wrong while processing your request.","status":400}
    
- durationMs: 89

## 2026-08-13 20:27:00.622Z console.error
- text: 
    Fetch error from http://localhost:3000/hcgi/platform/api/collections/testimonials/records?page=1&perPage=10&filter=status%20%3D%20true&sort=-created: {"data":{},"message":"Something went wrong while processing your request.","status":400}
    

## 2026-08-13 20:27:00.626Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.628Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.628Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.633Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.634Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.651Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.652Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.655Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.656Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.662Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:27:00.663Z console.warn
- text: Please replace pb.files.getUrl() with pb.files.getURL()

## 2026-08-13 20:28:52.093Z click
- element: {"tag":"h2","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Explore Nossas Coleções"}

