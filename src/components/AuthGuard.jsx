import React, { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("/api/check-auth", {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                    window.location.href = "/login"; // redirige si no autenticado
                }
            } catch (error) {
                setAuthenticated(false);
                window.location.href = "/login";
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (!authenticated) return null; // ya redirigió

    return <>{children}</>;
}
