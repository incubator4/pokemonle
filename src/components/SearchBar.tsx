import { useState, useEffect, useRef } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import { usePokemonName, usePokemonIDByGeneration } from "../hooks/useFetch";
import { useGenerationIDList } from "../hooks/useGeneration";

interface SearchBarProps {
  onChange?: (value: string) => void;
  value?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const { onChange } = props;

  const [search, setSearch] = useState("");
  const [selectedKey, setSelectedKey] = useState(props.value || "");
  const [localItems, setLocalItems] = useState<PokemonName[]>([]);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const { data: generationIDs } = useGenerationIDList();
  const { data } = usePokemonName(generationIDs, search);
  const { data: PokemonIDs } = usePokemonIDByGeneration(generationIDs);

  // Update selected key when the prop value changes
  useEffect(() => {
    setSelectedKey(props.value || "");
  }, [props.value]);

  // Update local items when data changes
  useEffect(() => {
    if (data) {
      setLocalItems(data);
    }
  }, [data]);

  // Override default selection behavior - remove highlighting from first item when dropdown opens
  useEffect(() => {
    if (autocompleteRef.current) {
      const removeFirstItemSelection = () => {
        const listbox = autocompleteRef.current?.querySelector('[role="listbox"]');
        if (listbox) {
          const options = listbox.querySelectorAll('[role="option"]');
          options.forEach(option => {
            option.setAttribute('aria-selected', 'false');

            // Force remove any selection styling
            if (option.classList.contains('selected')) {
              option.classList.remove('selected');
            }
          });
        }
      };

      // Add a mutation observer to watch for the dropdown being added to the DOM
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if any of the added nodes is the listbox
            for (let i = 0; i < mutation.addedNodes.length; i++) {
              const node = mutation.addedNodes[i] as HTMLElement;
              if (node.getAttribute && node.getAttribute('role') === 'listbox') {
                // Give time for the component to set its initial state
                setTimeout(removeFirstItemSelection, 0);
                break;
              }
            }
          }
        }
      });

      // Start observing the autocomplete component for changes
      observer.observe(autocompleteRef.current, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const handleRandomPick = () => {
    if (PokemonIDs && PokemonIDs.length > 0) {
      const randomIndex = Math.floor(Math.random() * PokemonIDs.length);
      const randomPokemon = PokemonIDs[randomIndex];
      onChange?.(randomPokemon.toString());

      // Find the name for the randomly selected Pokemon
      if (data) {
        const pokemonItem = data.find(item => item.pokemon_species_id === randomPokemon);
        if (pokemonItem) {
          setSearch(pokemonItem.name);
        }
      }
    }
  };

  const handleSelectionChange = (key: React.Key | null) => {
    if (key) {
      const selectedId = key.toString();
      setSelectedKey(selectedId);
      onChange?.(selectedId);

      // Set the name of the selected Pokemon in the search box
      const selectedPokemon = localItems.find(item => item.pokemon_species_id.toString() === selectedId);
      if (selectedPokemon) {
        setSearch(selectedPokemon.name);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div ref={autocompleteRef} className="flex-1 sm:max-w-md">
        <Autocomplete
          className="pokemon-input pokemon-input-wrapper w-full"
          classNames={{
            base: "pokemon-font",
            listbox: "pokemon-font pixel-border",
            popoverContent: "pixel-border pokemon-input-list",
          }}
          selectedKey={selectedKey}
          defaultItems={localItems}
          size="md"
          label="选择宝可梦"
          placeholder="输入搜索..."
          variant="bordered"
          onSelectionChange={handleSelectionChange}
          onInputChange={handleInputChange}
          inputValue={search}
          defaultSelectedKey=""
          listboxProps={{
            hideSelectedIcon: true,
            itemClasses: {
              base: "pokemon-font text-xs py-2",
            }
          }}
        >
          {(item) => (
            <AutocompleteItem
              key={item.pokemon_species_id}
              className="capitalize pokemon-font text-xs"
              textValue={item.name}
            >
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Button
        onPress={handleRandomPick}
        color="secondary"
        size="lg"
        className="ml-3 w-24 pixel-button pixel-button-secondary pixel-corners pokemon-font"
      >
        随机
      </Button>
    </div>
  );
};