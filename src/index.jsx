import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { createLogger } from "redux-logger";
import allReducers from "./reducers";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from "./components/videoApp/App.jsx";
import Video from "./components/videoApp/Video.jsx";
import YourVideo from "./components/videoApp/YourVideo.jsx";

const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(thunk, promise, logger));
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <div>
        <ul className="header">
          <li ><Link className="btn btn-primary" to="/video/">All video</Link></li>
          <li ><Link className="btn btn-primary" to="/video/your/">Your video</Link></li>
        </ul>
        <Route exact path="/video/" component={App} />
        <Route exact path="/video/your/" component={YourVideo} />
        <Route path="/video/view/:id" component={Video} />
      </div>
    </Provider>
  </Router>,
  document.getElementById("video-app")
);
