export const formatNumberMoney = (number = 0) => {
    return number ? "Q " + number.toFixed(2) : "Q 0";
};