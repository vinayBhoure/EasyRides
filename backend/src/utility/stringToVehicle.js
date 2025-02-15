function convertToVehicleNumber(input) {
    input = input.trim().replace(/\s+/g, " ");
    const parts = input.split(" ");

    if (parts.length !== 4 ||
        !/^[A-Za-z]{2}$/.test(parts[0]) ||
        !/^\d{2}$/.test(parts[1]) ||
        !/^[A-Za-z]{2}$/.test(parts[2]) ||
        !/^\d{4}$/.test(parts[3])) {
        return "invalid number plate";
    }

    return `${parts[0].toUpperCase()}-${parts[1]}-${parts[2].toUpperCase()}-${parts[3]}`;
}

module.exports = convertToVehicleNumber;
