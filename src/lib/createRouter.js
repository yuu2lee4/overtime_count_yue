import { render } from 'react-yue'
import React from 'react'
import gui from 'gui'

class Router {
    constructor({ config, window, store }) {
        this.config = config;
        this.window = window;
        this.store = store;
    }
    push({ name, query }) {
        const _routerC = this.config.find((item) => item.name === name);
        if (_routerC) {
            const root = gui.Container.create();
            root.setStyle({ flexDirection: 'row' });
            this.window.setContentView(root);
            const Component = _routerC.component;
            render(<Component router={this} window={this.window} store={this.store} root={root} query={query}/>, root)
        }
    }
}

export default function({config, window, store}) {
    const router = new Router({ config, window, store});
    const { name } = config[0];
    router.push({ name });
    return router;
}