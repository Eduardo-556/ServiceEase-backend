import { ResourceOptions } from "adminjs";

export const serviceResourceOptions: ResourceOptions = {
  navigation: "Services Orders",

  properties: {
    serviceStatus: {
      availableValues: [
        { value: "pending", label: "Pending" },
        { value: "started", label: "Started" },
        { value: "paused", label: "Paused" },
        { value: "ended", label: "Ended" },
      ],
    },
  },

  editProperties: [
    "customerId",
    "deviceModel",
    "deviceSerial",
    "deviceImei",
    "serviceDescription",
    "deadline",
    "serviceStatus",
    "startTime",
    "pauseTime",
    "endTime",
    "totalTime",
    "totalCost",
  ],

  filterProperties: [
    "deviceModel",
    "deviceSerial",
    "deviceImei",
    "serviceDescription",
    "deadline",
    "serviceStatus",
    "customerId",
  ],

  listProperties: ["deadline", "deviceModel", "serviceStatus"],

  showProperties: [
    "id",
    "customerId",
    "deviceModel",
    "deviceSerial",
    "deviceImei",
    "serviceDescription",
    "deadline",
    "serviceStatus",
    "startTime",
    "pauseTime",
    "endTime",
    "totalTime",
    "totalCost",
    "createdAt",
    "updatedAt",
  ],
};
