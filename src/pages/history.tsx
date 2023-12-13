import { IonText, IonList, IonItem, IonSpinner, IonButton } from "@ionic/react";
import { MainLayout } from "../layouts";

import "@/styles/history.css";
import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "@/services/order";
import Cookies from "js-cookie";
import { TUser } from "@/types/user.type";
import { formatPrice } from "@/utils/formatter";
import { useState } from "react";
import { TOrder } from "@/types/order.type";
import { OrderModal } from "@/components/Modal/OrderModal";

export const OrderHistory: React.FC = () => {
  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getAllOrder(user.uid),
  });

  const [isOpenModal, setIsOpenModal] = useState<TOrder>();

  return (
    <MainLayout>
      <IonText color="dark">
        <h1 className="ion-text-center cart__title">Order History</h1>
      </IonText>
      {isLoadingOrders ? (
        <div className="empty-container">
          <IonSpinner
            name="crescent"
            color="primary"
            style={{ transform: "scale(1.4)" }}
          />
        </div>
      ) : isErrorOrders ? (
        <IonText>
          <IonText
            className="ion-text-center"
            style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}
          >
            Something went wrong!
          </IonText>
        </IonText>
      ) : orders && orders.length > 0 ? (
        <IonList className="ion-padding">
          {orders.map((order) => (
            <IonItem lines="none" key={order.id} className="ion-margin-bottom">
              <section className="order">
                <div className="order__product-info">
                  <section className="order__product-overview">
                    <img
                      className="order__product-image"
                      src={order.products[0].product.thumbnail || ""}
                      alt="Product Image"
                    />
                    <div className="order__product-details">
                      <div className="order__product-details-overview">
                        <IonText>
                          <h4>{order.products[0].product.name}</h4>
                        </IonText>
                        <IonText color="medium">
                          {order.products[0].product.category.name}
                        </IonText>
                      </div>
                      {order.products.length > 1 && (
                        <IonText color="medium">
                          +{order.products.length - 1} other product(s)
                        </IonText>
                      )}
                    </div>
                  </section>
                  <div className="order__product-price">
                    <IonText>
                      <b>
                        {order.products[0].quantity} x{" "}
                        {formatPrice(order.products[0].price)}
                      </b>
                    </IonText>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <IonText className="total-price">
                    Total Price: <b>{formatPrice(order.totalPrice)}</b>
                  </IonText>
                  <IonButton
                    color="primary"
                    onClick={() => setIsOpenModal(order)}
                    mode="ios"
                    shape="round"
                  >
                    View Details
                  </IonButton>
                </div>
              </section>
            </IonItem>
          ))}
        </IonList>
      ) : (
        <IonText>
          <IonText
            className="ion-text-center"
            style={{ fontSize: "1.5em", fontWeight: 600 }}
          >
            No orders found!
          </IonText>
        </IonText>
      )}
      {isOpenModal && (
        <OrderModal
          isOpen={!!isOpenModal}
          onClose={() => setIsOpenModal(undefined)}
          order={isOpenModal}
        />
      )}
    </MainLayout>
  );
};
