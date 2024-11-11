import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { createInertiaApp } from "@inertiajs/react";

import "./bootstrap";
import "../css/app.css";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <NextUIProvider>
                {/* <main className="dark text-foreground bg-background"> */}
                <App {...props} />
                {/* </main> */}
            </NextUIProvider>
        );
    },
});