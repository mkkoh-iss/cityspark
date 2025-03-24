import React from 'react';
import { Card, CardBody } from "@nextui-org/react";

interface AlertCardProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const AlertCard: React.FC<AlertCardProps> = ({ message, type }) => {
  const bgColor = {
    success: "bg-green-100",
    error: "bg-red-100",
    warning: "bg-yellow-100",
    info: "bg-blue-100",
  };

  return (
    <Card className={`${bgColor[type]} w-full`}>
      <CardBody>
        <p>{message}</p>
      </CardBody>
    </Card>
  );
};

export default AlertCard;
