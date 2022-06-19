export interface VirtualFile {
  name: string;
  content: string;
}

export interface CreateFileOptions {
  name: string;
}

class VirtualFileSystem {
  readonly files: VirtualFile[];

  constructor() {
    this.files = [];
  }

  createFile(options: CreateFileOptions) {
    const file: VirtualFile = {
      name: options.name,
      content: "",
    };

    this.files.push(file);
    return file;
  }

  getFile(name: string) {
    return this.files.find((file) => file.name === name);
  }

  deleteFile(name: string) {
    const index = this.files.findIndex((file) => file.name === name);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }
}

export default VirtualFileSystem;
