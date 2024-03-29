import { Prenotification, StoredPrenotification } from "schemas";

export var notificationData: Array<StoredPrenotification> = [];

const storePrenotification = async (
  data: Prenotification
): Promise<Prenotification> => {
  const idx = notificationData.findIndex((x) => x.id === data.id);
  const dateNow = Date.now();
  if (idx === -1) {
    notificationData.push({
      ...data,
      message: [data.message],
      timestamp: dateNow + data.time * 60 * 1000,
    });
  } else {
    notificationData[idx] = {
      ...notificationData[idx],
      email: data.email,
      time: data.time,
      message: [...notificationData[idx].message, data.message],
      timestamp: dateNow + data.time * 60 * 1000,
    };
  }
  return data;
};

export { storePrenotification };
