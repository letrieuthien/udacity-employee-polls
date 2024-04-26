import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import {store} from "./features/store/index.ts";
import {Provider} from "react-redux";
import {ErrorBoundary} from "react-error-boundary";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallbackRender={({error, resetErrorBoundary}) => (
      <div>
        <h2>Something went wrong:</h2>
        <pre style={{whiteSpace: "pre-wrap"}}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )}
  >
    <Provider store={store}>
      <BrowserRouter>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
          <App/>
        </DevSupport>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
