state
    .as(getData)
    .await(init)
    .as(data => {
        state.as(...);
        state.sub(...);
        State.merge(state);

        return (
            <Component data={data} />
        );
    });
