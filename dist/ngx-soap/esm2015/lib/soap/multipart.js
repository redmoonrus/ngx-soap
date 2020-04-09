export class Multipart {
    constructor() {
        this.preambleCRLF = true;
        this.postambleCRLF = true;
    }
    build(parts, boundary) {
        const body = [];
        function add(part) {
            if (typeof part === 'number') {
                part = part.toString();
            }
            return body.push(part);
        }
        if (this.preambleCRLF) {
            add('\r\n');
        }
        parts.forEach(function (part) {
            let preamble = '--' + boundary + '\r\n';
            Object.keys(part).forEach(function (key) {
                if (key === 'body') {
                    return;
                }
                preamble += key + ': ' + part[key] + '\r\n';
            });
            preamble += '\r\n';
            add(preamble);
            add(part.body);
            add('\r\n');
        });
        add('--' + boundary + '--');
        if (this.postambleCRLF) {
            add('\r\n');
        }
        const size = body.map((part) => {
            if (typeof part === 'string') {
                return part.length;
            }
            else {
                return part.byteLength;
            }
        }).reduce((a, b) => a + b, 0);
        let uint8array = new Uint8Array(size);
        let i = 0;
        body.forEach((part) => {
            if (typeof part === 'string') {
                for (let j = 0; j < part.length; i++, j++) {
                    uint8array[i] = part.charCodeAt(j) & 0xff;
                }
            }
            else {
                for (let j = 0; j < part.byteLength; i++, j++) {
                    uint8array[i] = part[j];
                }
            }
        });
        return uint8array.buffer;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwYXJ0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNvYXAvIiwic291cmNlcyI6WyJsaWIvc29hcC9tdWx0aXBhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFNBQVM7SUFBdEI7UUFDRSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixrQkFBYSxHQUFHLElBQUksQ0FBQztJQXlEdkIsQ0FBQztJQXZEQyxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVE7UUFDbkIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWhCLFNBQVMsR0FBRyxDQUFFLElBQUk7WUFDaEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDeEI7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDWjtRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQzFCLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRztnQkFDckMsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO29CQUFFLE9BQU07aUJBQUU7Z0JBQzlCLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUE7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxRQUFRLElBQUksTUFBTSxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDYjtRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO2FBQ25CO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDekMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUMzQzthQUNGO2lCQUFNO2dCQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDM0IsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE11bHRpcGFydCAge1xyXG4gIHByZWFtYmxlQ1JMRiA9IHRydWU7XHJcbiAgcG9zdGFtYmxlQ1JMRiA9IHRydWU7XHJcblxyXG4gIGJ1aWxkKHBhcnRzLCBib3VuZGFyeSkge1xyXG4gICAgY29uc3QgYm9keSA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZCAocGFydCkge1xyXG4gICAgICBpZiAodHlwZW9mIHBhcnQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgcGFydCA9IHBhcnQudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYm9keS5wdXNoKHBhcnQpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucHJlYW1ibGVDUkxGKSB7XHJcbiAgICAgIGFkZCgnXFxyXFxuJylcclxuICAgIH1cclxuXHJcbiAgICBwYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0KSB7XHJcbiAgICAgIGxldCBwcmVhbWJsZSA9ICctLScgKyBib3VuZGFyeSArICdcXHJcXG4nO1xyXG4gICAgICBPYmplY3Qua2V5cyhwYXJ0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAnYm9keScpIHsgcmV0dXJuIH1cclxuICAgICAgICBwcmVhbWJsZSArPSBrZXkgKyAnOiAnICsgcGFydFtrZXldICsgJ1xcclxcbidcclxuICAgICAgfSk7XHJcbiAgICAgIHByZWFtYmxlICs9ICdcXHJcXG4nO1xyXG4gICAgICBhZGQocHJlYW1ibGUpO1xyXG4gICAgICBhZGQocGFydC5ib2R5KTtcclxuICAgICAgYWRkKCdcXHJcXG4nKTtcclxuICAgIH0pO1xyXG4gICAgYWRkKCctLScgKyBib3VuZGFyeSArICctLScpO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc3RhbWJsZUNSTEYpIHtcclxuICAgICAgYWRkKCdcXHJcXG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaXplID0gYm9keS5tYXAoKHBhcnQpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBwYXJ0Lmxlbmd0aFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXJ0LmJ5dGVMZW5ndGg7XHJcbiAgICAgIH1cclxuICAgIH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xyXG5cclxuICAgIGxldCB1aW50OGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBib2R5LmZvckVhY2goKHBhcnQpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFydC5sZW5ndGg7IGkrKywgaisrKSB7XHJcbiAgICAgICAgICB1aW50OGFycmF5W2ldID0gcGFydC5jaGFyQ29kZUF0KGopICYgMHhmZjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJ0LmJ5dGVMZW5ndGg7IGkrKywgaisrKSB7XHJcbiAgICAgICAgICB1aW50OGFycmF5W2ldID0gcGFydFtqXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHVpbnQ4YXJyYXkuYnVmZmVyO1xyXG4gIH1cclxuXHJcbn1cclxuIl19