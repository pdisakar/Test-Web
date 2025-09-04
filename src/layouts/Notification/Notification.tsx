import React from 'react';

interface NotificationProps {
  message?: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="notification bg-primary">
      <div className="container text-center text-[13px] py-[10px] text-white [&>p>a]:px-[10px] [&>p>a]:py-[5px] [&>p>a]:bg-white [&>p>a]:text-primary [&>p>a]:ml-2 [&>p>a]:rounded-[3px] [&>p>a]:font-semibold">
        <p dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
};

export default Notification;
