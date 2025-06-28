import initialMenuData from '../menuData.json';

const STORAGE_KEY = 'menuData';

// Load data from localStorage or fall back to initial data
export const loadMenuData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading menu data from localStorage:', error);
  }
  return initialMenuData;
};

// Save data to localStorage
export const saveMenuData = (menuData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving menu data to localStorage:', error);
    return false;
  }
};

// Export data as downloadable JSON file
export const exportMenuData = (menuData) => {
  try {
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'menuData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    // Show instructions to user
    setTimeout(() => {
      alert(`File downloaded as 'menuData.json'!\n\nTo update your project:\n1. Navigate to your Downloads folder\n2. Copy the downloaded 'menuData.json' file\n3. Replace the existing 'menuData.json' file in:\n   src/menuData.json\n\nThis will make your changes permanent in the project.`);
    }, 500);
    
    return true;
  } catch (error) {
    console.error('Error exporting menu data:', error);
    return false;
  }
};

// Import data from a JSON file
export const importMenuData = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (Array.isArray(jsonData)) {
          saveMenuData(jsonData);
          resolve(jsonData);
        } else {
          reject(new Error('Invalid JSON format: expected an array'));
        }
      } catch (error) {
        reject(new Error('Invalid JSON file: ' + error.message));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

// Reset data to initial state
export const resetMenuData = () => {
  saveMenuData(initialMenuData);
  return initialMenuData;
};
