"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToFile = exports.createDirectory = exports.createFile = void 0;
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
function createFile(filePath, content) {
    return new Promise(async (resolve, reject) => {
        (0, fs_1.writeFile)(filePath, content, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.createFile = createFile;
function createDirectory(targetDirectory) {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
exports.createDirectory = createDirectory;
function addToFile(filePath, contentToAdd) {
    return new Promise(async (resolve, reject) => {
        (0, fs_1.appendFile)(filePath, contentToAdd, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.addToFile = addToFile;
//# sourceMappingURL=file-utils.js.map