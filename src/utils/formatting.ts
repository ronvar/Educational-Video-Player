export const formatDateString = (dateString: string) => {
    // format should be similar to youtube. i.e "1 minute ago", "1 hour ago", "1 day ago", "1 week ago", "1 month ago", "1 year ago
    try{
        const date = new Date(dateString);
        const currentDate = new Date(); 
        const diff = currentDate.getTime() - date.getTime();
        const seconds = diff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;
        if(years > 1){
            return `${Math.floor(years)} year${Math.floor(years) > 1 ? "s" : ""} ago`;
        }
        if(months > 1){
            return `${Math.floor(months)} month${Math.floor(months) > 1 ? "s" : ""} ago`;
        }
        if(weeks > 1){
            return `${Math.floor(weeks)} week${Math.floor(weeks) > 1 ? "s" : ""} ago`;
        }
        if(days > 1){
            return `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""} ago`;
        }
        if(hours > 1){
            return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""} ago`;
        }
        if(minutes > 1){
            return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1 ? "s" : ""} ago`;
        }
        return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? "s" : ""} ago`;
    } catch (e) {
        return "";
    }
}