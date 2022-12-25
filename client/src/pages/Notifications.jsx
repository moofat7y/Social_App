import React from "react";
import { useSelector } from "react-redux";
import Notify from "../component/Notify";
import { BsAppIndicator } from "react-icons/bs";
const Notifications = () => {
  const { data } = useSelector((state) => state.notify);

  const notifysComponenets = data.map((notify, index) => {
    return <Notify key={index} notify={notify} />;
  });
  return (
    <div className="notifications w-100 h-100">
      {data.length > 0 ? (
        notifysComponenets
      ) : (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <BsAppIndicator className="display-1 text-primary" />
        </div>
      )}
    </div>
  );
};

export default Notifications;
