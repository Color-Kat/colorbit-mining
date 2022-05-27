require('./bootstrap');

import React from 'react';
// import { render } from 'react-dom';
import {createRoot} from 'react-dom/client';

import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';
import {RouteContext} from '@hooks/useRoute';

console.log(React.version)

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => require(`./Pages/${name}.tsx`),
    setup({el, App, props}) {
        const root = createRoot(el);
        return root.render(
            <RouteContext.Provider value={(window as any).route}>
                <App {...props} /> d
            </RouteContext.Provider>
        );
    },
});

InertiaProgress.init({color: '#4B5563'});
