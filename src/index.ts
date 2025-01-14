import './styles/tailwind.css';
import { loadComponents } from './utils/Listfiles';

// Set the path to your components directory
const componentsPath = './components';

let componentsExports: Record<string, any> = {};

// Dynamically load the components
loadComponents(componentsPath)
  .then((components) => {
    components.forEach(({ name, component }: any) => {
      if (component) {
        // Dynamically assign each component to the componentsExports object
        componentsExports[name] = component;
      }
    });
  })
  .catch((err) => {
    console.error('Error loading components:', err);
  });

// After loading, export all components from the componentsExports object
export { componentsExports };
