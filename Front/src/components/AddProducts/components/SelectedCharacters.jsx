/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";

function SelectCharacters({ dataSpecs, specs, updateSpecs }) {
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  let specCopy = [];
  if (dataSpecs) {
    specCopy = [...dataSpecs];
  } else {
    specCopy = [...(specs || [])];
  }

  useEffect(() => {
    if (dataSpecs) {
      setOptions(dataSpecs);
    }
  }, [dataSpecs]);

  const handleAddOption = (e) => {
    e.preventDefault();
    if (currentOption) {
      setOptions([...options, currentOption]);
      setCurrentOption("");
      updateSpecs([...options, currentOption]); // Pasa el objeto de especificación
    }
    // eslint-disable-next-line no-dupe-else-if
    else if (currentOption && dataSpecs) {
      setOptions((prevOptions) => [...prevOptions, currentOption]);
      updateSpecs((prevOptions) => [...prevOptions, currentOption]);
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);

    updateSpecs(newOptions);
  };

  const onChange = (e) => {
    if (dataSpecs) {
      const selectedId = Number(e.target.value);
      const selectedSpec = specs.find((spec) => spec.id === selectedId);
      setCurrentOption(selectedSpec);
    } else {
      setCurrentOption(e.target.value);
    }
  };

  return (
    <div>
      <div className="join mb-4">
        <select
          className="select select-bordered w-full max-w-xs join-item"
          value={currentOption} // Establece el ID de la especificación en lugar del objeto
          onChange={onChange} // Maneja el ID seleccionado
        >
          <option value="">Seleccione una opción</option>
          {specs &&
            specs.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.description}
              </option>
            ))}
        </select>

        <button
          onClick={handleAddOption}
          className="btn bg-primary join-item text-neutral hover:text-gray-100 px-2 py-1 rounded-r-md"
        >
          <span className="material-symbols-outlined">add</span>
          Añadir
        </button>
      </div>

      <div className="flex flex-wrap gap-1 w-[1000px]">
        {options.map((optionId, index) => {
          let option = null;
          if (dataSpecs && specs) {
            option = specs.find((spec) => spec.id === parseInt(optionId.id));
          }
          return (
            <div
              key={index}
              className="flex justify-start items-center gap-2 border-[1.5px] rounded-md px-2 py-1 max-w-fit border-secondary-content"
            >
              <span className="material-symbols-outlined">
                {option ? option.icon : specCopy[parseInt(optionId) - 1].icon}
              </span>
              <span>
                {option
                  ? option.description
                  : specCopy[parseInt(optionId) - 1].description}
              </span>
              <button
                onClick={() => handleRemoveOption(index)}
                className="ml-1 hover:text-red-500 flex items-center"
              >
                <span className="material-symbols-outlined">close_small</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectCharacters;
