const colors = ["#ED2F36", "#F3C724", "#4BAD4E", "#1196F5", "#FFB63D"];

export const generateColor = (text: string) => {
  const sanitizedLetter = text.toUpperCase();
  const charCode = sanitizedLetter.charCodeAt(0);

  const colorIndex = (charCode * 12) % colors.length;
  const color = colors[colorIndex];

  return color;
};
