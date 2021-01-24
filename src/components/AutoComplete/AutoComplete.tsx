import React, { useState, useEffect } from "react";
import "./AutoComplete.css";
import { IAutoCompleteProps } from "../../model/IAutoCompleteProps";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AutoComplete: React.FC<IAutoCompleteProps> = (
  props: IAutoCompleteProps
) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      history.push({
        pathname: `/breed/:${userInput}`,
      });
    }
  });

  const onChangeHandler = (e: any) => {
    const inputText = e.currentTarget.value;

    const filteredOptions = props.breedNames.filter(
      (name: any) => name.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    );

    const topResults = filteredOptions.slice(0, 2);

    setActiveOption(0);
    setFilteredOptions(topResults);
    setShowOptions(true);
    setUserInput(inputText);
  };

  const onClickHandler = (e: any) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDownHandler = (e: any) => {
    const active = activeOption;
    const filtered = filteredOptions;

    if (e.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(filtered[active]);
    } else if (e.keyCode === 38) {
      if (active === 0) {
        return;
      }
      setActiveOption(active - 1);
    } else if (e.keyCode === 40) {
      if (active === filtered.length - 1) {
        return;
      }
      setActiveOption(active + 1);
    }
  };

  const showBreed = () => {
    setIsLoading(true);
    setRedirect(true);
  };

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="options">
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = "option-active";
            }
            return (
              <li
                className={className}
                key={optionName}
                onClick={onClickHandler}
              >
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <em>No such breed found!</em>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="search input-group">
        <input
          type="text"
          className="breed-search"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          placeholder="Enter your breed"
          value={userInput}
        />
        <span className="input-group-addon" onClick={showBreed}>
          {isLoading ? (
            props.breedNames.includes(userInput) ? (
              <Spinner id="spinner" animation="border"></Spinner>
            ) : (
              <i className="fa fa-search"></i>
            )
          ) : (
            <i className="fa fa-search"></i>
          )}
        </span>
      </div>
      {optionList}
    </React.Fragment>
  );
};

export default AutoComplete;
