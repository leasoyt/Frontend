export function fetchWithAuth(url: string | URL | globalThis.Request, options: RequestInit) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers })
        .then(response => {
            if (response.status === 401) {

                localStorage.removeItem("userSession");
                window.location.href = "/login";
            }
            return response;
        })
        .catch(error => {
            console.error("Fetch error:", error);
            throw error;
        });
}