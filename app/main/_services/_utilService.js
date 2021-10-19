export function getInitials(text) {
  if (text) {
    const textToList = text.split(' ');
    if (textToList.length === 1)
      return `${text.charAt(0)}${text.charAt(text.length - 1)}`.toUpperCase();
    else {
      return `${textToList[0].charAt(0)}${textToList[
        textToList.length - 1
      ].charAt(textToList[textToList.length - 1].length - 1)}`.toUpperCase();
    }
  }
  return '';
}
