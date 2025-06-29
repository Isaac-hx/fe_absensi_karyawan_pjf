export const formatTime = (dateString: string): string => {
if(!dateString){
    return "-"
}

  // Ambil bagian waktu dari string ISO
  const timePart = dateString.split("T")[1].split(".")[0];
  return timePart; // Mengembalikan waktu dalam format HH:mm:ss
};
