import React, { useEffect, useRef, useState } from "react";
import { commands } from "./Commands";

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };
  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  useEffect(() => {
    setLines([handleCommand("banner")]);
  }, []);

  const handleCommand = (command) => {
    const foundCommand = commands.find(
      (cmd) => cmd.command.toLowerCase() === command.toLowerCase()
    );

    if (foundCommand) {
      if (foundCommand.command === "clear") {
        setLines([]);
        return null;
      }
      return foundCommand.component;
    } else {
      return (
        <div key={`unknown-${Date.now()}`}>Unknow command: '{command}'</div>
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newLines = handleCommand(currentInput);
      if (newLines !== null) {
        setLines([
          ...lines,
          <div className="flex" key={`input-${currentInput}`}>
          <p className="text-cyan-300">guest<span className="text-white">@<span className="text-green-400">{location.hostname}</span>:~$</span></p>
            <p className="w-full px-2">{currentInput}</p>
          </div>,
          newLines,
        ]);
        setSuggestions([]);
      }
      setCommandHistory((prevHistory) => [...prevHistory, currentInput]);
      setHistoryIndex(-1);
      setCurrentInput("");
    } else if (e.key == "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? -1
            : Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || "");
      }
    } else if (e.ctrlKey && e.key == "l") {
      e.preventDefault()
      setLines([handleCommand("clear")]);
    } else if (e.key === "Tab" || (e.ctrlKey && e.key == "i")) {
      e.preventDefault()
      const filteredSuggestions = commands.filter((cmd) =>
        cmd.command.toLowerCase().startsWith(currentInput.toLowerCase())
      );

      if (filteredSuggestions.length == 1) {
        setCurrentInput(filteredSuggestions[0].command);
        setSuggestions([]);
      } else {
        setSuggestions(filteredSuggestions);
      }
    }
  };

  return (
    <div ref={containerRef}>
      <div className="bg-gray-950 text-white font-mono p-4 h-screen overflow-y-auto flex flex-col">
        <div>{lines}</div>
        <div className="flex">
          <p className="text-cyan-300">guest<span className="text-white">@<span className="text-green-400">{location.hostname}</span>:~$</span></p>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none w-full px-2"
            autoFocus
            spellCheck="false"
            ref={inputRef}
          />
        </div>
        {suggestions.length > 0 && (
          <div>
            {suggestions.map((suggestion) => (
              <span className="pr-2" key={suggestion.command}>
                {suggestion.command}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
