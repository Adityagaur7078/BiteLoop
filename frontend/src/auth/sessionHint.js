const USER_SESSION_HINT = "biteloop-user-session";
const FOOD_PARTNER_SESSION_HINT = "biteloop-food-partner-session";

export const hasSessionHint = (type) => (
  localStorage.getItem(type === "foodPartner" ? FOOD_PARTNER_SESSION_HINT : USER_SESSION_HINT) === "true"
);

export const setSessionHint = (type) => {
  localStorage.setItem(type === "foodPartner" ? FOOD_PARTNER_SESSION_HINT : USER_SESSION_HINT, "true");
};

export const clearSessionHint = (type) => {
  localStorage.removeItem(type === "foodPartner" ? FOOD_PARTNER_SESSION_HINT : USER_SESSION_HINT);
};
