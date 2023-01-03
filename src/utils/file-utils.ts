import { writeFile } from "fs";
import * as mkdirp from "mkdirp";

export function createFile(filePath: string, content: string): Promise<void>{
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      filePath,
      content,
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

export function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}