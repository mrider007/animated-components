import fs from 'fs';
import path from 'path';

// TypeScript type for file and folder entries
type FileOrFolder = fs.Dirent;

// Dynamically import and load components, returning them for export
export const loadComponents = (componentsPath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(componentsPath, { withFileTypes: true }, async (err, files: FileOrFolder[]) => {
      if (err) {
        reject('Error reading components directory:');
        return;
      }

      const componentPromises = files.map(async (file) => {
        if (file.isDirectory()) {
          console.log(`Folder: ${file.name}`);
        } else {
          console.log(`Importing: ${file.name}`);

          try {
            const component = await import(path.join(componentsPath, file.name));
            return { name: file.name.replace('.tsx', ''), component };
          } catch (error) {
            console.error(`Error importing component ${file.name}:`, error);
            return null;
          }
        }
      });

      const components = await Promise.all(componentPromises);
      resolve(components.filter((comp) => comp !== null));
    });
  });
};
