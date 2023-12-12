import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import {
  Admin,
  AdminBlog,
  AdminHistoryPurchase,
  AdminProduct,
  Blog,
  BlogDetail,
  Cart,
  Favorite,
  Home,
  Login,
  Product,
  ProductDetail,
  Profile,
  Signup,
  SuccessCheckout,
  _404,
  AdminLogin,
  AdminCategory,
} from "./pages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

/* Global CSS */
import { Logout } from "./pages/logout";
import "./styles/globals.css";
import { RequireAuth } from "./middleware/auth.middleware";
import { AdminOnly } from "./middleware/admin.middleware";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet animated>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/login/admin">
          <AdminLogin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
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
          <RequireAuth>
            <ProductDetail />
          </RequireAuth>
        </Route>
        <Route path="/profile">
          <RequireAuth>
            <Profile />
          </RequireAuth>
        </Route>
        <Route exact path="/success-checkout">
          <SuccessCheckout />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>

        <Route exact path="/admin">
          <AdminOnly>
            <Admin />
          </AdminOnly>
        </Route>
        <Route path="/admin/product">
          <AdminOnly>
            <AdminProduct />
          </AdminOnly>
        </Route>
        <Route path="/admin/blog">
          <AdminOnly>
            <AdminBlog />
          </AdminOnly>
        </Route>
        <Route path="/admin/blog/create">
          <AdminOnly>
            <AdminBlog />
          </AdminOnly>
        </Route>
        <Route path="/admin/history-purchase">
          <AdminOnly>
            <AdminHistoryPurchase />
          </AdminOnly>
        </Route>
        <Route path="/admin/category">
          <AdminOnly>
            <AdminCategory />
          </AdminOnly>
        </Route>

        <Route component={_404} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
