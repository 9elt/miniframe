import { createNode, type MiniChildren, State } from "@9elt/miniframe";

const POKEMON = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard"];

export function Pokemon() {
    const name = new State("bulbasaur");

    const select = createNode<HTMLSelectElement>(
        <select
            value={name.value}
            onchange={() => name.value = select.value}
        >
            {POKEMON.map((name) => (
                <option value={name} label={name} />
            ))}
        </select>
    );

    const pokemon = name.as(async (name) => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);

        if (!res.ok) {
            return new Error();
        }

        return await res.json() as {
            name: string;
            sprites: {
                front_default: string;
            };
        };
    }).await(null);

    return (
        <div style={{ textAlign: "center", padding: "50px 0 70px 0" }}>
            {pokemon.as(pokemon =>
                pokemon === null
                    ? <Card title={"..."} />
                    : pokemon instanceof Error
                        ? <Card title={"not found"} />
                        : <Card
                            title={pokemon.name}
                            img={
                                <img
                                    alt={pokemon.name}
                                    src={pokemon.sprites.front_default}
                                />
                            }
                        />
            )}
            <br />
            {select}
        </div>
    );
}

function Card({ title, img }: {
    title?: MiniChildren;
    img?: MiniChildren;
}) {
    return (
        <div style={{ width: "180px", margin: "0 auto", border: "1px solid #0004" }}>
            <h3>{title}</h3>
            <div style={{ height: "96px", background: "#0004" }}>
                {img}
            </div>
        </div>
    );
}
