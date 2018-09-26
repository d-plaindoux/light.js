// https://gist.github.com/benjamincharity/82ce8651dd53dbee38251e150d62051c

export module UUID {
    export function fresh() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
            const r = Math.random() * 16 | 0, v = char === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}
