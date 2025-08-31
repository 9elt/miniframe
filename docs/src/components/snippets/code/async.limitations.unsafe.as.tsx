state
    .as(async v => {
        const data = await getData(v);

        // WARNING: These dependents
        // can't be tracked
        state.as(...);
        state.sub(...);
        State.merge(state);

        // WARNING: Component could be
        // calling State.as, State.sub
        // or State.merge internally
        return (
            <Component data={data} />
        );
    })
    .await(init);
