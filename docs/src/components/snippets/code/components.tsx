function Greeting(props: { name: string }) {
    return (<p>Hello, {props.name}!</p>);
}

const greeting = createNode(
    <Greeting name="World" />
);
