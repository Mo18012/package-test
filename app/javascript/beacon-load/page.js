'use client';
import React, useEffect } from 'react';
import { initBeaconData } from 'webtonative/Beacon';

const Page = ({}) => {
  const beaconData = {
    beaconConfig[
      {
        uuid: 'FEEFFEA6-11C9-4AE5-A54D-D15A75B54509',
        major,
        minor,
        settings{
          showNotificationOnEntry,
          showNotificationOnExit,
          notificationInterval,
          notificationContentSource: 'API_FETCHED',
          defaultNotificationEnterData{
            title: 'New Iphone Beacon Entered',
            image: '',
            body: 'Beacon is active',
            deepLink: 'https://www.orufy.com',
          },
          defaultNotificationExitData{
            title: 'New Iphone Beacon Exited',
            image: '',
            body: 'Beacon is inactive',
            deepLink: 'https://medium.com',
          },
        },
        webhookUrl: 'https://hdioigjkfdkdngdd.free.beeceptor.com',
      },
      {
        uuid: 'DEEFFEA6-11C9-4AE5-A54D-D15A75B54509',
        major,
        minor,
        settings{
          showNotificationOnEntry,
          showNotificationOnExit,
          notificationInterval,
          notificationContentSource: 'API_FETCHED',
          defaultNotificationEnterData{
            title: 'Old Iphone Beacon Entered',
            image: '',
            body: 'Beacon is active',
            deepLink: 'https://www.orufy.com',
          },
          defaultNotificationExitData{
            title: 'Old Iphone Beacon Exited',
            image: '',
            body: 'Beacon is inactive',
            deepLink: 'https://medium.com',
          },
        },
        webhookUrl: 'https://hdioigjkfdkdngdd.free.beeceptor.com',
      },
    ],
    userInfo{
      userId: 'user123',
      userName: 'Ravi Saharan',
      userEmail: 'ravi.saharan@orufy.com',
    },
  };

  useEffect(() => {
    initBeaconData({
      beaconData,
      callback: (data) => {
        console.log(Object.values(data));
        alert(Object.values(data));
      },
    });
  }, []);
  return (
    <div className="">
      <h3>Beacon Initialization Page</h3>
      <p>This page will automatically initialize beacon data on load.</p>
    </div>
  );
};
export default Page;
