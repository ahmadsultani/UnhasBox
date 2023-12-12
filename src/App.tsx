import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  Admin,
  // AdminBlog,
  AdminHistoryPurchase,
  AdminProduct,
  // Blog,
  // BlogDetail,
  Cart,
  Favorite,
  Home,
  Login,
  OrderHistory,
  Product,
  ProductDetail,
  Profile,
  Signup,
  SuccessCheckout,
  _404,
  // AdminBlogCreate,
  // AdminBlogEdit,
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
import { AdminOnly } from "./middleware/admin.middleware";
import { AdminCategory, AdminLogin } from "./pages/admin";
import { RequireAuth } from "./middleware/auth.middleware";

setupIonicReact({
  animated: true,
});

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
        <Route exact path="/login/admin">
          <AdminLogin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/cart">
          <RequireAuth>
            <Cart />
          </RequireAuth>
        </Route>
        <Route exact path="/favorite">
          <RequireAuth>
            <Favorite />
          </RequireAuth>
        </Route>
        {/* <Route exact path="/blog">
          <Blog />
        </Route>
        <Route path="/blog/:id">
          <BlogDetail />
        </Route> */}
        <Route exact path="/product">
          <Product />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/profile">
          <RequireAuth>
            <Profile />
          </RequireAuth>
        </Route>
        <Route exact path="/success-checkout">
          <RequireAuth>
            <SuccessCheckout />
          </RequireAuth>
        </Route>
        <Route exact path="/order">
          <RequireAuth>
            <OrderHistory />
          </RequireAuth>
        </Route>
        <Route exact path="/admin">
          <AdminOnly>
            <Admin />
          </AdminOnly>
        </Route>
        <Route path="/admin/product">
          <AdminProduct />
        </Route>
        <Route path="/admin/category">
          <AdminOnly>
            <AdminCategory />
          </AdminOnly>
        </Route>
        {/* <Route path="/admin/blog/create">
          <AdminOnly>
            <AdminBlogCreate />
          </AdminOnly>
        </Route>
        <Route path="/admin/blog/edit/:id">
          <AdminOnly>
            <AdminBlogEdit />
          </AdminOnly>
        </Route> */}
        <Route path="/admin/history-purchase">
          <AdminOnly>
            <AdminHistoryPurchase />
          </AdminOnly>
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
