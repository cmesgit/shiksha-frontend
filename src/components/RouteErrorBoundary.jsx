import { Component } from "react";

/** Keep a failed lazy route or render error from leaving the whole site blank. */
export default class RouteErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.pathname !== this.props.pathname && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main style={{ minHeight: "60vh", display: "grid", placeContent: "center", padding: 24, textAlign: "center" }}>
        <h1>This page could not load</h1>
        <p>A temporary loading error may have interrupted navigation.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button type="button" onClick={() => window.location.reload()}>Reload page</button>
          <a href="/">Go to home</a>
        </div>
      </main>
    );
  }
}
