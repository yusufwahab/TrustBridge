const Layout = ({ children, sidebarOpen, fullWidth = false, wide = false }) => {
  if (fullWidth) {
    return (
      <div className={`min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'ml-0 sm:ml-64' : 'ml-0 sm:ml-16'
      }`}>
        {children}
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      sidebarOpen ? 'ml-0 sm:ml-64' : 'ml-0 sm:ml-16'
    }`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 ${
        wide ? 'max-w-7xl' : 'max-w-6xl'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;