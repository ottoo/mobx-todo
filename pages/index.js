import React from "react";
import { Provider } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";

import { initStore } from "../store";

import "../global.css";
import TodoContainer from "../components/TodoContainer";

const registerServiceWorker = () => {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("service worker registration successful");
      })
      .catch(err => {
        console.warn("service worker registration failed", err.message);
      });
  }
};

export default class extends React.PureComponent {
  static getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return { initialState: getSnapshot(store), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.initialState);
  }

  componentDidMount() {
    registerServiceWorker();
  }

  render() {
    return (
      <Provider store={this.store}>
        <TodoContainer />
      </Provider>
    );
  }
}
