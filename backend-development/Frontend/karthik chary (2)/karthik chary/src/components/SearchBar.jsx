import React, {
  useState,
  useEffect,
  useRef
} from 'react';

import {
  Search,
  Sparkles,
  X
} from 'lucide-react';

import {
  parseNaturalLanguageSearch
} from '../utils/searchUtils';


export const SearchBar = ({
  onSearch,
  initialValue = ""
}) => {

  // QUERY
  const [query, setQuery] =
    useState(initialValue);

  // LAST SENT QUERY
  const lastSentQuery =
    useRef(initialValue);

  // DEBOUNCE
  const debounceRef =
    useRef(null);

  // AI SUGGESTIONS
  const [aiSuggestions, setAiSuggestions] =
    useState({

      suggestedCategory: null,

      suggestedPriority: null,

      keywordsDetected: []
    });


  // SYNC EXTERNAL VALUE
  useEffect(() => {

    if (

      initialValue !==
      lastSentQuery.current

    ) {

      setQuery(initialValue);

      lastSentQuery.current =
        initialValue;
    }

  }, [initialValue]);


  // SEARCH + AI PARSING
  useEffect(() => {

    const parsed =
      parseNaturalLanguageSearch(
        query
      );

    setAiSuggestions(parsed);

    // CLEAR OLD TIMER
    if(debounceRef.current){

      clearTimeout(
        debounceRef.current
      );
    }

    // DEBOUNCED SEARCH
    debounceRef.current =
      setTimeout(() => {

        if (

          query !==
          lastSentQuery.current

        ) {

          lastSentQuery.current =
            query;

          onSearch(query);
        }

      }, 250);

    return () => {

      if(debounceRef.current){

        clearTimeout(
          debounceRef.current
        );
      }
    };

  }, [query, onSearch]);


  // CLEAR SEARCH
  const clearSearch = () => {

    setQuery("");

    lastSentQuery.current = "";

    onSearch("");
  };


  // SAMPLE PROMPTS
  const samplePrompts = [

    "OAuth login gateway 500 error",

    "dashboard charts overlap on 1440p",

    "stripe webhook buffer signature issue",

    "critical memory leak slow"
  ];


  return (

    <div className="space-y-3 w-full">

      {/* SEARCH INPUT */}
      <div className="relative w-full">

        {/* ICON */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">

          <Search
            size={18}
            className="text-gray-400"
          />

        </div>

        {/* INPUT */}
        <input

          type="text"

          value={query}

          onChange={(e) =>

            setQuery(
              e.target.value
            )
          }

          placeholder="Describe your issue in plain English..."

          className="w-full pl-10 pr-24 py-3.5 rounded-xl bg-brand-dark/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-brand-secondary/50 focus:ring-1 focus:ring-brand-secondary/50 transition-all duration-300 backdrop-blur-md shadow-glass text-sm"
        />

        {/* RIGHT ACTIONS */}
        <div className="absolute inset-y-0 right-3 flex items-center gap-2">

          {/* CLEAR */}
          {query && (

            <button

              onClick={clearSearch}

              className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >

              <X size={14} />

            </button>
          )}

          {/* AI BADGE */}
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-secondary/10 border border-brand-secondary/30 text-[10px] font-bold font-mono tracking-wider text-brand-secondary shadow-glow-cyan animate-pulse">

            <Sparkles size={10} />

            <span>

              AI ENGINE

            </span>

          </span>

        </div>

      </div>

      {/* AI INSIGHTS */}
      {(

        aiSuggestions.suggestedCategory ||

        aiSuggestions.suggestedPriority ||

        aiSuggestions.keywordsDetected.length > 0

      ) && (

        <div className="p-3.5 rounded-lg bg-brand-dark/50 border border-white/5 backdrop-blur-md flex flex-wrap items-center gap-3.5 text-xs">

          {/* LABEL */}
          <span className="text-gray-400 flex items-center gap-1">

            <Sparkles
              size={13}
              className="text-brand-secondary"
            />

            <span>

              AI Parser Predictions:

            </span>

          </span>

          {/* CATEGORY */}
          {aiSuggestions.suggestedCategory && (

            <span className="px-2.5 py-1 rounded bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-semibold flex items-center gap-1 shadow-glow-violet">

              Category:

              {aiSuggestions.suggestedCategory}

            </span>
          )}

          {/* PRIORITY */}
          {aiSuggestions.suggestedPriority && (

            <span className={`px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-semibold flex items-center gap-1 ${aiSuggestions.suggestedPriority === 'CRITICAL' ? 'shadow-glow-red animate-pulse' : ''}`}>

              Priority:

              {aiSuggestions.suggestedPriority}

            </span>
          )}

          {/* KEYWORDS */}
          {aiSuggestions.keywordsDetected.length > 0 && (

            <div className="flex items-center gap-1 text-gray-500 font-mono text-[10px]">

              <span>

                Keywords:

                [

                {aiSuggestions.keywordsDetected.join(', ')}

                ]

              </span>

            </div>
          )}

        </div>
      )}

      {/* SAMPLE PROMPTS */}
      {!query && (

        <div className="flex items-center gap-2 flex-wrap text-xs">

          <span className="text-gray-500">

            Try searching:

          </span>

          {samplePrompts.map(

            (prompt, i) => (

              <button

                key={i}

                onClick={() =>
                  setQuery(prompt)
                }

                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 hover:border-brand-secondary/30 text-gray-400 hover:text-gray-200 transition-all"
              >

                "{prompt}"

              </button>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default SearchBar;