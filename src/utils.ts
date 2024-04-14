export async function getPokemonList() {
  try {
    const page = 1;

    const { limit, offset } = getLimitAndOffset(page);

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("Pokemons não encontrados.");
    }
    const data = await response.json();
    return sortObjectsByName(data.results);
  } catch (error) {
    console.error("Erro ao obter detalhes do Pokémon:", error);
  }
}

async function getPokemonDetails(name: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error("Pokemon não encontrado.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter detalhes do Pokémon:", error);
  }
}

async function getPokemonSpecies(name: string) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );
    if (!response.ok) {
      throw new Error("Espécie do Pokémon não encontrada.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter a espécie do Pokémon:", error);
  }
}

export async function generatePokemonMarkdown(name: string) {
  const [pokemon, species] = await Promise.all([
    getPokemonDetails(name),
    getPokemonSpecies(name),
  ]);

  if (!pokemon || !species) {
    console.log("Detalhes do Pokémon não disponíveis.");
    return;
  }

  const description = species.flavor_text_entries.find(
    (entry: any) => entry.language.name === "en"
  ).flavor_text;

  const markdownContent =
    `# ${pokemon.name}\n` +
    `![${pokemon.name}](${pokemon.sprites.front_default})\n\n` +
    `**Description:** ${description}\n\n` +
    `**Height:** ${pokemon.height}\n\n` +
    `**Weight:** ${pokemon.weight}\n\n` +
    `**Types:** ${pokemon.types
      .map((type: any) => type.type.name)
      .join(", ")}\n\n` +
    `**Abilities:** ${pokemon.abilities
      .map((ability: any) => ability.ability.name)
      .join(", ")}\n\n`;

  return markdownContent;
}

function getLimitAndOffset(page: number): { limit: number; offset: number } {
  const limit = 40; // Limitando o limite a 20
  const offset = (page - 1) * limit;
  return { limit, offset };
}

function sortObjectsByName(objects: any) {
  return objects.sort((a: any, b: any) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
}
