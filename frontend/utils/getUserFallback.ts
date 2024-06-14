export const getUserFallbackHandler = (
  fullname: string | null | undefined
): string => {
  if (!fullname) return "";

  let splittedName = fullname.split(" ");
  splittedName = splittedName.slice(0, 2).map((name) => name[0]);
  return splittedName.join(" ");
};
