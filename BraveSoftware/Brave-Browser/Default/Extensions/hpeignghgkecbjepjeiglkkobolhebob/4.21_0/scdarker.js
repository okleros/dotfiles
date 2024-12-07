// ==UserScript==
// @name         Soundcloud dark background
// @namespace    http://tampermonkey.net/
// @version      4.17
// @match        https://soundcloud.com/*
// @icon         https://www.google.com/s2/favicons?domain=soundcloud.com
// @author       Tim Wahrendorff
// @run-at      document-body
// @grant        none
// ==/UserScript==

(function () {
    var d = new Date();
    var c = new Date(d.getFullYear() + 2, d.getMonth(), d.getDate()); //  two years ahead
    var setCookie = function (name, value) {
//        var d = new Date();
//        var c = new Date(d.getFullYear() + 2, d.getMonth(), d.getDate());
//        console.log(c.toGMTString());
        var cookie = name + '=' + value + '; path=/; SameSite=Lax; expires='+c.toGMTString(); //Thu, 01-Jan-1970 00:00:01 GMT
        document.cookie = cookie;
    };
    var delCookie = function (name) {
        var cookie = name + '=0; path=/; SameSite=Lax; expires=0'; //Thu, 01-Jan-1970 00:00:01 GMT
        document.cookie = cookie;
    };
    var getCookie = function (name) {
        var nameEQ = name + '=',
                ca = document.cookie.split(';'),
                i = 0;
        for (; i < ca.length; i++) {
            var c = ca[i];
            while (c && c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };
    
    
    var getHighlightColor =function(){
        let highColor =getCookie('scHighlightColor');
        if (typeof highColor == 'undefined' || highColor === null) {
            highColor = "#ff5500";
        }
        return highColor;
    }
    const hilgtColor = getHighlightColor();
        
    const animation = " animation: movingBG 420s ease 1s infinite ;";
        

//        var playBtnBase64 = "data:image/png;base64,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LWEzNTUtMDU3YTkyMmFiYzcxIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmJjMDQwZTM0LWU5OGYtNDdjNS1hMjg0LWY5Y2UwNDk1M2M1OSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjMzY2QzNDhhLWI0Y2QtNDcxNS1iMDgwLTMzNzU4YTcxMGVjNiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjIyNjcxMjkyMjQ1NjIwIgogICBHSU1QOlZlcnNpb249IjIuMTAuMjQiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmJlODg0OWMtMTE2ZS00OWE5LTg3NjUtYTA5NjJjNWM5MDM2IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTAzVDAwOjAxOjMyIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PoSjyoEAAAAGYktHRAAPAD4AJR7iMHMAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQflBgIWASCVytPxAAAAWElEQVQ4y2NgGDRg8+bNBzZv3uxAqj5GJAP+Q5kHGRgYGnx9fQ+QawADKQbhM4Aog4gxAK9BpBiA1SAmSmOPhQS1WL3AQq5GYgwgKhpZyNWIzQCSNA4eAADeejHW1tJPDgAAAABJRU5ErkJggg==";
//        var playOrangeBtnB64 = "data:image/png;base64,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ZTUtNDQ5NS1hODcxLWUxZDI4M2IxY2IwZiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZDFlMGFmYS0xYjJlLTRhOGUtOTM4NS01N2Q0Y2M5ZjBjNDAiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1MGM1MmNmYS0zOWJiLTQ2NjAtOGY2Zi0wOTlhODY5MjU0YTIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTYyMjY3MTc3MDA4ODU5MCIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjI0IgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY4NjU3MjJkLTRmYzAtNGI3MC1iMmI5LTg5NzQxNjIxZWI3NyIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNi0wM1QwMDowOTozMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6FauD+AAAABmJLR0QAzADMAMzfwV8aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QYCFgkenHJEUgAAAFZJREFUOMtjYBg04H8c34H/cXwOpOpjRDLgP5R5kIGBoYFx0acD5BrAQIpB+AwgyiBiDMBrECkGYDWIidLYYyFBLVYvsJCrkRgDiIpGFnI1Ui0pDzwAAMUXNBzuaRIIAAAAAElFTkSuQmCC";
//        var pauseBtnBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC7npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZZbjhwhDEX/WUWWgG2MzXIoHlJ2kOXnUq9M98xIE2V+InWhAspFXYyPoTuMXz9n+IGLinFIap5LzhFXKqlwRcfjcdW9ppj2+nyIV+fBHu4XDJOglePR8zn+slN8UKKKnr4R8na+2B5flHTq+5PQOZEsjxidfgqVU0j4eEGnQD2WFXNxe7uEbRxtv1bixx1WJbZr3yLPz8kQva4wCvMQkoiaJR0OyLopSEUn7zWcklUqhjLqJNdSEZCP4hTfeBWeqdw9+sT+BEXyYQ8wPAYz3+2HdtKPgx/2EL+ZWdo984Pd+J7iIcjrnrN7mHMcq6spI6T5XNS1lL2HgRtCLvtnGcVwK/q2l4LiAdnbQKfHFjeURoUYWCYl6lRp0tjbRg0uJh4M15i5AdSyuRgXbhIDCKVVaLJJkS4OYg14BVa+faF93rJP18gxcSeMZILYYsxhVd9RPhWac6U8UfQ7VvCLV6LCjUVu1RgFIDSvPNI9wFd5vhZXAUHdw+xYYI3bIbEpnbkV9mReoAUDFe2xLcj6KYAQYW6FMyQgEDOJUibkAxsR4ujgUyHk2DS8AQGpcoeXnEQy4DivufGN0T6WlQ8zzqy1fbCxDGiKVLBKONiQP5YcOVRVNKlqVlPXojVLTllzzpbX4VdNLJlaNjO3YtXFk6tnN/fgxWvhIjgcteRixUsptWLSCuWKrysG1LrxJlvadMubbb6VrTakT0tNW27WPLTSaucuHedEz92699LroIFUGmnoyMOGjzLqRKpNmWnqzNOmzzLrTY3CgfVd+To1uqjxTmoNtJsaPjW7JGgdJ7qYgRgnAnFbBJDQvJhFp5Q4LHSLWSyMXaEML3XB6bSIgWAaxDrpZveH3AO3kNI/ceOLXFjovoNcWOg+Ifee2wfU+vq1aVHCTmhtwxXUKNh+ow2v7HX9pn29DX/7wUvoJfQSegm9hF5CL6H/Rgh/HUr4DTuNobQquxfwAAABhGlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TtSJVBzuIOGSoThb8QhylikWwUNoKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxc3NSdJES/5cUWsR4cNyPd/ced+8AoV5mqtkxDqiaZSRjUTGTXRUDr+iCgAFMoE9iph5PLabhOb7u4ePrXYRneZ/7c/QqOZMBPpF4jumGRbxBPLNp6Zz3iUOsKCnE58RjBl2Q+JHrsstvnAsOCzwzZKST88QhYrHQxnIbs6KhEk8ThxVVo3wh47LCeYuzWq6y5j35C4M5bSXFdZrDiGEJcSQgQkYVJZRhIUKrRoqJJO1HPfxDjj9BLplcJTByLKACFZLjB/+D392a+alJNykYBTpfbPtjBAjsAo2abX8f23bjBPA/A1day1+pA7OfpNdaWvgI6N8GLq5bmrwHXO4Ag0+6ZEiO5Kcp5PPA+xl9UxYYuAV61tzemvs4fQDS1NXyDXBwCIwWKHvd493d7b39e6bZ3w9tk3Klp+IF1wAADRhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6ZWQyMWIzZDgtMzQ2Mi00OTg2LWE5ZmUtZjBjNWY2Mjg5NmMyIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVhOTQyYTA5LWY4YzctNGM1Ni05NzAyLTYwY2E2ZDQ5NzZiNSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUzZTZiM2M2LTQ0ODYtNDAyMi1iYjRmLTcyMWZlMjQxYjU5MyIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjIyNjcxOTY2NzI4NTIyIgogICBHSU1QOlZlcnNpb249IjIuMTAuMjQiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmIxNTU0NzMtYTNkZS00N2Y2LWE5OWMtN2Y2NmVjOTQ0YTc0IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTAzVDAwOjEyOjQ2Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PnLGrJEAAAAGYktHRADMAMwAzN/BXxoAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQflBgIWDC7H3IC7AAAAKklEQVQ4y2NgGGjACGNs3rz5P7KEr68vIzIflzwTpS4YNWDUgMFhwMADALTjCBgTlQ95AAAAAElFTkSuQmCC";
//        var pauseOrangeBtnB64 = "data:image/png;base64,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NzFjLTQ3ZmYtYTM0NS05YTZmNWRkZDBjZTIiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWU3Mzg5MWQtZTI5YS00ZGQzLTg2MmYtMzBjNzAzOTBhZmE5IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ODlkNjBjMjMtODU0My00Mzc1LWE0ODktM2Y5MzU4OTUzYzZkIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2MjI2NzIwMjY2NTEyMDkiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yNCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplNTgyZDVkNS02NTdkLTQyNzQtYjhiZi1mN2U0MDFmN2U3NGUiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDYtMDNUMDA6MTM6NDYiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+apdYAgAAAAZiS0dEAMwAzADM38FfGgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UGAhYNLt7HsfoAAAApSURBVDjLY2AYaMAIY/yP4/uPIrHoEyMyH5c8E6UuGDVg1IDBYcDAAwCfIwgYWco/wwAAAABJRU5ErkJggg==";

    const darkerCss = `
     /* Logo */
        .header__logo { background: none; position:relative;}
        .sc-classic .show .header__logo{background:none !important;}
        /*.sidebarHeader__more {color:none !important;}*/
        .header_logoBg {position: absolute;top: 0px;bottom: 0px;left: 0px;right: 0px;z-index: -1; height: 46px;width: 69px; background: linear-gradient(135deg,  ${hilgtColor} ,#121212,  ${hilgtColor} ); background-size: 800% 800% ; background-position: 25% 20% ; ${animation}}
        @keyframes movingBG { 0% { background-position: 25% 20%; } 25% { background-position: 50% 50%; } 50% { background-position: 75% 50%; } 75% { background-position: 50% 50%; } 100% { background-position: 25% 20%; }}      @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; }}

        /* Navigation / Header*/
        .sc-classic .header > li > a:focus, .sc-classic .header__navMenu > li > a.selected {background-color: #121212 !important;}

        #darkuserCss_onOffButton {}
        body.sc-classic{color:#ccc;background:#121212 !important;overflow-x: hidden;}
        /* .sc-classic .header { background: #212121 !important;}"*/

        /* Player Controls*/
        .sc-classic,.playControls__inner,.playControls__bg,.volume__sliderWrapper{color:#ccc;background:#121212 !important;}
        .volume__sliderWrapper{border:none;}
        .volume__sliderWrapper::after, .volume__sliderWrapper::before {display:none}
        .volume__sliderBackground {background-color: #333 !important;}
        .expanded.hover .volume__sliderWrapper {  border: 1px solid #212121 !important;}
        
        .sound__soundActions, .readMoreTile__countWrapper{background-color:#121212 !important;}
        .sc-button,.sc-button:visited{color:#ccc !important;background-color:#333 !important;border: 1px solid #121212;}
        .sc-button:hover{color:#fff !important;}
        .sc-button-disabled, .sc-button-disabled:focus, .sc-button-disabled:hover, .sc-button.sc-pending, .sc-button.sc-pending:focus, .sc-button.sc-pending:hover, .sc-button:disabled, .sc-button:disabled:hover { background-color: #121212; border-color: #212121; color: #333;}
        .dialog,.dialog__arrow,.dialog__centertop{background:#121212 !important;}
        .playbackTimeline__progressBackground { background-color: #333 !important;}
        .sc-classic .playbackTimeline__duration { color: #eee !important;}
        
        /* SoundCLoudDownloader*/
        /*style +=".sc-button-download[title='Downloading...']{background-color: ${hilgtColor} !important;}";*/
        

        /* Links, lots of links and borders stuff..*/
        a.sc-link-dark, a:hover {color: #ccc; !important}
        a.sc-link-dark:hover {color: #fff; !important}
        a.sc-link-light, a:hover {color: #aaa; !important}
        a.sc-link-light:hover {color: #ccc; !important}
        .compactTrackList__moreLink:focus, .compactTrackList__moreLink:hover {  background-color: #333; !important}
        .sc-border-light {border: 1px solid #333; !important}
        .sc-border-light-bottom {border-bottom: 1px solid #333; !important}
        .compactTrackListItem.clickToPlay.active, .compactTrackListItem.clickToPlay:focus, .compactTrackListItem.clickToPlay:hover { background-color: #121212 !important; color: #eee !important;}
        .compactTrackListItem.clickToPlay.active .compactTrackListItem__additional,.createPlaylistSuggestion__addContainer, .compactTrackListItem.clickToPlay:focus .compactTrackListItem__additional, .compactTrackListItem.clickToPlay:hover .compactTrackListItem__additional { background: #121212 !important;  background: linear-gradient(90deg,hsla(0,0%,94.9%,.1),#333 17px) !important;}
        .compactTrackListItem__trackTitle,.compactTrackListItem__content { color: #eee !important;}
        .active .trackItem__username { color: #eee !important; font-weight: 500;}

        .compactTrackListItem.active .compactTrackListItem__trackTitle, .compactTrackListItem.active .compactTrackListItem__user {color: ${hilgtColor} !important;}

        .sc-classic .listenContent__inner, .soundBadge__additional, .trackItem__additional { background: #121212 !important;}
        .hover .trackItem__additional,.active .trackItem__additional { ;background: #333 !important;}

        .sc-buylink:hover{color:${hilgtColor} !important;}
        .trackItem.active,.trackItem.hover {background-color:#333 !important;}
        .listenEngagement{border: 1px solid #121212 !important; box-shadow: 0 1px 0 0 #333 !important;}
        .sc-classic .l-listen-wrapper .l-about-rows { padding-right: 30px;  border-right: 1px solid #212121 !important;}

        /* Comments and Form/Input Elements*/
        .commentForm__wrapper {background: #121212 !important; border: 1px solid #121212 !important; }
        .commentItem.m-creatorComment {background-color: #212121 !important;}
        .commentForm.m-active .commentForm__wrapper,.commentForm__input,.commentForm__input.focused, .commentForm.m-small .commentForm__input{background: #121212 !important; border: 1px solid #212121 !important;color:#eee !important;}
        .sc-tag, .sc-tag:visited {background-color: #333 !important; border: 1px solid #333 !important;}
        .sc-tag:hover {background-color: #999 !important; border: 1px solid #999 !important;}
        .sc-classic .dropdownContent__container { background-color: #212121 !important; border: 1px solid #333 !important;}
        .sc-classic .dropdownContent__listItem { border-bottom: 1px solid #121212 !important;}
        .sc-classic .dropdownContent__header { border-bottom: 1px solid #121212 !important;}
        .sc-classic .dropdownContent__main { border-bottom: 1px solid #121212 !important;}
        .sc-text, .commentItem_bodyContainer, .commentItem__body {color: #eee !important;}
        .sc-classic .repostOverlay__message {  overflow: hidden;}  .sc-ministats-small.sc-ministats-reposts:before {    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==) !important;}
        .sc-classic .headerMenu.m-light { background-color: #212121 !important; border: 1px solid #121212 !important; color:#eee !important;}

        .g-dark input[type='search']{background: #212121; border: 1px solid #121212;color:#eee;}
        .g-dark input[type='search']:focus { background: #121212;}
        .repostOverlay__youReposted { color: #999 !important;}
        .commentItem__username{color: ${hilgtColor} !important;} 
        
        .uiEvoButton, .commentItem__timestampLink{color: ${hilgtColor} !important; background-color: #121212 !important; }
        .uiEvoButton.m-selected > svg > path {fill: ${hilgtColor} !important; }
        .commentItem__creatorLink{background-color: #212121 !important; }
        
        .sc-classic .commentForm__submitButton { border: 1px solid #121212 !important; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIxLjA4MDggNC4wODQ1NGMuMDgxNy0uMjY1NTMuMDA5OS0uNTU0NDYtLjE4NjUtLjc1MDktLjE5NjQtLjE5NjQ0LS40ODU0LS4yNjgyLS43NTA5LS4xODY1TDEuNzU4NjMgOC44MDM5OWMtLjI5OTQuMDkyMTMtLjUxMDAxLjM2MDYzLS41MjgxNy42NzMzNi0uMDE4MTYuMzEyNzMuMTU5OTUuNjAzODUuNDQ2NjguNzI5OTVsOC41NzE4NiAzLjc3MTYgMy43NzE2IDguNTcxOWMuMTI2Mi4yODY3LjQxNzMuNDY0OC43My40NDY3LjMxMjctLjAxODIuNTgxMi0uMjI4OC42NzM0LS41MjgybDUuNjU2OC0xOC4zODQ3NlpNMTAuNjUwNSAxMi41MTY4IDQuMTI0NTggOS42NDU0MSAxOS4yMzA1IDQuOTk3NDNsLTQuNjQ4IDE1LjEwNTk3LTIuODcxNC02LjUyNiAzLjM0OTYtMy4zNDk1TDE0IDkuMTY3MjVsLTMuMzQ5NSAzLjM0OTU1WiIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4=) 50% no-repeat, "+ hilgtColor+" !important;}
        
        .sc-status-icon-verified {filter: saturate(0);}
        
        .reportNea, .reportContent{ background-color: #121212 !important;}
        
        .commentItem__moreActionsButton.sc-button, .commentItem__moreActionsButton.sc-button:visited { background-color: #121212 !important; }
        

        /* Dialogs, Menus,*/
        .sc-classic .m-light .headerMenu__link { background: #212121; color: #eee;}
        .sc-classic .m-light .headerMenu__link:focus, .sc-classic .m-light .headerMenu__link:hover { background: #121212; color: #fff;}
        .dropbar__content { background-color: #333 !important;}
        
        .playControls__inner,.playControls__bg{border-top:1px solid #333 !important;}
        .playbackSoundBadge__titleLink:focus, .playbackSoundBadge__titleLink:hover { color: #eee !important; outline: 0;}
        .mixedSelectionModule {border-bottom: 1px solid #212121 !important;}
        .sc-border-light-right { border-right: 1px solid #212121 !important;}
        .tileGallery__sliderButton::after { border-color: #eee !important;}
        .dialog,.dialog__arrow,.activitiesListFull__item + .activitiesListFull__item, .headerSearch__input.sc-input { border: 1px solid #121212 !important;}
        
        

        /*remove Ads for premium*/
        .streamHTUpsell,.header__goUpsell,.playlistConsumerSubUpsell,.header__proUpsell_side_by_side_experience, .header__goUpsell_side_by_side_experience {display:none !important;}
        
         /*promobox*/
         .sc-classic .banner { background-color: #662121 !important;}
        .sc-classic .banner.m-promotion { background-color: transparent;}
        .sc-classic .banner.m-alert { background-color: #662121 !important;}

        /* Tracklists in Stream*/
        .compactTrackList__moreLink:focus, .compactTrackList__moreLink:hover{background-color: #212121 !important;}
        .compactTrackListItem.clickToPlay.active, .compactTrackListItem.clickToPlay:focus, .compactTrackListItem.clickToPlay:hover { background-color: #333 !important; color: #eee !important;}
        .moreActions__button:not(:disabled), .moreActions__link { background-color: #333 !important; color: #eee !important;}
        .moreActions__button:not(:disabled):hover, .moreActions__link:hover { background-color: #212121 !important; color: #fff !important;}
        .moreActions__button:not(:last-child), .moreActions__link {  border-bottom: 1px solid #212121 !important;}
        .moreActions__button.sc-button-medium.sc-button-queue::before{color: #eee !important;}
        .moreActions {   border: 1px solid #212121 !important;    background: #333 !important;    box-shadow: 0 2px 10px #121212 !important;}
        .addToNextUp{transition: none !important;}
        .compactTrackListItem.active, .compactTrackListItem.active .compactTrackListItem__content, .compactTrackListItem.active .compactTrackListItem__number, .compactTrackListItem.active .compactTrackListItem__plays, .compactTrackListItem.active .compactTrackListItem__trackTitle, .compactTrackListItem.active .compactTrackListItem__user { color: #eee;}
        
        .artistShortcutTile__username{color:#ccc;}


        /* Bottom Player and Queue*/
        .queue__itemWrapper, .queueItemView { background-color: #121212 !important;}
        .queueItemView:hover { background-color: #212121 !important; color: #eee !important;}
        .queueItemView.m-active, .queue {background: #212121 !important;}
        .queueItemView:hover.m-active {background: #121212 !important; color: #eee !important;}
        .queue__panel { border-bottom: 1px solid #212121 !important; background: #212121;}
        .queue{background: #212121;}
        .queueFallback__stationMode { border-top: 1px solid #212121 !important;}
        .queue__hide, .queue__hide:focus, .queue__hide:hover{height:24px;border:none !important;}
        
        .queue__itemsHeight {background-image: none !important;}
        .sc-button-pause{background: ${hilgtColor} !important; opacity:0.8 !important; border-color: ${hilgtColor} !important;}
        .sc-button-play{background-color: #212121 !important; opacity:0.9 !important; border-color: ${hilgtColor} !important;}
        .sc-button-play:hover{background: ${hilgtColor} !important; opacity:0.9 !important;}
        .playbackSoundBadge__like,.playbackSoundBadge__follow { background-color: #121212 !important; }
        /* svg playbutton*/
        .play-button-container {  padding-top: 17px; margin-left: -14px; display: inline-block;    width: 24px;    height: 100%;    cursor: pointer;  } .play-button {    display: inline-block;    position: absolute;    width: 14px;    height: 14px;    background: ${hilgtColor};    transition: clip-path .3s ease;  }  .play-button-before {    clip-path: polygon(0 0, 50% 25%, 50% 75%, 0% 100%);  }  .play-button-after {    clip-path: polygon(50% 25%, 100% 50%, 100% 50%, 50% 75%);  }  .playing .play-button-container .play-button-before {    clip-path: polygon(0 0, 30% 0, 30% 100%, 0% 100%);  }  .playing .play-button-container .play-button-after{    clip-path: polygon(70% 0, 100% 0, 100% 100%, 70% 100%)  }
        .playControl {    background: none !important;}
        
        .playbackSoundBadge.m-queueVisible .playbackSoundBadge__queueIcon { fill:${hilgtColor}; opacity: .7;}
        
        .sc-button-focus, .sc-button:focus, .sc-button:hover {    border-color: ${hilgtColor};}
        
        
        /* svg shuffle button*/
        .shuffleControl::after, .shuffleControl::before, .repeatControl.m-none {    background: none !important;}
       .shuffle-button-container .shuffle-button-after {display: none;}
        .m-shuffling .shuffle-button-container .shuffle-button-after {display:block !important;}
        .m-shuffling .shuffle-button-container .shuffle-button-before {display:none !important;}


        /* svg repeat buttons*/
       .repeatControl::after, .repeatControl::before {    background: none !important;}
       .repeat-button-container .repeat-button-after {display: none;} .repeat-button-container .repeat-button-one {display: none;}
        .repeat-button-container {height:}
        .m-one .repeat-button-container .repeat-button-one {display:block !important;}
        .m-one .repeat-button-container .repeat-button-before {display:none !important;}
        .m-one .repeat-button-container .repeat-button-after {display:none !important;}
        
        .m-all .repeat-button-container .repeat-button-one {display:none !important;}
        .m-all .repeat-button-container .repeat-button-before {display:none !important;}
        .m-all .repeat-button-container .repeat-button-after {display:block !important;}
        
        svg:not(:root) {    overflow: hidden;    height: 20px;}
        
        .sc-classic .compactTrackListItem.active, .sc-classic .compactTrackListItem.active .compactTrackListItem__content, .sc-classic .compactTrackListItem.active .compactTrackListItem__number, .sc-classic .compactTrackListItem.active .compactTrackListItem__plays, .sc-classic .compactTrackListItem.active .compactTrackListItem__trackTitle, .sc-classic .compactTrackListItem.active .compactTrackListItem__user{ color: "+hilgtColor+" !important}
        
        /* Theme changes needed when Orange is NOT the highlight color. To cope with some limitations due to orange png images I do not want to replace anywhere.*/
 
            
            .truncatedUserDescription__content a, .truncatedUserDescription__content a:visited { color:  ${hilgtColor};}

            .sc-button:hover{border-color: ${hilgtColor} !important;}
            .sc-button-active, .sc-button-selected,.sc-button-small.sc-button-active.sc-button-more:before, .sc-button-small.sc-button-selected.sc-button-more:before {    background-color: ${hilgtColor} !important; opacity: 0.7; color: #212121 !important;}
            .sc-button-selected, .sc-button-follow.sc-button-selected { border: 1px solid #212121;}
            .sc-button-selected:focus, .sc-button-selected:hover {    color: #ffffff !important;    border: 1px solid ${hilgtColor} !important;}
            .sc-button-small.sc-button-follow:before,.sc-button-medium.sc-button-follow:before {  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8cGF0aCBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNTQyIDEuMTY3YzIuNzcgMCAzLjM4NiAyLjkxNiAyLjE1NSA2LjEyNSAzLjE2OSAxLjMwOCAzLjM4NiAzLjk3NyAzLjM4NiA0Ljk1OEgwYzAtLjk4MS4yMTgtMy42NSAzLjM4Ny00Ljk1OC0xLjIzMi0zLjIxOC0uNjE2LTYuMTI1IDIuMTU1LTYuMTI1em0wIDEuMTY2Yy0xLjU4NCAwLTIuMTI3IDEuNzctMS4wNjYgNC41NDIuMjI2LjU5LS4wNiAxLjI1NC0uNjQ0IDEuNDk1LTEuNTE3LjYyNi0yLjI2MyAxLjU3Mi0yLjUzNyAyLjcxM2g4LjQ5NGMtLjI3NS0xLjE0MS0xLjAyLTIuMDg3LTIuNTM3LTIuNzEzYTEuMTY3IDEuMTY3IDAgMCAxLS42NDQtMS40OTZjMS4wNi0yLjc2NC41MTYtNC41NC0xLjA2Ni00LjU0em02LjQxNC0uNTgzYy4xNyAwIC4yOTQuMTMuMjk0LjI5MlYzLjVoMS40NThjLjE1NyAwIC4yOTIuMTMyLjI5Mi4yOTR2LjU3OGMwIC4xNy0uMTMuMjk1LS4yOTIuMjk1SDEyLjI1djEuNDU4YS4yOTYuMjk2IDAgMCAxLS4yOTQuMjkyaC0uNTc4YS4yODkuMjg5IDAgMCAxLS4yOTUtLjI5MlY0LjY2N0g5LjYyNWEuMjk2LjI5NiAwIDAgMS0uMjkyLS4yOTV2LS41NzhjMC0uMTcuMTMxLS4yOTQuMjkyLS4yOTRoMS40NThWMi4wNDJjMC0uMTU3LjEzMi0uMjkyLjI5NS0uMjkyaC41Nzh6Ii8+Cjwvc3ZnPgo=) !important;}
            .sc-button-small.sc-button-like:before,.sc-button-medium.sc-button-like:before { background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2xpa2VzX2dyZXk8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPHBhdGggZD0iTTEwLjgwNDk4MTgsMyBDOC43ODQ3MTU3OSwzIDguMDAwNjUyODUsNS4zNDQ4NjQ4NiA4LjAwMDY1Mjg1LDUuMzQ0ODY0ODYgQzguMDAwNjUyODUsNS4zNDQ4NjQ4NiA3LjIxMjk2Mzg3LDMgNS4xOTYwNDQ5NCwzIEMzLjQ5NDMxMzE4LDMgMS43NDgzNzQsNC4wOTU5MjY5NCAyLjAzMDA4OTk2LDYuNTE0MzA1MzIgQzIuMzczNzI3NjUsOS40NjY3Mzc3NSA3Ljc1NDkxOTE3LDEyLjk5Mjg3MzggNy45OTMxMDk1OCwxMy4wMDEwNTU3IEM4LjIzMTI5OTk4LDEzLjAwOTIzNzggMTMuNzMwOTgyOCw5LjI3ODUzNzggMTMuOTgxNDU5LDYuNTAxMjQwNSBDMTQuMTg3ODY0Nyw0LjIwMDk3MDIzIDEyLjUwNjcxMzYsMyAxMC44MDQ5ODE4LDMgWiIgaWQ9IkltcG9ydGVkLUxheWVycyIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KPC9zdmc+DQo=) !important;}
            .sc-button-small.sc-button-repost:before,.sc-button-medium.sc-button-repost:before { background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigzNCwgMzQsIDM0KSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==) !important;}
            .sc-button-small.sc-button-active.sc-button-more:before, .sc-button-small.sc-button-selected.sc-button-more:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iNHB4IiB2aWV3Qm94PSIwIDAgMTQgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8dGl0bGU+bW9yZTwvdGl0bGU+CiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI3IiBjeT0iMiIgcj0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIyIiByPSIyIi8+CiAgPC9nPgo8L3N2Zz4K) !important;}
            
            style +=".sc-button-more:before {background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iNHB4IiB2aWV3Qm94PSIwIDAgMTQgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8dGl0bGU+bW9yZTwvdGl0bGU+CiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI3IiBjeT0iMiIgcj0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIyIiByPSIyIi8+CiAgPC9nPgo8L3N2Zz4K) !important;}
            
            .g-tabs-link.active{border-color}
            .sc-button-small.sc-button-active.sc-button-more:before, .sc-button-small.sc-button-selected.sc-button-more:before{}
            
            .trackItem:not(.m-disabled).active .trackItem__content, .trackItem:not(.m-disabled).active .trackItem__trackTitle {  color: ${hilgtColor} !important;}
            .playbackSoundBadge__actions button,.playbackSoundBadge__actions button:hover,.playbackSoundBadge__actions button:active,.playbackSoundBadge__actions button:focus{border: none !important;}
            .playbackTimeline__progressBar,.playbackTimeline__progressHandle {    border-color: ${hilgtColor} !important; background-color: ${hilgtColor} !important;}
            .playbackTimeline__timePassed {  color: ${hilgtColor} !important;}
            .sc-toggle:before{background: ${hilgtColor}; opacity: .7 !important;}    .sc-toggle{background-color: #121212 !important; border-color: #121212 !important; }    .sc-toggle-handle {background-color: #333 !important;}
            .sc-button-dropdown:not(.sc-button-disabled):not(:disabled) { border: 1px solid ${hilgtColor};}    .sc-button-dropdown:after {    border-right: 1px solid ${hilgtColor};    border-bottom: 1px solid ${hilgtColor};}
            .linkMenu__activeItem, .linkMenu__activeItem>a, .linkMenu__item:hover, .linkMenu__item>a:hover {  color: ${hilgtColor} !important;}
            .moreActions .sc-button:hover{border:none !important;}
            
            .soundBadge.active .soundTitle__title { color: ${hilgtColor} !important;}
            .sc-status-icon-activity{display:none !important;}
            .volume__sliderProgress, .volume__sliderHandle {    background: ${hilgtColor} !important;}
            .tileGallery__sliderButton:active, .tileGallery__sliderButton:active:after, .tileGallery__sliderButton:focus, .tileGallery__sliderButton:focus:after, .tileGallery__sliderPeek:hover .tileGallery__sliderButton, .tileGallery__sliderPeek:hover .tileGallery__sliderButton:after {    border-color: ${hilgtColor} !important;}
            
            .playButton.m-stretch:active, .playButton.m-stretch:focus, .playButton.m-stretch:hover {   background-color: ${hilgtColor} !important;    border-color: ${hilgtColor} !important;}
            .truncatedAudioInfo__content .sc-text-body a,.truncatedAudioInfo__content .sc-text-body a:visited{color: ${hilgtColor} !important;}
            .commentPopover__username, a.commentPopover__username:hover, a.commentPopover__username:visited, .commentItem a, .commentItem a:visited {    color: ${hilgtColor} !important;}
            /* SC Downloader Prepare Button */
            .sc-button-group a.isdownloader-button, .sc-button-group a.isdownloader-button:visited, a.isdownloader-button,a.isdownloader-button:visited { color: ${hilgtColor} !important; background-color: #333 !important; opacity: 1 !important;}
            .listenEngagement__actions a.isdownloader-button::before, .soundBadge__additional a.isdownloader-button::before, .sound__footer a.isdownloader-button::before{ background-image : url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAE1JREFUOI1jZMAN/qPxGbEpYsJjAFFg1ABUAxoYICEPw+gAWa4Bl4HohmDDODUTYwhBzfgMIVozNkNI1oxsCNma6QMYGbDHOdGA4pQIAHkxIfYyIDkJAAAAAElFTkSuQmCC) !important;}
            .sc-label.sc-label-private-ghost {    color: ${hilgtColor} !important;    background-color: transparent;}
            .sc-label-private:before {    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxwYXRoIGQ9Ik0xMi4wMDMgNy4yNWMuNTQ0IDAgLjk5Ny40NDQuOTk3Ljk5djQuMDJjMCAuNTM5LS40NDYuOTktLjk5Ny45OUg1Ljk5N0EuOTk4Ljk5OCAwIDAxNSAxMi4yNlY4LjI0YzAtLjUzOS40NDYtLjk5Ljk5Ny0uOTl6TTEwIDguNzVIOHYzaDJ2LTN6IiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiLz4KICAgIDxwYXRoIGQ9Ik0xMS41IDkuNzQ2VjYuMjU0QTIuNDk2IDIuNDk2IDAgMDA5IDMuNzVjLTEuMzggMC0yLjUgMS4xMTEtMi41IDIuNTA0djMuNDkyIiBzdHJva2U9InJnYigyNTUsIDI1NSwgMjU1KSIvPgogIDwvZz4KPC9zdmc+Cg==) !important;}

            /* icons on tag overview*/
            #content .sc-icon-history-orange {    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGZpbGw9InJnYig1MSwgNTEsIDUxKSIgZD0iTTEuNjQzIDMuMTQzTC40MjcgMS45MjdBLjI1LjI1IDAgMDAwIDIuMTA0VjUuNzVjMCAuMTM4LjExMi4yNS4yNS4yNWgzLjY0NmEuMjUuMjUgMCAwMC4xNzctLjQyN0wyLjcxNSA0LjIxNWE2LjUgNi41IDAgMTEtMS4xOCA0LjQ1OC43NS43NSAwIDEwLTEuNDkzLjE1NCA4LjAwMSA4LjAwMSAwIDEwMS42LTUuNjg0ek03Ljc1IDRhLjc1Ljc1IDAgMDEuNzUuNzV2Mi45OTJsMi4wMjguODEyYS43NS43NSAwIDAxLS41NTcgMS4zOTJsLTIuNS0xQS43NS43NSAwIDAxNyA4LjI1di0zLjVBLjc1Ljc1IDAgMDE3Ljc1IDR6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=) ;}
            #content .sc-icon-large.sc-icon-sound-orange {  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDUxLCA1MSwgNTEpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYig1MSwgNTEsIDUxKSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoNTEsIDUxLCA1MSkiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYig1MSwgNTEsIDUxKSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoNTEsIDUxLCA1MSkiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo=);}
            #content .sc-icon-set-orange {    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzLjEgKDM5MDEyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19wbGF5bGlzdF8xODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzLz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpY19wbGF5bGlzdCIgZmlsbD0icmdiKDUxLCA1MSwgNTEpIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIvPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtMiIgZmlsbC1vcGFjaXR5PSIwLjciIHBvaW50cz0iMyAwIDE0IDAgMTQgMTAgMTIgMTAgMTIgMiAzIDIiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);}
            /* playlist queue*/
            .queue__dropIndicator{border-top:1px solid ${hilgtColor} !important;}   .queue__dropIndicatorText{background-color: #121212 !important ;color:#ccc; !important}
            .newItemBadge.newItems__some {  background: ${hilgtColor} !important;}
    

        /*Comments*/
        .commentItem.m-creatorComment, .repostOverlay__container{ background-color: #212121 !important; border: 1px solid #333 !important;}
        
        
        .tabs__headingContainer, .tabs__tabs,.g-modal-section { background-color: #212121 !important;}
        
        /*Upload Form*/
        .quotaMeterWrapper,.uploadMain__chooserContainer,.uploadMain__foot, .sc-classic .uploadTarget__frame, .uploadTarget__visible  { background: #121212 !important;}
        .sc-classic .activeUpload__form, .sc-classic .tagInput__wrapper , .sc-classic .activeUpload__hqNote  {    background-color: #121212 !important;}
        .webiRedirectionHeader { background: #212121 !important;}
        .webiRedirectionHeader__new { background-color: ${hilgtColor} !important; }
        input, select, textarea, .sc-classic .suggestedTags {   background: #121212 !important; color: #EFEFEF !important;}
        .sc-classic .suggestedTags__listItem.selected {background-color: #ccc; color: #121212 !important;}
        .activeUpload__form .tabs__tabs{ background: #121212 !important;}
    
        .getHeard__container{background-color: #212121 !important;}
        .getHeard__firstFansMoreInfoLink a {color: ${hilgtColor} !important;}
    
        
        /*library*/
        .audibleTilePlaceholder:before {    border: 1px solid #333;}
        
        .sc-button-active.sc-button-focus, .sc-button-active:focus, .sc-button-active:hover, .sc-button-selected.sc-button-focus, .sc-button-selected:focus, .sc-button-selected:hover {   border: 1px solid ${hilgtColor} !important;}
        
        /*Loading animation*/
        /*.loading{background-image:url(https:/*a-v2.sndcdn.com/assets/images/loader-dark-45940ae3.gif) !important;}*/
        .ring {  display: inline-block;  position: relative;  width: 80px;  height: 80px;}.lds-ring div {  box-sizing: border-box;  display: block;  position: absolute;  width: 64px;  height: 64px;  margin: 8px;  border: 8px solid ${hilgtColor};  border-radius: 50%;  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;  border-color: ${hilgtColor} transparent transparent transparent;}.lds-ring div:nth-child(1) {  animation-delay: -0.45s;}.lds-ring div:nth-child(2) {  animation-delay: -0.3s;}.lds-ring div:nth-child(3) {  animation-delay: -0.15s;}@keyframes lds-ring {  0% {    transform: rotate(0deg);  }  100% {    transform: rotate(360deg);  }}
        .dual-ring {  display: inline-block;  width: 80px;  height: 80px;}.lds-dual-ring:after {  content: ' ';  display: block;  width: 64px;  height: 64px;  margin: 8px;  border-radius: 50%;  border: 6px solid ${hilgtColor};  border-color: ${hilgtColor} transparent ${hilgtColor} transparent;  animation: lds-dual-ring 1.2s linear infinite;}@keyframes lds-dual-ring {  0% {    transform: rotate(0deg);  }  100% {    transform: rotate(360deg);  }}
        
        .loading { background-image: none !important;  width: 20px;  height: 20px; margin: auto auto;}.loading:after {  content: ' '; margin: auto auto; display: block;  width: 24px;  height: 24px;  margin: 8px;  border-radius: 50%;  border: 6px solid ${hilgtColor};  border-color: ${hilgtColor} transparent ${hilgtColor} transparent;  animation: dual-ring 1.2s linear infinite;}@keyframes dual-ring {  0% {    transform: rotate(0deg);  }  100% {    transform: rotate(360deg);  }}


        
    
        .sc-classic .uploadButton.selected {    background: #121212;    padding-bottom: 13px;}
        .quotaMeter__minutesUsed {    background: linear-gradient(90deg,#212121 0,${hilgtColor}) !important;} .sc-background-dark {    background-color: #121212 !important;}

        .g-tabs {  border-bottom: 1px solid #333;}

        /* General Layout*/
        .sc-border-light-top { border-top: 1px solid #212121;}

        .sc-input, .composeMessage__bottomWrapper {border: 1px solid #333 !important;}
        .collection.m-overview .collection__section:not(:last-child) { border-bottom: 1px solid #333 !important;}
        .linkMenu{background-color:#333 !important;}
        .currentPlan__planContainer,.currentPlan__planUpsell,.g-upsell-container{background-color:#121212 !important;}
        .callout__bubble, .callout__bubble::before{background-color: #333 !important;}
        
        a.g-link-user{color:${hilgtColor}}
        .reportCopyright {display:none;}

        .profileHeaderBackground{background:#121212;}
        /*.backgroundGradient__buffer{opacity:1 !important; background-color:#121212; background: linear-gradient(135deg, ${hilgtColor} 25%, #212121 100%) repeat scroll 100% 0% !important;  background-size: 400% 100% !important; background-position: 100% 100% !important;}
        */
        .image__whiteOutline .image__full{border: 2px solid #212121 !important;}
        
        .sc-button-cta:focus, .sc-button-cta:hover, .sc-button.sc-button-white:focus, .sc-button.sc-button-white:hover ,.sc-button.sc-button-white{    border-color: ${hilgtColor} !important;}


        /*Notifications */
        .gritter-item-wrapper { background-color: #333 !important;  box-shadow: 0 0 2px rgba(0,0,0,.2),inset 0 0 2px #212121 !important; border: 1px solid #212121 !important; color: #ccc !important;} .gritter-item-wrapper a,.gritter-item-wrapper a:visited{color:${hilgtColor};}

        .paging-eof::before{filter: invert(93%) !important;}
        
        
        
        iframe .vertically-centered{ background: #121212 !important;}
        .g-nav-item.active>.g-nav-link {    text-shadow: 0 1px 0 #121212 !important;}  .searchOptions__navigationItem.active:after{border-left-color: ${hilgtColor} !important;} .searchOptions__navigationItem.active {  background: ${hilgtColor} !important;}
        .searchTitle{ background-color: transparent !important;}


        
        

        /*tags lists */
        .tagsMain .tabs__tabs{background: #121212 !important;}
        
        
        
        .keyboardShortcuts__shortcutsGroup > dl > dt > kbd > kbd { float: right; background: #212121 !important;}
        

        /* Message Inbox */
        .conversation__actions { background: #212121 !important; box-shadow: 0 1px 0 #333 !important; width: 100% !important; height: 60px !important;padding-top: 30px !important; margin-left: -33px !important; position: absolute !important;  padding-right: 30px; box-sizing:inherit !important;}
        .composeTextfield .textfield__input { color: #ccc !important; background-color: #121212 !important;}
        .inboxItem.active, .inboxItem.unread, .inboxItem:focus, .inboxItem:hover { background-color: #333 !important;}
        .inboxItem.active { border-left-color: ${hilgtColor} !important;}
        .inbox__item::before { background-color: #212121 !important;}
        .modal.modalWhiteout { background-color: hsla(1,.9%,.9%,.9) !important;}
        .sc-classic .notificationBadge--unread { background-color: #333 !important; border: 1px solid ${hilgtColor} !important;}
        .modal__modal { background: #333 !important;}
        .recipientChooser .tokenInput__wrapper { background-color: #121212 !important; color:#eee !important;}
        .tokenInput__token { background: #333 !important;}
        .suggestedUsers { background-color: #212121 !important; color: #ccc !important;}
        
        .g-tabs-link {color: #ccc;}
        .sc-classic .g-tabs-link, .sc-classic .g-tabs-link:visited{color: inherit !important;}
        .sc-classic .g-tabs-link:hover{color: #999 !important;border-color: ${hilgtColor} !important;}
        .sc-classic .g-tabs-link.active{color: ${hilgtColor} !important;border-color: ${hilgtColor} !important;} .g-tabs-link.active:hover {border-color: ${hilgtColor} !important;}
        .fullHero {background-color: #121212 !important;}
        
        .dropdownContent__footerLink, .dropdownContent__main{background-color: #333 !important;}
        .dropdownContent__footerLink:hover, .notificationBadge__linkContainer:hover{background-color: #212121 !important;}
        .notificationBadge__link:focus:after { border: none;}


        .truncatedUserDescription.m-overflow.m-collapsed .truncatedUserDescription__wrapper::after, .truncatedAudioInfo.m-overflow.m-collapsed .truncatedAudioInfo__wrapper::after { background: #121212 !important; background: linear-gradient(hsla(1,100%,0%,.0),#121212) !important;}
        .l-fixed-top-one-column > .l-top { background: #212121 !important;}
        

        /* Localeselection */
        a.localeSelector, a.localeSelector:visited{color:${hilgtColor};}
        .localeSelectorContent button{color:#eee !important;}
        .localeSelectorContent button[disabled],a.sc-text-link{color:${hilgtColor} !important; fill:${hilgtColor};}
        .localeSelectorContent {background: #333 !important;}


        /* Menu */
        #darkuserCss_menu{position:absolute;  top:0px;  width:180px; height: 180px; background: #333; color: #ccc; padding: 46px 5px 5px 10px;display:none; line-height:26px;}
        #darkuserCss_onOffButton:active #darkuserCss_menu,#darkuserCss_onOffButton #darkuserCss_menu:hover{ display:block}
        #darkuserCss_onOffButton.fullwidthActive:active #darkuserCss_menu, #darkuserCss_onOffButton.fullwidthActive #darkuserCss_menu:hover {right:0px;}
        #darkuserCss_menu input[type='color']{height:20px;}
        #darkuserCss_menu label:hover{color: ${hilgtColor};}
        #darkuserCss_menu label{float: right}    #darkuserCss_menu input[type='checkbox']{vertical-align:middle;}
        @keyframes bgmove {  0% {    background-position: 0 0;  } 50% {    background-position: 0 200%;  }   100% {    background-position: 0 400%;  }}
        
        @media only screen and (max-width: 1575px) { #darkuserCss_menu{right:0px;} }";
        @media only screen and (max-width: 975px) { body{ overflow-x:scroll; } } 
        @media (max-width: 1079px){.sc-classic .l-fluid-fixed .l-main {    margin-right: 0 !important;     width: 100% !important;}   .l-sidebar-right{display:none !important;}  }

        /* glitch effects */
        /*.glitch{  animation: glitch 1s linear infinite;} @keyframes glitch{  2%,64%{    transform: translate(2px,0) skew(0deg);  }  4%,60%{    transform: translate(-2px,0) skew(0deg);  }  62%{    transform: translate(0,0) skew(5deg);   }}.glitch:before,.glitch:after{  content: attr(title);  position: absolute;  left: 0; max-width: 100%;}.glitch:before{  animation: glitchTop 1s linear infinite;  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);}@keyframes glitchTop{  2%,64%{    transform: translate(2px,-2px);  }  4%,60%{    transform: translate(-2px,2px);  }  62%{    transform: translate(13px,-1px) skew(-13deg);   }}.glitch:after{  animation: glitchBotom 1.5s linear infinite;  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);}@keyframes glitchBotom{  2%,64%{    transform: translate(-2px,0);  }  4%,60%{    transform: translate(-2px,0);  }  62%{    transform: translate(-22px,5px) skew(21deg);   }}"
         */
        /* h1.soundTitle__title ,h2.soundTitle__username {  color:black;    width:420px;  height:250px;    font-family: 'Oswald', sans-serif;  font-size:9em;  line-height:1;  margin:0;  padding:0;    -webkit-transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg);   transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg);      position:absolute;  left:50%;  top:50px;  margin-left:-180px;    -webkit-animation: anim 3s;  -webkit-animation-timing-function: linear;  -webkit-animation-iteration-count:infinite;    animation: anim 3s;  animation-timing-function: linear;  animation-iteration-count:infinite;}@-webkit-keyframes anim {    0%{text-shadow:-6px 4px 0px red;}    10% {text-shadow:4px -6px 0px green;}    20% {text-shadow:-9px 4px 0px blue;}    30% {text-shadow:4px -6px 0px yellow;}    40% {text-shadow:-8px 4px 0px orange;}    50% {text-shadow:4px 5px 0px purple;}    60% {text-shadow:-6px 4px 0px brown;}    70% {text-shadow:4px 7px 0px pink;}    80% {text-shadow:-9px -4px 0px lime;}    90% {text-shadow:4px -6px 0px cyan;}    100% {text-shadow:-9px 4px 0px teal;}} @keyframes anim {    0%{text-shadow:-6px 4px 0px red;}    10% {text-shadow:4px -6px 0px green;}    20% {text-shadow:-9px 4px 0px blue;}    30% {text-shadow:4px -6px 0px yellow;}    40% {text-shadow:-8px 4px 0px orange;}    50% {text-shadow:4px 5px 0px purple;}    60% {text-shadow:-6px 4px 0px brown;}    70% {text-shadow:4px 7px 0px pink;}    80% {text-shadow:-9px -4px 0px lime;}    90% {text-shadow:4px -6px 0px cyan;}    100% {text-shadow:-9px 4px 0px teal;}} 
         */
        /*@keyframes fade {  to {opacity: 1;}}  #movingGradientBg {  height: 100%;  transition: 1s ease-in-out;  &::after {    content: '';    position: absolute;    top:0;    left:0;    width:100%;    opacity: 0;    animation: fade 10s alternate infinite;  }}
         */
    `;

    var activateUserDarkCssMode = function () {
        setCookie('scUserDarkCssModeActive', '1');
        
        var node = document.createElement("style");
        node.setAttribute('data-darkUserCss', 'true');
        textnode = document.createTextNode(darkerCss);
        //}
        //var textnode = document.createTextNode(style + fullWidthStyle);
        node.appendChild(textnode);
        
        // give soundcloud css some time to write itself into the header, since we want to overwrite as much as possible
//        window.setTimeout(function () {
//            document.getElementsByTagName("head")[0].appendChild(node);
//        }, 500);

        // ahh, lets use the body:
        document.getElementsByTagName("body")[0].appendChild(node);

    }
    activateUserDarkCssMode();
    var activateFullwidth = function () {
        if (getCookie('scFullWidthActive') !== '1') {
            return;
        }
        // Full with mode
        var fullWidthStyle = ".sc-classic .l-container { width: 98% !important;   margin: 0 0 !important; }";
        fullWidthStyle += ".sc-classic .l-container.l-content{  padding-left: 1% !important;   padding-right: 1% !important;}";
        fullWidthStyle += ".tileGallery.m-fourPanels .tileGallery__sliderPanelSlide {    width: 11% !important;    -webkit-flex: 0 0 11% !important;    flex: 0 0 11% !important;    margin-right:12%;}";
        fullWidthStyle += ".profileHeaderBackground__visual{background-size: 100% auto !important; background-position: 50% 50% !important;}";
        fullWidthStyle += ".dropbar,.l-inner-fullwidth{width: 100vw !important; }";
        fullWidthStyle += ".sc-classic .badgeList__item {width: 8.333%;}";
        fullWidthStyle += "";

        var node = document.createElement("style");
        node.setAttribute('data-darkUserCss-fullWidth', 'true');
        var textnode = document.createTextNode(fullWidthStyle);
        node.appendChild(textnode);
        //document.getElementsByTagName("head")[0].appendChild(node);
        document.getElementsByTagName("body")[0].appendChild(node);

    }
    activateFullwidth();
    
    var addEffects = function () {
        
        // add glitch to title
        var titleElem = document.querySelector('h1.soundTitle__title span');
        //titleElem.classList.add('glitch');
        //titleElem.title = titleElem.textContent;
        
        //document.querySelector('div.soundTitle__titleContainer').classList.add('glitch');
//        document.querySelector('div.soundTitle__usernameHeroContainer').classList.add('glitch');
//        document.querySelector('div.soundTitle__usernameTitleContainer').classList.add('glitch');
//        document.querySelector('div.soundTitle__titleHeroContainer').classList.add('glitch');
        //document.querySelector('div.soundTitle__usernameTitleContainer').classList.add('glitch');
        //
//        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
//
//        var observer = new MutationObserver(function (mutations) {
//            mutations.forEach(function (mutation) {
//                console.log(mutation.target.nodeName);
//                if (mutation.target.getElementsByClassName("play-button-container").length == 0) {
//                    mutation.target.appendChild(playBtnCont);
//                }
//            });
//        });
//
//        observer.observe(playerButtonElem, {
//            attributes: true,
//            childList: true,
//            subtree: true,
//            characterData: true
//        });




    }
   // addEffects();
//    var deactivateFullwidth = function () {
//
//    }


    var lights = function () {
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();
        var c = document.getElementById('movingGradientBg');
        var $ = c.getContext('2d');
        var w = c.width = window.innerWidth;
        var h = c.height = 380;
        var _w = w * 0.5;
        var _h = h * 0.5;
        var arr = [];
        var cnt = 0;

        window.addEventListener('load', resize);
        window.addEventListener('resize', resize, false);

        function resize() {
            c.width = w = window.innerWidth;
            c.height = h = 380;
            //c.style.position = 'absolute';
            c.style.left = (window.innerWidth - w) *
                    .01 + 'px';
            c.style.top = (380 - h) *
                    .01 + 'px';
        }

        function anim() {
            cnt++;
            if (cnt % 6)
                draw();
            window.requestAnimFrame(anim);
        }
        anim();

        function draw() {

            var splot = {
                x: rng(_w - 900, _w + 900),
                y: rng(_h - 900, _h + 900),
                r: rng(20, 80),
                spX: rng(-1, 1),
                spY: rng(-1, 1)
            };

            arr.push(splot);
            while (arr.length > 100) {
                arr.shift();
            }
            $.clearRect(0, 0, w, h);

            for (var i = 0; i < arr.length; i++) {

                splot = arr[i];
                $.fillStyle = rndCol();
                $.beginPath();
                $.arc(splot.x, splot.y, splot.r, 0, Math.PI * 2, true);
                $.shadowBlur = 80;
                $.shadowOffsetX = 2;
                $.shadowOffsetY = 2;
                $.shadowColor = rndCol();
                $.globalCompositeOperation = 'lighter';
                $.fill();

                splot.x = splot.x + splot.spX;
                splot.y = splot.y + splot.spY;
                splot.r = splot.r * 0.96;
            }
        }

        function rndCol() {

            var highlightColor = getCookie('scHighlightColor');//"#ff5500";
            if (highlightColor === null) {
                highlightColor = "#ff5500";
            }
            highlightColor = highlightColor.replace('#', '');
            var r = Math.floor(Math.random() * parseInt(highlightColor.substr(0, 2), 16));
            var g = Math.floor(Math.random() * parseInt(highlightColor.substr(2, 2), 16));
            var b = Math.floor(Math.random() * parseInt(highlightColor.substr(4, 2), 16));
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        function rng(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    
    var stopLights = function () {
            window.requestAnimFrame = function() {};
    }
    
  /*  var activateGradient = function () {
        if (getCookie('scUserDarkEnableDisco') !== '1') {
            return;
        }
        //backgroundGradient__buffer #movingGradientBg
//        var gradBg = document.createElement("canvas");
//        gradBg.setAttribute('id', 'movingGradientBg');
//        gradBg.setAttribute('class', 'movingGradient');
//
//        if (document.getElementsByClassName("fullHero").length) {
//            document.getElementsByClassName("fullHero")[0].prepend(gradBg);
//        } else {
//            window.setTimeout(function () {
//                activateGradient();
//            }, 1000);
//            return;
//        }

        //
        // utilitiy
        var randum = function (max) {
            return Math.round(Math.random() * max);
        }
        var hexify = function (x) {
            return ('0' + parseInt(x).toString(16)).slice(-2);
        }
        var randex = function () {
            return '#' + hexify(randum(255)) + hexify(randum(255)) + hexify(randum(255));
        };

        var blender = function (c1, c2) {
            var p1 = randum(100),
                    p2 = randum(100),
                    deg = randum(360),
                    mode = Math.round(Math.random());
            c1 = c1 || randex();
            c2 = c2 || randex();
            return {
                blend: (mode > 0 ? 'radial-gradient(circle at ' + p1 + '% ' + p2 + '%, ' + c1 + ', ' + c2 + ')' : 'linear-gradient(' + deg + 'deg, ' + c1 + ', ' + c2 + ')'),
                c1: c1,
                c2: c2
            };
        };

        //.playbackTimeline{display:-webkit-flex;display:flex;font-size:12px;visibility:hidden}.playbackTimeline.has-sound{visibility:visible}.playbackTimeline__duration,.playbackTimeline__progressWrapper,.playbackTimeline__snippetIndicator,.playbackTimeline__timePassed{line-height:46px}.playbackTimeline__timePassed{color:#f50;text-align:right}.playbackTimeline__duration{color:#000;color:var(--font-primary-color);text-align:left;cursor:pointer}.sc-classic .playbackTimeline__duration{color:#333}.playbackTimeline__duration,.playbackTimeline__snippetIndicator,.playbackTimeline__timePassed{width:50px;height:46px}.playbackTimeline__progressWrapper{position:relative;-webkit-flex-grow:1;flex-grow:1;padding:10px 0;margin:13px 10px 0}.playbackTimeline.is-scrubbable .playbackTimeline__progressWrapper:hover{cursor:pointer}.playbackTimeline__progressBackground,.playbackTimeline__progressBar,.playbackTimeline__progressHandle{position:absolute}.playbackTimeline__progressBackground{width:100%;height:1px;background-color:#ccc}.playbackTimeline__progressBar{width:0;height:1px;background-color:#f50}.playbackTimeline__progressHandle{border:1px solid #f50;border-radius:100%;height:8px;width:8px;background-color:#f50;box-sizing:border-box;margin-top:-4px;margin-left:-4px;opacity:0;transition:opacity .15s}.playbackTimeline.is-dragging .playbackTimeline__progressHandle,.playbackTimeline.is-scrubbable .playbackTimeline__progressWrapper:hover .playbackTimeline__progressHandle{opacity:1}.playbackTimeline.m-is-snippet .playbackTimeline__duration,.playbackTimeline__snippetIndicator{display:none}.playbackTimeline.m-is-snippet .playbackTimeline__snippetIndicator{display:block}

        // needed for transitioning the blends
        var a = blender();
        var b = blender(a.c1);
        var style = document.createElement('style');
        //style.setAttribute('id','')
        var body = document.getElementsByTagName('body')[0];
        var createStyles = function (style, a, b) {
            // moving Gradient for tites
            //style.appendChild(document.createTextNode('.backgroundGradient__buffer{display:none !important;}'));
            style.appendChild(document.createTextNode("@keyframes fade {  to {opacity: 1;}}  #movingGradientBg {  height: 100%;  transition: 1s ease-in-out;  &::after {    content: '';    position: absolute;    top:0;    left:0;    width:100%;    opacity: 0;    animation: fade 10s alternate infinite;  }}"));
            style.appendChild(document.createTextNode("@keyframes fade {  to {    opacity: 1; } }#movingGradientBg {  height: 100%;  width: 100%; transition: 1s ease-in-out; }  #movingGradientBg::after {    content: '';    position: absolute;    top: 0;    left: 0;    width: 100%; height:100%   opacity: 0;    animation: fade 1s alternate infinite; }"));
            style.appendChild(document.createTextNode('.movingGradient {background: ' + a.blend + '}'));
            style.appendChild(document.createTextNode('.movingGradient::after {background: ' + b.blend + '; opacity: 0;    animation: fade 1s alternate infinite; }'));
        };

        body.appendChild(style);

        createStyles(style, a, b);
        //        window.setTimeout(function () {
        //            b = blender();
        //            createStyles(style, a, b);
        //        }, 6000); //
        var bgTime = function () {
            a = blender();
            b = blender();
            createStyles(style, a, b);

            window.setTimeout(bgTime, 6000);
        };
        //bgTime();
        //lights();
    };
    //activateGradient(); */
    
    var enableDiscoFont = function () {
        
        if(document.getElementById('discoFontsEnable') != null){
            return;
        }
        
        var style = document.createElement('style');
        style.setAttribute('id','discoFontsEnable')
        var body = document.getElementsByTagName('body')[0];
        style.appendChild(document.createTextNode(" h1  { line-height:1;   -webkit-transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg);   transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg);  -webkit-animation: anim 3s;  -webkit-animation-timing-function: linear;  -webkit-animation-iteration-count:infinite;    animation: anim 3s;  animation-timing-function: linear;  animation-iteration-count:infinite;}@-webkit-keyframes anim {    0%{text-shadow:-6px 4px 0px red;}    10% {text-shadow:4px -6px 0px green;}    20% {text-shadow:-9px 4px 0px blue;}    30% {text-shadow:4px -6px 0px yellow;}    40% {text-shadow:-8px 4px 0px orange;}    50% {text-shadow:4px 5px 0px purple;}    60% {text-shadow:-6px 4px 0px brown;}    70% {text-shadow:4px 7px 0px pink;}    80% {text-shadow:-9px -4px 0px lime;}    90% {text-shadow:4px -6px 0px cyan;}    100% {text-shadow:-9px 4px 0px teal;}} @keyframes anim {    0%{text-shadow:-6px 4px 0px red;}    10% {text-shadow:4px -6px 0px green;}    20% {text-shadow:-9px 4px 0px blue;}    30% {text-shadow:4px -6px 0px yellow;}    40% {text-shadow:-8px 4px 0px orange;}    50% {text-shadow:4px 5px 0px purple;}    60% {text-shadow:-6px 4px 0px brown;}    70% {text-shadow:4px 7px 0px pink;}    80% {text-shadow:-9px -4px 0px lime;}    90% {text-shadow:4px -6px 0px cyan;}    100% {text-shadow:-9px 4px 0px teal;}} ")) ;
        style.appendChild(document.createTextNode(" h2  { line-height:1;   -webkit-transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg);   transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg);  -webkit-animation: anim 6s;  -webkit-animation-timing-function: linear;  -webkit-animation-iteration-count:infinite;    animation: anim 6s;  animation-timing-function: linear;  animation-iteration-count:infinite;}@-webkit-keyframes anim {    0%{text-shadow:-6px 4px 0px red;}    10% {text-shadow:4px -6px 0px green;}    20% {text-shadow:-9px 4px 0px blue;}    30% {text-shadow:4px -6px 0px yellow;}    40% {text-shadow:-8px 4px 0px orange;}    50% {text-shadow:4px 5px 0px purple;}    60% {text-shadow:-6px 4px 0px brown;}    70% {text-shadow:4px 7px 0px pink;}    80% {text-shadow:-9px -4px 0px lime;}    90% {text-shadow:4px -6px 0px cyan;}    100% {text-shadow:-9px 4px 0px teal;}} @keyframes anim {    0%{text-shadow:-6px 4px 0px red;}    10% {text-shadow:4px -6px 0px green;}    20% {text-shadow:-9px 4px 0px blue;}    30% {text-shadow:4px -6px 0px yellow;}    40% {text-shadow:-8px 4px 0px orange;}    50% {text-shadow:4px 5px 0px purple;}    60% {text-shadow:-6px 4px 0px brown;}    70% {text-shadow:4px 7px 0px pink;}    80% {text-shadow:-9px -4px 0px lime;}    90% {text-shadow:4px -6px 0px cyan;}    100% {text-shadow:-9px 4px 0px teal;}} "));
        style.appendChild(document.createTextNode(" h2.mixedSelectionModule__titleText { padding-top: 30px; "));
        
        
        body.appendChild(style);
        
    }
    
    var disableDiscoFont = function () {
        document.getElementById('discoFontsEnable').remove();
    }
    
    var activateDisco = function(){
        if (getCookie('scUserDarkEnableDisco') !== '1') {
            return;
        }
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                //console.log(mutation.target);
                if (document.getElementsByClassName("fullHero").length 
                    && mutation.target.className.includes('sc-button-play') ) {
                    
                    let movingGradientBg = document.getElementById('movingGradientBg');
                    if(movingGradientBg != null){
                        stopLights();
                        movingGradientBg.remove();
                        disableDiscoFont();
                        return;
                    }
                    if(mutation.target.className.includes('sc-button-pause')){
                        //backgroundGradient__buffer #movingGradientBg
                        let gradBg = document.createElement("canvas");
                        gradBg.setAttribute('id', 'movingGradientBg');
                        gradBg.setAttribute('class', 'movingGradient');

                        //document.getElementsByClassName("fullHero")[0].prepend(gradBg);
                        let fullHero = document.querySelector(".fullHero > div");
                        fullHero.insertBefore(gradBg, fullHero.children[0]);
                        //activateGradient();
                        lights();
                        enableDiscoFont();
                        
                    }
                } 
                if(document.getElementsByClassName("fullHero").length 
                    &&document.getElementsByClassName("sc-button-pause").length 
                    && !document.getElementById('movingGradientBg')) {
                    let gradBg = document.createElement("canvas");
                        gradBg.setAttribute('id', 'movingGradientBg');
                        gradBg.setAttribute('class', 'movingGradient');

                        //document.getElementsByClassName("fullHero")[0].prepend(gradBg);
                        let fullHero = document.querySelector(".fullHero > div");
                        fullHero.insertBefore(gradBg, fullHero.children[0]);
                        //activateGradient();
                        lights();
                        enableDiscoFont();
                }
                if (!document.getElementsByClassName("fullHero").length ){
                     stopLights();
                }
            });
        });
        
        observer.observe(document.getElementById('content'), {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true
        });
    }
    activateDisco();
    
    var deactivateGradient = function(){
        document.getElementById('movingGradientBg').remove();
    }   
    
    var replaceLogoGradient = function () {
        //Add logo background
        var logoBg = document.createElement("div");
        logoBg.setAttribute('class', 'header_logoBg');
        //document.getElementsByClassName("header__logo")[0].appendChild(logoBg);
        window.setTimeout(function () {
            if(document.getElementsByClassName("header__logo")[0]) document.getElementsByClassName("header__logo")[0].appendChild(logoBg);
        }, 1000); //
    }
    replaceLogoGradient();


    //Menu
    var insertMenuButton = function () {
        var menu = document.createElement('div');
        menu.setAttribute('id', 'darkuserCss_menu');
        menu.setAttribute('style', 'cursor:default;');
        var fullwidthActiveActiveInput = document.createElement('input');
        fullwidthActiveActiveInput.setAttribute('type', 'checkbox');
        fullwidthActiveActiveInput.setAttribute('id', 'fullwidthActive');
        fullwidthActiveActiveInput.setAttribute('name', 'fullwidthActive');
        fullwidthActiveActiveInput.setAttribute('style', 'cursor:pointer;');
        
        var fullwidthOnclick = "document.cookie = 'scFullWidthActive=1;path=/; SameSite=Lax; expires="+c.toGMTString()+"'; window.location.reload(false);";
        if (getCookie('scFullWidthActive') === '1') {
            fullwidthOnclick = "document.cookie = 'scFullWidthActive=0;path=/; SameSite=Lax; expires="+c.toGMTString()+"'; window.location.reload(false);";
            fullwidthActiveActiveInput.setAttribute('checked', 'checked');
        }
        fullwidthActiveActiveInput.setAttribute('onchange', fullwidthOnclick);

        var fullwidthActiveActiveInputLabel = document.createElement('label');
        fullwidthActiveActiveInputLabel.setAttribute('for', 'fullwidthActive');
        fullwidthActiveActiveInputLabel.setAttribute('style', 'cursor:pointer;');
        fullwidthActiveActiveInputLabel.appendChild(document.createTextNode('Full Width Mode'));

        var highlightColor = "#ff5500";
        var highlightColorChange = "document.cookie = 'scHighlightColor='+this.value+';path=/; SameSite=Lax; expires="+c.toGMTString()+"'; window.location.reload(false);";
        if (getCookie('scHighlightColor') !== null) {
            highlightColor = getCookie('scHighlightColor');
            fullwidthOnclick = "document.cookie = 'scFullWidthActive=0;path=/; SameSite=Lax; expires="+c.toGMTString()+"'; window.location.reload(false);";
        }
        var colorHighlightInput = document.createElement('input');
        colorHighlightInput.setAttribute('style', 'cursor:pointer;');
        colorHighlightInput.setAttribute('type', 'color');
        colorHighlightInput.setAttribute('id', 'scHighlightColor');
        colorHighlightInput.setAttribute('name', 'scHighlightColor');
        colorHighlightInput.setAttribute('value', highlightColor);
        colorHighlightInput.setAttribute('onchange', highlightColorChange);
        var colorHighlightInputLabel = document.createElement('label');
        colorHighlightInputLabel.setAttribute('for', 'scHighlightColor');
        colorHighlightInputLabel.setAttribute('style', 'cursor:pointer;');
        colorHighlightInputLabel.appendChild(document.createTextNode('Color Highlight'));

        var enableDiscoInput = document.createElement('input');
        enableDiscoInput.setAttribute('type', 'checkbox');
        enableDiscoInput.setAttribute('style', 'cursor:pointer;');
        enableDiscoInput.setAttribute('id', 'enableDiscoInput');
        enableDiscoInput.setAttribute('name', 'enableDiscoInput');
        var enableDiscoCookie = "document.cookie = 'scUserDarkEnableDisco=1;path=/; SameSite=Lax; expires="+c.toGMTString()+"'; window.location.reload(false);";
        if (getCookie('scUserDarkEnableDisco') === '1') {
            enableDiscoCookie = "document.cookie = 'scUserDarkEnableDisco=0;path=/; SameSite=Lax; expires="+c.toGMTString()+"'; window.location.reload(false);";
            enableDiscoInput.setAttribute('checked', 'checked');
        }
        enableDiscoInput.setAttribute('onchange', enableDiscoCookie);

        var enableDiscoInputLabel = document.createElement('label');
        enableDiscoInputLabel.setAttribute('for', 'enableDiscoInput');
        enableDiscoInputLabel.setAttribute('style', 'cursor:pointer;');
        enableDiscoInputLabel.appendChild(document.createTextNode('Disco Mode'));

        menu.appendChild(colorHighlightInput);
        menu.appendChild(colorHighlightInputLabel);
        menu.appendChild(document.createElement('br'));
        
        menu.appendChild(fullwidthActiveActiveInput);
        menu.appendChild(fullwidthActiveActiveInputLabel);
        menu.appendChild(document.createElement('br'));
        
        menu.appendChild(enableDiscoInput);
        menu.appendChild(enableDiscoInputLabel);
        menu.appendChild(document.createElement('br'));
        menu.appendChild(document.createElement('p').appendChild(document.createTextNode('Warning: Disco mode contains flickering lights and will consume more energy!')));

         menu.appendChild(document.createElement('br'));
        //menu.appendChild(testLabel);

        //menu.appendChild(disablebutton);
        //document.getElementsByTagName('body')[0].appendChild(menu);
        var button = document.createElement("a");
        button.setAttribute('id', 'darkuserCss_onOffButton');
        if (getCookie('scFullWidthActive') === '1') {
            button.setAttribute('class', 'headerMenu__link profileMenu__profile left fullwidthActive');
        } else {
            button.setAttribute('class', 'headerMenu__link profileMenu__profile left');
        }

        button.setAttribute('href', '#');
        button.setAttribute('title', 'darker mode menu');
        var logoBase64 = "data:image/png;base64,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bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6NmZlOWU3ZTktMWVlYS00MDAyLTk4NTItOTQxOWZkNjVhYjNjIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmU1ZjM2MDcwLTc4ZjMtNGIxYS04NWUwLWZlZTUxNDQ2OTdjOSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjAyZDAyNjExLTgzNTgtNDM3OC05ODRhLTgxZTU2ZWQyZmE2ZCIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjIyOTIyODQxMjcyMzEzIgogICBHSU1QOlZlcnNpb249IjIuMTAuMjQiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWNkMTQ1ODctOTEwYS00N2VmLTkxMjEtN2NjY2Y4ZWZiMzYzIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTAyVDIyOjMwOjI5Ii8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjEzOTA2ZTAyLTk4NmQtNDUwYi04ZmYwLWE4OGQxN2RmODQ3OCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNi0wNVQyMTo1NDowMSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5ZvVRcAAAABmJLR0QA/wBVAABZUJCoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QYFEzYB0riZyQAAAcJJREFUSMfd1T1rVEEUxvHfJCuuESziS4hBgwpioYVpvAMiFkZBfCnSKQiCnYXgl/AL2IuFxk4EEZR0IrNYpFAEUTSgEDCQIAhJEXRsRrgk2c26SaOnu3OH87/3POc5h389wlqHrVYr5JwHcBhDmI4xzvUCaLRJPoIJXMVbtHr9g1WAnPMobuEaBjAVY/zeK6Cv/pBS2okbJfkgfmJpIxr01ZJvwWlcKcn/aNTYFAB24zIO1M76MZhSam4G4CDOrHjfX4B7NwNwHMNrAI7gaEqpb6OAY218MoJz2LVRwGCbO01cwHgvWtQBndpxP27j1N9C6oBP69wdwx1MpJT2dKtJqPngIh4V93aKr3iK53gXQpitqmqxbtYQQn9VVXMrR8V7vC5m6xT7cB1n8SHnPJNSWiiub2Io5zyJFysBs3hSSrFjHUiz+Ga0JP6FXNp6Gt/W0mARzzCF5S7L28BWbCul/YEH+LgKEGPM+Iy7eNUlpB7zuI/HIYSltgunDL2TuInxLsqlfPFD3AshfKmqKnfcaCmlRplB53EJJ7C9TUdNFe1exhgXulqZBRJKXYfL6hzDoSLwfNl0bzCD+Rjjsv8yfgNU/X5sKQWV9QAAAABJRU5ErkJggg==";
        button.setAttribute('style', 'width:16px;height:28px;background:url(' + logoBase64 + ') no-repeat 55%;');
        //button.setAttribute('onclick', onclick);
        //button.setAttribute('onmouseover', showMenu);

        var buttonNode = document.createTextNode("");
        button.appendChild(buttonNode);
        button.appendChild(menu);

        window.setTimeout(function () {
            if(document.getElementsByClassName("header__right")[0])
            document.getElementsByClassName("header__right")[0].appendChild(button);
        }, 600); //
    }
    insertMenuButton();


    // hides the original Playbutton and injects an svg one.
    var replacePlaybutton = function () {
        var playBtnCont = document.createElement("span");
        playBtnCont.setAttribute('class', 'play-button-container');
        var playBtnBefore = document.createElement("span");
        playBtnBefore.setAttribute('class', 'play-button play-button-before');
        var playBtnAfter = document.createElement("span");
        playBtnAfter.setAttribute('class', 'play-button play-button-after');
        playBtnCont.appendChild(playBtnBefore);
        playBtnCont.appendChild(playBtnAfter);
        var playerButtonElem = document.getElementsByClassName("playControl")[0];
        //playerButtonElem.parentElement.insertBefore(playBtnCont, playerButtonElem);
        if(playerButtonElem) {
            playerButtonElem.appendChild(playBtnCont);
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    console.log(mutation.target.nodeName);
                    if (mutation.target.getElementsByClassName("play-button-container").length == 0) {
                        mutation.target.appendChild(playBtnCont);
                    }
                });
            });

            observer.observe(playerButtonElem, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true
            });
        }
       
    };
    replacePlaybutton();
    
    // hides the original Shuffle Button and injects an svg one.
    var replaceShuffleButton = function () {
        var shuffleButtonSVG = '<svg fill="#333333" height="20px" width="20px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" stroke="#333333" stroke-width="0.64"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g > <g> <path d="M22.6,19.8c-0.3-0.2-0.7-0.3-1.1-0.1c-0.3,0.2-0.6,0.5-0.6,0.9V22c-3.3,0-6-2.7-6-6c0-4.4-3.6-8-8-8C6.4,8,6,8.4,6,9 s0.4,1,1,1c3.3,0,6,2.7,6,6s-2.7,6-6,6c-0.6,0-1,0.4-1,1s0.4,1,1,1c3,0,5.6-1.7,7-4.1c1.4,2.5,4,4.1,7,4.1v1.4 c0,0.4,0.2,0.7,0.6,0.9c0.1,0.1,0.3,0.1,0.4,0.1c0.2,0,0.4-0.1,0.6-0.2l3-2.4c0.2-0.2,0.4-0.5,0.4-0.8s-0.1-0.6-0.4-0.8L22.6,19.8z "/> <path d="M15.8,12.3c0.3,0,0.5-0.1,0.7-0.3c1.1-1.3,2.8-2,4.5-2v1.4c0,0.4,0.2,0.7,0.6,0.9c0.1,0.1,0.3,0.1,0.4,0.1 c0.2,0,0.4-0.1,0.6-0.2l3-2.4C25.9,9.6,26,9.3,26,9s-0.1-0.6-0.4-0.8l-3-2.4c-0.3-0.2-0.7-0.3-1.1-0.1C21.2,5.9,21,6.2,21,6.6V8 c-2.3,0-4.4,1-6,2.7c-0.4,0.4-0.3,1,0.1,1.4C15.3,12.2,15.6,12.3,15.8,12.3z"/> </g> </g></svg>';
        var shuffleButtonSVGHighlight = '<svg fill="'+hilgtColor+'" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" stroke="'+hilgtColor+'" stroke-width="0.64"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <g> <path d="M22.6,19.8c-0.3-0.2-0.7-0.3-1.1-0.1c-0.3,0.2-0.6,0.5-0.6,0.9V22c-3.3,0-6-2.7-6-6c0-4.4-3.6-8-8-8C6.4,8,6,8.4,6,9 s0.4,1,1,1c3.3,0,6,2.7,6,6s-2.7,6-6,6c-0.6,0-1,0.4-1,1s0.4,1,1,1c3,0,5.6-1.7,7-4.1c1.4,2.5,4,4.1,7,4.1v1.4 c0,0.4,0.2,0.7,0.6,0.9c0.1,0.1,0.3,0.1,0.4,0.1c0.2,0,0.4-0.1,0.6-0.2l3-2.4c0.2-0.2,0.4-0.5,0.4-0.8s-0.1-0.6-0.4-0.8L22.6,19.8z "></path> <path d="M15.8,12.3c0.3,0,0.5-0.1,0.7-0.3c1.1-1.3,2.8-2,4.5-2v1.4c0,0.4,0.2,0.7,0.6,0.9c0.1,0.1,0.3,0.1,0.4,0.1 c0.2,0,0.4-0.1,0.6-0.2l3-2.4C25.9,9.6,26,9.3,26,9s-0.1-0.6-0.4-0.8l-3-2.4c-0.3-0.2-0.7-0.3-1.1-0.1C21.2,5.9,21,6.2,21,6.6V8 c-2.3,0-4.4,1-6,2.7c-0.4,0.4-0.3,1,0.1,1.4C15.3,12.2,15.6,12.3,15.8,12.3z"></path> </g> </g></svg>';
        
        
        var shuffleBtnCont = document.createElement("span");
        shuffleBtnCont.setAttribute('class', 'shuffle-button-container');
        var shuffleBtnBefore = document.createElement("span");
        shuffleBtnBefore.setAttribute('class', 'shuffle-button shuffle-button-before');
        var shuffleBtnAfter = document.createElement("span");
        shuffleBtnAfter.setAttribute('class', 'shuffle-button shuffle-button-after');
        shuffleBtnBefore.innerHTML = ""+shuffleButtonSVG;
        shuffleBtnAfter.innerHTML = ""+shuffleButtonSVGHighlight;
        shuffleBtnCont.appendChild(shuffleBtnBefore);
        shuffleBtnCont.appendChild(shuffleBtnAfter);
        var shuffleerButtonElem = document.getElementsByClassName("shuffleControl")[0];
        //shuffleerButtonElem.parentElement.insertBefore(shuffleBtnCont, shuffleerButtonElem);
        if(shuffleerButtonElem) {
            shuffleerButtonElem.appendChild(shuffleBtnCont);
        }
       
    };
    replaceShuffleButton();
    
   // hides the original Repeat Button and injects an svg one.
    var replaceRepeatButton = function () {
        var repeatButtonSVG = '<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>repeat_line</title> <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Media" transform="translate(-960.000000, 0.000000)" fill-rule="nonzero"> <g id="repeat_line" transform="translate(960.000000, 0.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" fill-rule="nonzero"> </path> <path d="M21.1151,10.07 C21.62795,10.07 22.0506092,10.456027 22.1083725,10.9533761 L22.1151,11.07 L22.1151,16.07 C22.1151,18.2121576 20.4311889,19.9610766 18.3147456,20.0651046 L18.1151,20.07 L7.22197,20.07 L7.2027284,20.4847792 L7.2027284,20.4847792 L7.1801076,20.8453376 C7.1761892,20.900684 7.17223,20.9536 7.16828,21.004 C7.14119,21.3495 6.81635,21.5608 6.53673,21.4146 L6.2307975,21.2503516 L6.2307975,21.2503516 L5.8710075,21.0468875 C5.806895,21.0096781 5.74079391,20.9708117 5.67283195,20.9302768 L5.2437518,20.6669521 C5.16885734,20.6196969 5.0923575,20.57075 5.01438,20.5201 L4.55084375,20.2100938 C4.47827625,20.1601219 4.40809531,20.1110984 4.34036437,20.0631742 L3.96388625,19.7900258 L3.96388625,19.7900258 L3.64925312,19.5504961 C3.60213719,19.5137781 3.557725,19.4787625 3.51608,19.4456 C3.28031,19.2579 3.2908,18.88 3.53871,18.6837 L3.81868875,18.4668906 L3.81868875,18.4668906 L4.15959,18.21455 L4.15959,18.21455 L4.55914125,17.9329594 L4.55914125,17.9329594 L5.01507,17.6284 L5.01507,17.6284 C5.1760475,17.523825 5.33038687,17.4266375 5.47709625,17.3366828 L5.8933425,17.0883625 L5.8933425,17.0883625 L6.2578575,16.8825109 L6.2578575,16.8825109 L6.56469,16.7182 L6.56469,16.7182 C6.84009,16.5746 7.13658,16.7538 7.16304,17.0778 L7.18850656,17.4253552 L7.18850656,17.4253552 L7.21180928,17.8395536 L7.21180928,17.8395536 L7.2217,18.07 L18.1151,18.07 C19.1694909,18.07 20.0332678,17.25415 20.1096144,16.2192661 L20.1151,16.07 L20.1151,11.07 C20.1151,10.5177 20.5628,10.07 21.1151,10.07 Z M17.5784,3.65537 L17.8843359,3.81961469 L17.8843359,3.81961469 L18.2441125,4.02306 C18.3082219,4.06026563 18.3743195,4.09912813 18.4422779,4.13965926 L18.8713369,4.40296371 C18.9462281,4.45021641 19.022725,4.49916125 19.1007,4.54981 L19.5642531,4.85984438 C19.6368234,4.90981938 19.707007,4.95884516 19.7747402,5.00677094 L20.1512254,5.27991938 L20.1512254,5.27991938 L20.4658449,5.51943031 C20.5129562,5.55614359 20.5573625,5.59115375 20.599,5.62431 C20.8348,5.81202 20.8243,6.1899 20.5764,6.38622 L20.2964094,6.6030625 L20.2964094,6.6030625 L19.9555,6.8554175 L19.9555,6.8554175 L19.5559406,7.13701125 L19.5559406,7.13701125 L19.1,7.44157 L19.1,7.44157 C18.939025,7.54613 18.7846875,7.64330813 18.6379797,7.73325781 L18.2217375,7.981575 L18.2217375,7.981575 L17.8572266,8.18744219 L17.8572266,8.18744219 L17.5504,8.35178 L17.5504,8.35178 C17.275,8.49534 16.9785,8.31614 16.9521,7.99217 L16.9266136,7.644574 L16.9266136,7.644574 L16.9032968,7.2303828 C16.89976,7.1560904 16.89644,7.07924 16.8934,6.99994 L6,6.99994 C4.89543,6.99994 4,7.89537 4,8.99994 L4,13.9999 C4,14.5522 3.55228,14.9999 3,14.9999 C2.44772,14.9999 2,14.5522 2,13.9999 L2,8.99994 C2,6.7908 3.79086,4.99994 6,4.99994 L16.8931,4.99994 L16.9123768,4.585144 L16.9123768,4.585144 L16.9349944,4.2246072 C16.938908,4.1692676 16.94286,4.11636 16.9468,4.06597 C16.9739,3.72042 17.2988,3.50915 17.5784,3.65537 Z" fill="#333333"> </path> </g> </g> </g> </g></svg>';
        var repeatButtonSVGHighlightOne = '<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g  stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-1008.000000, 0.000000)" fill-rule="nonzero"> <g id="repeat_one_line" transform="translate(1008.000000, 0.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" fill-rule="nonzero"> </path> <path d="M16.9468,3.06597 C16.9739,2.72042 17.2988,2.50915 17.5784,2.65537 L17.8843359,2.81961469 L17.8843359,2.81961469 L18.2441125,3.02306 C18.3082219,3.06026563 18.3743195,3.09912813 18.4422779,3.13965926 L18.8713369,3.40296371 C18.9462281,3.45021641 19.022725,3.49916125 19.1007,3.54981 L19.5642531,3.85984438 C19.6368234,3.90981938 19.707007,3.95884516 19.7747402,4.00677094 L20.1512254,4.27991938 L20.1512254,4.27991938 L20.4658449,4.51943031 C20.5129562,4.55614359 20.5573625,4.59115375 20.599,4.62431 C20.8348,4.81202 20.8243,5.1899 20.5764,5.38622 L20.2964094,5.6030625 L20.2964094,5.6030625 L19.9555,5.8554175 L19.9555,5.8554175 L19.5559406,6.13701125 L19.5559406,6.13701125 L19.1,6.44157 L19.1,6.44157 L18.6379797,6.73325781 L18.6379797,6.73325781 L18.2217375,6.981575 L18.2217375,6.981575 L17.8572266,7.18744219 L17.8572266,7.18744219 L17.5504,7.35178 L17.5504,7.35178 C17.275,7.49534 16.9785,7.31614 16.9521,6.99217 L16.9266136,6.644574 L16.9266136,6.644574 L16.9032968,6.2303828 L16.9032968,6.2303828 L16.8934,5.99994 L6,5.99994 C4.94563773,5.99994 4.08183483,6.81581733 4.00548573,7.85067759 L4,7.99994 L4,16.9999 C4,18.0542909 4.81587733,18.9180678 5.85073759,18.9944144 L6,18.9999 L18,18.9999 C19.0543909,18.9999 19.9181678,18.18405 19.9945144,17.1491661 L20,16.9999 L20,10.9999 C20,10.4477 20.4477,9.99994 21,9.99994 C21.51285,9.99994 21.9355092,10.3860188 21.9932725,10.8832951 L22,10.9999 L22,16.9999 C22,19.1421545 20.3159949,20.8909825 18.199637,20.9950049 L18,20.9999 L6,20.9999 C3.85780364,20.9999 2.10892107,19.3159889 2.0048953,17.1995456 L2,16.9999 L2,7.99994 C2,5.85774364 3.68396753,4.10886107 5.80035957,4.0048353 L6,3.99994 L16.8931,3.99994 L16.9123768,3.585144 L16.9123768,3.585144 L16.9349944,3.2246072 C16.938908,3.1692676 16.94286,3.11636 16.9468,3.06597 Z M13,10.0187 L13,15 C13,15.5523 12.5523,16 12,16 C11.4477,16 11,15.5523 11,15 L11,11.8661 C10.547,12.1282 9.96229,11.9963 9.66793,11.5547 C9.36158,11.0952 9.48575,10.4743 9.94528,10.168 L11.4297,9.17834 C12.1009,8.73089 13,9.21202 13,10.0187 Z" fill="'+hilgtColor+'"> </path> </g> </g> </g> </g></svg>';
        var repeatButtonSVGHighlight = '<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g  stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <title>repeat_line</title> <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Media" transform="translate(-960.000000, 0.000000)" fill-rule="nonzero"> <g id="repeat_line" transform="translate(960.000000, 0.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" fill-rule="nonzero"> </path> <path d="M21.1151,10.07 C21.62795,10.07 22.0506092,10.456027 22.1083725,10.9533761 L22.1151,11.07 L22.1151,16.07 C22.1151,18.2121576 20.4311889,19.9610766 18.3147456,20.0651046 L18.1151,20.07 L7.22197,20.07 L7.2027284,20.4847792 L7.2027284,20.4847792 L7.1801076,20.8453376 C7.1761892,20.900684 7.17223,20.9536 7.16828,21.004 C7.14119,21.3495 6.81635,21.5608 6.53673,21.4146 L6.2307975,21.2503516 L6.2307975,21.2503516 L5.8710075,21.0468875 C5.806895,21.0096781 5.74079391,20.9708117 5.67283195,20.9302768 L5.2437518,20.6669521 C5.16885734,20.6196969 5.0923575,20.57075 5.01438,20.5201 L4.55084375,20.2100938 C4.47827625,20.1601219 4.40809531,20.1110984 4.34036437,20.0631742 L3.96388625,19.7900258 L3.96388625,19.7900258 L3.64925312,19.5504961 C3.60213719,19.5137781 3.557725,19.4787625 3.51608,19.4456 C3.28031,19.2579 3.2908,18.88 3.53871,18.6837 L3.81868875,18.4668906 L3.81868875,18.4668906 L4.15959,18.21455 L4.15959,18.21455 L4.55914125,17.9329594 L4.55914125,17.9329594 L5.01507,17.6284 L5.01507,17.6284 C5.1760475,17.523825 5.33038687,17.4266375 5.47709625,17.3366828 L5.8933425,17.0883625 L5.8933425,17.0883625 L6.2578575,16.8825109 L6.2578575,16.8825109 L6.56469,16.7182 L6.56469,16.7182 C6.84009,16.5746 7.13658,16.7538 7.16304,17.0778 L7.18850656,17.4253552 L7.18850656,17.4253552 L7.21180928,17.8395536 L7.21180928,17.8395536 L7.2217,18.07 L18.1151,18.07 C19.1694909,18.07 20.0332678,17.25415 20.1096144,16.2192661 L20.1151,16.07 L20.1151,11.07 C20.1151,10.5177 20.5628,10.07 21.1151,10.07 Z M17.5784,3.65537 L17.8843359,3.81961469 L17.8843359,3.81961469 L18.2441125,4.02306 C18.3082219,4.06026563 18.3743195,4.09912813 18.4422779,4.13965926 L18.8713369,4.40296371 C18.9462281,4.45021641 19.022725,4.49916125 19.1007,4.54981 L19.5642531,4.85984438 C19.6368234,4.90981938 19.707007,4.95884516 19.7747402,5.00677094 L20.1512254,5.27991938 L20.1512254,5.27991938 L20.4658449,5.51943031 C20.5129562,5.55614359 20.5573625,5.59115375 20.599,5.62431 C20.8348,5.81202 20.8243,6.1899 20.5764,6.38622 L20.2964094,6.6030625 L20.2964094,6.6030625 L19.9555,6.8554175 L19.9555,6.8554175 L19.5559406,7.13701125 L19.5559406,7.13701125 L19.1,7.44157 L19.1,7.44157 C18.939025,7.54613 18.7846875,7.64330813 18.6379797,7.73325781 L18.2217375,7.981575 L18.2217375,7.981575 L17.8572266,8.18744219 L17.8572266,8.18744219 L17.5504,8.35178 L17.5504,8.35178 C17.275,8.49534 16.9785,8.31614 16.9521,7.99217 L16.9266136,7.644574 L16.9266136,7.644574 L16.9032968,7.2303828 C16.89976,7.1560904 16.89644,7.07924 16.8934,6.99994 L6,6.99994 C4.89543,6.99994 4,7.89537 4,8.99994 L4,13.9999 C4,14.5522 3.55228,14.9999 3,14.9999 C2.44772,14.9999 2,14.5522 2,13.9999 L2,8.99994 C2,6.7908 3.79086,4.99994 6,4.99994 L16.8931,4.99994 L16.9123768,4.585144 L16.9123768,4.585144 L16.9349944,4.2246072 C16.938908,4.1692676 16.94286,4.11636 16.9468,4.06597 C16.9739,3.72042 17.2988,3.50915 17.5784,3.65537 Z" fill="'+hilgtColor+'"> </path> </g> </g> </g> </g></svg>';
        
        
        var repeatBtnCont = document.createElement("span");
        repeatBtnCont.setAttribute('class', 'repeat-button-container');
        var repeatBtnBefore = document.createElement("span");
        repeatBtnBefore.setAttribute('class', 'repeat-button repeat-button-before');
        var repeatBtnAfter = document.createElement("span");
        repeatBtnAfter.setAttribute('class', 'repeat-button repeat-button-after');
        var repeatBtnOne = document.createElement("span");
        repeatBtnOne.setAttribute('class', 'repeat-button repeat-button-one');
        repeatBtnBefore.innerHTML = ""+repeatButtonSVG;
        repeatBtnOne.innerHTML = ""+repeatButtonSVGHighlightOne;
        repeatBtnAfter.innerHTML = ""+repeatButtonSVGHighlight;
        repeatBtnCont.appendChild(repeatBtnBefore);
        repeatBtnCont.appendChild(repeatBtnOne);
        repeatBtnCont.appendChild(repeatBtnAfter);
        var repeaterButtonElem = document.getElementsByClassName("repeatControl")[0];
        //repeaterButtonElem.parentElement.insertBefore(repeatBtnCont, repeaterButtonElem);
        if(repeaterButtonElem) {
            repeaterButtonElem.appendChild(repeatBtnCont);
        }
       
    };
    replaceRepeatButton();




    //window.setTimeout(function(){button.addEventListener("click", toggleUserDarkCssMode); },1500);
//    var loadCssFile = function () {
//        if (document.getElementById('darkercss') == null) {
//            var head = document.getElementsByTagName('head')[0],
//                    link = document.createElement('link');
//
//            link.id = 'darkstyle_css';
//            link.rel = 'stylesheet';
//            link.type = 'text/css';
//            link.href = chrome.extension.getURL('darker.css');
//            link.media = 'all';
//
//            head.appendChild(link);
//        }
//    }
//    window.setTimeout(function () {
//        loadCssFile();
//    }, 500);


    //remove soundcloud go+ activities in stream
    // checks every second for go+ Tracks in Stream and removes them.
//    var removeGoPlus = function () {
//        if (getCookie('scUserDarkRemoveGoP') !== '1') {
//            return;
//        }
//        var x = document.getElementsByClassName("soundList__item"); //:not([data-darkUserCss-checkedGoPlus])
//
//        for (var i = 0; i < x.length; i++) {
//            var goplus = x[i].getElementsByClassName("g-go-marker-artwork")[0];
//            if (typeof goplus !== 'undefined' && !goplus.classList.contains("sc-hidden")) {
//                //console.log("remove go+", goplus);
//                x[i].parentNode.removeChild(x[i]);
//            }
//        }
//        window.setTimeout(removeGoPlus, 2000);
//    };
//    removeGoPlus();

})();