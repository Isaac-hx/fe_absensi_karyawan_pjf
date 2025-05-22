import * as XLSX from "xlsx";

export const exportToExcel = (data: any[]) => {
    const date = new Date()
    const dateExport = date.getDate()
    const monthExport = date.getMonth()
    const yearExport = date.getUTCFullYear()
    // Membuat worksheet dari data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Membuat workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Menyimpan workbook ke file
    XLSX.writeFile(workbook, `${dateExport}/${monthExport}/${yearExport} - Absen Pelita Jaya food.xlsx`);
};
