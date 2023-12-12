import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  Home,
  Login,
  Signup,
  Cart,
  Favorite,
  _404,
  Blog,
  BlogDetail,
  Product,
  ProductDetail,
  Profile,
  SuccessCheckout,
  Admin,
  AdminProduct,
  AdminBlog,
  AdminHistoryPurchase,
  OrderHistory,
} from "./pages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Global CSS */
import "./styles/globals.css";
import { Logout } from "./pages/logout";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/favorite">
          <Favorite />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route path="/blog/:id">
          <BlogDetail />
        </Route>
        <Route exact path="/product">
          <Product />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/success-checkout">
          <SuccessCheckout />
        </Route>
        <Route exact path="/order">
          <OrderHistory />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route path="/admin/product">
          <AdminProduct />
        </Route>
        <Route path="/admin/blog">
          <AdminBlog />
        </Route>
        <Route path="/admin/history-purchase">
          <AdminHistoryPurchase />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route component={_404} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
