import React, { useState } from 'react';

const Notifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifications = [
    "You have a new quiz available!",
    "Your grades for the last quiz have been updated.",
    "New study material has been added.",
  ];

  const toggleNotifications = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="notifications">
      <button className="notifications-btn" onClick={toggleNotifications}>
        <i className="fas fa-bell"></i>
        {isVisible && (
          <div className="notification-dropdown">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <p key={index}>{notification}</p>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default Notifications;
