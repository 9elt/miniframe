state
    .as(getData)
    .await(init)
    .sub(data => {
        state.sub(...);
    });
