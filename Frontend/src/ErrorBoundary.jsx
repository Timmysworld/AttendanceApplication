// ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom fallback UI
      return this.props.fallback;
    //   return (
    //     <div>
    //       <h1>Something went wrong.</h1>
    //       <p>Please refresh the page or try again later.</p>
    //     </div>
    //   );
    }

    // Render the children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
