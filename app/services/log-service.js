import { Http } from "@nativescript/core";


export default class LogService {
    constructor(region) {
        this.region = region;
        this.url = `https://aay1pjemxf.execute-api.${region}.amazonaws.com/Dev/log`;
        this.http = new Http();
    }
    async log(message) {
        const headers = {
            "Content-Type": "application/json"
        };

        const content = {
            "body": message
        };

        try {
            const response = await http.request({
                url: this.url,
                method: "POST",
                headers: headers,
                content: JSON.stringify(content)
            });

            const responseContent = response.content.toJSON();

            // Handle successful response
            console.log(responseContent);

        } catch (e) {
            // Handle error
            console.log(e);
        }
    }
}
