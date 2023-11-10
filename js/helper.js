export const reformateDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day.padStart(2, 0)}.${month.padStart(2, 0)}.${year}`
};

export const convertStringNumber = (str) => {
    // уберём все пробелы
    const noSpaceStr = String(str).replace(/\s+/g, '');
    // уберём лишние знаки после .
    const num = parseFloat(noSpaceStr);

    if (!isNaN(num) && isFinite(num)) {
        return num
    } else {
        return false;
    }
};

export const animationNumber = (elem, num) => {
    const fps = 60;
    const duration = 1000;
    const frameDuration = duration / fps;
    const totalFrame = Math.round(duration / frameDuration);

    let currentFrame = 0;
    const initialNumber = parseFloat(elem.textContent.replace(/[^0-9.-]+/g, ''));

    const increment = Math.trunc((num - initialNumber) / totalFrame);

    const intervalId = setInterval(() => {
        currentFrame += 1;
        const newNumber = initialNumber + increment * currentFrame;

        elem.textContent = `${newNumber.toLocaleString('RU-ru')} ₽`;

        if (currentFrame === totalFrame) {
            clearInterval(intervalId);
            elem.textContent = `${num.toLocaleString('RU-ru')} ₽`;
        }
    }, frameDuration);
};