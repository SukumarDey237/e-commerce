const Footer = () => {
  return (
    <footer className="py-6 mt-auto border-t bottom-0">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Shop In. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <span className="hover:underline text-sm cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:underline text-sm cursor-pointer">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
