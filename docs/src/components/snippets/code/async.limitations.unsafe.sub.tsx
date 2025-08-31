state.sub(async v => {
    const data = await getData(v);

    // WARNING: This dependent can't
    // be tracked
    state.sub(...);
});
