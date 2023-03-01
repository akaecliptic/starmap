const truncateValue = (i: number, end: number = 9): string => {
    const val: string = i.toString()
    if ( val.length <= end ) return val;
    return val.substring(0, end);
};

export default truncateValue;
