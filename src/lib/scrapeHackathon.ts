

export async function scrapeHackathon(url: string) {

    // TODO: Change to actually use url
    const rootUrl = "https://www.google.com";
    const endpoint = "/api";

    const response = await fetch(rootUrl + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        throw new Error("Failed to upload hackathon link");
    }

    return response.json();
}