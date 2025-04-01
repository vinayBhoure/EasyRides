function convertToVehicleNumber(input) {
    input = input.trim().replace(/[-\s]+/g, " ").toUpperCase();
    const compactInput = input.replace(/\s+/g, "");

    if (/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(compactInput)) {
        return `${compactInput.slice(0, 2)} ${compactInput.slice(2, 4)} ${compactInput.slice(4, 6)} ${compactInput.slice(6)}`;
    }

    const parts = input.split(" ");
    if (parts.length !== 4 ||
        !/^[A-Z]{2}$/.test(parts[0]) ||
        !/^\d{2}$/.test(parts[1]) ||
        !/^[A-Z]{2}$/.test(parts[2]) ||
        !/^\d{4}$/.test(parts[3])) {
        return "invalid number plate";
    }

    return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
}

module.exports = convertToVehicleNumber;
