const T9_MAP: Record<string, string> = {
    '3': 'א', '33': 'ב', '333': 'ג',
    '2': 'ד', '22': 'ה', '222': 'ו',
    '6': 'ז', '66': 'ח', '666': 'ט',
    '5': 'י', '55': 'כ', '555': 'ך', '5555': 'ל',
    '4': 'מ', '44': 'ם', '444': 'נ', '4444': 'ן',
    '9': 'ס', '99': 'ע', '999': 'פ', '9999': 'ף',
    '8': 'צ', '88': 'ץ', '888': 'ק',
    '7': 'ר', '77': 'ש', '777': 'ת',
    '0': ' '
};

export function translateT9(input: string): string {
    const parts = input.split('*');
    let translated = '';
    
    parts.forEach(part => {
        const matches = part.match(/(1+|2+|3+|4+|5+|6+|7+|8+|9+|0+)/g);
        if (matches) {
            matches.forEach(seq => {
                translated += T9_MAP[seq] || '';
            });
        }
    });
    return translated;
}