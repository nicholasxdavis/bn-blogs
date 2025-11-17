/**
 * Custom Popup Interceptor
 * Replaces browser alert(), confirm(), and prompt() with custom styled popups
 * Usage: Just include this script in your HTML file
 */

// Create styles for our custom popup
const style = document.createElement('style');
style.textContent = `
  .custom-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
  }
  
  .custom-popup-container {
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    border-radius: 12px;
    padding: 20px;
    width: 300px;
    max-width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease-out;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .custom-popup-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #fff;
  }
  
  .custom-popup-message {
    font-size: 15px;
    margin-bottom: 20px;
    line-height: 1.4;
    color: #eee;
  }
  
  .custom-popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .custom-popup-button {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .custom-popup-button-close {
    background-color: #444;
    color: white;
  }
  
  .custom-popup-button-confirm {
    background-color: #4285f4;
    color: white;
  }
  
  .custom-popup-button-cancel {
    background-color: #333;
    color: white;
  }
  
  .custom-popup-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #555;
    background-color: #222;
    color: white;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Store original functions
const originalAlert = window.alert;
const originalConfirm = window.confirm;
const originalPrompt = window.prompt;

// Custom alert function
window.alert = function(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'custom-popup-overlay';
    
    const container = document.createElement('div');
    container.className = 'custom-popup-container';
    
    const title = document.createElement('div');
    title.className = 'custom-popup-title';
    title.textContent = 'Alert';
    
    const msg = document.createElement('div');
    msg.className = 'custom-popup-message';
    msg.textContent = message;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'custom-popup-buttons';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'custom-popup-button custom-popup-button-close';
    closeButton.textContent = 'OK';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve();
    });
    
    buttonContainer.appendChild(closeButton);
    container.appendChild(title);
    container.appendChild(msg);
    container.appendChild(buttonContainer);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
  });
};

// Custom confirm function
window.confirm = function(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'custom-popup-overlay';
    
    const container = document.createElement('div');
    container.className = 'custom-popup-container';
    
    const title = document.createElement('div');
    title.className = 'custom-popup-title';
    title.textContent = 'Confirm';
    
    const msg = document.createElement('div');
    msg.className = 'custom-popup-message';
    msg.textContent = message;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'custom-popup-buttons';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'custom-popup-button custom-popup-button-cancel';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(false);
    });
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'custom-popup-button custom-popup-button-confirm';
    confirmButton.textContent = 'OK';
    confirmButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(true);
    });
    
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    container.appendChild(title);
    container.appendChild(msg);
    container.appendChild(buttonContainer);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
  });
};

// Custom prompt function
window.prompt = function(message, defaultValue = '') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'custom-popup-overlay';
    
    const container = document.createElement('div');
    container.className = 'custom-popup-container';
    
    const title = document.createElement('div');
    title.className = 'custom-popup-title';
    title.textContent = 'Prompt';
    
    const msg = document.createElement('div');
    msg.className = 'custom-popup-message';
    msg.textContent = message;
    
    const input = document.createElement('input');
    input.className = 'custom-popup-input';
    input.type = 'text';
    input.value = defaultValue;
    input.autofocus = true;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'custom-popup-buttons';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'custom-popup-button custom-popup-button-cancel';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(null);
    });
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'custom-popup-button custom-popup-button-confirm';
    confirmButton.textContent = 'OK';
    confirmButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(input.value);
    });
    
    // Also resolve when Enter key is pressed
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        document.body.removeChild(overlay);
        resolve(input.value);
      }
    });
    
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    container.appendChild(title);
    container.appendChild(msg);
    container.appendChild(input);
    container.appendChild(buttonContainer);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
  });
};

// Export original functions in case someone needs them
window._original = {
  alert: originalAlert,
  confirm: originalConfirm,
  prompt: originalPrompt
};

console.log('BN Popup interceptor loaded!');