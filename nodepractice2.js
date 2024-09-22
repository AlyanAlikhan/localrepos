const fs = require("fs");

let text;  // Initialize 'text' outside the try block

try {
    text = fs.readFileSync("text.txt", "utf-8");
    console.log("this is file reading");
    console.log(text);
    text = text.replace("browser", "rohan");  // Reassign 'text'
} catch (err) {
    console.error("Error reading file:", err.message);
}

if (text) {  // Check if 'text' has been successfully read before writing
    console.log("creating a new file");
    fs.writeFileSync("rohan.txt", text);
    console.log("new file created");
} else {
    console.error("Failed to create a new file because 'text' is undefined.");
}
