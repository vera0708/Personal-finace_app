export const convertStringNumber = (str) => {
    // уберём все пробелы
    const noSpaceStr = str.replace(/\s+/g, '');
    // уберём лишние знаки после .
    const num = parseFloat(noSpaceStr);

    if (!isNaN(num) && isFinite(num)) {
        return num
    } else {
        return false;
    }
}