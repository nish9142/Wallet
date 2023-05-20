export const getDate = (dateString:string) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    const formattedDate = date.toLocaleDateString('en-US', options as any);
    return formattedDate
}