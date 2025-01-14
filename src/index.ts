// /src/index.ts
import './styles/tailwind.css';
import { loadComponents } from './utils/Listfiles';

// Set the path to your components directory
const componentsPath = './components';

// Dynamically load and export components
loadComponents(componentsPath)
  .then((components) => {
    components.forEach(({ name, component }: any) => {
      if (component) {
        // Dynamically export the components
        module.exports[name] = component;
      }
    });
  })
  .catch((err) => {
    console.error('Error loading components:', err);
  });
