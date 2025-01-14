import './styles/tailwind.css';
import { loadComponents } from './utils/Listfiles';

// Set the path to your components directory
const componentsPath = './components';

// Create an object to hold your dynamic exports
const dynamicExports: { [key: string]: any } = {};

// Export components dynamically
loadComponents(componentsPath)
  .then((components) => {
    components.forEach(({ name, component }: any) => {
      if (component) {
        dynamicExports[name] = component;
      }
    });
  })
  .catch((err) => {
    console.error('Error loading components:', err);
  });


export { dynamicExports };
