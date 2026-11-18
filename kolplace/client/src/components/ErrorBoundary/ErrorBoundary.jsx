import { Component } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

class Boundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  componentDidUpdate(prevProps) {
    // Navigating away clears the error so the next page can render.
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    return this.state.error ? <ErrorPage /> : this.props.children;
  }
}

// Shows the error page instead of a blank screen when a component throws.
const ErrorBoundary = ({ children }) => {
  const { pathname } = useLocation();
  return <Boundary resetKey={pathname}>{children}</Boundary>;
};

export default ErrorBoundary;
