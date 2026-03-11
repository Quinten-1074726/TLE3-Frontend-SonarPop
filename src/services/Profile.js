function normalizeFriend(friend) {
    return {
        id: friend?.id ?? friend?.userId ?? crypto.randomUUID(),
        username: friend?.username ?? friend?.name ?? "Unknown",
        avatar: friend?.avatar ?? friend?.image ?? null,
    };
}

async function getFavoriteTracks() {
    // Nog geen geschikt endpoint voor favorites op de profilepagina.
    // Later hier koppelen zodra backend een juiste route heeft.
    return [];
}

async function getFriends() {
    // Nog geen duidelijk friends-endpoint aanwezig.
    return [];
}

export async function getProfilePageData() {
    const [favoriteTracks, friends] = await Promise.all([
        getFavoriteTracks(),
        getFriends(),
    ]);

    return {
        favoriteTracks,
        friends: friends.map(normalizeFriend),
    };
}