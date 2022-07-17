export const getColorByValue = (value: number, max: number = 100, reverse: boolean = false) => {
    value = value === 0 ? 0 : value/max * 100;
    if(reverse) value = max - value;

    let color = '#65a30d';
    if (value > 25) color = '#16a34a';
    if (value > 50) color = '#facc15';
    if (value > 75) color = '#ea580c';
    if (value > 90) color = '#dc2626';

    return color;
}
