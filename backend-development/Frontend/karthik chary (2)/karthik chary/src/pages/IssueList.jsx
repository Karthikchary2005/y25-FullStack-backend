import React, {
  useState,
  useMemo
} from 'react';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  Columns,
  List,
  SlidersHorizontal,
  RefreshCcw,
  Bug
} from 'lucide-react';

import { useIssues } from '../context/IssueContext';

import { SearchBar } from '../components/SearchBar';

import { Filters } from '../components/Filters';

import { IssueCard } from '../components/IssueCard';

import { IssueTable } from '../components/IssueTable';

import { searchAndScoreIssues } from '../utils/searchUtils';

import MotionWrapper, {
  MotionItem
} from '../components/MotionWrapper';

export const IssueList = () => {

  const {
    issues,
    loading
  } = useIssues();

  // VIEW MODE
  const [viewMode, setViewMode] =
    useState('kanban');

  // SEARCH
  const [searchQuery, setSearchQuery] =
    useState("");

  // FILTERS
  const [filters, setFilters] =
    useState({

      status: "All",

      priority: "All",

      category: "All"
    });

  // SORT
  const [sortKey, setSortKey] =
    useState("newest");

  // FILTER PANEL
  const [showFiltersPanel, setShowFiltersPanel] =
    useState(true);

  // PROCESS ISSUES
  const processedIssues = useMemo(() => {

    let result =
      searchAndScoreIssues(
        issues,
        searchQuery
      );

    // FILTER STATUS
    if (

      filters.status !== 'All'

    ) {

      result =
        result.filter(

          i =>
            i.status === filters.status
        );
    }

    // FILTER PRIORITY
    if (

      filters.priority !== 'All'

    ) {

      result =
        result.filter(

          i =>
            i.priority === filters.priority
        );
    }

    // FILTER CATEGORY
    if (

      filters.category !== 'All'

    ) {

      result =
        result.filter(

          i =>
            i.category === filters.category
        );
    }

    // SORT
    result = [...result].sort((a, b) => {

      if (

        searchQuery &&

        sortKey === 'newest'

      ) {

        return (

          (b.matchScore || 0)

          -

          (a.matchScore || 0)
        );
      }

      // NEWEST
      if (

        sortKey === 'newest'

      ) {

        return b.id - a.id;
      }

      // OLDEST
      if (

        sortKey === 'oldest'

      ) {

        return a.id - b.id;
      }

      // PRIORITY
      const priorityWeights = {

        CRITICAL: 4,

        HIGH: 3,

        MEDIUM: 2,

        LOW: 1
      };

      if (

        sortKey === 'priority-desc'

      ) {

        return (

          priorityWeights[b.priority]

          -

          priorityWeights[a.priority]
        );
      }

      if (

        sortKey === 'priority-asc'

      ) {

        return (

          priorityWeights[a.priority]

          -

          priorityWeights[b.priority]
        );
      }

      // STATUS
      const statusWeights = {

        OPEN: 1,

        IN_PROGRESS: 2,

        RESOLVED: 3,

        CLOSED: 4
      };

      if (

        sortKey === 'status'

      ) {

        return (

          statusWeights[a.status]

          -

          statusWeights[b.status]
        );
      }

      return 0;
    });

    return result;

  }, [

    issues,
    searchQuery,
    filters,
    sortKey
  ]);

  // KANBAN COLUMNS
  const kanbanColumns = useMemo(() => {

    const cols = {

      "OPEN": [],

      "IN_PROGRESS": [],

      "RESOLVED": [],

      "CLOSED": []
    };

    processedIssues.forEach(iss => {

      if (

        cols[iss.status] !== undefined

      ) {

        cols[iss.status].push(iss);
      }
    });

    return cols;

  }, [processedIssues]);

  // LOADING
  if(loading){

    return (

      <div className="p-10 text-center text-white">

        Loading Issues...

      </div>
    );
  }

  return (

    <MotionWrapper className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-5">

        <div>

          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-secondary font-bold flex items-center gap-1.5">

            <Columns size={12} />

            BOARD CONTROLLER

          </span>

          <h1 className="text-3xl font-bold font-display text-white mt-1">

            Issue Workspace

          </h1>

          <p className="text-sm text-gray-400">

            Continuous coordination board.

          </p>

        </div>

        {/* VIEW TOGGLE */}
        <div className="flex items-center gap-3">

          <div className="flex rounded-lg bg-white/5 p-1 border border-white/5">

            <button

              onClick={() =>
                setViewMode('kanban')
              }

              className={`p-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/35'
                  : 'text-gray-400 hover:text-white'
              }`}
            >

              <Columns size={13} />

              <span className="hidden sm:inline">

                Kanban Board

              </span>

            </button>

            <button

              onClick={() =>
                setViewMode('list')
              }

              className={`p-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/35'
                  : 'text-gray-400 hover:text-white'
              }`}
            >

              <List size={13} />

              <span className="hidden sm:inline">

                List Table

              </span>

            </button>

          </div>

          {/* FILTER BUTTON */}
          <button

            onClick={() =>
              setShowFiltersPanel(
                !showFiltersPanel
              )
            }

            className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showFiltersPanel
                ? 'bg-white/5 border-brand-secondary/40 text-brand-secondary'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >

            <SlidersHorizontal size={13} />

            <span>Filters</span>

          </button>

        </div>

      </div>

      {/* SEARCH */}
      <SearchBar
        onSearch={setSearchQuery}
        initialValue={searchQuery}
      />

      {/* FILTERS */}
      <AnimatePresence>

        {showFiltersPanel && (

          <motion.div

            initial={{
              opacity: 0,
              height: 0
            }}

            animate={{
              opacity: 1,
              height: "auto"
            }}

            exit={{
              opacity: 0,
              height: 0
            }}

            className="overflow-hidden"
          >

            <Filters

              filters={filters}

              setFilters={setFilters}

              sortKey={sortKey}

              setSortKey={setSortKey}
            />

          </motion.div>
        )}

      </AnimatePresence>

      {/* EMPTY */}
      {processedIssues.length === 0 ? (

        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-white/5 rounded-2xl bg-brand-card">

          <Bug
            size={36}
            className="text-gray-600"
          />

          <div>

            <h3 className="text-base font-bold text-white">

              No Issues Found

            </h3>

            <p className="text-xs text-gray-400 mt-1 max-w-sm">

              No issues match current search filters.

            </p>

          </div>

          <button

            onClick={() => {

              setSearchQuery("");

              setFilters({

                status: 'All',

                priority: 'All',

                category: 'All'
              });
            }}

            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300"
          >

            <RefreshCcw size={12} />

            Reset

          </button>

        </div>

      ) : viewMode === 'kanban' ? (

        // KANBAN
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {Object.entries(kanbanColumns).map(

            ([status, statusIssues]) => (

              <div
                key={status}
                className="space-y-4 min-h-[300px]"
              >

                {/* HEADER */}
                <div className="p-3 rounded-lg border flex items-center justify-between font-semibold text-xs bg-white/5 border-white/10 text-white">

                  <span>

                    {status}

                  </span>

                  <span className="px-2 py-0.5 rounded bg-brand-dark/50 border border-white/5 text-[10px]">

                    {statusIssues.length}

                  </span>

                </div>

                {/* CARDS */}
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">

                  <AnimatePresence mode="popLayout">

                    {statusIssues.map(issue => (

                      <motion.div

                        key={issue.id}

                        layout

                        initial={{
                          opacity: 0,
                          y: 12
                        }}

                        animate={{
                          opacity: 1,
                          y: 0
                        }}

                        exit={{
                          opacity: 0,
                          scale: 0.95
                        }}
                      >

                        <IssueCard issue={issue} />

                      </motion.div>
                    ))}

                  </AnimatePresence>

                </div>

              </div>
            )
          )}

        </div>

      ) : (

        // TABLE
        <MotionItem className="w-full">

          <IssueTable
            issues={processedIssues}
          />

        </MotionItem>

      )}

    </MotionWrapper>
  );
};

export default IssueList;