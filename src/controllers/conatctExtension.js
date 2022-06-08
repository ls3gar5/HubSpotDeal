export const getRegEx = () => {


    //http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+

    //https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    var regex = new RegExp(expression);
    var arrayT = ['https://www.google.com', "tttp://www.google.com",
        "www.google.com", "htt://www.google.com", "://www.google.com", "https://www.linkedin.com/in/leonardo-segars/"];

    arrayT.forEach(t => {
        if (t.match(regex)) {
            console.log("Successful match");
        } else {
            console.log("No match");
        }
    });

    return res.json();
}