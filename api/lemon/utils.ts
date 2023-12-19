import db from "~/db";

export const returnOkay = (res) => res.status(200).json({ message: "OK" });

export const returnError = (res) =>
  res.status(400).json({
    message: "Error in webhook",
  });

export const getUserIdFromLemonSqueezyEvent = async ({ event }) => {
  let customData = event.meta.custom_data;
  let userId;

  if (customData) {
    userId = customData.user_id;
  } else {
    const foundUser = await db.user.findFirst({
      where: {
        email: event.data.attributes.user_email,
      },
    });
    if (!foundUser) {
      throw new Error("User not found");
    }
    userId = foundUser.id;
  }

  return userId;
};
