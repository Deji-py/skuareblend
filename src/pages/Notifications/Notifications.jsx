import NotificationHeader from "./Component/NotificationHeader";
import Notification_Card from "./Component/Notification_Card";
import React, { useContext, useEffect, useState } from "react";
import notify from "../../assets/notification.png";
import { Box, Center, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc, // Import the updateDoc function
} from "firebase/firestore";

function Notifications() {
  const [notifications, setNotifications] = useState();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const notificationsRef = collection(
      doc(db, "users", userId),
      "notifications"
    );

    const q = query(notificationsRef, orderBy("timeStamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationList = [];

      querySnapshot.forEach((doc) => {
        notificationList.push({ ...doc.data(), id: doc.id });
      });

      const markNotificationsAsRead = async () => {
        const batch = [];
        notificationList.forEach((notification) => {
          if (!notification.isRead) {
            const notificationRef = doc(notificationsRef, notification.id);
            batch.push(updateDoc(notificationRef, { isRead: true }));
          }
        });
        // Execute the batch update
        await Promise.all(batch);
      };
      markNotificationsAsRead();
      setNotifications(notificationList);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  if (!notifications) {
    return (
      <Center w={"100vw"} h={"80vh"}>
        <Spinner />
      </Center>
    );
  }

  const handleClearNotification = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all notifications?"
    );

    if (confirmClear) {
      // Delete all notifications
      notifications.forEach(async (notification) => {
        const notificationRef = doc(
          db,
          "users",
          userId,
          "notifications",
          notification.id
        );
        await deleteDoc(notificationRef);
      });

      // Clear the notifications state
      setNotifications([]);
    }
  };

  if (!notifications) {
    return (
      <Center className="w-full h-[70vh]">
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack gap={0} alignItems={"start"} pb={"60px"}>
      <NotificationHeader
        clearNotification={handleClearNotification}
        notificationCount={notifications?.length}
      />
      {notifications.length === 0 ? (
        <Center flexDir={"column"} className="w-full h-[80vh]">
          <Image alt="notification_Icon" w={"75px"} src={notify} />
          <Text>No notifications</Text>
          <p className="text-[12px] text-gray-500">
            You currently have no notifications
          </p>
        </Center>
      ) : (
        notifications.map((notification, index) => (
          <Notification_Card
            key={index}
            feedType={notification.feedType}
            comment={notification.comment}
            postId={notification.postId}
            timestamp={notification.timeStamp}
            uid={notification.uid}
            name={notification.userName}
            variant={notification.variant}
            isRead={notification.isRead}
          />
        ))
      )}
    </VStack>
  );
}

export default Notifications;
