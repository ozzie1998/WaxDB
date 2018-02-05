component = name => {
    const fs = require("fs");
    const path = require("path");
    name = `${process.cwd()}/components/${name}.js`
    let temp = path.resolve(__dirname, name);
    if (fs.existsSync(temp)) {
        temp = require(temp);
        if (temp[Object.keys(temp)]) return temp[Object.keys(temp)];
    }
};

exports.component = component;