// Component Loader - component-loader.js
export default class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.componentPath = 'components/';
        this.cacheEnabled = true;
    }

    async loadComponent(componentName, containerId, options = {}) {
        try {
            // Check cache first
            if (this.cacheEnabled && this.loadedComponents.has(componentName)) {
                this.renderComponent(containerId, this.loadedComponents.get(componentName), options);
                return true;
            }

            // Fetch component
            const response = await fetch(`${this.componentPath}${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }

            const html = await response.text();

            // Cache component
            if (this.cacheEnabled) {
                this.loadedComponents.set(componentName, html);
            }

            // Render component
            this.renderComponent(containerId, html, options);

            // Dispatch loaded event
            this.dispatchComponentLoadedEvent(componentName, containerId);

            return true;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            this.handleLoadError(componentName, containerId, error);
            return false;
        }
    }

    renderComponent(containerId, html, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        // Process HTML with options
        const processedHtml = this.processTemplate(html, options.data || {});

        // Insert HTML
        if (options.append) {
            container.insertAdjacentHTML('beforeend', processedHtml);
        } else {
            container.innerHTML = processedHtml;
        }

        // Execute any inline scripts
        this.executeScripts(container);
    }

    processTemplate(html, data) {
        // Simple template processing - replace {{variable}} with data
        return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || match;
        });
    }

    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');

            // Copy attributes
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Copy content
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }

            // Replace with new script
            script.parentNode.replaceChild(newScript, script);
        });
    }

    async loadMultipleComponents(components) {
        const promises = components.map(({ name, container, options }) =>
            this.loadComponent(name, container, options)
        );

        return Promise.all(promises);
    }

    dispatchComponentLoadedEvent(componentName, containerId) {
        window.dispatchEvent(new CustomEvent('component:loaded', {
            detail: {
                name: componentName,
                container: containerId,
                timestamp: Date.now()
            }
        }));
    }

    handleLoadError(componentName, containerId, error) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
        <div class="component-error">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Failed to load component: ${componentName}</p>
        </div>
      `;
        }

        window.dispatchEvent(new CustomEvent('component:error', {
            detail: {
                name: componentName,
                container: containerId,
                error: error.message
            }
        }));
    }

    // Clear component cache
    clearCache(componentName = null) {
        if (componentName) {
            this.loadedComponents.delete(componentName);
        } else {
            this.loadedComponents.clear();
        }
    }

    // Reload component
    async reloadComponent(componentName, containerId, options = {}) {
        this.clearCache(componentName);
        return this.loadComponent(componentName, containerId, options);
    }

    // Check if component is loaded
    isLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    // Get all loaded components
    getLoadedComponents() {
        return Array.from(this.loadedComponents.keys());
    }

    // Enable/disable cache
    setCacheEnabled(enabled) {
        this.cacheEnabled = enabled;
        if (!enabled) {
            this.clearCache();
        }
    }
}