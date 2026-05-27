import React from 'react';

import {
  Filter
} from 'lucide-react';


// CATEGORIES
const CATEGORIES = [

  "All",

  "UI Bug",

  "Backend",

  "Authentication",

  "Performance",

  "Database",

  "Security",

  "API",

  "Deployment"
];


// PRIORITIES
const PRIORITIES = [

  "All",

  "LOW",

  "MEDIUM",

  "HIGH",

  "CRITICAL"
];


// STATUSES
const STATUSES = [

  "All",

  "OPEN",

  "IN_PROGRESS",

  "RESOLVED",

  "CLOSED"
];


export const Filters = ({

  filters,

  setFilters,

  sortKey,

  setSortKey

}) => {

  // HANDLE FILTER CHANGE
  const handleFilterChange = (
    key,
    value
  ) => {

    setFilters(prev => ({

      ...prev,

      [key]: value
    }));
  };

  return (

    <div className="p-4 rounded-xl bg-brand-card border border-white/5 backdrop-blur-md space-y-4 shadow-glass">

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* STATUS */}
        <div className="space-y-1.5">

          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-semibold">

            Status

          </label>

          <div className="relative">

            <select

              value={filters.status}

              onChange={(e) =>

                handleFilterChange(
                  'status',
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-brand-secondary/40 transition-colors"
            >

              {STATUSES.map(status => (

                <option

                  key={status}

                  value={status}

                  className="bg-brand-dark"
                >

                  {status}

                </option>
              ))}

            </select>

          </div>

        </div>

        {/* PRIORITY */}
        <div className="space-y-1.5">

          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-semibold">

            Priority

          </label>

          <div className="relative">

            <select

              value={filters.priority}

              onChange={(e) =>

                handleFilterChange(
                  'priority',
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-brand-secondary/40 transition-colors"
            >

              {PRIORITIES.map(priority => (

                <option

                  key={priority}

                  value={priority}

                  className="bg-brand-dark"
                >

                  {priority}

                </option>
              ))}

            </select>

          </div>

        </div>

        {/* CATEGORY */}
        <div className="space-y-1.5">

          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-semibold">

            Category

          </label>

          <div className="relative">

            <select

              value={filters.category}

              onChange={(e) =>

                handleFilterChange(
                  'category',
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-brand-secondary/40 transition-colors"
            >

              {CATEGORIES.map(category => (

                <option

                  key={category}

                  value={category}

                  className="bg-brand-dark"
                >

                  {category}

                </option>
              ))}

            </select>

          </div>

        </div>

        {/* SORT */}
        <div className="space-y-1.5">

          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-semibold">

            Sort By

          </label>

          <div className="relative">

            <select

              value={sortKey}

              onChange={(e) =>

                setSortKey(
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-brand-secondary/40 transition-colors"
            >

              <option
                value="newest"
                className="bg-brand-dark"
              >

                Newest First

              </option>

              <option
                value="oldest"
                className="bg-brand-dark"
              >

                Oldest First

              </option>

              <option
                value="priority-desc"
                className="bg-brand-dark"
              >

                Highest Priority

              </option>

              <option
                value="priority-asc"
                className="bg-brand-dark"
              >

                Lowest Priority

              </option>

              <option
                value="status"
                className="bg-brand-dark"
              >

                Status Grouping

              </option>

            </select>

          </div>

        </div>

      </div>

      {/* RESET */}
      {(

        filters.status !== 'All' ||

        filters.priority !== 'All' ||

        filters.category !== 'All'

      ) && (

        <div className="flex justify-end pt-1">

          <button

            onClick={() =>

              setFilters({

                status: 'All',

                priority: 'All',

                category: 'All'
              })
            }

            className="text-[11px] font-semibold text-brand-secondary hover:text-brand-accent transition-colors flex items-center gap-1"
          >

            <Filter size={11} />

            <span>

              Reset All Active Filters

            </span>

          </button>

        </div>
      )}

    </div>
  );
};

export default Filters;