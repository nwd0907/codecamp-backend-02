import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';
import axios from 'axios';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      keyFilename: 'gcp-file-storage.json',
      projectId: 'codecamp-308601',
    }).bucket('codecamp-file-storage');

    // 일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`codecamp-file-storage/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );

    return results;
  }
}
