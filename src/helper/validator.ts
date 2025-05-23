export function isValidEmail(email: string): boolean {
    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function validateAndFormatPhoneNumber(phone: string): boolean {
    // Regex untuk validasi nomor HP Indonesia
    const phoneRegex = /^(?:\+62|62|0)[2-9][0-9]{8,12}$/;

    // Validasi apakah nomor sesuai dengan regex
    if (!phoneRegex.test(phone)) {
        return false; // Tidak valid
    }

    // Ganti prefix 0 atau 62 menjadi +62
    if (phone.startsWith("0")) {
        phone = "+62" + phone.substring(1);
    } else if (phone.startsWith("62") && !phone.startsWith("+62")) {
        phone = "+62" + phone.substring(2);
    }

    // Pastikan panjang nomor minimal 13 karakter
    if (phone.length < 13) {
        return false; // Tidak valid karena terlalu pendek
    }

    return true; // Nomor valid
}
