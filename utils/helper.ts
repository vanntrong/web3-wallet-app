export const getPercent = (percent: number) => {
  return percent * 100;
};

export const checkPasswordStrong = (
  password: string
): "Good" | "Medium" | "Weak" => {
  let strong = 0;

  if (password.match(/[a-z]+/)) {
    strong += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strong += 1;
  }
  if (password.match(/[0-9]+/)) {
    strong += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strong += 1;
  }

  if (strong >= 4) return "Good";
  if (strong === 3) return "Medium";
  return "Weak";
};

export const calculateBalance = (amount: number, price: number) =>
  amount * price;

export const getRandomImageName = () => {
  return Math.floor(Math.random() * 5) + 1;
};

export const fetchAssetFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const extractName = (name?: string) => {
  if (!name) return { firstName: "", lastName: "" };
  const nameSplit = name.split(" ");
  return {
    firstName: nameSplit[0],
    lastName: nameSplit.slice(1).join(" "),
  };
};

export const mergeName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};
