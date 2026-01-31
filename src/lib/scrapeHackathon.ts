

export async function scrapeHackathon(url: string) {

    const rootUrl = "https://www.google.com";

    const response = await fetch("/api/hackathons/scrape", {
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