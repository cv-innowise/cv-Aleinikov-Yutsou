export const clearCookies = () => {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name) {
      document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
    }
  });
};

export const getCookie = (name: string) => {
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return raw ? decodeURIComponent(raw) : undefined;
};
