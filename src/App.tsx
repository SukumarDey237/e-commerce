import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <Provider store={store}>
          <Header />
          <Outlet />
        </Provider>
      </main>
      <Footer />
    </>
  );
}

export default App;
