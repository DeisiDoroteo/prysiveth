function A({ children, ...props }) {
    return (
      <a className="text-white text-base transition hover:opacity-75" {...props}>
        {children}
      </a>
    );
  }
  export default A;
  