import Layout from "./Layouts/Layout";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import axios from 'axios';
import { RouteContext } from '@hooks/useRoute';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => {
        const page = require(`./Pages/${name}.tsx`).default;
        page.layout = page.layout || ((page: React.ReactElement) => <Layout children={page} />);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        return root.render(
            <RouteContext.Provider value={(window as any).route}>
                <App {...props} />
            </RouteContext.Provider>
        );
    },
});

InertiaProgress.init({ color: '#CC3824' });
