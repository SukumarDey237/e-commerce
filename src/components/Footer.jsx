const Footer = () => {
    return (
      <div
        className="text-center p-3 mt-auto bg-info fw-bold"
        style={{ bottom: 0 }}
      >
        &copy; {new Date().getFullYear()} Copyright: <span>Best Deals</span>
      </div>
    );
  };
  
  export default Footer;
  