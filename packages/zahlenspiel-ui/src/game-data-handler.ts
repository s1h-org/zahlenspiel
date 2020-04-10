export const getRoomId = () => window.location.hash.slice(1);

export const getPlayerName = () => window.prompt("Please enter your name", "Guy Incognito");
export const setRoompassword = () => window.prompt("Do you want require a password to join? (Leave blank to skip)");
export const getRoompassword = () => window.prompt("Password to join (Leave blank to skip)");
