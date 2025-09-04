import './bootstrap';
import {createInertiaApp} from "@inertiajs/react";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {createRoot} from "react-dom/client";

createInertiaApp({
    title: (title) => `${title} - Practice`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
