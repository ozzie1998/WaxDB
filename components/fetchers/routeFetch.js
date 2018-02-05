route = (name) => {
    const fs = require("fs");
    const path = require("path");
    let temp = path.resolve(__dirname, `routes/${name}.js`)
    if (fs.existsSync(temp)) {
        temp = require(temp);
        // automaticly create a new entry in the deps object. 
        if (temp[Object.keys(temp)]) { return temp[Object.keys(temp)] }
        else {
            return temp;
        }
    }
}

exports.route = route;