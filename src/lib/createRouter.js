import { render } from 'react-yue'
import React from 'react'
import gui from 'gui'

class Router {
    constructor({ config, window }) {
        this.config = config;
        this.window = window;
    }
    push({ name, query }) {
        const _routerC = this.config.find((item) => item.name === name);
        if (_routerC) {
            const root = gui.Container.create();
            root.setStyle({ flexDirection: 'row' });
            this.window.setContentView(root);
            const Component = _routerC.component;
            render(<Component router={this} window={this.window} root={root} query={query}/>, root)
        }
    }
}

export default function({config, window}) {
    const router = new Router({ config, window });
    const { name } = config[0];
    router.push({ name });
    return router;
}